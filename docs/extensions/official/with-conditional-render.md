# @modular-component/with-conditional-render

Provides three stages that allow conditional rendering in `ModularComponent`s:

- `withCondition` will set a `condition` argument to either `true` or `false`, based
  on current arguments,
- `withConditionalFallback` takes a `FunctionComponent` as parameter, and
  renders it when the `condition` argument is set to `false`,
- `withConditionalRender` also takes a `FunctionComponent` as parameter, and
  renders it when the `condition` argument is _not_ set to `false`.

`withCondition` and `withConditionalFallback` are multiple, so it's possible
to chain multiple conditions with a different fallback for each. Subsequent calls
to `withCondition` will take into account preceding conditions, so that `withConditionalRender`
is only called when all conditions return `true`.
