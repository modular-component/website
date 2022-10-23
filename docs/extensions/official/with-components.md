---
sidebar_position: 4
---

# @modular-component/with-components

Provides a `withComponents` stage that fills the `components` argument with
a map of React components. Useful when running tests in an environment that
does not allow module mocking: sub-components can be stubbed in tests by
calling the stage again to replace their implementations.

## Usage

```tsx
import { modularFactory } from '@modular-component/core'
import { WithComponents } from '@modular-component/with-components'

import { SomeComponent } from 'some-component'

const ModularComponent = modularFactory
  .extend(WithComponents)
  .build()

const MyComponent = ModularComponent()
  .withComponents({ SomeComponent })
  .withRender(({ props, components }) => (
    <components.SomeComponent />
  ))
```

## Multiple calls

`withComponents` is a **single** stage, further calls to the stage will _replace_ the stage definition in its original place.

It allows creating a clone of the component with a different sub-component implementation, either for tests or for content.
For instance, one could imagine a `Layout` base component taking advantage of this functionnality:

```tsx
const PageLayout = ModularComponent()
  .withComponent({
    Title: React.Fragment,
    Subtitle: React.Fragment,
    Content: React.Fragment,
    Footer: React.Fragment
  })
  .withRender(({ components }) => (
    // Build a layout using <components.Title />, <components.Subtitle />...
  ))

const PageOne = PageLayout.withComponent({
  Title: () => <>First page</>,
  Subtitle: () => <>I have a subtitle but no footer</>,
  Content: () => <>First page content</>,
  Footer: React.Fragment
})

const PageTwo = PageLayout.withComponent({
  Title: () => <>Second page</>,
  Subtitle: React.Fragment,
  Content: () => <>Second page content</>,
  Footer: () => <>I have a footer but no subtitle</>
})
```

## Implementation

`withComponents` is a simple stage adding the map as a `component` argument. It has a restriction
on accepted values, to only accept a map of React components.

```tsx
import { ComponentType } from 'react'

import { createMethodRecord } from '@modular-component/core'

export const WithComponents = createMethodRecord({
  withComponents: {
    field: 'components',
    restrict: {} as Record<string, ComponentType<any>>,
  },
} as const)
```
