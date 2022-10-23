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
  .withLifecycle(() => {
    // Write component state & logic here
  })
  .withRender(({ props, lifecycle }) => (
    // Use computed lifecycle in the render phase
  ))
```

## Multiple calls

`withLifecycle` is a **single** stage, further calls to the stage will _replace_ the stage definition in its original place.

This allows switching the lifecycle implementation logic while keeping its interface stable, either for reusing the render
phase, or for testing purposes.

```tsx
const SimpleComponent = ModularComponent()
  .withLifecycle(() => React.useState(false))
  .withRender(({ lifecycle }) => (
    <div>
      <span>Current state: {lifecycle[0] ? 'true' : 'false'}</span>
      <button onClick={() => lifecycle[1](v => !v)}>Toggle</button>
    </div>
  ))

// Override lifecycle with a default value for testing purposes
const ControlledRender = SimpleComponent.withLifecycle([true, mock()])
```

## Implementation

`withLifecycle` is a very straightforward stage that does not transformation nor impose any restriction on the generated
format. Its definition is therefore a simple field mapping:

```ts
import { createMethodRecord } from '@modular-component/core'

export const WithLifecycle = createMethodRecord({
  withLifecycle: { field: 'lifecycle' },
} as const)
```
