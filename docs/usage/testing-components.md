---
sidebar_position: 4
---

# Testing Components

Finally, the last interesting use-case enabled by using `ModularComponent` is component testing. In particular,
it allows writing component tests as true **unit-tests**, instead of semi-integration tests.

:::caution Disclaimer
There are a lot of strategies and advice for testing React components. Some of the things highlighted
in this section might not make sense in the context of some of those strategies, or could even
be considered _bad practice_.

However, this section is inspired by the development of an actual application where applying the 
described strategies tremendously helped us increase the quality of our tests, as well as the speed
at which we could write them.
:::

## Rationale

When testing components, we often learn to write tests that emulates the way a user would interact with the component.
While this is perfectly sound advice, those end-up being more integration tests than unit testing, since we're
mixing logic and UI tests in one suite.

For complex components such as forms, this also brings a lot of complexity in tests, or even duplication: to test various
form submit scenarios for instance, we need to run steps to bring the form to a desired state first. This can get out of
hand fairly quickly.

This can be helped by splitting the form into smaller components of course, where the submit button or form wrapper would
receive the form state as props ; or it can be improved a bit by extracting the logic into a custom hook, which can get
tested in isolation. But this only delays the problem, as testing the final component will still be dependent on the
logic and the internal state from the hook.

With `ModularComponent`, all this fades away thanks to **component stage isolation and mocking**. Each stage can easily
be isolated from the rest of the pipeline by using a dedicated method: the `stage()` method.

In this document, we'll look at a simple login form component, looking like this:

```tsx
import { useState } from 'react'
import { ModularComponent } from './modular-component'

const LoginForm = ModularComponent()
  .with(router())
  .with(services(['userSession']))
  .with(locale('components.login-form'))
  .with(lifecycle(({ services, router }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    const valid = !!email && !!password
    
    const handleChange = (field: 'email' | 'password') => {
      const setter = { email: setEmail, password: setPassword }[field]
      return (e: { currentTarget: { value: string } }) => {
        setter(e.currentTarget.value)
      }
    }
    
    const handleSubmit = async () => {
      if (!valid) {
        setError('all-fields-are-required')
        return
      }
      
      try {
        await services.userSession.login(email, password)
        router.navigate('/profile')
      } catch (err: { code: string }) {
        setError(err.code)
      }
    }
    
    return {
      email,
      password,
      error,
      handleEmailChange: handleChange('email'),
      handlePasswordChange: handleChange('password'),
      handleSubmit
    }
  }))
  .with(render(({ lifecycle, locale }) => (
    <form onSubmit={lifecycle.handleSubmit}>
      <input 
        placeholder={locale('placeholders.email')} 
        type="text" 
        value={lifecycle.email} 
        onChange={lifecycle.handleEmailChange} 
      />
      <input
        placeholder={locale('placeholders.password')}
        type="password" 
        value={lifecycle.password}
        onChange={lifecycle.handlePasswordChange}
      />
      { !!lifecycle.error && <span>{locale(lifecycle.error) || locale('unknown-error')}</span> }
      <button type="submit">{locale('submit')}</button>
    </form>
  )))
```

The `with(router)` and `with(services)` are imaginary custom stages that inject the routing mechanism and our backend
services into the argument map. `with(locale)` is a localization stage that turns localization codes into localized strings.

In our tests, we want to make sure of a few things:

- Given an incorrect state of the form, submitting should not call the backend service and raise an error
- Given a correct state of the form, submitting should call the backend service
- Upon success of the backend call, a navigation event to `/profile` is triggered
- Upon failure of the backend call, an error is raised
- Submitting the HTML form calls our submit routine
- Our HTML form elements are linked to our state
- The correct messages are read from our localization system

The first four items are _logic tests_, and thanks to our modular architecture, are the sole responsibility of
the **lifecycle stage**. The last three are _UI tests_, and are the responsibility of the **render stage**.

Now let's see how `ModularComponent` helps us test each point easily.

## Testing lifecycle in isolation

We will write our tests stage by stage, from top to bottom. In our case only two stages contain custom logic: the `lifecycle`
and `render` stages.

The first part is testing the lifecycle. First, let's take a look at the upstream stages consumed by the lifecycle:

```tsx 
  // Depends on services 👇...
  .with(lifecycle(({ services, router }) => ...
  // ... and on a routing system 👆
```

