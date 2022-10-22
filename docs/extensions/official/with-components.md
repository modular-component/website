# @modular-component/with-components

Provides a `withComponents` stage that fills the `components` argument with
a map of React components. Useful when running tests in an environment that
does not allow module mocking: sub-components can be stubbed in tests by
calling the stage again to replace their implementations.
