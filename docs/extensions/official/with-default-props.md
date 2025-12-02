---
sidebar_position: 2
---
# @modular-component/with-default-props

Provides a `defaultProps()` stage allowing to set default value for props. Contrary to the standard React `defaultProps`
field, the `defaultProps()` stage can also _set new props_ that are not surfaced by the component, and react to passed
props (or other previous stages) to dynamically compute a default value.

## Usage

**Stage function imports**

```tsx
import { ModularComponent, render } from '@modular-component/core'
import { defaultProps } from '@modular-component/with-default-props'

const MyComponent = ModularComponent<{ someFlag?: boolean }>()
  .with(
    defaultProps({
      someFlag: false,
      someNewProp: 'hello world',
    }),
  )
  .with(
    render(({ props }) => {
      // props is inferred as { someFlag: boolean; someNewProp: string } at this point
    }),
  )

const MyDynamicProps = ModularComponent<{
  role: 'user' | 'owner' | 'admin'
  canEdit?: boolean
  canDelete?: boolean
}>().with(
  defaultProps(({ props }) => ({
    canEdit: ['owner', 'admin'].includes(props.role),
    canDelete: ['owner'].includes(props.role),
  })).with(
    render(({ props }) => {
      // props is inferred as { role: 'user' | 'owner' | 'admin'; canEdit: boolean; canDelete: boolean }
      // canEdit defaults to true if the role is not "user", false otherwise
      // canDelete defaults to true if the role is "admin", false otherwise
      // canEdit and canDelete can still be controlled by explicitely setting the property
    }),
  ),
)
```

**Stage registration**

```tsx
import { ModularComponent } from '@modular-component/core'
import '@modular-component/core/register'
import '@modular-component/with-default-props/register'

const MyComponent = ModularComponent<{ someFlag?: boolean }>()
  .withDefaultProps({
    someFlag: false,
    someNewProp: 'hello world',
  })
  .withRender(({ props }) => {
    // props is inferred as { someFlag: boolean; someNewProp: string } at this point
  })

const MyDynamicProps = ModularComponent<{
  role: 'user' | 'owner' | 'admin'
  canEdit?: boolean
  canDelete?: boolean
}>().withDefaultProps(({ props }) =>
  ({
    canEdit: ['owner', 'admin'].includes(props.role),
    canDelete: ['owner'].includes(props.role),
  }.withRender(({ props }) => {
    // props is inferred as { role: 'user' | 'owner' | 'admin'; canEdit: boolean; canDelete: boolean }
    // canEdit defaults to true if the role is not "user", false otherwise
    // canDelete defaults to true if the role is "admin", false otherwise
    // canEdit and canDelete can still be controlled by explicitely setting the property
  })),
)
```

## Stage registration

You can either automatically register the stage on `withDefaultProps` by importing `@modular-component/with-default-props/register`,
or handle the registration manually thanks to the `defaultProps` function and `WithDefaultProps` type exports.

```ts
import { ModularComponent, ModularContext } from '@modular-component/core'
import {
  defaultProps,
  WithDefaultProps,
} from '@modular-component/with-default-props'

// Register the stage on the factory
ModularComponent.register({ defaultProps })

// Extend the type definition
declare module '@modular-component/stages' {
  export interface ModularComponentStages<Context extends ModularContext> {
    withDefaultProps: WithDefaultProps<Context>
  }
}
```

## Implementation

`defaultProps` runs a custom stage hook to shallowly merge the default props to the received component props.
Accepted values are restricted to a partial map of the original props to only accept correct types for defined props.
The value can also be a function of the current args.

```tsx
import {
  addTo,
  wrap,
  ModularContext,
  GetConstraintFor,
  GetValueGetterFor,
  StageParams,
  StageReturn,
} from '@modular-component/core/extend'

type NonNullableFields<Type> = {
  [key in keyof Type]-?: undefined extends Type[key] ? never : key
}[keyof Type]
type NullableFields<Type> = {
  [key in keyof Type]: undefined extends Type[key] ? key : never
}[keyof Type]
type OptionalNullable<Type> = {
  [key in NonNullableFields<Type>]: Type[key]
} & {
  [key in NullableFields<Type>]?: Type[key]
}

type Merge<Props, DefaultProps extends Partial<Props>> = OptionalNullable<{
  [key in keyof Props | keyof DefaultProps]-?: key extends keyof Props
    ? key extends keyof DefaultProps
      ? Props[key] extends undefined | infer U
        ? U
        : Props[key]
      : Props[key]
    : DefaultProps[key]
}> extends infer U
  ? { [key in keyof U]: U[key] }
  : never

type OnlyRequiredInConstraint<Original, Constraint> = {
  [key in keyof Constraint & keyof Original]: undefined extends Original[key]
    ? undefined extends Constraint[key]
      ? never
      : key
    : never
}[keyof Constraint & keyof Original]

type Constraint<Context extends ModularContext> = Partial<Context['props']> &
  Pick<
    GetConstraintFor<Context, 'props'>,
    OnlyRequiredInConstraint<
      Context['props'],
      GetConstraintFor<Context, 'props'>
    >
  > extends infer U
  ? { [key in keyof U]: U[key] }
  : never

export function defaultProps<
  Context extends ModularContext,
  Default extends Constraint<Context>,
>(useDefault: GetValueGetterFor<Context, 'props', Default>) {
  return addTo<Context>()
    .on('props')
    .use((args): Merge<Context['props'], Default> => {
      const defaultProps = wrap(useDefault)(args)
      return {
        ...defaultProps,
        ...(args as { props: Context['props'] }).props,
      }
    })
}

export type WithDefaultProps<
  Context extends ModularContext
> = <
  Default extends Constraint<Context>,
>(
  ...args: StageParams<typeof defaultProps<Context, Default>>
) => StageReturn<typeof defaultProps<Context, Default>>
```
