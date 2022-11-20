---
sidebar_position: 3
---

# @modular-component/with-lifecycle

Basic stage allowing to save the result of a custom hook to a `lifecycle` argument passed down to further stages.
The lifecycle hook receives the previous argument map as parameter, and can therefore use props or any other
injected argument.

## Usage

```tsx
import { modularFactory } from '@modular-component/core'
import { WithLifecycle } from '@modular-component/with-lifecycle'

const ModularComponent = modularFactory
  .extend(WithLifecycle)
  .build()

const MyComponent = ModularComponent()
  .withLifecycle(({ props }) => {
    // Write component state & logic here
  })
  .withRender(({ props, lifecycle }) => (
    // Use computed lifecycle in the render phase
  ))
```

## Implementation

`withLifecycle` receives a function taking the current arguments map as parameter. In its transform function, the
passed value is called with the current arguments map:

```ts
import { createMethodRecord } from '@modular-component/core'

const withLifecycle = Symbol()

declare module '@modular-component/core' {
  export interface ModularStages<Args, Value> {
    [withLifecycle]: {
      restrict: (args: Args) => unknown
      transform: Value extends (args: Args) => infer T ? T : never
    }
  }
}

export const WithLifecycle = createMethodRecord({
  Lifecycle: {
    symbol: withLifecycle,
    field: 'lifecycle',
    transform: (args, useLifecycle) => {
      return useLifecycle(args)
    },
  },
} as const)
```
