---
slug: using-internationalization
title: Using an i18n provider
authors: jvdsande
date: 2025-12-02
tags: [i18n]
---

In this case study, we look at injecting component localization data using [`i18next`](https://www.i18next.com/)
and TypeScript to build a custom modular stage.

<!--truncate-->

`i18next` is a well-known library for handling your application's internationalization needs. At its simplest, you feed
it with a map of key/value pairs for each language you want to support, and it provides you with a `t(key: string)` function
retrieving the correct value based on the currently configured language and the passed key.

When using TypeScript, you can further configure it with the list of valid keys, to get both type safety and autocompletion.

Using prefixes, you can scope your keys, and `i18next` provides a `t` function generator taking a prefix as parameter
and allowing access to prefixed keys by the rest of their identifier only: for instance, `my.component.title` and `my.component.subtitle`
can be accessed through `t('title')` and `t('subtitle')` when `t` is generated with the `my.component` prefix.

## `i18next`'s `useTranslation` hook 

`i18next` also comes with a powerful React integration, through which you can retrieve your `t` functions from a hook
subscribed to locale changes. Thanks to this hook integration, it becomes fairly easy to integrate as a modular stage.

The `useTranslation` hook returns three variables: a configured `t` function, the raw `i18n` object, and a `ready` boolean
used when dynamically loading translations.

## Injecting the `t` function and other values

Rather than importing `useTranslation` from `react-i18next` everywhere localization is needed, we can take advantage of
`ModularComponent` injection system. In this case study, we will focus on the returned `t` function, but you could create
a different stage function if you want to keep access to the `i18n` and `ready` values.

For our case, here is how we would create the custom stage:

```tsx
import { useTranslation } from 'react-i18next'

import { ModularContext, StageReturn, addTo } from '@modular-component/core/extend'

export function locale<Context extends ModularContext>() {
  return addTo<Context>()
    .on('locale')
    .provide(() => useTranslation('translation').t)
}

export type WithLocale<Context extends ModularContext> = () => StageReturn<typeof locale<Context>>
```

This simple stage simply calls the `useTranslation` hook with the default namespace, and returns the `t` function. 
It then stores it in the `locale` field in the arguments map.

This allows us to easily use localized strings in our other stages, such as the render stage:

```tsx
const AppTitle = ModularComponent()
  .withLocale()
  .withRender(({ locale }) => (
    <>
      <h1>{locale('components.app-title.title')}</h1>
      <h2>{locale('components.app-title.subtitle')}</h2>
    </>
  ))
```

## Embracing component prefixes

In the previous component, we had to repeat part of the localized string selector twice. Using `useTranslation` directly,
we could have gone around this by providing a `keyPrefix` configuration. 

We can set up our stage to optionally take this prefix as parameter, allowing us to retrieve a scoped `t` function.

```tsx
import { TFunction, TFuncKey } from 'i18next'
import { useTranslation } from 'react-i18next'

import { ModularContext, StageParams, StageReturn, addTo } from '@modular-component/core/extend'

export function locale<
  Context extends ModularContext,
  Key extends TFuncKey<'translation'> = never
>(key?: Key) {
  return addTo<Context>()
    .on('locale')
    .provide((): [Key] extends [never]
      ? TFunction<'translation'>
      : TFunction<'translation', Key> => useTranslation('translation', { keyPrefix: key }).t)
}

export type WithLocale<
  Context extends ModularContext
> = <
  Key extends TFuncKey<'translation'> = never
>(
  ...args: StageParams<typeof locale<Context, Key>>
) => StageReturn<typeof locale<Context, Key>>
```

With this, we can simplify our component implementation by moving the common prefix to the stage initialization:

```tsx
const AppTitle = ModularComponent()
  .withLocale('components.app-title')
  .withRender(({ locale }) => (
    <>
      <h1>{locale('title')}</h1>
      <h2>{locale('subtitle')}</h2>
    </>
  ))
```

It then becomes really easy to implement shared practices around the application, scoping locales to a component's path
for instance.

## Switching the localization data of an existing component

Since it is possible to create new components by taking a previous component and replacing a stage, we can take
an existing component and change the locale's prefix to alter the rendered text. For instance, we could have a sub-page
title inherit the implementation of our main application title:

```tsx
const SubPageTitle = AppTitle.withLocale('components.sub-page-title')
```

However, using the current setup for our stage, TypeScript will actually let us replace the prefix by any other valid
translation key, instead of limiting it to prefixes for which the same scoped keys exist. Here, we would like to
restrict this, so that switching the prefix is only possible if it does not break the render.

Most of the time, this is done automatically by TypeScript by comparing the result of the `useStage` function for the
previous stage value and the newly passed value. However, in this case, the `TFunction` type is not strict enough to 
cover our needs. But we can go around it by modifying slightly the type of the returned function when a key is set:

```tsx
import { TFunction, TFuncKey } from 'i18next'
import { useTranslation } from 'react-i18next'

import { ModularContext, StageParams, StageReturn, addTo } from '@modular-component/core/extend'

export function locale<
  Context extends ModularContext,
  Key extends TFuncKey<'translation'> = never
>(key?: Key) {
  return addTo<Context>()
    .on('locale')
    .provide((): [Key] extends [never]
      ? TFunction<'translation'> :
      // highlight-next-line
      | TFunction<'translation', Key>
      // highlight-next-line
      | ((key: TFuncKey<'translation', Key>) => string) =>
      useTranslation('translation', { keyPrefix: key }).t)
}

export type WithLocale<
  Context extends ModularContext
> = <
  Key extends TFuncKey<'translation'> = never
>(
  ...args: StageParams<typeof locale<Context, Key>>
) => StageReturn<typeof locale<Context, Key>>
```

By adding this stricter restriction through a union type, we keep the original behavior, 
but only prefixes yielding compatible sub-selectors will be accepted when replacing a stage.

## Conclusion

With this localization stage, we get a very easy way to integrate localized strings inside our components, with the full
type-safety offered by `i18next`. By lifting the prefix definition at the factory level, we also make it easy to put 
best practices in place for organizing our locales linked to our components.

You can also check our other case study about [configuring global store access as a stage](./using-global-store.md).
