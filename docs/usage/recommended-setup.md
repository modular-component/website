---
sidebar_position: 5
---

# Recommended Setup

One advantage of the factory pattern is that it can help reduce clutter through dependency injections.
To take advantage of this feature to a maximum, we recommend building a single import for your modular factory.

## Building your export

Somewhere in your setup, create a file to hold your factory. Let's call it `modular-component.ts` for the sake of the
example.

In this file, import `ModularComponent` and all the stages you want to expose, official or custom-made.
You can then export everything in a single `Modular` variable, renaming `ModularComponent` to `Component` in the process:


```ts
import { ModularComponent } from '@modular-component/core'
import { render, lifecycle, defaultProps } from '@modular-component/default'
import { components } from '@modular-component/with-components'
import { locale } from './custom-stages/with-locale'
import { globalStore } from './custome-stages/with-global-store'

export const Modular = {
  Component: ModularComponent,
  render,
  lifecycle,
  defaultProps,
  components,
  locale,
  globalStore,
}
```

## Using your factory

With this centralized export, you can easily build modular components throughout your app by simply importing
your `Modular` object:

```tsx
import { Modular } from './modular-component'

export const MyComponent = Modular.Component('MyComponent')
  .with(Modular.globalStore())
  .with(Modular.lifecycle(() => {
    // ...
  }))
  .with(Modular.render(() => {
    // ...
  }))
```

## Using named exports with namespaced import

Depending on your preferences, you can also use named exports and import your factory through
a namespaced import:

```tsx
export { ModularComponent as Component } from '@modular-component/core'
export * from '@modular-component/default'
export * from '@modular-component/with-components'
export * from './custom-stages/with-locale'
export * from './custom-stages/with-global-store'
```

```tsx
import * as Modular from './modular-component'

export const MyComponent = Modular.Component('MyComponent')
  .with(Modular.globalStore())
  .with(Modular.lifecycle(() => {
    // ...
  }))
  .with(Modular.render(() => {
    // ...
  }))
```