As we can see, our lifecycle depends on our backend services, and our routing system. Thankfully, both of those stages
are already validated in their own dedicated test suites, so the component does not need to worry about them. We can
easily mock those away:

```tsx
const mocks = {
  router: {
    navigate: mock.fn()
  },
  services: {
    userSession: {
      login: mock.fn()
    }
  }
}
```

Now that we've prepared the mocks for the arguments consumed by our stage, we can isolate our stage function
through the dedicated `stage()` method:

```tsx
const mocks = {
  // ...
}

const useLifecycle = LoginForm.stage('lifecycle')
```

The generated hook takes in parameter a partial representation of arguments map, allowing you to only pass the upstream stages you know
to be relevant. We can easily pass it our mocks we generated earlier.

We therefore get a `useLifecycle` hook that can be tested in isolation, just as if we'd written
it as a separate function. We can now test it out with our preferred hook testing library. Here is how things could look:

<details>
<summary>Lifecycle tests</summary>
<p>

```tsx
it('should provide an updatable email field', () => {
  // Arrange
  const { result } = renderHook(() => useLifecycle(mocks))
  
  // Assert initial state
  expect(result.current.email).toEqual('')
  
  // Act
  result.current.handleEmailChange({ currentTarget: { value: 'test@mail.com'} })
  
  // Assert
  expect(result.current.email).toEqual('test@mail.com')
})

it('should provide an updatable password field', () => {
  // Arrange
  const { result } = renderHook(() => useLifecycle(mocks))

  // Assert initial state
  expect(result.current.password).toEqual('')

  // Act
  result.current.handlePasswordChange({ currentTarget: { value: 'S3curePassw0rd'} })

  // Assert
  expect(result.current.password).toEqual('S3curePassw0rd')
})

it('should not submit if form fields are empty, and raise an error', () => {
  // Arrange
  const { login } = mocks.services.userSession
  login.reset()
  
  const { result } = renderHook(() => useLifecycle(mocks))
  
  // Assert initial state
  expect(login).not.toHaveBeenCalled()
  expect(result.current.error).toEqual('')
  
  // Act
  result.current.handleSubmit()
  
  // Assert
  expect(login).not.toHaveBeenCalled()
  expect(result.current.error).toEqual('all-fields-are-required')
})

it('should submit if form fields are set, and navigate upon success', () => {
  // Arrange
  const { login } = mocks.services.userSession
  login.reset()
  const { navigate } = mocks.router
  navigate.reset()

  const { result } = renderHook(() => useLifecycle(mocks))

  // Assert initial state
  expect(login).not.toHaveBeenCalled()
  expect(navigate).not.toHaveBeenCalled()
  expect(result.current.error).toEqual('')

  // Act
  result.current.handleEmailChange({ currentTarget: { value: 'test@mail.com'} })
  result.current.handlePasswordChange({ currentTarget: { value: 'S3curePassw0rd'} })
  result.current.handleSubmit()

  // Assert
  expect(login).toHaveBeenCalled()
  expect(login).toHaveBeenCalledWith('test@mail.com', 'S3curePassw0rd')
  
  expect(navigate).toHaveBeenCalled()
  expect(navigate).toHaveBeenCalledWith('/profile')

  expect(result.current.error).toEqual('')
})

it('should submit if form fields are set, and raise an error upon failure', () => {
  // Arrange
  const { login } = mocks.services.userSession
  login.reset()
  login.rejects({ code: 'invalid-credentials' })
  const { navigate } = mocks.router
  navigate.reset()

  const { result } = renderHook(() => useLifecycle(mocks))

  // Assert initial state
  expect(login).not.toHaveBeenCalled()
  expect(navigate).not.toHaveBeenCalled()
  expect(result.current.error).toEqual('')

  // Act
  result.current.handleEmailChange({ currentTarget: { value: 'test@mail.com'} })
  result.current.handlePasswordChange({ currentTarget: { value: 'S3curePassw0rd'} })
  result.current.handleSubmit()

  // Assert
  expect(login).toHaveBeenCalled()
  expect(login).toHaveBeenCalledWith('test@mail.com', 'S3curePassw0rd')

  expect(navigate).not.toHaveBeenCalled()

  expect(result.current.error).toEqual('invalid-credentials')
})
```

</p>
</details>

