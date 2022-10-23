---
sidebar_position: 2
title: Writing Hooks
---

:::info
All our guides are written in TypeScript, as `ModularComponent` was built from the ground up with TypeScript in mind.
However, it is perfectly possible to take advantage of `ModularComponent` with standard JavaScript.
:::

## `asHook` function

### Default call

Each `ModularComponent` has a `asHook` function that converts it from a `FunctionComponent` to a simple hook. The returned
hook will run all the configured stages, and return the final argument map.

Note that calling `asHook` does not remove the render stage. The resulting React tree returned from the render stage, if
present, is available in the `render` property of the argument map.

### Call with parameter

`asHook` can optionally be called with an argument name as parameter, as a convenience. By doing so, the return value will
be the specified argument from the argument map, instead of the argument itself.

For instance, calling `asHook('render')` will create a hook that returns the generated React tree. The same way, `asHook('lifecycle')`
would return whatever value is held inside the `lifecycle` argument at the end of the pipeline.

### Returned hook signature

Either by creating the default hook returning the argument map, or passing an argument name as parameter, the returned
value is strongly typed in TypeScript project, as the argument map would be in a stage function.

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
  .asHook('lifecycle')
```

This can get very powerful the more custom stages you add to your factory, exposing to hooks application context such as
stores, internationalisation system, API services...

### Isolating an existing component stage

Another common use-case for converting a `ModularComponent` into a hook is isolating the return value of one of its stages,
for testing purposes for instance.

Combined with the `atStage` function which allows rewinding the pipeline until a given stage and removing any downstream stages,
you can easily get a hook representing the argument map of a component anywhere down the pipeline.

For instance, the following snippet allows extracting the `lifecycle` argument right after the `withLifecycle` stage is executed:

```tsx
const useLifecycle = MyComponent.atStage('withLifecycle').asHook('lifecycle')
```

