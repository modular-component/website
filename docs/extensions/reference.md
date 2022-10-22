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

> **Understanding stages**
>
> Each stage of a pipeline receives _exactly one argument_, that can take two forms:
>
> - A primitive value, array or object (_but **not a function**_) to inject as argument
>   for further stages,
> - A hook receiving the current set of arguments and computing the value to add.
>
> If the value to inject should be a function, then it is mandatory to use the hook parameter
> to wrap the function, otherwise the factory wouldn't know if it should execute the function
> or pass it down as-is:
>
> ```tsx
> // This will fail, the factory will execute the function thinking it's a hook!
> ModularComponent().withSomeFunction(myFunction)
>
> // This will work, the factory will execute the anonymous function as a hook,
> // and pass the returned function as argument for further stages
> ModularComponent().withSomeFunction(() => myFunction)
> ```
>
> When executed, each stage modifies _exactly one argument_ in the shared arguments map.

## Setting a name and a target argument

In order to add a new stage, we need to provide at the very least:

- The name of the method to add to the factory (`withLifecycle`, `withDefaultProps`...)
- The name of the argument modified by the stage (`lifecycle`, `props`...)

Extensions are written as a map of method name to method configuration. For instance, the `withLifecycle`
definition looks something like this:

```tsx
export const WithLifecycle = {
  withLifecycle: {
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

export const WithLifecycle = createMethodRecord({
  withLifecycle: {
    field: 'lifecycle',
  },
} as const)
```

Notice the `as const` statement, making sure TypeScript narrows all
types as much as possible. It is of paramount importance to always add this statement
to ensure type inference works correctly. Otherwise, the `field` parameter
could be inferred as `string`, polluting the complete arguments map.

If you provide a misconfigured method, the `createMethodRecord` function
will reject the argument, letting you know right away.

## Transforming the argument before committing it to the map

This simple definition of a method is enough for mapping the result of a hook to an argument,
or to map an arbitrary primitive, object or array to the argument, but it might not
be sufficient for other cases. For instance, the `withDefaultProps` stage needs to take
into account existing props, without needing the user to pass them down manually each time.

For this purpose, a method can also receive a `transform` configuration parameter, detailing
how to generate the final value that will be added to the arguments map.

The `transform` function receives two parameters: the current arguments map received from
previous stages, and the value passed down to the stage by the user. It then returns the
transformed value to add to the argument map.

For instance, here is a simplified definition for `withDefaultProps`:

```tsx
export const WithDefaultProps = createMethodRecord({
  withDefaultProps: {
    field: 'props',
    transform: (args, defaultProps) => ({
      ...defaultProps,
      ...args.props,
    }),
  },
} as const)
```

The stage is configured to modify the `props` field, and its custom transform function
merges the provided default props.

However, there is a mistake in the above transform function: the second parameter
is the raw value passed down by the user: it can therefore be a function. When writing
a transform function, you need to account for this case manually. Here is a correct
implementation of the above transform:

```tsx
export const WithDefaultProps = createMethodRecord({
  withDefaultProps: {
    field: 'props',
    transform: (args, useDefaultProps) => ({
      ...(typeof useDefaultProps === 'function'
        ? useDefaultProps(args)
        : useDefaultProps),
      ...args.props,
    }),
  },
} as const)
```

Note how we also renamed the parameter to `useDefaultProps`: as this can be a hook, we
need to name it accordingly to not break the rule of hooks here.

While this might seem cumbersome, it offers a great flexibility for writing extensions:

- It gives the opportunity to manipulate the args passed down to the hook, if needed,
- It allows delaying or the call to the function to the transform function, which can
  for instance decide not to call it at all based on previous arguments.

## Telling TypeScript about a value transformation

> Note: this is currently the only part of `ModularComponent` that is not 100% extensible,
> as it requires patching a shared interface in `@modular-component/core`. Because of that,
> it is not possible to have two stages with the same name and a different transform in the
> same application.

Sometimes, the transformation that we want to apply on a value might change its type
from the one passed as parameter. Unfortunately, as of TypeScript 4.8, there isn't
a way still to use "generic generic types". It is therefore not possible, as far as we can tell,
to retrieve the type of the `transform` configuration and use it to infer the final type
of the argument.

The workaround implemented for now is an exposed interface, `ModularStageTransform`, that
takes a generic parameter and contains a map of transformed type. An extension package
can overload this interface to add the correct transform for the provided stage.

For instance, let's imagine a `withArray` stage that wraps the passed value in an array:

```tsx
export const WithArray = createMethodRecord({
  withArray: {
    field: 'array',
    transform: (args, useArray) => [
      typeof useArray === 'function' ? useArray(args) : useArray,
    ],
  },
} as const)
```

Using it as-is, `ModularComponent().withArray('hello world')` would incorrectly infer the
type of the `array` argument as `string`. We can help TypeScript along by extending the `ModularStageTransform`
type:

```tsx
declare module '@modular-component/core' {
  export interface ModularStageTransform<T> {
    withArray: [T]
  }
}
```

With this, TypeScript will correctly infer the type of our example to `[string]`!

## Restricting the type of the passed value

Specifically for TypeScript users, stage method configuration allows defining a type
that the passed value should match to be considered valid. This information will be
surfaced to the user, marking the stage call as incorrect if the value type do not match
the expected restriction.

For instance, we might want to restrict values passed to the `withDefaultProps` stage to
only accept objects, as any other value do not make sense here.

This is done through the `restrict` property:

```tsx
export const WithDefaultProps = createMethodRecord({
  withDefaultProps: {
    field: 'props',
    transform: (args, useDefaultProps) => ({
      ...(typeof useDefaultProps === 'function'
        ? useDefaultProps(args)
        : useDefaultProps),
      ...args.props,
    }),
    restrict: {} as Record<string, unknown>,
  },
} as const)
```

Note that the value passed to the `restrict` configuration is not important, it will
never be used internally. What matters is _its type,_ that we force through the `as`
statement here.

## Enabling multiple mode on a stage

Sometimes, it does not make sense to reuse/modify the previous stage when calling the
same stage multiple times. Sometimes on the contrary, we want a stage to run multiple times
at various places in our pipeline.

Let's take for example a `withDebug` stage that logs the current args to the console,
and optionally takes an empty function as parameter to serve as breakpoint:

```tsx
export const WithDebug = createMethodRecord({
  field: 'debug',
  multiple: true,
  restrict: undefined,
  transform: (args, useDebug) => {
    if (typeof useDebug === 'function') {
      useDebug(args)
    } else {
      console.log(args)
    }
  },
})
```

All that was needed here was adding the `multiple: true` flag to our configuration.

From there on, calling `withDebug()` multiple time on the same `ModularComponent`
will log the arguments gathered up until each debug stage.

> **Side note: `restrict: undefined`**
>
> Whenever `restrict: undefined` is used on a stage method, the type
> definition will allow users to omit the argument completely, making `useDebug()`
> a valid call instead of requiring `useDebug(undefined)`. Useful for
> stages that return a constant value or only execute side-effects!
