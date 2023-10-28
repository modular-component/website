---
sidebar_position: 3
---

# Reusing Components

One use case enabled by `ModularComponent` is reusing component logic at a higher level than component composition,
but a more specific level than extracting logic into hooks.

This is permitted by two characteristics of `ModularComponent`:

- The factory is immutable, meaning that each new stage addition creates a brand-new component, leaving the previous
  one untouched,
- The `with` method called on an existing field _replaces the previous implementation at its current position in the pipeline_, 
  rather than adding a new stage.

Thanks to that, it's possible to take a full-fledged component, and replace only specific stages to create a slightly
different component. For instance, once could replace the lifecycle stage of a component while keeping the render stage
the same; or the other way around, keep a component logic, but switch the render phase.

## Replacing the render phase

Imagine a component that needs to be used in both a web-based application, and a React Native application. Since React Native
and the web don't share their primitive components (HTML tags on the web, and built-in components (Text, View...) in React Native),
only the logic can be reused.

Before the introduction of hooks, the recommended way to deal with that was to create a _headless_ component for handling
the logic, that then passed it down to a _dumb_ component either via props (using a render function for instance), or via context:

```tsx
import { MyComponentHeadlessLogic } from './my-component.headless-logic'

const MyWebInterface = (props) => (
  // Something web specific
)

export const MyWebComponent = (props) => (
  <MyComponentHeadlessLogic {...props}>{p => <MyWebInterface {...p} />}</MyComponentHeadlessLogic>
)

const MyNativeInterface = (props) => (
  // Something react-native specific
)

export const MyNativeComponent = (props) => (
  <MyComponentHeadlessLogic {...props}>{p => <MyNativeInterface {...p} />}</MyComponentHeadlessLogic>
)
```

While there is nothing wrong with this approach, we still end up creating 5 components where we really only need 2.

With the introduction of hooks, the headless logic could instead be abstracted to a custom hook, that can be consumed
by both our implementations:

```tsx
import { useMyComponentLogic, MyComponentProps } from './use-my-component-logic'

export const MyWebComponent = (props: MyComponentProps) => {
  const logic = useMyComponentLogic(props)
  
  return (
    // Something web specific
  )
}

export const MyNativeComponent = (props: MyComponentProps) => {
  const logic = useMyComponentLogic(props)

  return (
    // Something react-native specific
  )
}
```

This is already much better, we only deal with 2 components this time, with one shared hook for the logic, and one
shared type for the props.

But what if we could simply _reuse a main component definition_, which would already handle the logic and the props
definition, and concentrate on what matters here: the platform-specific implementation?

Here is how this could look like using `ModularComponent`:

```tsx
export const MyWebComponent = ModularComponent<{
  // Inline props type definition
}>()
  .with(Stage.lifecycle(({ props }) => {
    // Shared logic, can consume the props
  }))
  .with(Stage.render(({ props, lifecycle }) => (
    // Web-specific interface, can consume the props and the state
  )))

export const MyNativeComponent = MyWebComponent
  // Replace only the render stage
  .with(Stage.render(({ props, lifecycle }) => (
    // React native-specific interface, can consume the props and the state
  )))
```

This is even better! Now we only have two variables to juggle with, and those are the two components we wanted to create
in the first place.

Our logic and props type are reusable without having to pass a function and type definition around.

## Replacing a custom stage

There are also cases where a shared render stage (and even shared custom stages) makes a lot of sense. Let's take a concrete
example: an application with a signup confirmation flow, and a password reinitialisation flow. Both those flows share
two steps in common: 

1. After submitting the signup form or an email for password reinitialisation, a "confirmation email sent" screen is 
   displayed, optionally allowing to resend a new one.
2. After confirming the signup/setting the new password, a final "your account is now ready"/"your new password is now ready"
   screen is displayed.

Both those screens share a lot of things, both in terms of logic and layout. The small variations between them are mostly
in copy, and a small bit of logic to send the correct email upon request.

All of this can easily be done using `ModularComponent`, with minimal duplication and maximal reuse. Let's take the
"confirmation email sent" screen as example:

```tsx
export const SignupConfirmationEmailSent = ModularComponent()
  // Localization data for our signup confirmation screen
  .with(Stage.locale('screens.signup.confirmation-email-sent'))
  .with(Stage.defaultProps({
    resendEmail: () => {
      // Logic to resend the email for signup confirmation
    }
  }))
  .with(Stage.lifecycle(({ props }) => {
    // Shared screen logic: opening the "resend email" confirmation modal, calling props.resendEmail when needed...
  }))
  .with(Stage.render(({ props, lifecycle, locale }) => (
    // Shared render: consume the passed locale for the copy, has access to props and the lifecycle logic
  )))

export const PasswordResetConfirmationEmailSent = SignupConfirmationEmailSent
  // Replace the locale with the password-reset variant. As long as the keys are the same, the render will keep working
  .with(Stage.locale('screens.password-reset.confirmation-email-sent'))
  .with(Stage.defaultProps({
    resendEmail: () => {
      // Different logic to resend the email for password reset
    }
  }))
```

As we can see, the `PasswordResetConfirmationEmailSent` implementation is really simple, reusing both the lifecycle
and render stages of the `SignupConfirmationEmailSent`, simply switching up the locale and `resendEmail` implementations.
