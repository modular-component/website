---
sidebar_position: 1
title: Writing Components
---

:::info
All our guides are written in TypeScript, as `ModularComponent` was built from the ground up with TypeScript in mind.
However, it is perfectly possible to take advantage of `ModularComponent` with standard JavaScript.
:::

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
on which custom factory methods have been added. To add a stage to our component, we can use the `.with()` method. 

Note that **component factories** are immutable. Because of this, you need to chain the stage calls in the same
assignment as your component creation. You _cannot call them as side-effects_.

```tsx
// ⚠️ This will not work - `with(stage)` call returns a modified 
//    component but does not touch the original one
const MyComponent = ModularComponent()

MyComponent.with(stage())

// ✅ Do this instead - save the result of the `with(stage)` call
//    as your component
const MyComponent = ModularComponent()
  .with(stage())
```

This will come in very handy in the next chapter about [extending and reusing components](./reusing-components.md), as well as for
[testing components](./testing-components.md)

### Custom stages

The `.with()` method accepts a standard object comprised of two fields:

- `field`: the name of the argument that will get added to the argument map
- `useStage`: a hook that receives the current argument map and returns the value to set on the stage field

:::tip
While it's possible to use those objects directly when calling `.with()`, for readability and ease of writing we
recommend creation **custom stage functions** that take relevant parameters and abstract away the stage logic.

All our [official extensions](../extensions/official/official.md) are actually this kind of functions.
:::

When calling `.with()`, each stage will add or modify
a field on the shared **argument map**, consolidating data that can be consumed by further stages.

The order of stages is therefore important: only data from stages appearing _higher in the list_ will be available in 
any given stage.

Generic stages (handling default props, injecting localization data...) should come first in the pipeline. If needed,
we can then add a lifecycle stage handling the component's logic. Our component could look something like that:

```tsx
const MyComponent = ModularComponent()
  .with(globalStore())
  .with(locale('localization.key.for.my.component'))
  .with(lifecycle(({ locale, store }) => {
    useDocumentTitle(locale('title'))
    
    const someStoreValue = store.useState((store) => store.some.value)
    const [someInternalValue] = React.useState('value')
    
    return { someStoreValue, someInternalValue }
  }))
```

### Render stage

Finally, we can close our component by adding a `render` stage. Stages setting the `render` field are special
because the factory will look for it internally. As such, any stage _downstream_ of a `render` stage will be ignored
when rendering as a component.

Render stages need to return a valid React node, as their return will be used as the return value of the complete component.
This is enforced internally at the TypeScript level.

Building on top of our previous example, this is what our component could look like:

```tsx
const MyComponent = ModularComponent()
  .with(globalStore())
  .with(locale('localization.key.for.my.component'))
  .with(lifecycle(({ locale, store }) => {
    useDocumentTitle(locale('title'))
    
    const someStoreValue = store.useState((store) => store.some.value)
    const [someInternalValue] = React.useState('value')
    
    return { someStoreValue, someInternalValue }
  }))
  .with(render(({ locale, lifecycle }) => (
    <>
      <h1>{locale('title')}</h1>
      <p>{locale('content')}</p>
      <p>Value from store: {lifecycle.someStoreValue}</p>
      <p>Value from state: {lifecycle.someInternalValue}</p>
    </>
  )))
```
