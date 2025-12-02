---
sidebar_position: 3
title: Writing Custom Stages
---

## Stage function shape

A stage function is a function that can be passed to the `.with()` method
of a `ModularComponent`.

It needs the following signature:

```tsx
(ctx?: Context): {
  field: Field,
  use: (args: GetArgsFor<Context, Field>) => Type
}
```

The optional `ctx` parameter is there so that TypeScript
can infer its value from the `ModularComponent` to which
the function is passed. This is the key to being able to 
infer the arguments received by the `use` function, and 
therefore its own return type.

It is marked optional because _the factory will never actually set that
parameter_, it's only there to pass down the arguments type information.

The returned object describes how the stage will modify the arguments map:
`field` is the property that will be added or modified on the arguments map,
while `use` is a function that takes the current arguments map up to that stage,
and returns the value to store in `field`.

## The `addTo` helper

The `@modular-component/core/extend` subpath exports a `addTo` function aimed
at helping build stage functions.

It works as a chain of three functions: `addTo` returns an `on` function to specify the field (and infer its type from the provided value),
which in turns returns a `use` function to set the arguments transformer, pre-configured to receive the correct arguments
for the field, and infers its return type.

The `addTo` function takes the current context as a generic TypeScript type parameter.

```ts
const stage = addTo<Context>()
    .on('field')
    .use((args) => /* compute field value from args */)
```

## Creating a stage function provider

In order to automatically infer the `Context` type and allow providing custom arguments usable inside the `use` transformer function,
we will wrap our `stage` definition inside a provider function.

```ts
import { ModularContext, addTo } from '@modular-component/core/extend'

function stage<Context extends ModularContext>(...params: any[]) {
  return addTo<Context>()
    .on('field')
    .use((args) => /* compute field value from args and params */)
}
```

### Providing parameters

You are free to provide as many parameters as required for your stage to make sense. For instance, a localization stage
can receive a key prefix to use in a translation hook, providing a locale getter scoped to that prefix.

We can leverage our provider function to infer and narrow the type of parameters through generic type parameters:

```ts
import { ModularContext, addTo } from '@modular-component/core/extend'
import { AvailablePrefixes, GetterFromPrefix, useTranslation } from './locale-system'

function locale<
  Context extends ModularContext,
  KeyPrefix extends AvailablePrefixes
>(keyPrefix: KeyPrefix) {
  return addTo<Context>()
    .on('locale')
    .use((args): GetterFromPrefix<KeyPrefix> => useTranslation(keyPrefix)) 
}
```

### Making the field dynamic

Since the field is provided inside our provider function, it also becomes possible to infer it from a parameter. This
allows creating dynamic stage providers that let the consumer choose the field to populate:

```ts
import { ModularContext, addTo } from '@modular-component/core/extend'

function stage<
  Context extends ModularContext,
  Field extends string,
  Value
>(field: Field, value: Value) {
  return addTo<Context>()
    .on(field)
    .use(() => value) 
}
```

### Exposing arguments to the consumer

