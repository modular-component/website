---
sidebar_position: 1
---

# Building the Factory

When setting up `ModularComponent` in a project, the first thing to do is to **build your factory**.

With `ModularComponent`, the factory itself is modular. There are no preconceptios about your application, how it works, what library you are using...
Setting up a factory that allow components to hook into your specific application context is up to you.

## The `modularFactory` export

`@modular-component/core` exports a `modularFactory` object, which is a **factory builder** instance. Through it, you can register
**stage methods** and build the final **component factory**. The object exposes two methods:

- `extend(stages: StageRecord)`: create a new **factory builder** inheriting all previously configured stages, and adding the new stages
  passed as parameter.

  Just like the components we will later build, the factory is _immutable_, so calling extend on it will not modify the core object, but create a new one.

  `extend` takes a map of stage methods, so you can build your whole factory with a single `extend` call; but it also returns a **factory builder** object,
  which allows you to chain multiple `extend` calls, allowing to apply multiple pre-configured extensions without manually spreading them.

- `build()`: generates the component factory itself, that can later be used to create components. The return of the `build` method is a **component factory**, not a **factory builder** anymore, which means that it's not possible to extend it with more stages after that.

## Adding stages

### Using published extensions

For some use cases, it's possible to use pre-configured stage methods to build your factory. For instance, the `ModularComponent` team maintain a list of
[official extensions](../extensions/official) for the most common use cases.

The convention for published extensions is to export **stage records**, which are maps of stage function names to stage function configurations.
Such records are most of the time prefixed with `With`, capitalized. For instance, the default stage record exposed by `@modular-component/default` 
is `WithDefaultStages`.

In order to use those in your factory, simply pass them to an `extend` call:

```ts
import { modularFactory } from '@modular-component/core'

import { WithDefaultStages } from '@modular-component/default'
import { WithComponents } from '@modular-component/with-components'

const factoryBuilder = modularFactory
  .extend(WithDefaultStages)
  .extend(WithComponents)
```

### Using custom stages

In other cases, pre-configured stage methods might not cover your needs. In this case, you can easily add your custom stages by providing your own
stage records to `extend` calls, either inline or as their own variable. 

If you don't want to inline your stage records, you can still get TypeScript validation by wrapping them in the `createStageRecord` helper exported by
`@modular-component/core`, just as if you were [writing your own extension](../extensions/reference).


```ts
import { modularFactory, createStageRecord } from '@modular-component/core'

import { WithDefaultStages } from '@modular-component/default'
import { WithComponents } from '@modular-component/with-components'

import { WithStore } from './store/stage-method'

const WithVariable = createStageRecord({
  withVariable: {
    field: 'variable'
  }
})

const factoryBuilder = modularFactory
  .extend(WithDefaultStages)
  .extend(WithComponents)
  .extend(WithStore)
  .extend(WithVariable)
  .extend({
    withInline: { field: 'inline' }
  })
```

## Building and exporting the factory

Once you've finished adding all the stages necessary for your application, you can build and export your factory.
You will then be able to import it from any component file to build the component step by step.

Building the factory is as easy as calling `build()` on your **factory builder**.

By convention, the modular component factory is called `ModularComponent`, but you can choose any name you want.

```ts
import { modularFactory, createStageRecord } from '@modular-component/core'

import { WithDefaultStages } from '@modular-component/default'
import { WithComponents } from '@modular-component/with-components'

// Exported custom extension connecting to an eventual global store
import { WithStore } from './store/stage-method'

// Local custom extension adding an hypothetic `withVariable` stage
const WithVariable = createStageRecord({
  withVariable: {
    field: 'variable'
  }
})

const factoryBuilder = modularFactory
  .extend(WithDefaultStages)
  .extend(WithComponents)
  .extend(WithStore)
  .extend(WithVariable)
  // Inline custom extension adding an hypothetic `withInline` stage
  .extend({
    withInline: { field: 'inline' }
  })

export const ModularComponent = factoryBuilder.build()
```

## Exporting multiple factories

### For different kind of components

As a factory is a standard JS exported variable, you can create as many as you want. For instance, you might want to differentiate **UI components**
from **View components**: the UI components are the building blocks of your app and will never need access to an eventual global store, 
while the view components are a higher abstraction that maps application data to the viewport.

You can take advantage of the **factory builder** immutability to share stages between your factories, too.

```ts
import { modularFactory } from '@modular-component/core'

import { WithDefaultStages } from '@modular-component/default'
import { WithComponents } from '@modular-component/with-components'

import { WithStore } from './store/stage-method'


const sharedFactory = modularFactory
  .extend(WithDefaultStages)
  .extend(WithComponents)

const viewFactory = sharedFactory
  .extend(WithStore)

export const UIComponent = sharedFactory.build()
export const ViewComponent = viewFactory.build()
```

### For modular hooks

Some people might also like to use `ModularComponent` to write their hooks, in order to take advantage of specific stages.
A dedicated hook factory would most likely not need the default stages and `withComponents` stage.

```ts
import { modularFactory } from '@modular-component/core'

import { WithDefaultStages } from '@modular-component/default'
import { WithComponents } from '@modular-component/with-components'

// Custom extension connecting to an eventual global store
import { WithStore } from './store/stage-method'

const sharedFactory = modularFactory
  .extend(WithStore)

const componentFactory = sharedFactory
  .extend(WithDefaultStages)
  .extend(WithComponents)

export const ModularHook = sharedFactory.build()
export const ModularComponent = componentFactory.build()
```

