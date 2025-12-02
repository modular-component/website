---
sidebar_position: 3
title: Reference
---

Here is the complete type reference of every export from `@modular-component/core` and `@modular-component/core/extends`.

## `@modular-component/core`

### Type: `ModularComponent<Context>`

:::ref
<details>
<summary>Reveal type</summary>

```tsx
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
          use: (args: GetArgsFor<Context, Field>) => Type
        },
      ): ModularComponent<AppendStage<Context, Field, Type>>
      force<Field extends string, Type>(
        stage: (context?: Force<Context>) => {
          field: Field
          use: (args: GetArgsFor<Context, Field>) => Type
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

The `ModularComponent<Context>` type is the type returned by calling the [`ModularComponent`](#function-modularcomponent) factory function,
or any of its factory method. It takes a single generic type parameter, `Context`, of type [`ModularContext`](#type-modularcontext), describing
the combined state of all stages that have been assigned to it.
:::

### Type: `ModularContext`

:::ref
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

The `ModularContext` type is the base type that all `ModularComponent`'s contexts will extend. In almost all cases,
you should not care about what this type looks like, it is simply passed around by stage functions to compute the
next context after running the stage.

Instead, you should rely on the provided type helpers for extracting useful information from the context:
- [`GetArgsFor`](#type-getargsforcontext-field)
- [`GetConstraintsFor`](#type-getconstraintforcontext-field-default)
- [`GetValueGetterFor`](#type-getvaluegetterforcontext-field-type)
- [`StageParams`](#type-stageparamsfn)
- [`StageReturn`](#type-stagereturnfn)
:::

### Type: `WithRender<Context>`

:::ref
<details>
<summary>Reveal type</summary>

```tsx
import { ModularContext, StageParams, StageReturn } from '@modular-component/core/extend'

export type WithRender<Context extends ModularContext> = (
  ...args: StageParams<typeof render<Context>>
) => StageReturn<typeof render<Context>>
```
</details>

Typing information for [registering](./usage/writing-custom-stages.md#registering-the-stage) the [`render`](#function-render) stage.
:::

### Function: `ModularComponent`

:::ref
<details>
<summary>Reveal type</summary>

```tsx
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

The `ModularComponent` function creates a new `ModularComponent`, which can then be extended by
chaining stage methods.

It takes an optional `displayName` as parameter for setting the React debugging display name,
and takes two optional generic type parameters: `Props` for setting the props accepted by the
component, and `Ref` for setting the type of the forwarded ref. In cases where `Ref` is set,
it's your responsibility to wrap the `ModularComponent` call inside `React.forwardRef`.
:::

### Function: `render`

:::ref
<details>
<summary>Reveal type</summary>

```tsx
import { GetValueGetterFor } from '@modular-component/core/extend'

export function render<Context extends ModularContext>(
  useRender: GetValueGetterFor<Context, 'render', ReturnType<React.FunctionComponent>>
): <Context>(_?: Context) => {
  field: 'render'
  use: (args: GetArgsFor<Context, 'render'>) => ReturnType<React.FunctionComponent>
}
```
</details>

Stage function providing the default `render` stage, accepting a single argument as a function
receiving the consolidated stages arguments and returning a `ReactNode`.
:::

## `@modular-component/core/extend`

### Type: `AppendStage<Context, Field, Type>`

:::ref
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

This type is mostly used internally in [`StageReturn`](#type-stagereturnfn). It takes a `ModularContext`
and appends a stage at the given `Field` with the given `Type`, returning a new context.
:::

### Type: `GetArgsFor<Context, Field>`

:::ref
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

Extract the arguments available for computing a given field, based on the provided context.
We either map the arguments against what was saved in `Context['stages'][Field]`, or, if it's the
first time we see this field, we provide the full latest `Context['arguments']`.
:::

### Type: `GetConstraintFor<Context, Field, Default>`

:::ref
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

Extract the constraints to apply for a given field, to ensure further overrides don't break
the initial contract.

If the field was not specified in the `constraints`, then we apply the `Default` value as constraint.
:::

### Type: `GetValueGetterFor<Context, Field, Type>`

:::ref
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

Creates a type encapsulating the provided `Type`, either as a raw value or as a function of the `Field`'s arguments.
:::

### Type: `ModularContext`

:::ref
See [`ModularContext`](#type-modularcontext)
:::

### Type: `StageParams<Fn>`

:::ref
<details>
<summary>Reveal type</summary>

```tsx
export type StageParams<Fn extends (...args: any[]) => any> = Parameters<Fn>
```
</details>

This type takes a stage provider function and extracts its parameters.

Use it to build your [registration type information](./usage/writing-custom-stages.md#providing-a-type-for-registering-the-stage).
:::

### Type: `StageReturn<Fn>`

:::ref
<details>
<summary>Reveal type</summary>

```tsx
export type StageReturn<
  Fn extends (
    ...args: any[]
  ) => (ctx?: any) => { field: string; use: (args: any) => any },
> = ModularComponent<
  AppendStage<
    NonNullable<Parameters<ReturnType<Fn>>[0]>,
    ReturnType<ReturnType<Fn>>['field'],
    ReturnType<ReturnType<ReturnType<Fn>>['use']>
  >
>
```
</details>

This type takes a stage provider function and computes the return value of the registered stage
function: a `ModularComponent` modified by the stage function with a new field.

Use it to build your [registration type information](./usage/writing-custom-stages.md#providing-a-type-for-registering-the-stage).
:::

### Function: `addTo`

:::ref
<details>
<summary>Reveal type</summary>

```tsx
export function addTo<Context extends ModularContext>(): {
  on<Field extends string>(field: Field): {
    use<Stage extends (args: GetArgsFor<Context, Field>) => any>(stage: Stage): (_?: Context) => {
      field: Field;
      use: Stage
    }
  }
}
```
</details>

Function used to easily build a stage function. See [Writing custom stages: addTo helper](./usage/writing-custom-stages.md#the-addto-helper) for more
details.
:::

### Function: `wrap`

:::ref
<details>
<summary>Reveal type</summary>

```tsx
export function wrap<Args, Type>(useFn: Type | ((args: Args) => Type)): (args: Args) => Type
```
</details>

Function used to easily build a stage function. See [Writing custom stages: wrap helper](./usage/writing-custom-stages.md#getvaluegetterfor-and-wrap-recommended) for more
details.
:::