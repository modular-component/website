---
slug: using-internationalization
title: Using an i18n provider
authors: jvdsande
date: 2022-10-22
tags: [i18n]
---

In this case study, we look at injecting a component localization data using [`i18next`](https://www.i18next.com/)
and TypeScript to build a custom modular stage.

<!--truncate-->

`i18next` is a well known library for handling your application's internationalization needs. At it simplest, you feed
it with a map of key/value pairs for each language you want to support, and it provides you with a `t(key: string)` function
retrieving the correct value based on the currently configured language and the passed key.


