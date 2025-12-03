---
sidebar_position: 6
title: LLM Prompt Kit
---

# LLM Prompt Kit

Copy/paste the sections you need when asking an LLM for help with ModularComponent.
This gives the model the right mental model before it sees your question or code.

## LLMs.txt file

This documentation provides an <a href="/llms.txt">LLMs.txt</a> file for easy parsing of context
and navigation by LLMs. You can point LLMs to that file by copying its link above.

## How to use this page

1. Grab the Architecture Snapshot so the LLM knows what ModularComponent does.
2. Add the Factory Contract when the question touches `.with`, `.use`, `.stage`, or `.force`.
3. Include the Stage/Extension Cheat Sheet when discussing specific stages or extensions.
4. Paste the Example Pipeline (and tweak names) when you need the model to reason about ordering or data flow.
5. Append the Project Context Appendix filled with your stages or constraints.

---

## Architecture Snapshot

```text
- ModularComponent is a factory for React components/hooks; you never write the component function directly.
- Each `.with(StageFn())` call adds a stage to an ordered pipeline. Stages fill fields on a shared arguments map
  (e.g. `props`, `lifecycle`, `render`, or any custom key).
- Downstream stages can read everything upstream provided. A field can be assigned once; use `.force*` to override deliberately.
- A render stage must return React nodes. If no render is defined, the factory injects a `() => null` render.
- The factory result is both a React component and a bundle of helpers (`withDefaultProps`, `withLifecycle`, etc.).
- You can turn the pipeline into hooks via `.use()` or isolate a field via `.stage('field')` for testing.

Reference doc: https://modularcomponent.dev/docs/concepts
```

## Factory Contract

```text
Base factory:
  const MyComponent = ModularComponent<Props, Ref?>(displayName?)
  - Optional `displayName` sets `Component.displayName` for React DevTools.
  - Generic `Props` defines accepted props. Generic `Ref` enables forwarding via `forwardRef`.

Stage methods:
  .with(stageFn())          // add/replace a field; respects type constraints
  .force(stageFn())         // same as with() but bypasses constraint compatibility
  .withFoo(...)             // created via ModularComponent.register({ foo })
  - Stage functions must return `{ field: string; provide(args) => value }`.
  - `provide` receives all previously defined fields, plus `props` and `ref`.

Hooks/extraction helpers:
  .use()            // returns a hook giving the full arguments map (or requires props if needed)
  .use('field')     // returns just the specified field; stops pipeline after that stage
  .stage('field')   // returns a hook (or component if field renders React nodes) for isolated testing

Display name helper:
  .withDisplayName('Name')  // set displayName mid-pipeline if you skipped the constructor arg or if you're
                            // reusing a base pipeline to build multiple components
```

## Stage & Extension Cheat Sheet

```text
Built-in / official stage sources:
  | Package                                    | Stage helpers                                     | Field(s)                  | Purpose                                         |
  |--------------------------------------------|---------------------------------------------------|---------------------------|-------------------------------------------------|
  | @modular-component/default                 | defaultProps, lifecycle, render                   | props, lifecycle, render  | Sensible defaults to get started quickly.       |
  | @modular-component/with-default-props      | defaultProps                                      | props                     | Provide default prop values & tighten types.    |
  | @modular-component/with-lifecycle          | lifecycle                                         | lifecycle                 | Run React hooks/business logic outside render.  |
  | @modular-component/with-fragment           | fragment, fragments                               | User-provided             | Add React nodes fragments to be used in render. |
  | @modular-component/with-components         | components                                        | components                | Inject other components into the pipeline.      |
  | @modular-component/with-conditional-render | condition, conditionalFallback, conditionalRender | User-provided, render     | Guard render output with conditions.            |

Describe your own stage like this:
  Stage name: withLocale(key)
  Field added: locale
  Returns: (args) => string lookup function
  Depends on: props (for language), store (for active locale)
```

## Example Pipeline (copy/adapt)

