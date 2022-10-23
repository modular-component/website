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

`withCondition` and `withConditionalFallback` are multiple, so it's possible
to chain multiple conditions with a different fallback for each. Subsequent calls
to `withCondition` will take into account preceding conditions, so that `withConditionalRender`
is only called when all conditions return `true`.

## Usage

```tsx
import { modularFactory } from '@modular-component/core'
import { WithConditionalRender } from '@modular-component/with-conditional-render'

const ModularComponent = modularFactory
  .extend(WithConditionalRender)
  .build()

const ConditionalComponent = ModularComponent<{ enabled?: boolean }>()
  .withCondition(({ props }) => props.enabled === true)
  .withFallbackRender(() => <>I'm disabled!</>)
  .withLifecycle(() => {
    // Some data fetching logic...
    return { loading, data }
  })
  .withCondition(({ lifecycle }) => lifecycle.loading === false)
  .withFallbackrender(() => <>I'm loading!</>)
  .withConditionalRender(({ lifecycle }) => (
    <>I'm enabled and loaded, here is the content: {lifecycle.data}</>
  ))
```

## Multiple calls

`withConditionalRender` is a **single** stage, further calls to the stage will _replace_ the stage definition in its original place.
As a render stage, it will most likely be the last stage of a component anyway.

`withCondition` and `withFallbackRender` are **multiple** stages, further calls will add new stages, allowing to chain multiple 
conditions with a different fallback for each. Subsequent calls to `withCondition` will take into account preceding conditions,
so that `withConditionalRender` is only called when all conditions return `true`.

## Implementation

The implementation for those stages is a bit more involved than other official extensions. Here, we have restrictions
for each stage, as well as transform functions. Furthermore, the transform functions for `withConditionalRender` and `withConditonalFallback`
can return `null` instead of the passed value, so we need to register a TypeScript transform for those stages.

```tsx
import { createMethodRecord } from '@modular-component/core'
import { FunctionComponent } from 'react'

const withConditionalFallback = Symbol()
const withConditionalRender = Symbol()

export const WithConditionalRender = createMethodRecord({
  withCondition: {
    field: 'condition',
    multiple: true,
    transform: <
      A extends { condition?: boolean },
      C extends (args: A) => boolean,
    >(
      args: A,
      useCondition: C,
    ) =>
      args.condition !== false &&
      (typeof useCondition === 'function' ? useCondition(args) : useCondition),
    restrict: {} as boolean,
  },
  withConditionalFallback: {
    field: 'render',
    multiple: true,
    symbol: withConditionalFallback,
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

      return typeof useRender === 'function' ? useRender(args) : useRender
    },
    restrict: {} as ReturnType<FunctionComponent>,
  },
  withConditionalRender: {
    field: 'render',
    symbol: withConditionalRender,
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

      return typeof useRender === 'function' ? useRender(args) : useRender
    },
    restrict: {} as ReturnType<FunctionComponent>,
  },
} as const)

declare module '@modular-component/core' {
  export interface ModularStageTransform<T> {
    [withConditionalFallback]: T | null
    [withConditionalRender]: T | null
  }
}
```