It can be useful to let the consumer access the arguments provided by upstream stages to compute their own value.
This is the case for the [render stage](./writing-components.md#render-stage) or the [lifecycle extension](../extensions/official/with-lifecycle.md)
for instance.

The arguments are provided by the `use` function, but can be inferred from the `Context` directly in a parameter thanks to 
helper types exported by `@modular-component/core/extend`: `GetArgsFor` and `GetValueGetterFor`.

#### `GetArgsFor`

The first way to expose arguments is to use the `GetArgsFor` helper type. This type is a generic type depending on `Context` and `Field`.
It returns the arguments available for that `Field`, keeping track of it internally to provide the correct typing even when the
field is overridden later by calling the same stage function again (see [Reusing components](./reusing-components.md)).

You can use it to create a parameter taking a function computing a value from those args, and then call that function in 
the `use` transformer of your stage:

```ts
import { ModularContext, GetArgsFor, addTo } from '@modular-component/core/extend'

function stage<
  Context extends ModularContext,
  Field extends string,
  Value
>(field: Field, useComputeValue: (args: GetArgsFor<Context, Field>) => Value) {
  return addTo<Context>()
    .on(field)
    .use((args) => useComputeValue(args)) 
}
```

#### `GetValueGetterFor` and `wrap` (recommended)

Rather than forcing your users to provide a function each time, you can opt in for letting them choose between a function
or a direct value through the `GetValueGetterFor`. This type takes the `Context` and `Field` and a third `Type` parameter (which can be generic too!)
and creates a type accepting either a raw value of type `Type`, or a function of type `(args: GetArgsFor<Context, Field>) => Type`.

In order to safely use that value with the provided `args` object, you can use the `wrap` helper provided by `@modular-component/core/extend` to
wrap a raw value inside a function:

```ts
import { ModularContext, GetValueGetterFor, addTo, wrap } from '@modular-component/core/extend'

function stage<
  Context extends ModularContext,
  Field extends string,
  Value
>(field: Field, useComputeValue: GetValueGetterFor<Context, Field, Value>) {
  return addTo<Context>()
    .on(field)
    .use((args) => wrap(useComputeValue)(args)) 
}
```

### Constraining the return type

Since fields can be overridden by providing the same stage function later down the chain (see [Reusing components](./reusing-components.md)),
you will want to restrict the type of your return values to match what was previously provided. You can do that through the `GetConstraintFor`
type provided by `@modular-component/core/extend`.

The `GetConstraintFor` type accepts three generic values: `Context`, `Field`, and an optional `Default` value to restrict
the value provided the very first time.

For instance, our [`lifecycle`](../extensions/official/with-lifecycle.md) extension makes sure the value returned
from a lifecycle stage starts as an object, and if overridden, respects the contract set up by previous calls:

```tsx
export function lifecycle<
  Context extends ModularContext,
  Type extends GetConstraintFor<Context, 'lifecycle', {}>,
>(useLifecycle: GetValueGetterFor<Context, 'lifecycle', Type>) {
  return addTo<Context>().on('lifecycle').use(wrap(useLifecycle))
}
```

You can also use `GetConstraintFor` in more complex types, such as this version of our `locale` stage from earlier
which makes sure any further calls are limited to key prefixes containing the same sub-values as the previously provided one:

```tsx
import { ModularContext, addTo } from '@modular-component/core/extend'
import { AvailablePrefixes, GetterFromPrefix, useTranslation } from './locale-system'

type KeyPrefixConstraint<Context extends ModularContext> = {
  [prefix in AvailablePrefixes]: GetterFromPrefix<prefix> extends GetConstraintFor<Context, 'locale'>
    ? prefix : never
}[AvailablePrefixes]

export function locale<
  Context extends ModularContext,
  KeyPrefix extends KeyPrefixConstraint<Context>,
>(keyPrefix: KeyPrefix) {
  return addTo<Context>()
    .on('locale')
    .use(
      (): GetterFromPrefix<KeyPrefix> =>
        useTranslation(keyPrefix),
    )
}
```

## Providing a type for registering the stage

Since a stage provider function can either be used with the `.with()` method, or [registered](#registering-the-stage) as its own `with<Stage>` method,
you will want to provide type information for the registration.

This can be easily achieved through two helpers types provided by `@modular-component/core/extend`: `StageParams` and `StageReturn`.

Since our stages often take generic parameters, it is not possible to have a single helper type that infers the complete registration
type from your function. You will still need to manually create a type where your generics are provided:


```tsx
import { ModularContext, GetValueGetterFor, StageParams, StageReturn, addTo, wrap } from '@modular-component/core/extend'
import { AvailablePrefixes, GetterFromPrefix, useTranslation } from './locale-system'

type KeyPrefixConstraint<Context extends ModularContext> = {
  [prefix in AvailablePrefixes]: GetterFromPrefix<prefix> extends GetConstraintFor<Context, 'locale'>
    ? prefix : never
}[AvailablePrefixes]

export function locale<
  Context extends ModularContext,
  KeyPrefix extends KeyPrefixConstraint<Context>,
>(keyPrefix: KeyPrefix) {
  return addTo<Context>()
    .on('locale')
    .use(
      (): GetterFromPrefix<KeyPrefix> =>
        useTranslation(keyPrefix),
    )
}

// highlight-next-line
export type WithLocale<
  // highlight-next-line
  Context extends ModularContext
  // highlight-next-line
> = <
  // highlight-next-line
  KeyPrefix extends KeyPrefixConstraint<Context>,
  // highlight-next-line
>(
  // highlight-next-line
  ...args: StageParams<typeof locale<Context, KeyPrefix>>
  // highlight-next-line
) => StageReturn<typeof locale<Context, KeyPrefix>>

export function stage<
  Context extends ModularContext,
  Field extends string,
  Value
>(field: Field, useComputeValue: GetValueGetterFor<Context, Field, Type>) {
  return addTo<Context>()
    .on(field)
    .use((args) => wrap(useComputeValue)(args)) 
}

// highlight-next-line
export type WithStage<
  // highlight-next-line
  Context extends ModularContext
  // highlight-next-line
> = <
  // highlight-next-line
  Field extends string,
  // highlight-next-line
  Value
  // highlight-next-line
>(
  // highlight-next-line
  ...args: StageParams<typeof stage<Context, Field, Value>>
  // highlight-next-line
) => StageReturn<typeof stage<Context, Field, Value>>
```

You can see the parallels between the function and the type definition: we find the same generic types, except for `Context`
which is provided through the type directly. All other generics must be defined as generics of the returned function to 
be inferred through the given parameters.

## Registering the stage

You can register your custom stages to make them readily available on `ModularComponents` without needing
to import them. Registering a stage `stage` will add a new `.withStage` method to your `ModularComponents`.

Registering the stage is a two-steps process.

### Registering the runtime implementation

You can register stages by calling the `ModularComponent.register()` function. Calling `register()` multiple times do not replace the registered stages, instead it merges them.

```tsx
import { ModularComponent } from '@modular-component/core'
import { locale, stage } from './custom-stages'

ModularComponent.register({ locale, stage })
```

:::tip
Make sure to import the module where your register runtime implementations _before_ any module using `ModularComponent`,
so that the stages are actually made available.

You can optionally _re-export `ModularComponent`_ from a module doing the registration, and always use this import
in your app.
:::

### Registering the typing information

You can use the [types](#providing-a-type-for-registering-the-stage) created above to register
your stages typing information so that the TypeScript compiler becomes aware of them.

Simply redeclare `@modular-component/stages` to extend the `ModularComponentStages` interface
with your stages:

```tsx
import type { WithLocale, WithStage } from './custom-stages'

declare module '@modular-component/stages' {
  export interface ModularComponentStages<Context extends ModularContext> {
    withLocale: WithLocale<Context>
    withStage: WithStage<Context>
  }
}
```

:::tip
In a TypeScript project, the `ModularComponent.register()` function will throw an error
if you pass a stage that was not added to the `ModularComponentStages` interface.
:::