And just like this, we tested all our scenarios for logic, while achieving 100% code coverage.

## Testing the render phase with controlled lifecycle

With our lifecycle behavior tested for all our scenarios, we can move on to testing our render phase.
Here, we basically want to check that we correctly draw all required elements (a form, two input, a button),
_and that interacting with them calls the correct functions in our lifecycle_. Behavior of the lifecycle itself
is not needed in those tests, as we've already validated it.

But we also want to see how our render _adapts_ to values returned by the lifecycle. Fortunately, this can 
easily be done by _mocking the stages required by the render_.

Once again, let's look at what stages our render phase requires:

```tsx 
  // Use the lifecycle 👇...
  .withRender(({ lifecycle, locale }) => ...
  // ... and a locale system  👆
```

In order to isolate our render, we can mock the lifecycle and locale stages. Mocking the locale stage is optional,
and it might make sense for your setup to test specific wording and language variant in your unit tests, but let's say
we mock it here for the sake of documentation.

```tsx
const mocks = {
  locale: mock.fn().implementation((key: string) => key),
  lifecycle: {
    email: 'test@mail.com',
    password: 'S3curePassw0rd',
    error: '',
    handleChange: mock.fn(),
    handleSubmit: mock.fn()
  }
}

const Component = LoginForm.stage('render')
```

With this, we get our render stage isolated from its upstream stages, with full control on values passed down through
the argument map. We mocked the lifecycle with default values, and the locale with an identity function for now.

Our render tests could look like the following:

<details>
<summary>Render tests</summary>
<p>

```tsx
it('should render an email input controlled by lifecycle', () => {
  // Arrange
  const onChange = mocks.lifecycle.handleEmailChange
  onChange.reset()

  const { getByPlaceholder } = render(<Component {...mocks} />)
  
  // Assert initial state
  const emailInput = getByPlaceholder('placeholders.email')
  
  expect(emailInput).toExist()
  expect(emailInput.value).toEqual('test@mail.com')
  
  expect(onChange).not.toHaveBeenCalled()
  
  // Act
  userEvent.input(emailInput, 'new@mail.com')
  
  // Assert
  expect(onChange).toHaveBeenCalled()
  expect(onChange).toHaveBeenCalledWith({ currentTarget: { value: 'new@mail.com'} })
})

it('should render a password input controlled by lifecycle', () => {
  // Arrange
  const onChange = mocks.lifecycle.handlePasswordChange
  onChange.reset()

  const { getByPlaceholder } = render(<Component {...mocks} />)

  // Assert initial state
  const passwordInput = getByPlaceholder('placeholders.password')

  expect(passwordInput).toExist()
  expect(passwordInput.value).toEqual('S3curePassw0rd')

  expect(onChange).not.toHaveBeenCalled()

  // Act
  userEvent.input(passwordInput, 'insecure-password')

  // Assert
  expect(onChange).toHaveBeenCalled()
  expect(onChange).toHaveBeenCalledWith({ currentTarget: { value: 'insecure-password'} })
})

it('should call the submit handler on form submit', () => {
  // Arrange
  const onSubmit = mocks.lifecycle.handlePasswordChange
  onSubmit.reset()

  const { getByRole } = render(<Component {...mocks} />)

  // Assert initial state
  const submitButton = getByRole('button')

  expect(submitButton).toExist()
  expect(submitButton.innerText).toEqual('submit')

  expect(onSubmit).not.toHaveBeenCalled()

  // Act
  userEvent.click(submitButton)

  // Assert
  expect(onSubmit).toHaveBeenCalled()
})

it('should translate known error codes', () => {
  // Arrange
  mocks.lifecycle.error = 'a-known-error'
  
  const { getByText, rerender } = render(<Component {...mocks} />)
  
  // Assert
  expect(getByText('a-known-error')).toExist()

  // Re-arrange
  mocks.lifecycle.error = 'another-known-error'
  rerender(<Component {...mocks} />)
  
  // Assert
  expect(getByText('a-known-error')).not.toExist()
  expect(getByText('another-known-error')).toExist()
})

it('should render a default value for unknwon errors', () => {
  // Arrange
  mocks.locale.implementation((key: string) => key === 'an-uknown-error-that-will-get-ignored' ? null : key)
  mocks.lifecycle.error = 'an-uknown-error-that-will-get-ignored'

  const { getByText } = render(<Component {...mocks} />)

  // Assert
  expect(getByText('an-uknown-error-that-will-get-ignored')).not.toExist()
  expect(getByText('unknown-error')).toExist()
})

it('should not render errors at all when it\'s empty', () => {
  // Arrange
  mocks.locale.implementation((key: string) => key)
  mocks.lifecycle.error = ''

  const { getByText } = render(<Component {...mocks} />)
  
  // Assert
  expect(getByText('unknown-error')).not.toExist()
})
```

