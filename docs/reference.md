---
sidebar_position: 5
title: Reference
---

Here is the complete type reference of every export from `@modular-component/core` and `@modular-component/core/extend`.

## `@modular-component/core`

### Type: `ModularComponent<Context>`

:::ref
The `ModularComponent<Context>` type is the type returned by calling the [`ModularComponent`](#function-modularcomponent) factory function,
or any of its factory methods. It takes a single generic type parameter, `Context`, of type [`ModularContext`](#type-modularcontext), describing
the combined state of all stages that have been assigned to it.

#### When to use it

You should almost never need to use it manually. It is used internally as the return type of [`ModularComponent`](#function-modularcomponent).

#### Parameters

 - `Context`: [`ModularContext`](#type-modularcontext) - description of all stages added to the Modular Component, including props,
   arguments, constraints...

<details>
<summary>Reveal type</summary>

```tsx
import { FunctionComponent, ForwardRefRenderFunction, PropsWithChildren} from 'react'
import {
  ModularComponentStages,
  ModularContext,
} from '@modular-component/stages'

type FunctionComponentOrRefRenderFunction<Props, Ref> = [Ref] extends [never]
  ? FunctionComponent<PropsWithChildren<Props>>
  : ForwardRefRenderFunction<Ref, Props>

type MapToForce<Stages> = {
  [key in keyof Stages as key extends `with${infer K}`
    ? `force${K}`
    : never]: Stages[key]
}

type MapToStage<Stages> = Pick<
  Stages,
  {
    [key in keyof Stages]: key extends `with${string}` ? key : never
  }[keyof Stages]
>

type MapToRaw<Stages> = {
  [key in keyof Stages as key extends `with${infer K}`
    ? Lowercase<K>
    : never]: Stages[key]
}

type Force<Context extends ModularContext> = Omit<Context, 'constraints'> & {
  constraints: {}
  _constraints: Context['constraints']
}

export type ModularComponent<Context extends ModularContext> =
  FunctionComponentOrRefRenderFunction<Context['props'], Context['ref']> &
    MapToStage<ModularComponentStages<Context>> &
    MapToForce<ModularComponentStages<Force<Context>>> & {
      with<Field extends string, Type extends GetConstraintFor<Context, Field>>(
        stage: (context?: Context) => {
          field: Field
          provide: (args: GetArgsFor<Context, Field>) => Type
        },
      ): ModularComponent<AppendStage<Context, Field, Type>>
      force<Field extends string, Type>(
        stage: (context?: Force<Context>) => {
          field: Field
          provide: (args: GetArgsFor<Context, Field>) => Type
        },
      ): ModularComponent<AppendStage<Context, Field, Type>>

      use<Field extends keyof Context['arguments']>(
        key: Field,
      ): {} extends Context['arguments']['props']
        ? () => Context['arguments'][Field]
        : (
            props: PropsWithChildren<Context['arguments']['props']>,
          ) => Context['arguments'][Field]
      use(): {} extends Context['props']
        ? () => Context['arguments']
        : (props: PropsWithChildren<Context['props']>) => Context['arguments']
      stage<Field extends keyof Context['arguments'] & string>(
        key: Field,
      ): (
        args: Partial<GetArgsFor<Context, Field>>,
      ) => Context['arguments'][Field]
      withDisplayName(displayName: string): ModularComponent<Context>
    }
```
</details>
:::

### Type: `ModularContext`

:::ref
The `ModularContext` type is the base type that all `ModularComponent`'s contexts will extend. 

#### When to use it

In almost all cases, you should not care about what this type looks like, it is simply passed around by stage 
functions to compute the next context after running the stage.

Instead, you should rely on the provided type helpers for extracting useful information from the context:
- [`GetArgsFor`](#type-getargsforcontext-field)
- [`GetConstraintFor`](#type-getconstraintforcontext-field-default)
- [`GetValueGetterFor`](#type-getvaluegetterforcontext-field-type)
- [`StageParams`](#type-stageparamsfn)
- [`StageReturn`](#type-stagereturnfn)

<details>
<summary>Reveal type</summary>

```tsx
export type ModularContext = {
  arguments: Record<string, any>
  constraints: Record<string, any>
  _constraints?: Record<string, any>
  stages: Record<string, string>
  props: any
  ref: any
}
```
</details>
:::

### Type: `WithRender<Context>`

:::ref
Typing information for [registering](./usage/writing-custom-stages.md#registering-the-stage) the [`render`](#function-render) stage.

#### When to use it

You can use `WithRender<Context>` if you want to [manually register](./usage/writing-custom-stages.md#registering-the-stage)
the [`render`](#function-render) stage in your app.

#### Parameters

- `Context`: [`ModularContext`](#type-modularcontext) - current context of the ModularComponent `render` is called on. Provided either by
  `ModularComponent::with`, or through `ModularComponentStages` type augmentation.

<details>
<summary>Reveal type</summary>

```tsx
import { FunctionComponent } from 'react'
import { ModularContext, GetValueGetterFor, GetArgsFor, StageParams, StageReturn } from '@modular-component/core/extend'

function render<Context extends ModularContext>(
  useRender: GetValueGetterFor<Context, 'render', ReturnType<FunctionComponent>>
): (_?: Context) => {
  field: 'render'
  provide: (args: GetArgsFor<Context, 'render'>) => ReturnType<FunctionComponent>
}

export type WithRender<Context extends ModularContext> = (
  ...args: StageParams<typeof render<Context>>
) => StageReturn<typeof render<Context>>
```
</details>
:::

### Function: `ModularComponent`

:::ref
The `ModularComponent` function creates a new `ModularComponent`, which can then be extended by
chaining stage methods.

#### When to use it

Use `ModularComponent` to create a new `ModularComponent`.

#### Function parameters

- `displayName?: string`: Optional `displayName` parameter for setting the React debugging display name.

#### Type parameters

- `Props`: Optional, sets the props accepted by the component, 
- `Ref`: Optional, sets the type of the forwarded ref. In cases where `Ref` is set,
  it's your responsibility to wrap the `ModularComponent` call inside `React.forwardRef`.

<details>
<summary>Reveal type</summary>

```tsx
import { FunctionComponent } from 'react'

export function ModularComponent<Props extends {} = {}, Ref = never>(
  displayName?: string,
): ModularComponent<{
  props: Props
  ref: Ref
  stages: {}
  arguments: {
    props: Props
    ref: Ref
    render: ReturnType<FunctionComponent>
  }
  constraints: {
    props: Props
    ref: Ref
    render: ReturnType<FunctionComponent>
  }
}>
```
</details>
:::

### Function: `render`

:::ref
Stage function providing the default `render` stage, accepting as single argument a function
receiving the consolidated stages arguments and returning a `ReactNode`.

#### When to use it

Use it in the `ModularComponent::with` method to add a render stage; or use it with `ModularComponent.register`
to register the `ModularComponent::withRender` stage function for usage across your app.

#### Function parameters

- `useRender: GetValueGetterFor<Context, 'render', ReturnType<FunctionComponent>>`: either a React node, or a function
  returning a React node. If a function is provided, it receives as only parameter the arguments map consolidated from
  all upstream stages.

#### Type parameters

-  `Context`: [`ModularContext`](#type-modularcontext) - current context of the ModularComponent `render` is called on.
   Inferred from either `ModularComponent::with` or `ModularComponent::withRender`

<details>
<summary>Reveal type</summary>

```tsx
import { FunctionComponent } from 'react'
import { GetValueGetterFor, GetArgsFor } from '@modular-component/core/extend'

export function render<Context extends ModularContext>(
  useRender: GetValueGetterFor<Context, 'render', ReturnType<FunctionComponent>>
): (_?: Context) => {
  field: 'render'
  provide: (args: GetArgsFor<Context, 'render'>) => ReturnType<FunctionComponent>
}
```
</details>
:::

## `@modular-component/core/extend`

### Type: `AppendStage<Context, Field, Type>`

:::ref
This type is mostly used internally in [`StageReturn`](#type-stagereturnfn). It takes a `ModularContext`
and appends a stage at the given `Field` with the given `Type`, returning a new context.

#### When to use it

Use this type when you need to create a new `ModularContext` from a previous one.
Mostly use internally by [`StageReturn`](#type-stagereturnfn), you should only need it for very advanced use-cases.

#### Parameters

- `Context`: [`ModularContext`](#type-modularcontext) - current context to modify
- `Field: string`: string constant type setting the field on which the new type is added to the arguments map.
- `Type: any`: type to use for the injected field, as well as use as constraint for future overrides of that field.

<details>
<summary>Reveal type</summary>

```tsx
type AppendArguments<Arguments, Field extends string, Type> = {
  [key in Exclude<keyof Arguments, Field>]: Arguments[key]
} & {
  [key in Field]: Type
}

type AppendConstraints<Constraints, Backup, Field extends string, Type> = {
  [key in Exclude<keyof Constraints, Field>]: Constraints[key]
} & {
  [key in Exclude<keyof Backup, Field>]: Backup[key]
} & {
  [key in Field]: Type
}

type AppendStages<Stages, Arguments, Field extends string, Type> = {
  [key in Exclude<keyof Stages, Field>]: Stages[key]
} & {
  [key in Field]: key extends keyof Stages ? Stages[key] : keyof Arguments
}

export type AppendStage<
  Context extends ModularContext,
  Field extends string,
  Type,
> = Pick<Context, 'props'|'ref'> & {
  arguments: AppendArguments<Context['arguments'], Field, Type>
  constraints: AppendConstraints<Context['constraints'], Context['_constraints'], Field, Type>
  stages: AppendStages<Context['stages'], Context['arguments'], Field, Type>
}
```
</details>
:::

### Type: `GetArgsFor<Context, Field>`

:::ref
Extract the arguments available for computing a given field, based on the provided context.
We either map the arguments against what was saved in `Context['stages'][Field]`, or, if it's the
first time we see this field, we provide the full latest `Context['arguments']`.

#### When to use it

Use that type when you're building a stage function that needs to infer the arguments available in the
`provide` call for a given field.

#### Parameters

- `Context`: [`ModularContext`](#type-modularcontext) - current context to read from
- `Field: string`: string constant type setting the field for which we want to retrieve arguments

<details>
<summary>Reveal type</summary>

```tsx
export type GetArgsFor<
  Context extends ModularContext,
  Field extends string,
> = Field extends keyof Context['stages']
  ? Pick<Context['arguments'], Context['stages'][Field]>
  : Context['arguments']
```
</details>
:::

### Type: `GetConstraintFor<Context, Field, Default>`

:::ref
Extract the constraints to apply for a given field, to ensure further overrides don't break
the initial contract.

If the field was not specified in the `constraints`, then we apply the `Default` value as constraint.

#### When to use it

Use that type when you're building a stage function, in order to correctly infer the return type of the `provide`
call for the field, while respecting any constraint set for that field in an earlier stage call.

#### Parameters

- `Context`: [`ModularContext`](#type-modularcontext) - current context to read from
- `Field: string`: string constant type setting the field for which we want to retrieve the constraint

<details>
<summary>Reveal type</summary>

```tsx
export type GetConstraintFor<
  Context extends ModularContext,
  Field extends string,
  Default = any,
> = Field extends keyof Context['constraints']
    ? Context['constraints'][Field]
    : Default
```
</details>
:::

### Type: `GetValueGetterFor<Context, Field, Type>`

:::ref
Creates a type encapsulating the provided `Type`, either as a raw value or as a function of the `Field`'s arguments.

#### When to use it

Use that type when you're building a stage function, and want to type one of your parameters to allow users to provide
either a raw value or a value getter computing the value from the arguments map,
which is our [recommended pattern](./usage/writing-custom-stages.md#getvaluegetterfor-and-wrap-recommended).

#### Parameters

- `Context`: [`ModularContext`](#type-modularcontext) - current context to read from
- `Field: string`: string constant type setting the field for which we want to retrieve the arguments
- `Type: any`: type of the accepted raw value or accepted return value for the value getter

<details>
<summary>Reveal type</summary>

```tsx
export type GetValueGetterFor<
  Context extends ModularContext,
  Field extends string,
  Type,
> = Type | ((args: GetArgsFor<Context, Field>) => Type)
```
</details>
:::

### Type: `ModularContext`

:::ref
See [`ModularContext`](#type-modularcontext)
:::

### Type: `StageParams<Fn>`

:::ref
This type takes a stage provider function and extracts its parameters.

#### When to use it

Use it to build your [registration type information](./usage/writing-custom-stages.md#providing-a-type-for-registering-the-stage).
It will automatically infer the parameters taken by your stage function provider.

<details>
<summary>Reveal type</summary>

```tsx
export type StageParams<Fn extends (...args: any[]) => any> = Parameters<Fn>
```
</details>
:::

### Type: `StageReturn<Fn>`

:::ref
This type takes a stage provider function and computes the return value of the registered stage
function: a `ModularComponent` modified by the stage function with a new field.

#### When to use it

Use it to build your [registration type information](./usage/writing-custom-stages.md#providing-a-type-for-registering-the-stage).
It will automatically infer the return type of the created `ModularComponent::with{Stage}` function.

<details>
<summary>Reveal type</summary>

```tsx
export type StageReturn<
  Fn extends (
    ...args: any[]
  ) => (ctx?: any) => { field: string; provide: (args: any) => any },
> = ModularComponent<
  AppendStage<
    NonNullable<Parameters<ReturnType<Fn>>[0]>,
    ReturnType<ReturnType<Fn>>['field'],
    ReturnType<ReturnType<ReturnType<Fn>>['provide']>
  >
>
```
</details>
:::

### Function: `addTo`

:::ref
Function used to easily build a stage function. See [Writing custom stages: addTo helper](./usage/writing-custom-stages.md#the-addto-helper) for more
details.

#### When to use it

Use it to build your stage functions.

#### Type parameters

- `Context`: [`ModularContext`](#type-modularcontext) - context of the ModularComponent the stage function will be
  called on. Should be inferred from your stage function provider.

<details>
<summary>Reveal type</summary>

```tsx
export function addTo<Context extends ModularContext>(): {
  on<Field extends string>(field: Field): {
    provide<Stage extends (args: GetArgsFor<Context, Field>) => any>(stage: Stage): (_?: Context) => {
      field: Field;
      provide: Stage
    }
  }
}
```
</details>
:::

### Function: `wrap`

:::ref
Function used to easily build a stage function. See [Writing custom stages: wrap helper](./usage/writing-custom-stages.md#getvaluegetterfor-and-wrap-recommended) for more
details.

#### When to use it

Use `wrap` when your stage function provider receives a parameter of type [`GetValueGetterFor`](#type-getvaluegetterforcontext-field-type),
to safely convert it into a value getter function every time so you can call it with the received args. It
takes care of checking if the received value is already a function, or if it is a raw value needing to be wrapped.

#### Function parameters

- `useFn: Type | ((args: Args) => Type)`: the variable holding either a raw value or a value getter, to be wrapped.

#### Type parameters

- Args: arguments of the value getter. Inferred automatically from the passed value if it's a function.
- Type: type of the value or return type of the value getter. Inferred automatically from the passed value.

<details>
<summary>Reveal type</summary>

```tsx
export function wrap<Args, Type>(useFn: Type | ((args: Args) => Type)): (args: Args) => Type
```
</details>
:::