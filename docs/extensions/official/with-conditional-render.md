---
sidebar_position: 5
---

# @modular-component/with-conditional-render

Provides three stages that allow conditional rendering in `ModularComponents`:

- `condition()` will set a customizable argument to either `true` or `false`, based
  on current arguments,
- `conditionalFallback()` takes a `FunctionComponent` as parameter, and
  renders it when a customizable argument is set to `true`, filling the `render` argument in the process,
- `conditionalRender()` also takes a `FunctionComponent` as parameter, and
  renders it only if the `render` argument was not filled earlier.

## Usage

:::caution
`conditionalFallback` and `conditionalRender`'s stage functions are executed _conditionally_.

If the provided `condition` isn't met, `conditionalFallback` does not run its function. If a `conditionalFallback` ran earlier,
`conditonalRender` won't run its function.

As such, neither of those functions can have hooks calls inside, otherwise the rule of hooks can be broken during
rerenders.
:::

**Stage function imports**

```tsx
import { ModularComponent } from '@modular-component/core'
import { lifecycle } from '@modular-component/with-lifecycle'
import {
  condition,
  conditionalFallback,
  conditionalRender,
} from '@modular-component/with-conditional-render'

const ConditionalComponent = ModularComponent<{ enabled?: boolean }>()
  .with(
    lifecycle(() => {
      // Some data fetching logic...
      return { loading, data }
    }),
  )
  .with(condition('disabled', ({ props }) => props.enabled !== true))
  .with(conditionalFallback('disabled', () => <>I'm disabled!</>))
  .with(condition('loading', ({ lifecycle }) => lifecycle.loading === false))
  .with(conditionalFallback('loading', () => <>I'm loading!</>))
  .with(
    conditionalRender(({ lifecycle }) => (
      <>I'm enabled and loaded, here is the content: {lifecycle.data}</>
    )),
  )
```

**Stage registration**

```tsx
import { ModularComponent } from '@modular-component/core'
import '@modular-component/with-lifecycle/register'
import '@modular-component/with-conditional-render/register'

const ConditionalComponent = ModularComponent<{ enabled?: boolean }>()
  .withLifecycle(() => {
    // Some data fetching logic...
    return { loading, data }
  })
  .withCondition('disabled', ({ props }) => props.enabled !== true)
  .withConditionalFallback('disabled', () => <>I'm disabled!</>)
  .withCondition('loading', ({ lifecycle }) => lifecycle.loading === false)
  .withConditionalFallback('loading', () => <>I'm loading!</>)
  .withConditionalRender(({ lifecycle }) => (
    <>I'm enabled and loaded, here is the content: {lifecycle.data}</>
  ))
```

## Multiple conditions and fallbacks

You can use the `condition` and `conditionalFallback` multiple times in the same pipeline by providing different
argument names as the first parameter.

## Stage registration

You can either automatically register the stages on `withCondition`, `withConditionalFallback` and `withConditionalRender` by importing `@modular-component/with-conditional-render/register`,
or handle the registration manually thanks to the `condition`, `conditionalFallback`, `conditionalRender` functions and `WithCondition`, `WithConditionalFallback`, `WithConditionalRender` types exports.

```ts
import { ModularComponent, ModularContext } from '@modular-component/core'
import {
  condition,
  conditionalFallback,
  conditionalRender,
  WithCondition,
  WithConditionalFallback,
  WithConditionalRender,
} from '@modular-component/with-conditional-render'

// Register the stages on the factory
ModularComponent.register({ condition, conditionalFallback, conditionalRender })

// Extend the type definition
declare module '@modular-component/stages' {
  export interface ModularComponentStages<Context extends ModularContext> {
    withCondition: WithCondition<Context>
    withConditionalFallback: WithConditionalFallback<Context>
    withConditionalRender: WithConditionalRender<Context>
  }
}
```

## Implementation

The implementation for those stages is a bit more involved than other official extensions. Here, we have restrictions
for each stage, as well as stage hooks.

```tsx
import { FunctionComponent } from 'react'
import {
  addTo,
  wrap,
  ModularContext,
  GetValueGetterFor,
  StageParams,
  StageReturn,
} from '@modular-component/core/extend'

type GetConditions<Context extends ModularContext> = {
  [key in keyof Context['arguments']]: Context['arguments'][key] extends boolean
    ? key extends string
      ? key
      : never
    : never
}[keyof Context['arguments']]

export function condition<
  Context extends ModularContext, 
  Field extends string
>(
  field: Field,
  useCondition: GetValueGetterFor<Context, Field, boolean>,
) {
  return addTo<Context>().on(field).use(wrap(useCondition))
}

export type WithCondition<
  Context extends ModularContext
> = <
  Field extends string,
>(
  ...args: StageParams<typeof condition<Context, Field>>
) => StageReturn<typeof condition<Context, Field>>

export function conditionalFallback<
  Context extends ModularContext,
  Condition extends GetConditions<Context>,
>(
  condition: Condition,
  useRender: GetValueGetterFor<
    Context,
    `render-${Condition}`,
    ReturnType<FunctionComponent>
  >,
) {
  return addTo<Context>()
    .on(`render-${condition}`)
    .use((args) => {
      const _args = args as {
        [condition]?: boolean
        render?: ReturnType<FunctionComponent>
      }
      if (_args[condition] && !_args.render) {
        _args.render = wrap(useRender)(args)
      }
      return !!_args.condition as boolean
    })
}

export type WithConditionalFallback<
  Context extends ModularContext
> = <
  Condition extends GetConditions<Context>,
>(
  ...args: StageParams<typeof conditionalFallback<Context, Condition>>
) => StageReturn<typeof conditionalFallback<Context, Condition>>

export function conditionalRender<Context extends ModularContext>(
  useRender: GetValueGetterFor<
    Context,
    'render',
    ReturnType<FunctionComponent>
  >,
) {
  return addTo<Context>()
    .on('render')
    .use(
      (args): ReturnType<FunctionComponent> =>
        (args as { render?: ReturnType<FunctionComponent> }).render ??
        wrap(useRender)(args),
    )
}

export type WithConditionalRender<Context extends ModularContext> = (
  ...args: StageParams<typeof conditionalRender<Context>>
) => StageReturn<typeof conditionalRender<Context>>
```
