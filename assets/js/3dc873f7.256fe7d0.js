"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[839],{3905:(e,n,t)=>{t.d(n,{Zo:()=>m,kt:()=>d});var o=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=o.createContext({}),p=function(e){var n=o.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},m=function(e){var n=p(e.components);return o.createElement(s.Provider,{value:n},e.children)},l={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},u=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,m=c(e,["components","mdxType","originalType","parentName"]),u=p(t),d=r,f=u["".concat(s,".").concat(d)]||u[d]||l[d]||a;return t?o.createElement(f,i(i({ref:n},m),{},{components:t})):o.createElement(f,i({ref:n},m))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,i=new Array(a);i[0]=u;var c={};for(var s in n)hasOwnProperty.call(n,s)&&(c[s]=n[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var p=2;p<a;p++)i[p]=t[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},7838:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>l,frontMatter:()=>a,metadata:()=>c,toc:()=>p});var o=t(7462),r=(t(7294),t(3905));const a={sidebar_position:4},i="@modular-component/with-components",c={unversionedId:"extensions/official/with-components",id:"extensions/official/with-components",title:"@modular-component/with-components",description:"Provides a withComponents stage that fills the components argument with",source:"@site/docs/extensions/official/with-components.md",sourceDirName:"extensions/official",slug:"/extensions/official/with-components",permalink:"/docs/extensions/official/with-components",draft:!1,editUrl:"https://github.com/modular-component/website/docs/extensions/official/with-components.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"@modular-component/with-lifecycle",permalink:"/docs/extensions/official/with-lifecycle"},next:{title:"@modular-component/with-conditional-render",permalink:"/docs/extensions/official/with-conditional-render"}},s={},p=[{value:"Usage",id:"usage",level:2},{value:"Replacing sub-components",id:"replacing-sub-components",level:2},{value:"Implementation",id:"implementation",level:2}],m={toc:p};function l(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,o.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"modular-componentwith-components"},"@modular-component/with-components"),(0,r.kt)("p",null,"Provides a ",(0,r.kt)("inlineCode",{parentName:"p"},"withComponents")," stage that fills the ",(0,r.kt)("inlineCode",{parentName:"p"},"components")," argument with\na map of React components. Useful when running tests in an environment that\ndoes not allow module mocking: sub-components can be stubbed in tests by\nmocking the stage to replace their implementations."),(0,r.kt)("h2",{id:"usage"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"import { modularFactory } from '@modular-component/core'\nimport { WithComponents } from '@modular-component/with-components'\n\nimport { SomeComponent } from 'some-component'\n\nconst ModularComponent = modularFactory\n  .extend(WithComponents)\n  .build()\n\nconst MyComponent = ModularComponent()\n  .withComponents({ SomeComponent })\n  .withRender(({ props, components }) => (\n    <components.SomeComponent />\n  ))\n")),(0,r.kt)("h2",{id:"replacing-sub-components"},"Replacing sub-components"),(0,r.kt)("p",null,"Replacing sub-components can be done either by updating or mocking the stage.\nIt allows creating a clone of the component with a different sub-component implementation,\neither for tests or for content.\nFor instance, one could imagine a ",(0,r.kt)("inlineCode",{parentName:"p"},"Layout")," base component taking advantage of this functionality:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"const PageLayout = ModularComponent()\n  .withComponent({\n    Title: React.Fragment,\n    Subtitle: React.Fragment,\n    Content: React.Fragment,\n    Footer: React.Fragment\n  })\n  .withRender(({ components }) => (\n    // Build a layout using <components.Title />, <components.Subtitle />...\n  ))\n\nconst PageOne = PageLayout.withComponent({\n  Title: () => <>First page</>,\n  Subtitle: () => <>I have a subtitle but no footer</>,\n  Content: () => <>First page content</>,\n  Footer: React.Fragment\n})\n\nconst PageTwo = PageLayout.withComponent({\n  Title: () => <>Second page</>,\n  Subtitle: React.Fragment,\n  Content: () => <>Second page content</>,\n  Footer: () => <>I have a footer but no subtitle</>\n})\n")),(0,r.kt)("h2",{id:"implementation"},"Implementation"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"withComponents")," is a simple stage adding the provided record as a ",(0,r.kt)("inlineCode",{parentName:"p"},"components")," argument. It has a restriction\non accepted values, to only accept a record of React components."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"import { ComponentType } from 'react'\n\nimport { createMethodRecord } from '@modular-component/core'\n\nconst withComponents = Symbol()\n\ndeclare module '@modular-component/core' {\n  export interface ModularStages<Args, Value> {\n    [withComponents]: {\n      restrict: Record<string, ComponentType>\n    }\n  }\n}\n\nexport const WithComponents = createMethodRecord({\n  Components: { symbol: withComponents, field: 'components' },\n} as const)\n")))}l.isMDXComponent=!0}}]);