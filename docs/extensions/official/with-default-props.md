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
  .withDefaultProps(({ props }) => ({
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

## Implementation

`withDefaultProps` runs a custom transform function to shallowly merge the default props to the received component props.
Accepted values are restricted to a partial map of the original props to only accept correct types for defined props.
The value can also be a function of the current args.

```tsx
import { createMethodRecord } from '@modular-component/core'

const withDefaultProps = Symbol()

declare module '@modular-component/core' {
  export interface ModularStages<Args, Value> {
    [withDefaultProps]: {
      restrict:
        | Partial<Args extends { props: infer P } ? P : {}>
        | ((args: Args) => Partial<Args extends { props: infer P } ? P : {}>)
      transform: Value extends ((args: Args) => infer T) | infer T
        ? Args extends { props: infer P }
          ? {
              [key in keyof T]: key extends keyof P
                ? NonNullable<P[key]>
                : T[key]
            }
          : Value
        : never
    }
  }
}

export const WithDefaultProps = createMethodRecord({
  DefaultProps: {
    symbol: withDefaultProps,
    field: 'props',
    transform: <A extends { props: {} }, P>(args: A, useProps: P) => ({
      ...(typeof useProps === 'function' ? useProps(args) : useProps),
      ...args.props,
    }),
  },
} as const)
```
