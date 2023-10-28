---
sidebar_position: 2
title: Writing Hooks
---

:::info
All our guides are written in TypeScript, as `ModularComponent` was built from the ground up with TypeScript in mind.
However, it is perfectly possible to take advantage of `ModularComponent` with standard JavaScript.
:::

## The `use` method

Each `ModularComponent` has a `use` method that converts it from a `FunctionComponent` to a simple hook. The returned
hook will run all the configured stages, and return the final argument map.

Note that calling `use` does not remove the render stage. The resulting React tree returned from the render stage, if
present, is available in the `render` property of the argument map.

### Isolating a single stage result

For each argument added to the map by a stage, you can use `use(argument)` to isolate its stage. 
It returns a hook for which the return value will be the specified argument from the arguments map, instead of the entire map.
It also skips any stage that comes after the stage generating the specified argument.

For instance, calling `use('render')` will create a hook that returns the generated React tree. The same way, `use('lifecycle')`
would return whatever value is held inside the `lifecycle` argument, and skip any downstream stages.

### Returned hook signature

Either by creating the default hook returning the argument map, or creating a dedicated argument hook, the returned
value is strongly typed in TypeScript projects, as the argument map would be in a stage transform or restriction.

The same goes for the generated hook parameter: it will have one required parameter, the props of the component,
which are used to populate the initial argument map passed down the stages. In the specific case where the props type is `{}`
(which is the default value unless specified otherwise), the hook's parameter will be optional.

## Main use-case: Hooks with easy access to application context

While it's fairly easy to use your application context inside hooks through _other custom hooks_, why not take advantage
of your pre-configured stages when possible?

For instance, if you have a stage injecting your application global store, you can use `ModularComponent` to create hooks
that consume the store:

```tsx
const useSomeValue = ModularComponent()
  .with(Stage.store())
  .with(Stage.lifecycle(({ store }) => {
    return store.useState((store) => store.some.value)
  }))
  .use('lifecycle')
```

This can get very powerful the more custom stages you add to your factory, exposing application context such as
stores, internationalisation system, API services, etc. to your hooks.
