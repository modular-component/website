---
sidebar_position: 1
---

# The extension system

`ModularComponent` aims to be a toolkit, and as such, it needs to be as agnostic as possible
of the application context. For this reason, the core factory only implements a single stage: `withRender`,
which is in fact a simple, traditional React function component.

Capabilities can then be added on a per-application basis, to construct a pipeline that
makes sense for a specific application context: adding a stage for connecting to a global
store, or for handling internationalization...

Such capabilities are added through **extensions**. Extensions are configuration objects
detailing a new stage method to add to the pipeline.

## Understanding stages

Each stage of a pipeline receives exactly one argument, that can be of any form.

The received value is passed to an optional transform function specific to each stage, 
and the resulting value from this call is added to the arguments map.

When executed, each stage modifies exactly one argument in the shared arguments map.

## Extension conventions

Extensions are written as a map of method name to method configuration. They can register one or multiple
new stage at a time, depending on the needs covered by the extension.

By convention, an extension name starts with `With`, capitalized. If it contains a single stage definition,
then it should be named after the function it creates. If it contains multiple stage definitions, then it
should be named after the common goal set by the stages.

## Setting a name and a target argument

At its simplest, a stage function definition should contain:

- A unique symbol used to identify the stage type
- The base name of the stage to add to the factory (`Lifecycle`, `DefaultProps`...), which will be suffixed to the stage methods (`withLifecycle`, `addLifecycle`...)
- The name of the argument modified by the stage (`lifecycle`, `props`...)

Extensions are written as a map of stage name to method configuration. For instance, the `withLifecycle`
definition looks something like this:

```tsx
const withLifecycle = Symbol()

export const WithLifecycle = {
  Lifecycle: {
    symbol: withLifecycle,
    field: 'lifecycle',
  },
} as const
```

You can add as many stage methods as you want. Different stage methods can also impact
the same field if needed, for some advanced cases.

## Type-safe definition: the `createMethodRecord` helper

To ensure the configuration you produce is valid, you can wrap it in `createMethodRecord` exported
by `@modular-component/core`:

```tsx
import { createMethodRecord } from '@modular-component/core'

const withLifecycle = Symbol()

export const WithLifecycle = createMethodRecord({
  Lifecycle: {
    symbol: withLifecycle,
    field: 'lifecycle',
  },
} as const)
```

Notice the `as const` statement, making sure TypeScript narrows all
types as much as possible. It is of paramount importance to always add this statement
to ensure type inference works correctly. Otherwise, the `field` parameter
could be inferred as `string`, polluting the complete arguments map, and
the `symbol` field would be inferred as a generic `symbol`, rather than
the unique symbol type.

If you provide a misconfigured method, the `createMethodRecord` function
will reject the argument, letting you know right away.

## Transforming the argument before committing it to the map

At its simplest, a stage will simply append the provided value as-is to the argument
map, but it might not be sufficient for all cases.

For instance, our `Lifecycle` stage takes a hook as value, but should append _the result of this hook_
to the arguments map.

For this purpose, a stage can also receive a `transform` configuration parameter, detailing
how to generate the final value that will be added to the arguments map.

The `transform` function receives two parameters: the current arguments map received from
previous stages, and the value passed down to the stage by the user. It then returns the
transformed value to add to the arguments map:

```tsx
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

In addition to the stage value, the transform function also receives the arguments map computed
by upstream stages. In this case, the arguments map is passed as parameter to the lifecycle hook,
allowing it to react to props and other upstream stages.

Note how we also renamed the parameter to `useLifecycle`: as this can contain hook calls, we
need to name it accordingly to not break the rule of hooks here.

## Telling TypeScript about a value transformation

Most of the time, the transformation that we apply on a value changes its type
from the one passed as parameter. Unfortunately, as of TypeScript 4.8, there isn't
a way still to use "generic generic types". It is therefore not possible, as far as we can tell,
to retrieve the type of the `transform` configuration and use it to infer the final type
of the argument.

The workaround implemented for now is an exposed interface, `ModularStages`, that
takes generic parameters and contains typing information for our stages. An extension package
can overload this interface to add the correct information for the provided stage.

In order to avoid clashes between multiple extensions providing a similar
stage function name, the typing map uses _symbols_ as its key to ensure
uniqueness. The symbol must be passed to the corresponding stage function definition.

In the case of our lifecycle stage, we saw that we created a `withLifecycle` symbol
and passed it to the stage configuration. We can use it to correctly type the transform,
which should extract the return type of the provided hook:

```tsx
// 👇 1. We create our unique symbol
const withLifecycle = Symbol()

export const WithLifecycle = createMethodRecord({
  Lifecycle: {
    symbol: withLifecycle, // 👈 2. We assign our symbol to our configuration
    field: 'lifecycle',
    transform: (args, useLifecycle) => {
      return useLifecycle(args)
    },
  },
} as const)

// 👇 3. We extend the ModularStages interface to add our typings
declare module '@modular-component/core' {
  // The current arguments are passed as generic parameter...
  //                              👇
  export interface ModularStages<Args, Value> {
    // ... along with the original value 👆

    [withLifecycle]: {
      // 👆 4. We use our symbol as index for our entry
      transform: Value extends (args: Args) => unknown
        ? ReturnType<Value> // 👈 5. We apply our type transformation,
                            // constraining the original value as needed
        : never
    }
  }
}
```

With this, TypeScript will correctly infer the type of our lifecycle argument as the return
type of the provided hook!

## Restricting the type of the passed value

Specifically for TypeScript users, stage method type definition allows defining a type
that the passed value should match to be considered valid. This information will be
surfaced to the user, marking the stage call as incorrect if the value type do not match
the expected restriction.

Continuing with our lifecycle hook, we want to restrict the value to a function receiving
the arguments map as parameter.

This is done through the `restrict` property:

```tsx
declare module '@modular-component/core' {
  export interface ModularStages<Args, Value> {
    [withLifecycle]: {
      // Restrict the accepted value as a function of current
      // arguments map  👇
      restrict: (args: Args) => unknown
      //                           👆 
      // We don't want to restrict the form of the
      // returned value
      transform: Value extends (args: Args) => unknown
              ? ReturnType<Value>
              : never
    }
  }
}
```

:::note `restrict: undefined`
Whenever `restrict: undefined` is used on a stage method, the type
definition will allow users to omit the argument completely. Useful for
stages that return a constant value or only execute side-effects!
:::

## Learn more

You can read the documentation for each [official extension](./official/official.md) to learn more
about writing extensions.
