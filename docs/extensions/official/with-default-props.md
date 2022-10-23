---
sidebar_position: 2
---

# @modular-component/with-default-props

Provides a `withDefaultProps` stage allowing to set default value for props. Contrary to the standard React `defaultProps`
field, the `withDefaultProps` stage can also _set new props_ that are not surfaced by the component, and react to passed
props (or other previous stages) to dynamically compute a default value.

## Usage

```tsx
import { modularFactory } from '@modular-component/core'
import { WithDefaultProps } from '@modular-component/with-default-props'

const ModularComponent = modularFactory
  .extend(WithDefaultProps)
  .build()

const MyComponent = ModularComponent<{ someFlag?: boolean }>()
  .withDefaultProps({
    someFlag: false,
    someNewProp: 'hello world'
  })
  .withRender(({ props }) => (
    // props is inferred as { someFlag: boolean; someNewProp: string } at this point
  ))

const MyDynamicProps = ModularComponent<{ 
  role: 'user' | 'owner' | 'admin', 
  canEdit?: boolean, 
  canDelete?: boolean 
}>()
  .withDefaultProsp(({ props }) => ({
    canEdit: ['owner', 'admin'].includes(props.role),
    canDelete: ['owner'].includes(props.role)
  }))
  .withRender(({ props }) => {
    // props is inferred as { role: 'user' | 'owner' | 'admin'; canEdit: boolean; canDelete: boolean }
    // canEdit defaults to true if the role is not "user", false otherwise
    // canDelete defaults to true if the role is "admin", false otherwise
    // canEdit and canDelete can still be controlled by explicitely setting the property
  })
```

## Multiple calls

`withDefaultProps` is a **single** stage, further calls to the stage will _replace_ the stage definition in its original place.

Further calls need to at least define the same values as previous calls to ensure the contract is honored.

## Implementation

`withDefaultProps` runs a custom transform function to shallowly merge the default props to the received component props.
Accepted values are restricted to an object type, since we need to be able to spread it.

```tsx
import { createMethodRecord } from '@modular-component/core'

export const WithDefaultProps = createMethodRecord({
  withDefaultProps: {
    field: 'props',
    transform: <A extends { props: {} }, P>(args: A, props: P) => ({
      ...(typeof props == 'function' ? props(args) : props),
      ...args.props,
    }),
    restrict: {} as Record<string, unknown>,
  },
} as const)
```
