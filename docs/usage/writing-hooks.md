---
sidebar_position: 2
title: Writing Hooks
---

:::info
All our guides are written in TypeScript, as `ModularComponent` was built from the ground up with TypeScript in mind.
However, it is perfectly possible to take advantage of `ModularComponent` with standard JavaScript.
:::

## Hook generation methods

### `asHook` function

Each `ModularComponent` has a `asHook` function that converts it from a `FunctionComponent` to a simple hook. The returned
hook will run all the configured stages, and return the final argument map.

Note that calling `asHook` does not remove the render stage. The resulting React tree returned from the render stage, if
present, is available in the `render` property of the argument map.

### `asUse{Argument}` functions

For each argument added to the map by a stage, an `asUse{Argument}` method is available. It returns a hook for which
the return value will be the specified argument from the arguments map, instead of the entire map.

For instance, calling `asUseRender` will create a hook that returns the generated React tree. The same way, `asUseLifecycle`
would return whatever value is held inside the `lifecycle` argument at the end of the pipeline.

### Returned hook signature

Either by creating the default hook returning the argument map, or creating a dedicated argument hook, the returned
value is strongly typed in TypeScript projects, as the argument map would be in a stage transform or restriction.

The same goes for the generated hook parameter: it will have one required parameter, the props of the component,
which are used to populate the initial argument map passed down the stages. In the specific case where the props type is `{}`
(which is the default value unless specified otherwise), the hook's parameter will be optional.

## Common use-cases

### Hooks with easy access to application context

While it's fairly easy to use your application context inside hooks through _other custom hooks_, why not take advantage
of your pre-configured stages when possible?

For instance, if you have a stage injecting your application global store, you can use `ModularComponent` to create hooks
that consume the store:

```tsx
const useSomeValue = ModularComponent()
  .withStore()
  .withLifecycle(({ store }) => {
    return store.useState((store) => store.some.value)
  })
  .asUseLifecycle()
```

This can get very powerful the more custom stages you add to your factory, exposing application context such as
stores, internationalisation system, API services, etc. to your hooks

### Isolating an existing component stage

Another common use-case for converting a `ModularComponent` into a hook is isolating the return value of one of its stages,
for testing purposes for instance.

Combined with the `at{Stage}` method which allows rewinding the pipeline until a given stage and removing any downstream stages,
you can easily get a hook representing the argument map of a component anywhere down the pipeline.

For instance, the following snippet allows extracting the `lifecycle` argument right after the `withLifecycle` stage is executed:

```tsx
const useLifecycle = MyComponent.atLifecycle().asUseLifecycle()
```