</p>
</details>

And with this, we finished covering all the render scenarios that we wanted. Both our lifecycle stage and render stage
are now covered and tested, without having one leak into the other, keeping our tests unitary.

## Abstracting sub-components in composed components

Our simple component only uses intrinsic HTML elements, but often our components are composed of other components too.

Let's imagine that we want to replace the inputs in our example with custom dedicated `Input`s components:

```tsx
<form onSubmit={lifecycle.handleSubmit}>
  <EmailInput
    placeholder={locale('placeholders.email')} 
    value={lifecycle.email} 
    onChange={lifecycle.handleEmailChange} 
  />
  <PasswordInput
    placeholder={locale('placeholders.password')}
    value={lifecycle.password}
    onChange={lifecycle.handlePasswordChange}
  />
  { !!lifecycle.error && <span>{locale(lifecycle.error) || locale('unknown-error')}</span> }
  <button type="submit">{locale('submit')}</button>
</form>
```

Now it's possible that those components have some internals that make it difficult to test our form without knowing
the internal behavior of the components. Our tests would become tightly coupled, and we don't want that. 
Here for instance, we cannot reliably know how to select the actual HTML input or to trigger the `onChange` callback.
But what if we could select the _component instance_ instead, and manually trigger callback props?

For this use-case, we could use a components stage to easily allow mocking our sub-components without relying on module
mocking. For that, let's update our component:

```tsx
import { useState } from 'react'
import { ModularComponent } from './modular-component'

// highlight-next-line
import { EmailInput, PasswordInput } from './shared-inputs'

const LoginForm = ModularComponent()
  .with(router())
  .with(services(['userSession']))
  .with(locale('components.login-form'))
  // highlight-next-line
  .with(components({ EmailInput, PasswordInput }))
  .with(lifecycle(({ services, router }) => {
    // ... omitted for brevity
  }))
  // highlight-next-line
  .with(render(({ lifecycle, locale, components }) => (
    <form onSubmit={lifecycle.handleSubmit}>
      // highlight-next-line
      <components.EmailInput 
        placeholder={locale('placeholders.email')} 
        value={lifecycle.email} 
        onChange={lifecycle.handleEmailChange} 
      />
      // highlight-next-line
      <components.PasswordInput
        placeholder={locale('placeholders.password')}
        value={lifecycle.password}
        onChange={lifecycle.handlePasswordChange}
      />
      { !!lifecycle.error && <span>{locale(lifecycle.error) || locale('unknown-error')}</span> }
      <button type="submit">{locale('submit')}</button>
    </form>
  )))
```

Notice how in the render, we use the components injected by the `with(components)` stage. Thanks to that, it becomes
easy to replace them by dummy implementations in our tests.

For instance, we could reduce them to standard inputs:

```tsx
const mocks = {
  ...,
  components: { EmailInput: 'input', PasswordInput: 'input' }
}
```

This way, the tests we added previously will keep working, but that only works if the props are compatible.

A better alternative is to use mocks for components instead:

```tsx
const mocks = {
  ...,
  components: {
    EmailInput: mock.fn().returns(<div data-testid="email-input" />),
    PasswordInput: mock.fn().returns(<div data-testid="password-input" />)
  }
}
```

Thanks to this, we can now use those mocks in our tests to validate the expected props are passed down:

```tsx
it('should render an email input controlled by lifecycle', () => {
  // Arrange
  const emailInput = mocks.components.EmailInput

  const { getByTestId } = render(<Component {...mocks} />)
  
  // Assert
  expect(getByTestId('email-input')).toExist()
  expect(emailInput).toHaveBeenCalled()
  expect(emailInput).toHaveBeenCalledWith({
    placeholder: 'placeholders.email',
    value: mocks.lifecycle.email,
    onChange: mocks.lifecycle.handleEmailChange
  })
})
```
