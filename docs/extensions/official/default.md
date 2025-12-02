---
sidebar_position: 1
---

# @modular-component/default

Set of sensible defaults for using `ModularComponent`.

Provides two stages: `lifecycle()` for adding a lifecycle hook, and `defaultProps()` for
providing default values for props. It also re-exports `render()` from `@modular-component/core` for convenience.

It's also possible to import each of them individually through [`@modular-component/with-lifecycle`](https://npmjs.com/package/@modular-component/with-lifecycle)
and <br /> [`@modular-component/with-default-props`](https://npmjs.com/package/@modular-component/with-default-props) respectively.

## Usage

**Stage function imports**

```tsx
import { ModularComponent } from '@modular-component/core'
import { defaultProps, lifecycle, render } from '@modular-component/default'

const MyComponent = ModularComponent()
  .with(
    defaultProps({
      // Define default props here
    }),
  )
  .with(
    lifecycle(() => {
      // Write component state & logic here
    }),
  )
  .with(
    render(({ props, lifecycle }) => {
      // Use generated props and lifecycle in the render phase
    }),
  )
```

**Stage registration**

```tsx
import { ModularComponent } from '@modular-component/core'
import '@modular-component/default/register'

const MyComponent = ModularComponent()
  .withDefaultProps({
    // Define default props here
  })
  .withLifecycle(() => {
    // Write component state & logic here
  })
  .withRender(({ props, lifecycle }) => {
    // Use generated props and lifecycle in the render phase
  })
```

## Implementation

`@modular-component/default` simply merges together the records from two other packages. To see the implementation
details, refer to the individual packages:

* [`@modular-component/with-default-props`](./with-default-props.md): powerful default props capabilities
* [`@modular-component/with-lifecycle`](./with-lifecycle.md): isolate component logic in a dedicated hook
