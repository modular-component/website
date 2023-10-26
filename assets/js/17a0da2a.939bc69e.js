"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[271],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>d});var o=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,o,a=function(e,n){if(null==e)return{};var t,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=o.createContext({}),c=function(e){var n=o.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=c(e.components);return o.createElement(i.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},m=o.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=c(t),d=a,h=m["".concat(i,".").concat(d)]||m[d]||p[d]||r;return t?o.createElement(h,s(s({ref:n},u),{},{components:t})):o.createElement(h,s({ref:n},u))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,s=new Array(r);s[0]=m;var l={};for(var i in n)hasOwnProperty.call(n,i)&&(l[i]=n[i]);l.originalType=e,l.mdxType="string"==typeof e?e:a,s[1]=l;for(var c=2;c<r;c++)s[c]=t[c];return o.createElement.apply(null,s)}return o.createElement.apply(null,t)}m.displayName="MDXCreateElement"},3848:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var o=t(7462),a=(t(7294),t(3905));const r={sidebar_position:4},s="Testing Components",l={unversionedId:"usage/testing-components",id:"usage/testing-components",title:"Testing Components",description:"Finally, the last interesting use-case enabled by using ModularComponent is component testing. In particular,",source:"@site/docs/usage/testing-components.md",sourceDirName:"usage",slug:"/usage/testing-components",permalink:"/docs/usage/testing-components",draft:!1,editUrl:"https://github.com/modular-component/website/docs/usage/testing-components.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Reusing Components",permalink:"/docs/usage/reusing-components"},next:{title:"The extension system",permalink:"/docs/extensions/writing-extensions"}},i={},c=[{value:"Rationale",id:"rationale",level:2},{value:"Testing lifecycle in isolation",id:"testing-lifecycle-in-isolation",level:2},{value:"Testing the render phase with controlled lifecycle",id:"testing-the-render-phase-with-controlled-lifecycle",level:2},{value:"Abstracting sub-components in composed components",id:"abstracting-sub-components-in-composed-components",level:2}],u={toc:c};function p(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,o.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"testing-components"},"Testing Components"),(0,a.kt)("p",null,"Finally, the last interesting use-case enabled by using ",(0,a.kt)("inlineCode",{parentName:"p"},"ModularComponent")," is component testing. In particular,\nit allows writing component tests as true ",(0,a.kt)("strong",{parentName:"p"},"unit-tests"),", instead of semi-integration tests."),(0,a.kt)("admonition",{title:"Disclaimer",type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"There are a lot of strategies and advice for testing React components. Some of the things highlighted\nin this section might not make sense in the context of some of those strategies, or could even\nbe considered ",(0,a.kt)("em",{parentName:"p"},"bad practice"),"."),(0,a.kt)("p",{parentName:"admonition"},"However, this section is inspired by the development of an actual application where applying the\ndescribed strategies tremendously helped us increase the quality of our tests, as well as the speed\nat which we could write them.")),(0,a.kt)("h2",{id:"rationale"},"Rationale"),(0,a.kt)("p",null,"When testing components, we often learn to write tests that emulates the way a user would interact with the component.\nWhile this is perfectly sound advice, those end-up being more integration tests than unit testing, since we're\nmixing logic and UI tests in one suite."),(0,a.kt)("p",null,"For complex components such as forms, this also brings a lot of complexity in tests, or even duplication: to test various\nform submit scenarios for instance, we need to run steps to bring the form to a desired state first. This can get out of\nhand fairly quickly."),(0,a.kt)("p",null,"This can be helped by splitting the form into smaller components of course, where the submit button or form wrapper would\nreceive the form state as props ; or it can be improved a bit by extracting the logic into a custom hook, which can get\ntested in isolation. But this only delays the problem, as testing the final component will still be dependent on the\nlogic and the internal state from the hook."),(0,a.kt)("p",null,"With ",(0,a.kt)("inlineCode",{parentName:"p"},"ModularComponent"),", all this fades away thanks to ",(0,a.kt)("strong",{parentName:"p"},"component stage isolation and mocking"),". Each stage can easily\nbe isolated from the rest of the pipeline by using a dedicated method: the ",(0,a.kt)("inlineCode",{parentName:"p"},"stage()")," method."),(0,a.kt)("p",null,"In this document, we'll look at a simple login form component, looking like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"import { useState } from 'react'\nimport { ModularComponent } from './modular-component'\n\nconst LoginForm = ModularComponent()\n  .with(router())\n  .with(services(['userSession']))\n  .with(locale('components.login-form'))\n  .with(lifecycle(({ services, router }) => {\n    const [email, setEmail] = useState('')\n    const [password, setPassword] = useState('')\n    const [error, setError] = useState('')\n    \n    const valid = !!email && !!password\n    \n    const handleChange = (field: 'email' | 'password') => {\n      const setter = { email: setEmail, password: setPassword }[field]\n      return (e: { currentTarget: { value: string } }) => {\n        setter(e.currentTarget.value)\n      }\n    }\n    \n    const handleSubmit = async () => {\n      if (!valid) {\n        setError('all-fields-are-required')\n        return\n      }\n      \n      try {\n        await services.userSession.login(email, password)\n        router.navigate('/profile')\n      } catch (err: { code: string }) {\n        setError(err.code)\n      }\n    }\n    \n    return {\n      email,\n      password,\n      error,\n      handleEmailChange: handleChange('email'),\n      handlePasswordChange: handleChange('password'),\n      handleSubmit\n    }\n  }))\n  .with(render(({ lifecycle, locale }) => (\n    <form onSubmit={lifecycle.handleSubmit}>\n      <input \n        placeholder={locale('placeholders.email')} \n        type=\"text\" \n        value={lifecycle.email} \n        onChange={lifecycle.handleEmailChange} \n      />\n      <input\n        placeholder={locale('placeholders.password')}\n        type=\"password\" \n        value={lifecycle.password}\n        onChange={lifecycle.handlePasswordChange}\n      />\n      { !!lifecycle.error && <span>{locale(lifecycle.error) || locale('unknown-error')}</span> }\n      <button type=\"submit\">{locale('submit')}</button>\n    </form>\n  )))\n")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"with(router)")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"with(services)")," are imaginary custom stages that inject the routing mechanism and our backend\nservices into the argument map. ",(0,a.kt)("inlineCode",{parentName:"p"},"with(locale)")," is a localization stage that turns localization codes into localized strings."),(0,a.kt)("p",null,"In our tests, we want to make sure of a few things:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Given an incorrect state of the form, submitting should not call the backend service and raise an error"),(0,a.kt)("li",{parentName:"ul"},"Given a correct state of the form, submitting should call the backend service"),(0,a.kt)("li",{parentName:"ul"},"Upon success of the backend call, a navigation event to ",(0,a.kt)("inlineCode",{parentName:"li"},"/profile")," is triggered"),(0,a.kt)("li",{parentName:"ul"},"Upon failure of the backend call, an error is raised"),(0,a.kt)("li",{parentName:"ul"},"Submitting the HTML form calls our submit routine"),(0,a.kt)("li",{parentName:"ul"},"Our HTML form elements are linked to our state"),(0,a.kt)("li",{parentName:"ul"},"The correct messages are read from our localization system")),(0,a.kt)("p",null,"The first four items are ",(0,a.kt)("em",{parentName:"p"},"logic tests"),", and thanks to our modular architecture, are the sole responsibility of\nthe ",(0,a.kt)("strong",{parentName:"p"},"lifecycle stage"),". The last three are ",(0,a.kt)("em",{parentName:"p"},"UI tests"),", and are the responsibility of the ",(0,a.kt)("strong",{parentName:"p"},"render stage"),"."),(0,a.kt)("p",null,"Now let's see how ",(0,a.kt)("inlineCode",{parentName:"p"},"ModularComponent")," helps us test each point easily."),(0,a.kt)("h2",{id:"testing-lifecycle-in-isolation"},"Testing lifecycle in isolation"),(0,a.kt)("p",null,"We will write our tests stage by stage, from top to bottom. In our case only two stages contain custom logic: the ",(0,a.kt)("inlineCode",{parentName:"p"},"lifecycle"),"\nand ",(0,a.kt)("inlineCode",{parentName:"p"},"render")," stages."),(0,a.kt)("p",null,"The first part is testing the lifecycle. First, let's take a look at the upstream stages consumed by the lifecycle:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"  // Depends on services \ud83d\udc47...\n  .with(lifecycle(({ services, router }) => ...\n  // ... and on a routing system \ud83d\udc46\n")),(0,a.kt)("p",null,"As we can see, our lifecycle depends on our backend services, and our routing system. Thankfully, both of those stages\nare already validated in their own dedicated test suites, so the component does not need to worry about them. We can\neasily mock those away:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"const mocks = {\n  router: {\n    navigate: mock.fn()\n  },\n  services: {\n    userSession: {\n      login: mock.fn()\n    }\n  }\n}\n")),(0,a.kt)("p",null,"Now that we've prepared the mocks for the arguments consumed by our stage, we can isolate our stage function\nthrough the dedicated ",(0,a.kt)("inlineCode",{parentName:"p"},"stage()")," method:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"const mocks = {\n  // ...\n}\n\nconst useLifecycle = LoginForm.stage('lifecycle')\n")),(0,a.kt)("p",null,"The generated hook takes in parameter a partial representation of arguments map, allowing you to only pass the upstream stages you know\nto be relevant. We can easily pass it our mocks we generated earlier."),(0,a.kt)("p",null,"We therefore get a ",(0,a.kt)("inlineCode",{parentName:"p"},"useLifecycle")," hook that can be tested in isolation, just as if we'd written\nit as a separate function. We can now test it out with our preferred hook testing library. Here is how things could look:"),(0,a.kt)("details",null,(0,a.kt)("summary",null,"Lifecycle tests"),(0,a.kt)("p",null,(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"it('should provide an updatable email field', () => {\n  // Arrange\n  const { result } = renderHook(() => useLifecycle(mocks))\n  \n  // Assert initial state\n  expect(result.current.email).toEqual('')\n  \n  // Act\n  result.current.handleEmailChange({ currentTarget: { value: 'test@mail.com'} })\n  \n  // Assert\n  expect(result.current.email).toEqual('test@mail.com')\n})\n\nit('should provide an updatable password field', () => {\n  // Arrange\n  const { result } = renderHook(() => useLifecycle(mocks))\n\n  // Assert initial state\n  expect(result.current.password).toEqual('')\n\n  // Act\n  result.current.handlePasswordChange({ currentTarget: { value: 'S3curePassw0rd'} })\n\n  // Assert\n  expect(result.current.password).toEqual('S3curePassw0rd')\n})\n\nit('should not submit if form fields are empty, and raise an error', () => {\n  // Arrange\n  const { login } = mocks.services.userSession\n  login.reset()\n  \n  const { result } = renderHook(() => useLifecycle(mocks))\n  \n  // Assert initial state\n  expect(login).not.toHaveBeenCalled()\n  expect(result.current.error).toEqual('')\n  \n  // Act\n  result.current.handleSubmit()\n  \n  // Assert\n  expect(login).not.toHaveBeenCalled()\n  expect(result.current.error).toEqual('all-fields-are-required')\n})\n\nit('should submit if form fields are set, and navigate upon success', () => {\n  // Arrange\n  const { login } = mocks.services.userSession\n  login.reset()\n  const { navigate } = mocks.router\n  navigate.reset()\n\n  const { result } = renderHook(() => useLifecycle(mocks))\n\n  // Assert initial state\n  expect(login).not.toHaveBeenCalled()\n  expect(navigate).not.toHaveBeenCalled()\n  expect(result.current.error).toEqual('')\n\n  // Act\n  result.current.handleEmailChange({ currentTarget: { value: 'test@mail.com'} })\n  result.current.handlePasswordChange({ currentTarget: { value: 'S3curePassw0rd'} })\n  result.current.handleSubmit()\n\n  // Assert\n  expect(login).toHaveBeenCalled()\n  expect(login).toHaveBeenCalledWith('test@mail.com', 'S3curePassw0rd')\n  \n  expect(navigate).toHaveBeenCalled()\n  expect(navigate).toHaveBeenCalledWith('/profile')\n\n  expect(result.current.error).toEqual('')\n})\n\nit('should submit if form fields are set, and raise an error upon failure', () => {\n  // Arrange\n  const { login } = mocks.services.userSession\n  login.reset()\n  login.rejects({ code: 'invalid-credentials' })\n  const { navigate } = mocks.router\n  navigate.reset()\n\n  const { result } = renderHook(() => useLifecycle(mocks))\n\n  // Assert initial state\n  expect(login).not.toHaveBeenCalled()\n  expect(navigate).not.toHaveBeenCalled()\n  expect(result.current.error).toEqual('')\n\n  // Act\n  result.current.handleEmailChange({ currentTarget: { value: 'test@mail.com'} })\n  result.current.handlePasswordChange({ currentTarget: { value: 'S3curePassw0rd'} })\n  result.current.handleSubmit()\n\n  // Assert\n  expect(login).toHaveBeenCalled()\n  expect(login).toHaveBeenCalledWith('test@mail.com', 'S3curePassw0rd')\n\n  expect(navigate).not.toHaveBeenCalled()\n\n  expect(result.current.error).toEqual('invalid-credentials')\n})\n")))),(0,a.kt)("p",null,"And just like this, we tested all our scenarios for logic, while achieving 100% code coverage."),(0,a.kt)("h2",{id:"testing-the-render-phase-with-controlled-lifecycle"},"Testing the render phase with controlled lifecycle"),(0,a.kt)("p",null,"With our lifecycle behavior tested for all our scenarios, we can move on to testing our render phase.\nHere, we basically want to check that we correctly draw all required elements (a form, two input, a button),\n",(0,a.kt)("em",{parentName:"p"},"and that interacting with them calls the correct functions in our lifecycle"),". Behavior of the lifecycle itself\nis not needed in those tests, as we've already validated it."),(0,a.kt)("p",null,"But we also want to see how our render ",(0,a.kt)("em",{parentName:"p"},"adapts")," to values returned by the lifecycle. Fortunately, this can\neasily be done by ",(0,a.kt)("em",{parentName:"p"},"mocking the stages required by the render"),"."),(0,a.kt)("p",null,"Once again, let's look at what stages our render phase requires:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"  // Use the lifecycle \ud83d\udc47...\n  .withRender(({ lifecycle, locale }) => ...\n  // ... and a locale system  \ud83d\udc46\n")),(0,a.kt)("p",null,"In order to isolate our render, we can mock the lifecycle and locale stages. Mocking the locale stage is optional,\nand it might make sense for your setup to test specific wording and language variant in your unit tests, but let's say\nwe mock it here for the sake of documentation."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"const mocks = {\n  locale: mock.fn().implementation((key: string) => key),\n  lifecycle: {\n    email: 'test@mail.com',\n    password: 'S3curePassw0rd',\n    error: '',\n    handleChange: mock.fn(),\n    handleSubmit: mock.fn()\n  }\n}\n\nconst Component = LoginForm.stage('render')\n")),(0,a.kt)("p",null,"With this, we get our render stage isolated from its upstream stages, with full control on values passed down through\nthe argument map. We mocked the lifecycle with default values, and the locale with an identity function for now."),(0,a.kt)("p",null,"Our render tests could look like the following:"),(0,a.kt)("details",null,(0,a.kt)("summary",null,"Render tests"),(0,a.kt)("p",null,(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"it('should render an email input controlled by lifecycle', () => {\n  // Arrange\n  const onChange = mocks.lifecycle.handleEmailChange\n  onChange.reset()\n\n  const { getByPlaceholder } = render(<Component {...mocks} />)\n  \n  // Assert initial state\n  const emailInput = getByPlaceholder('placeholders.email')\n  \n  expect(emailInput).toExist()\n  expect(emailInput.value).toEqual('test@mail.com')\n  \n  expect(onChange).not.toHaveBeenCalled()\n  \n  // Act\n  userEvent.input(emailInput, 'new@mail.com')\n  \n  // Assert\n  expect(onChange).toHaveBeenCalled()\n  expect(onChange).toHaveBeenCalledWith({ currentTarget: { value: 'new@mail.com'} })\n})\n\nit('should render a password input controlled by lifecycle', () => {\n  // Arrange\n  const onChange = mocks.lifecycle.handlePasswordChange\n  onChange.reset()\n\n  const { getByPlaceholder } = render(<Component {...mocks} />)\n\n  // Assert initial state\n  const passwordInput = getByPlaceholder('placeholders.password')\n\n  expect(passwordInput).toExist()\n  expect(passwordInput.value).toEqual('S3curePassw0rd')\n\n  expect(onChange).not.toHaveBeenCalled()\n\n  // Act\n  userEvent.input(passwordInput, 'insecure-password')\n\n  // Assert\n  expect(onChange).toHaveBeenCalled()\n  expect(onChange).toHaveBeenCalledWith({ currentTarget: { value: 'insecure-password'} })\n})\n\nit('should call the submit handler on form submit', () => {\n  // Arrange\n  const onSubmit = mocks.lifecycle.handlePasswordChange\n  onSubmit.reset()\n\n  const { getByRole } = render(<Component {...mocks} />)\n\n  // Assert initial state\n  const submitButton = getByRole('button')\n\n  expect(submitButton).toExist()\n  expect(submitButton.innerText).toEqual('submit')\n\n  expect(onSubmit).not.toHaveBeenCalled()\n\n  // Act\n  userEvent.click(submitButton)\n\n  // Assert\n  expect(onSubmit).toHaveBeenCalled()\n})\n\nit('should translate known error codes', () => {\n  // Arrange\n  mocks.lifecycle.error = 'a-known-error'\n  \n  const { getByText, rerender } = render(<Component {...mocks} />)\n  \n  // Assert\n  expect(getByText('a-known-error')).toExist()\n\n  // Re-arrange\n  mocks.lifecycle.error = 'another-known-error'\n  rerender(<Component {...mocks} />)\n  \n  // Assert\n  expect(getByText('a-known-error')).not.toExist()\n  expect(getByText('another-known-error')).toExist()\n})\n\nit('should render a default value for unknwon errors', () => {\n  // Arrange\n  mocks.locale.implementation((key: string) => key === 'an-uknown-error-that-will-get-ignored' ? null : key)\n  mocks.lifecycle.error = 'an-uknown-error-that-will-get-ignored'\n\n  const { getByText } = render(<Component {...mocks} />)\n\n  // Assert\n  expect(getByText('an-uknown-error-that-will-get-ignored')).not.toExist()\n  expect(getByText('unknown-error')).toExist()\n})\n\nit('should not render errors at all when it\\'s empty', () => {\n  // Arrange\n  mocks.locale.implementation((key: string) => key)\n  mocks.lifecycle.error = ''\n\n  const { getByText } = render(<Component {...mocks} />)\n  \n  // Assert\n  expect(getByText('unknown-error')).not.toExist()\n})\n")))),(0,a.kt)("p",null,"And with this, we finished covering all the render scenarios that we wanted. Both our lifecycle stage and render stage\nare now covered and tested, without having one leak into the other, keeping our tests unitary."),(0,a.kt)("h2",{id:"abstracting-sub-components-in-composed-components"},"Abstracting sub-components in composed components"),(0,a.kt)("p",null,"Our simple component only uses intrinsic HTML elements, but often our components are composed of other components too."),(0,a.kt)("p",null,"Let's imagine that we want to replace the inputs in our example with custom dedicated ",(0,a.kt)("inlineCode",{parentName:"p"},"Input"),"s components:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"<form onSubmit={lifecycle.handleSubmit}>\n  <EmailInput\n    placeholder={locale('placeholders.email')} \n    value={lifecycle.email} \n    onChange={lifecycle.handleEmailChange} \n  />\n  <PasswordInput\n    placeholder={locale('placeholders.password')}\n    value={lifecycle.password}\n    onChange={lifecycle.handlePasswordChange}\n  />\n  { !!lifecycle.error && <span>{locale(lifecycle.error) || locale('unknown-error')}</span> }\n  <button type=\"submit\">{locale('submit')}</button>\n</form>\n")),(0,a.kt)("p",null,"Now it's possible that those components have some internals that make it difficult to test our form without knowing\nthe internal behavior of the components. Our tests would become tightly coupled, and we don't want that.\nHere for instance, we cannot reliably know how to select the actual HTML input or to trigger the ",(0,a.kt)("inlineCode",{parentName:"p"},"onChange")," callback.\nBut what if we could select the ",(0,a.kt)("em",{parentName:"p"},"component instance")," instead, and manually trigger callback props?"),(0,a.kt)("p",null,"For this use-case, we could use a components stage to easily allow mocking our sub-components without relying on module\nmocking. For that, let's update our component:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"import { useState } from 'react'\nimport { ModularComponent } from './modular-component'\n\n// highlight-next-line\nimport { EmailInput, PasswordInput } from './shared-inputs'\n\nconst LoginForm = ModularComponent()\n  .with(router())\n  .with(services(['userSession']))\n  .with(locale('components.login-form'))\n  // highlight-next-line\n  .with(components({ EmailInput, PasswordInput }))\n  .with(lifecycle(({ services, router }) => {\n    // ... omitted for brevity\n  }))\n  // highlight-next-line\n  .with(render(({ lifecycle, locale, components }) => (\n    <form onSubmit={lifecycle.handleSubmit}>\n      // highlight-next-line\n      <components.EmailInput \n        placeholder={locale('placeholders.email')} \n        value={lifecycle.email} \n        onChange={lifecycle.handleEmailChange} \n      />\n      // highlight-next-line\n      <components.PasswordInput\n        placeholder={locale('placeholders.password')}\n        value={lifecycle.password}\n        onChange={lifecycle.handlePasswordChange}\n      />\n      { !!lifecycle.error && <span>{locale(lifecycle.error) || locale('unknown-error')}</span> }\n      <button type=\"submit\">{locale('submit')}</button>\n    </form>\n  )))\n")),(0,a.kt)("p",null,"Notice how in the render, we use the components injected by the ",(0,a.kt)("inlineCode",{parentName:"p"},"with(components)")," stage. Thanks to that, it becomes\neasy to replace them by dummy implementations in our tests."),(0,a.kt)("p",null,"For instance, we could reduce them to standard inputs:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"const mocks = {\n  ...,\n  components: { EmailInput: 'input', PasswordInput: 'input' }\n}\n")),(0,a.kt)("p",null,"This way, the tests we added previously will keep working, but that only works if the props are compatible."),(0,a.kt)("p",null,"A better alternative is to use mocks for components instead:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},'const mocks = {\n  ...,\n  components: {\n    EmailInput: mock.fn().returns(<div data-testid="email-input" />),\n    PasswordInput: mock.fn().returns(<div data-testid="password-input" />)\n  }\n}\n')),(0,a.kt)("p",null,"Thanks to this, we can now use those mocks in our tests to validate the expected props are passed down:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"it('should render an email input controlled by lifecycle', () => {\n  // Arrange\n  const emailInput = mocks.components.EmailInput\n\n  const { getByTestId } = render(<Component {...mocks} />)\n  \n  // Assert\n  expect(getByTestId('email-input')).toExist()\n  expect(emailInput).toHaveBeenCalled()\n  expect(emailInput).toHaveBeenCalledWith({\n    placeholder: 'placeholders.email',\n    value: mocks.lifecycle.email,\n    onChange: mocks.lifecycle.handleEmailChange\n  })\n})\n")))}p.isMDXComponent=!0}}]);