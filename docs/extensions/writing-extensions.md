---
sidebar_position: 1
---

# The extension system

`ModularComponent` aims to be a toolkit, and as such, it needs to be as agnostic as possible
of the application context. For this reason, the core factory only implements a single stage: `render()`,
which is in fact a simple, traditional React function component.

Capabilities can then be added on a per-application basis, to construct a pipeline that
makes sense for a specific application context: adding a stage for connecting to a global
store, or for handling internationalisation...

Such capabilities are added through [**custom stages**](../usage/writing-custom-stages.md).
Extensions are simply packages that expose such custom stages for reuse across projects.

## Extension conventions

Extensions export **custom stage functions**, that can be passed to the `.with()` method of a `ModularComponent`,
or registered through `ModularComponent.register`.
They can export one or multiple stage functions, depending on the needs covered by the extension.

### Stage function names

By convention, stage function names should start with a lowercase letter, and should not repeat the `with` keyword.
For instance, a localization extension should be called `locale()`, not `Locale()` or `withLocale()`.

### Automatic _vs_ manual registration

Extensions **should not** automatically register stages on behalf of users. Instead, they should export
the stage functions alongside the [registration typing information](../usage/writing-custom-stages.md#providing-a-type-for-registering-the-stage).

Extensions should also offer a `/register` subpath export which automatically [register](../usage/writing-custom-stages.md#registering)
the custom stages provided by the extension. This lets users choose between manual or automatic registration

## Learn more

You can read the documentation for each [official extension](./official/official.md) to learn more
about writing extensions.
