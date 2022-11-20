---
slug: using-global-store
title: Using an application global store
authors: jvdsande
date: 2022-10-28
tags: [store, redux]
---

In this case study, we see how you could integrate an [Easy-Peasy](https://easy-peasy.vercel.app/)-powered Redux store through
a custom stage in your application.

<!--truncate-->

Easy-Peasy is a library built around Redux, which offers a clean API for creating and consuming a store. 
It is aimed at being consumed through hooks, and is therefore a good candidate for abstraction using a modular stage.

The default API allows exposing three hooks:

- `useStore` gives you access at the raw store object, and can be used for non-reactive accesses to the store state 
  inside effects or callbacks for instance,
- `useStoreState` takes a selector as parameter, and subscribes to the store changes, memoizing the result of the 
  selector, and triggering a component update when the returned value changes,
- `useStoreAction` also takes a selector as parameter, but this time allows extracting specific _actions_ rather than _state values_.
  _actions_ in Easy-Peasy are functions mutating your store, using Redux's dispatch internally.

Through those three hooks, you have complete access to your store, and can easily subscribe to your store with fine-grained
reactivity.

## What can be improved?

By default, the three store access hooks are available as exports from `easy-peasy` itself. However, those exports are 
generic and have no knowledge of your store structure. If you are using TypeScript, it wouldn't give you any type hints
about either your state or your actions.

Easy-Peasy offers a solution to this limitation: the `createTypedHooks` function. This function takes your store definition 
as a generic TypeScript parameter, and returns a set of hooks named exactly like the one exported by the package, but 
aware of your store's typing.

All is left to do is exports those new hooks, and import them whenever you need to interface a component with the store.

However, as your project scales, imports can start to stack up at the start of your files, and depending on your setup, 
imports to files in your codebase can quickly get messy with relative paths.

## Improving things with `ModularComponent`

With a custom stage, we can allow any component to receive your typed store hooks, without needing a further import.
It's a good first step, and even though it does not bring tremendous value, cleaning up your codebase is always nice.

Here is our custom stage definition:

```tsx 
import { createStageRecord } from '@modular-component/core'
import { createTypedHooks } from 'easy-peasy'

import { model } from './store/model'

const typedHooks = createTypedHooks<typeof model>()

const withStore = Symbol()

declare module '@modular-component/core' {
  export interface ModularStages<Args, Value> {
    [withStore]: {
      restrict: undefined
      transform: typeof typedHooks
    }
  }
}

export const WithStore = createStageRecord({
  field: 'store',
  symbol: withStore,
  transform: () => {
    return typedHooks
  }
})
```

Our stage takes no parameter, as it always returns the same value. It acts as a provider. We instruct TypeScript to let
us call that stage without parameter through `restrict: undefined`.

Its transform function simply inject our hooks created with `createTypedHooks`, in the `store` field.

Now, whenever any component needs to consume our store, we don't need to worry about another import, we can simply add
a stage to our factory.

```tsx
const StoreAwareComponent = ModularComponent()
  .withStore()
  .withLifecycle(({ store }) => {
    // Reactive value read
    const someValue = store.useStoreState((state) => state.someModel.someValue)
    
    // Action selection
    const someAction = store.useStoreAction((actions) => actions.someModel.someAction)
    
    // Full raw store access
    const Store = store.useStore()
    
    // Main usage of actions
    useEffect(() => {
      someAction()
    }, [someAction])
    
    // Alternate usage of actions and non-reactive value read
    const callback = useCallback(() => {
      const someSyncValue = Store.getState().someOtherModel.someSyncValue
      Store.getActions().someOtherModel.someOtherAction(someSyncValue)
    }, [Store])
  })
```

## Going a step further

While what we achieved so far is already nice, we can improve things a bit to make our store even more straightforward to use.

One thing that I personally observed when using Easy-Peasy, is that I very rarely use the `useStoreAction` hook. The reason
for this is that your actions are naturally immutable, so `useStoreAction` don't bring any memoization to the table. Furthermore,
we have access to the entire store object through `useStore`, which gives us access to those same actions through `getActions()`.

Because of this, I use `useStoreState` a lot to _subscribe to values_, and then simply use `useStore` and pass the `Store`
object itself around in my effects and callbacks. A nice side-effect from that is that I don't need to change my 
dependency array if I'm in need of a different actions later on in the same callback or effect.

Taking inspiration from that, we could create an abstraction hook that would grant us access to the store with a slightly
different API:

```tsx
// Helper hook
function useEasyPeasy() {
  const raw = useStore()

  return useMemo(() => ({ 
    raw, 
    act: raw.getActions,
    get: raw.getState, 
    use: useStoreState
  }), [raw])
}

// Usage in a component
const store = useEasyPeasy()

// Reactive value read
const someValue = store.use((state) => state.someModel.someValue)

// Action selection
const someAction = store.act().someModel.someAction

// Full raw store access
const rawStore = store.raw

// Main usage of actions
useEffect(() => {
  someAction()
}, [someAction])

// Alternate usage of actions and non-reactive value read
const callback = useCallback(() => {
  const someSyncValue = store.get().someOtherModel.someSyncValue
  store.act().someOtherModel.someOtherAction(someSyncValue)
}, [store])
```

Admittedly this change is small and purely depends on one's tastes. For me, this is a tremendous upgrade in readability:

- I like that now all my store functions are scoped to the `store` variable, instead of living in separate hooks that
  I need to import and invoke separately. This makes it a breeze when a component changes from only needing read access
  to the store to finally needing to call some actions.
- The fact that each store function type is a three-letter word reduces clutter in my lifecycle hooks while still conveying
  intent clearly: `use`/`get` for read access with or without reactivity, `act` for write access.

And obviously, it translates easily to a modular stage, as it's a simple hook call.


```tsx 
import { createStageRecord } from '@modular-component/core'
import { useEasyPeasy } from './use-easy-peasy'

const withStore = Symbol()

declare module '@modular-component/core' {
  export interface ModularStageTransform<T> {
    [withStore]: {
      restrict: undefined
      transform: ReturnType<typeof useEasyPeasy>
    }
  }
}

export const WithStore = createStageRecord({
  field: 'store',
  symbol: withStore,
  transform: useEasyPeasy
})
```

And here is what using it would look like in a component:

```tsx
const StoreAwareComponent = ModularComponent()
  .withStore()
  .withLifecycle(({ store }) => {
    // Reactive value read
    const someValue = store.use((state) => state.someModel.someValue)
    
    // Action selection
    const someAction = store.act().someModel.someAction
    
    // Full raw store access
    const Store = store.raw
    
    // Main usage of actions
    useEffect(() => {
      someAction()
    }, [someAction])
    
    // Alternate usage of actions and non-reactive value read
    const callback = useCallback(() => {
      const someSyncValue = store.get().someOtherModel.someSyncValue
      store.act().someOtherModel.someOtherAction(someSyncValue)
    }, [store])
  })
```

## Conclusion

Through this simple example, we've seen how `ModularComponent` can help you reduce clutter across your app by embracing
the injection mechanism, making your factory the only import needed to connect your component to your application's context.

You can also check our other case study about [configuring your internationalization system as a stage](./using-internationalization.md).
