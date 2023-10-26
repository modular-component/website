---
sidebar_position: 1
---

# The extension system

`ModularComponent` aims to be a toolkit, and as such, it needs to be as agnostic as possible
of the application context. For this reason, the core factory only implements a single stage: `with(render)`,
which is in fact a simple, traditional React function component.

Capabilities can then be added on a per-application basis, to construct a pipeline that
makes sense for a specific application context: adding a stage for connecting to a global
store, or for handling internationalization...

Such capabilities are added through **extensions**. Extensions are configuration objects
detailing a new stage to add to the pipeline.

## Understanding stages

The `.with()` method accepts a standard object comprised of two fields:

- `field`: the name of the argument that will get added to the argument map
- `useStage`: a hook that receives the current argument map and returns the value to set on the stage field

While it's possible to use those objects directly when calling `.with()`, for readability and ease of writing we
recommend creation **custom stage functions** that take relevant parameters and abstract away the stage logic.

## Extension conventions

Extensions export **custom stage functions**, that can be passed to the `.with()` method of a `ModularComponent`.
They can export one or multiple stage functions, depending on the needs covered by the extension.

By convention, stage function name should start with a lowercase letter, and should not repeat the `with` keyword.
For instance, a localization extension should be called `locale()`, not `Locale()` or `withLocale()`.

## Setting a field and stage transform hook

At its simplest, a stage definition should contain:

- A `field` property containing the name of the argument modified by the stage (`lifecycle`, `props`...)
- A `useStage` property containing a hook generating the argument value based on previous arguments

Extensions are written as functions that return this definition. They should use the `ModularStage` helper type
to ensure both their `field` and `useStage` properties are correctly typed for inference.

For instance, the `lifecycle` definition looks like this:

```tsx
import { ModularStage } from '@modular-component/core'

export function lifecycle<Args extends {}, Return>(
  useLifecycle: (args: Args) => Return,
): ModularStage<'lifecycle', (args: Args) => Return> {
  return { field: 'lifecycle', useStage: useLifecycle }
}
```

Your stage function can take any argument it needs. In the case of the `lifecycle` function, it takes a function
that is directly reused as the `useStage` property, but the `useStage` function could be any hook using the parameters
as it sees fit, along the arguments it receives when called.

You can add as many stage functions as you want. Different stage functions can also impact
the same field if needed, for some advanced cases.

## Parameters and field value inference

If we look at the `lifecycle` example, we can see that the stage function infers two generic parameters: `Args` representing
the arguments passed from upstream stages, and `Return` representing the value returned from the lifecycle hook.

You can use `Args` to type the first parameter passed to `useStage` (as is the case here) any time you want your return
type to be aware of the initial `Args` type. This also allows Typescript to automatically type the `args` parameter
when called:

```tsx
ModularComponent<{ value: number }>()
  .withLifecycle(({ props }) => ({ double: props.value * 2 }))
  //                 👆 Here, Typescript knows that the props argument 
  //                    is of type { value: number }
  //                    It will also infer that the Return value is 
  //                    of type { double: number } thanks to that.
```

If we take another example (our `components` extension), you can see that sometimes the current arguments are not needed.
That is often the case when passing a static value to a stage:

```tsx
import { ComponentType } from 'react'
import { ModularStage } from '@modular-component/core'

export function components<Components extends Record<string, ComponentType>>(
  components: Components,
): ModularStage<'components', () => Components> {
  return { field: 'components', useStage: () => components }
}
```

In this case, you can easily just omit the generic type parameter, as we don't need to type the `useStage` parameters.

## Learn more

You can read the documentation for each [official extension](./official/official.md) to learn more
about writing extensions.
