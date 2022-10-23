---
sidebar_position: 1
---

# @modular-component/default

Set of sensible defaults for using `ModularComponent`. 

Provides two stages: `withLifecycle` for adding a lifecycle hook, and `withDefaultProps` for
providing default values for props.

It's also possible to import each of them individually through [`@modular-component/with-lifecycle`](./with-lifecycle.md)
and <br /> [`@modular-component/with-default-props`](./with-default-props.md) respectively.

## Usage

```tsx
import { modularFactory } from '@modular-component/core'
import { WithDefaultStages } from '@modular-component/default'

const ModularComponent = modularFactory
  .extend(WithDefaultStages)
  .build()

const MyComponent = ModularComponent()
  .withDefaultProps({
    // Define default props here
  })
  .withLifecycle(() => {
    // Write component state & logic here
  })
  .withRender(({ props, lifecycle }) => (
    // Use generated props and lifecycle in the render phase
  ))
```

## Implementation

`@modular-component/default` simply merge together the records from two other packages. To see the implementation
details, refer to the individual packages:

* [`@modular-component/with-default-props`](./with-default-props.md): powerful default props capabilities
* [`@modular-component/with-lifecycle`](./with-lifecycle.md): isolate component logic in a dedicated hook