```tsx
import { ModularComponent } from '@modular-component/core'
import '@modular-component/default/register'
import { withLocale } from './stages/with-locale'
import { withAnalytics } from './stages/with-analytics'

const UserCard = ModularComponent<{ userId: string }>('UserCard')
  .withDefaultProps({ })
  .withAnalytics(({ props }) => ({ eventPrefix: 'user_card', userId: props.userId }))
  .withLocale('user.card')
  .withLifecycle(({ props, locale }) => {
    const [user, setUser] = useUser(props.userId)
    return { user, title: locale('title') }
  })
  .withRender(({ lifecycle }) => (
    <section>
      <h2>{lifecycle.title}</h2>
      <p>{lifecycle.user?.name ?? 'Loading'}</p>
    </section>
  ))
```

```text
Key reasoning hooks for LLMs:
- Stage order: `withAnalytics` runs before `withLocale`, so analytics can’t consume locale.
- Lifecycle exposes `{ user, title }`, render reads it; no other stage after render will run for components.
- `.withDefaultProps({})` reminds the reader that props typing can be tightened there.
```

## Project Context Appendix

```text
Paste this appendix into your prompt and fill in the blanks.

Custom stage catalog (edit rows):
  | Stage name                | Field provided | Depends on                  | Returns / side effects                | Sample invocation           |
  |---------------------------|----------------|-----------------------------|--------------------------------------|-----------------------------|
  | withLocale(key: string)   | locale         | props.language, store.locale| (token) => string lookup (memoized)  | .withLocale('user.card')    |
  | ...                       | ...            | ...                         | ...                                  | ...                         |

Domain constraints / invariants:
  - Never render without `locale` because translations drive accessibility requirements.
  - All analytics events must include `tenantId` from props or fall back to auth context.
  - `withFeatureFlag` must precede any stage that checks `featureFlags`.

Testing hooks cheatsheet:
  | Field        | `.stage()` helper                | Inputs you must provide manually                          |
  |------------- |---------------------------------|-----------------------------------------------------------|
  | lifecycle    | MyComponent.stage('lifecycle')  | `props` defaults, upstream args (`locale`, `store`, …)    |
  | render       | MyComponent.stage('render')     | Provide `props`, `lifecycle`, extra arguments for render  |
  | customField  | <Component>.stage('customField')| Document here so the LLM knows what fake data to supply   |

Fill these rows once per project so LLMs can ingest them instantly.
```

## Troubleshooting quick refs

```text
- Render missing: ensure a `.withRender` (or equivalent) exists.
- Stage conflicts: TypeScript errors often mean two stages write the same field; remove the duplicate or switch to `.force` on purpose.
- Custom stage typing: register runtime via `ModularComponent.register({ foo })`, then add module augmentation so TypeScript understands `.withFoo` helpers. (Details: docs/usage/writing-custom-stages.md)
- Hooks vs components: `.use()` returns hooks; `.stage()` returns hook/component for isolated testing. They do not run downstream stages beyond the targeted field.
```

### Diagnostic checklist (copy/paste when debugging)

```text
| Symptom                          | Likely root cause                             | Files/API to inspect                          | Prompt hint                                                             |
|----------------------------------|-----------------------------------------------|-----------------------------------------------|-------------------------------------------------------------------------|
| Stage says value is `undefined`  | Stage order wrong or missing dependency       | Component definition + stage catalog          | Verify `withLocale` appears before `withRender`; restructure if needed. |
| Types fail after registering stage | Module augmentation missing or incorrect    | types.d.ts, ModularComponent.register calls   | Confirm runtime + typing registration both run; re-sync declare module. |
| Hook returns stale data          | Stage recreates objects each render           | Lifecycle stage implementation                | Wrap returned functions in `useCallback`/`useMemo` with proper deps.     |
| `.stage()` tests crash           | Required args not injected when calling stage | Test helpers + stage docs                     | Provide fake `props`, `locale`, and `store` objects before invoking.     |
| Render never runs                | No `render` stage or stage replaced downstream| Component factory + registration order        | Ensure `.withRender` exists and isn’t overwritten by later `.with`.     |

Use this table verbatim so the LLM can scan symptoms quickly.
```

Feel free to append your own team-specific stages or constraints when sharing with an LLM.
