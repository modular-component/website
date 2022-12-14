---
sidebar_position: 2
title: Writing Components
---

:::info
All our guides are written in TypeScript, as `ModularComponent` was built from the ground up with TypeScript in mind.
However, it is perfectly possible to take advantage of `ModularComponent` with standard JavaScript.
:::

## Factory setup

Once you've [created your component factory](./building-the-factory.md), you can start using it to build your component.
In this guide, we consider a factory exported with three stages:

* `withDefaultProps` allows setting default value for props
* `withLifecycle` allows registering a custom hook to hold the component's logic
* `withComponents` can inject a map of sub-components for which we can later swap implementations

:::tip
All those stages are availabe as [official extensions](../extensions/official/official.md)
::::

## Configuring the component

At it simplest, a component is created by calling the factory:

```tsx
import { ModularComponent } from './modular-component'

export const MyComponent = ModularComponent()
```

This is enough to get a valid, instantiable component. However, this component will do nothing: it does not handle
any state, and renders `null` by default.

### Component display name

One caveat of working with `ModularComponent` is that React cannot infer its display name from the variable it is assigned too,
because the actual component is created inside the factory. This can make debugging trickier, as stack traces and React Devtools
will show all components as anonymous components.

You can get around this limitation by manually providing an (optional) display name at component creation:

```tsx
import { ModularComponent } from './modular-component'

export const MyComponent = ModularComponent('MyComponent')
```

It is a good practice to keep the debug name and the variable name in sync.

### Component properties

When using TypeScript, you can pass a generic type parameter to the `ModularComponent` call to set the component's props:

```tsx
import { ModularComponent } from './modular-component'

export const MyComponent = ModularComponent<{
  isActive: boolean
  label: string
}>()
```

The props typing will be passed along in each stage, and will also be used for the final typing of the component itself, so
that TypeScript knows about them when instantiating it.

## Adding stages

Now that our component is created, we can **add stages** to it to extend its capabilities. The result of the factory is a usable React `FunctionComponent`, 
on which custom factory functions (our defined **stage functions**) have been added. To add a stage to our component, we simply call one of those 
stage functions.

Note that just like **factory builders**, **component factories** are immutable. Because of this, you need to chain the stage calls in the same
assignment as your component creation. You _cannot call them as side-effects_.

```tsx
// ?????? This will not work - `withStage` call returns a modified 
//    component but does not touch the original one
const MyComponent = ModularComponent()

MyComponent.withStage()

// ??? Do this instead - save the result of the `withStage` call
//    as your component
const MyComponent = ModularComponent()
  .withStage()
```

This will come in very handy in the next chapter about [extending and reusing components](./reusing-components.md), as well as for
[testing components](./testing-components.md)

### Custom stages

All the stages we configured when building our factory can be used to create our component. Each stage will add or modify
a field on the shared **argument map**, consolidating data that can be consumed by further stages.

The order of stages is therefore important: only data from stages appearing _higher in the list_ will be available in 
any given stage.

Generic stages (handling default props, injecting localization data...) should come first in the pipeline. If needed,
we can then add a lifecycle stage handling the component's logic. Our component could look something like that:

```tsx
const MyComponent = ModularComponent()
  .withGlobalStore()
  .withLocale('localization.key.for.my.component')
  .withLifecycle(({ locale, store }) => {
    useDocumentTitle(locale('title'))
    
    const someStoreValue = store.useState((store) => store.some.value)
    const [someInternalValue] = React.useState('value')
    
    return { someStoreValue, someInternalValue }
  })
```

### Render stage

Finally, we can close our component by adding the only built-in stage: `withRender`. This stage takes as parameter a
`FunctionComponent` which receives the generated argument map as props. Since all computations and stateful manipulations
are done in prior stages, it can stay simple and concentrate on its main purpose: outputting markup.

Building on top of our previous example, this is what our component could look like:

```tsx
const MyComponent = ModularComponent()
  .withGlobalStore()
  .withLocale('localization.key.for.my.component')
  .withLifecycle(({ locale, store }) => {
    useDocumentTitle(locale('title'))
    
    const someStoreValue = store.useState((store) => store.some.value)
    const [someInternalValue] = React.useState('value')
    
    return { someStoreValue, someInternalValue }
  })
  .withRender(({ locale, lifecycle }) => (
    <>
      <h1>{locale('title')}</h1>
      <p>{locale('content')}</p>
      <p>Value from store: {lifecycle.someStoreValue}</p>
      <p>Value from state: {lifecycle.someInternalValue}</p>
    </>
  ))
```
