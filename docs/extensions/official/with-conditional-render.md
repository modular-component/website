---
sidebar_position: 5
---

# @modular-component/with-conditional-render

Provides three stages that allow conditional rendering in `ModularComponent`s:

- `withCondition` will set a `condition` argument to either `true` or `false`, based
  on current arguments,
- `withConditionalFallback` takes a `FunctionComponent` as parameter, and
  renders it when the `condition` argument is set to `false`,
- `withConditionalRender` also takes a `FunctionComponent` as parameter, and
  renders it when the `condition` argument is _not_ set to `false`.

Calls to `addCondition` will take into account preceding conditions, so that `withConditionalRender`
is only called when all conditions return `true`.

Calls to `addConditionalFallback` will take into account preceding fallbacks, so that only the _first_ falsy-condition
fallback is rendered.

## Usage

```tsx
import { modularFactory } from '@modular-component/core'
import { WithConditionalRender } from '@modular-component/with-conditional-render'

const ModularComponent = modularFactory
  .extend(WithConditionalRender)
  .build()

const ConditionalComponent = ModularComponent<{ enabled?: boolean }>()
  .withCondition(({ props }) => props.enabled === true)
  .withConditionalFallback(() => <>I'm disabled!</>)
  .withLifecycle(() => {
    // Some data fetching logic...
    return { loading, data }
  })
  .addCondition(({ lifecycle }) => lifecycle.loading === false)
  .addConditionalFallback(() => <>I'm loading!</>)
  .withConditionalRender(({ lifecycle }) => (
    <>I'm enabled and loaded, here is the content: {lifecycle.data}</>
  ))
```

## Multiple conditions and fallbacks

`addCondition` and `addFallbackRender` allow chaining multiple conditions with a different fallback for each.

Calls to `addCondition` will take into account preceding conditions,
so that `addConditionalRender` is only called when all conditions return `true`.

Calls to `addConditionalFallback` will take into account preceding fallbacks, so that only the _first_ falsy-condition
fallback is rendered.

## Implementation

The implementation for those stages is a bit more involved than other official extensions. Here, we have restrictions
for each stage, as well as transform functions. Furthermore, the transform functions for `withConditionalRender` and `withConditonalFallback`
can return `null` instead of the passed value, so we need to register a TypeScript transform for those stages.

```tsx
import { createMethodRecord } from '@modular-component/core'

import { FunctionComponent } from 'react'

const withCondition = Symbol()
const withConditionalFallback = Symbol()
const withConditionalRender = Symbol()

declare module '@modular-component/core' {
  export interface ModularStages<Args, Value> {
    [withCondition]: {
      restrict: (args: Args) => boolean
      transform: ReturnType<
        Value extends (args: Args) => infer T ? T : never
      >
    }
    [withConditionalFallback]: {
      restrict: FunctionComponent<Args>
      transform: ReturnType<FunctionComponent<Args>> | null
    }
    [withConditionalRender]: {
      restrict: FunctionComponent<Args>
      transform: ReturnType<FunctionComponent<Args>> | null
    }
  }
}

export const WithConditionalRender = createMethodRecord({
  Condition: {
    symbol: withCondition,
    field: 'condition',
    transform: <
      A extends { condition?: boolean },
      C extends (args: A) => boolean,
    >(
      args: A,
      useCondition: C,
    ) => args.condition !== false && useCondition(args),
  },
  ConditionalRender: {
    symbol: withConditionalRender,
    field: 'render',
    transform: <
      A extends { condition?: boolean; render?: ReturnType<FunctionComponent> },
      P extends FunctionComponent<A>,
    >(
      args: A,
      useRender: P,
    ) => {
      if (args.condition === false) {
        return args.render
      }

      return useRender(args)
    },
  },
  ConditionalFallback: {
    symbol: withConditionalFallback,
    field: 'render',
    transform: <
      A extends { condition?: boolean; render?: ReturnType<FunctionComponent> },
      P extends FunctionComponent<A>,
    >(
      args: A,
      useRender: P,
    ) => {
      if (args.condition !== false || args.render) {
        return args.render
      }

      return useRender(args)
    },
  },
} as const)
```
