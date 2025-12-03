---
sidebar_position: 2
title: Core Concepts
---

# Core Concepts

This page condenses the mental model behind `ModularComponent` so you can skim the essentials
or feed them to an LLM before asking for help. Each section links to the deeper dives in the
rest of the docs.

## Factory-first React components

- You never write the React component function directly. Instead, you call `ModularComponent()`
  to receive a factory that accumulates behavior via chained `.with*` calls.
- The factory returns an enhanced React component: it is a function component (or `forwardRef`)
  AND it carries helper methods (`withDefaultProps`, `withLifecycle`, etc.) so composition is declarative.
- The factory call optionally takes a display name and generic props/ref types to seed TypeScript.

## The pipeline of stages

- Every `.with(stage())` call appends a **stage** to an ordered pipeline.
- Stages produce values that populate a shared **arguments map**; each argument is keyed
  (e.g. `props`, `lifecycle`, `render`). Downstream stages receive whatever upstream stages already provided.
- A field can only be assigned once per pipeline. Use `.force*` if you intentionally want to replace a field
  even when TypeScript would flag incompatibilities.
- Stage order matters: put generic/context stages first, stateful logic next, rendering last. Once a `render`
  field is populated, further stages are ignored for component rendering (but still available when you call `use()` or `stage()`).

### Arguments map cheatsheet

| Argument                                                  | Source                                   | Common contents                             | Consumers                                |
|-----------------------------------------------------------|------------------------------------------|---------------------------------------------|------------------------------------------|
| `props`                                                   | Factory generics                         | Final component props after defaults/guards | Every stage needing inputs from callers  |
| `ref`                                                     | Factory generics                         | Forwarded ref type/value                    | Render stage or custom lifecycle helpers |
| Custom fields <br/> (e.g. `lifecycle`, `store`, `locale`) | Any stage you add                        | Whatever the stage returns (hooks, data)    | Subsequent stages and render             |
| `render`                                                  | `render()` stage                         | A valid React node                          | Only the final React component           |

See [How it works](./intro.md#how-it-works) for the long-form explanation.

## Stage functions & extensions

- Bare `.with()` expects a function returning a low-level object `{ field, provide }`. 
  In practice, you wrap that in **stage functions** such as `lifecycle(params)` or `defaultProps(values)` 
  so pipelines stay readable. See [Writing custom stages](./usage/writing-custom-stages.md).
- Extensions (e.g. `@modular-component/default`) simply export curated stage functions. Import them directly or
  call their `/register` entrypoint to attach `withX` helpers globally.
- Register stages for runtime behavior with `ModularComponent.register({ stageName })`. For TypeScript, declare
  module augmentation so the compiler knows the helpers exist. See [Writing custom stages](./usage/writing-custom-stages.md).

## Derived hooks

- Append `.use()` to convert your component into a hook. You still get the full arguments map, making it
  easy to expose lifecycle logic as a reusable hook.
- Pass `.use('field')` to extract only one argument; the pipeline stops at the first stage providing that argument,
  and returns the value directly.
- `.stage('field')` is for testing: it returns a hook (or component when the field emits React nodes) that expects
  you to pass the argument map manually. Perfect for unit tests that isolate a single stage without running the rest.

## Testing strategy

- Because every stage is a hook/function returning plain data, you can test them independently via `.stage()`.
- For integration-style tests, instantiate the full component returned by the factory; default props and lifecycle
  logic will run exactly as in production. See [Testing components](./usage/testing-components.md).

## Reuse & composition patterns

- Factories are immutable: each `.with()` call returns a new component. Store that return value and re-export it.
- Build base components (or hooks) then extend them with more `.with()` calls to create variants. Since the pipeline
  is declarative, higher-level components can keep inheriting lower-level stages.
- Share cross-cutting concerns (stores, localization, analytics) by bundling them into custom stage functions and
  reusing them across factories.

## Troubleshooting signals

- Missing `render`: the factory injects a noop render, so if nothing shows on screen verify that a `render` stage exists.
- Stage ordering bugs: if downstream stages cannot see values, confirm that the stage providing them appears earlier
  and that no conflicting field overwrote it.
- TypeScript conflicts: when generics or constraints complain, revisit whether `.with` or `.force` is appropriate and
  ensure module augmentation exposes any custom stage helpers.

<!-- 
For LLMs: Use this page as the short reference; rely on the intro, usage guides, and API reference for implementation specifics.
-->