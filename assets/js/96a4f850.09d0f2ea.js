"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[639],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),m=o,f=u["".concat(l,".").concat(m)]||u[m]||d[m]||r;return n?a.createElement(f,i(i({ref:t},c),{},{components:n})):a.createElement(f,i({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var p=2;p<r;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1747:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var a=n(7462),o=(n(7294),n(3905));const r={sidebar_position:1},i="The extension system",s={unversionedId:"extensions/writing-extensions",id:"extensions/writing-extensions",title:"The extension system",description:"ModularComponent aims to be a toolkit, and as such, it needs to be as agnostic as possible",source:"@site/docs/extensions/writing-extensions.md",sourceDirName:"extensions",slug:"/extensions/writing-extensions",permalink:"/docs/extensions/writing-extensions",draft:!1,editUrl:"https://github.com/modular-component/website/docs/extensions/writing-extensions.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Recommended Setup",permalink:"/docs/usage/recommended-setup"},next:{title:"Official extensions",permalink:"/docs/extensions/official/"}},l={},p=[{value:"Understanding stages",id:"understanding-stages",level:2},{value:"Extension conventions",id:"extension-conventions",level:2},{value:"Setting a field and stage transform hook",id:"setting-a-field-and-stage-transform-hook",level:2},{value:"Parameters and field value inference",id:"parameters-and-field-value-inference",level:2},{value:"Learn more",id:"learn-more",level:2}],c={toc:p};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"the-extension-system"},"The extension system"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"ModularComponent")," aims to be a toolkit, and as such, it needs to be as agnostic as possible\nof the application context. For this reason, the core factory only implements a single stage: ",(0,o.kt)("inlineCode",{parentName:"p"},"with(render)"),",\nwhich is in fact a simple, traditional React function component."),(0,o.kt)("p",null,"Capabilities can then be added on a per-application basis, to construct a pipeline that\nmakes sense for a specific application context: adding a stage for connecting to a global\nstore, or for handling internationalisation..."),(0,o.kt)("p",null,"Such capabilities are added through ",(0,o.kt)("strong",{parentName:"p"},"extensions"),". Extensions are functions returning configuration objects\ndetailing a new stage to add to the pipeline."),(0,o.kt)("h2",{id:"understanding-stages"},"Understanding stages"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},".with()")," method accepts a standard object comprised of two fields:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"field"),": the name of the argument that will get added to the argument map"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"useStage"),": a hook that receives the current argument map and returns the value to set on the stage field")),(0,o.kt)("p",null,"While it's possible to use those objects directly when calling ",(0,o.kt)("inlineCode",{parentName:"p"},".with()"),", for readability and ease of writing we\nrecommend creating ",(0,o.kt)("strong",{parentName:"p"},"custom stage functions")," that take relevant parameters and abstract away the stage logic."),(0,o.kt)("h2",{id:"extension-conventions"},"Extension conventions"),(0,o.kt)("p",null,"Extensions export ",(0,o.kt)("strong",{parentName:"p"},"custom stage functions"),", that can be passed to the ",(0,o.kt)("inlineCode",{parentName:"p"},".with()")," method of a ",(0,o.kt)("inlineCode",{parentName:"p"},"ModularComponent"),".\nThey can export one or multiple stage functions, depending on the needs covered by the extension."),(0,o.kt)("p",null,"By convention, stage function name should start with a lowercase letter, and should not repeat the ",(0,o.kt)("inlineCode",{parentName:"p"},"with")," keyword.\nFor instance, a localization extension should be called ",(0,o.kt)("inlineCode",{parentName:"p"},"locale()"),", not ",(0,o.kt)("inlineCode",{parentName:"p"},"Locale()")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"withLocale()"),"."),(0,o.kt)("h2",{id:"setting-a-field-and-stage-transform-hook"},"Setting a field and stage transform hook"),(0,o.kt)("p",null,"A stage definition contains a ",(0,o.kt)("inlineCode",{parentName:"p"},"field")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"useStage")," properties as described above."),(0,o.kt)("p",null,"Extensions are written as functions that return this definition. They should use the ",(0,o.kt)("inlineCode",{parentName:"p"},"ModularStage")," helper type\nto ensure both their ",(0,o.kt)("inlineCode",{parentName:"p"},"field")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"useStage")," properties are correctly typed for inference."),(0,o.kt)("p",null,"For instance, the ",(0,o.kt)("inlineCode",{parentName:"p"},"lifecycle")," definition looks like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import { ModularStage } from '@modular-component/core'\n\nexport function lifecycle<Args extends {}, Return>(\n  useLifecycle: (args: Args) => Return,\n): ModularStage<'lifecycle', (args: Args) => Return> {\n  return { field: 'lifecycle', useStage: useLifecycle }\n}\n")),(0,o.kt)("p",null,"Your stage function can take any argument it needs. In the case of the ",(0,o.kt)("inlineCode",{parentName:"p"},"lifecycle")," function, it takes a function\nthat is directly reused as the ",(0,o.kt)("inlineCode",{parentName:"p"},"useStage")," property, but the ",(0,o.kt)("inlineCode",{parentName:"p"},"useStage")," function could be any hook using the parameters\nas it sees fit, along the arguments it receives when called."),(0,o.kt)("p",null,"You can add as many stage functions as you want. Different stage functions can also impact\nthe same field if needed, for some advanced cases."),(0,o.kt)("h2",{id:"parameters-and-field-value-inference"},"Parameters and field value inference"),(0,o.kt)("p",null,"If we look at the ",(0,o.kt)("inlineCode",{parentName:"p"},"lifecycle")," example, we can see that the stage function infers two generic parameters: ",(0,o.kt)("inlineCode",{parentName:"p"},"Args")," representing\nthe arguments passed from upstream stages, and ",(0,o.kt)("inlineCode",{parentName:"p"},"Return")," representing the value returned from the lifecycle hook."),(0,o.kt)("p",null,"You can use ",(0,o.kt)("inlineCode",{parentName:"p"},"Args")," to type the first parameter passed to ",(0,o.kt)("inlineCode",{parentName:"p"},"useStage")," (as is the case here) any time you want your return\ntype to be aware of the initial ",(0,o.kt)("inlineCode",{parentName:"p"},"Args")," type. This also allows Typescript to automatically type the ",(0,o.kt)("inlineCode",{parentName:"p"},"args")," parameter\nwhen called:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"ModularComponent<{ value: number }>()\n  .withLifecycle(({ props }) => ({ double: props.value * 2 }))\n  //                 \ud83d\udc46 Here, Typescript knows that the props argument \n  //                    is of type { value: number }\n  //                    It will also infer that the Return value is \n  //                    of type { double: number } thanks to that.\n")),(0,o.kt)("p",null,"If we take another example (our ",(0,o.kt)("inlineCode",{parentName:"p"},"components")," extension), you can see that sometimes the current arguments are not needed.\nThat is often the case when passing a static value to a stage:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import { ComponentType } from 'react'\nimport { ModularStage } from '@modular-component/core'\n\nexport function components<Components extends Record<string, ComponentType>>(\n  components: Components,\n): ModularStage<'components', () => Components> {\n  return { field: 'components', useStage: () => components }\n}\n")),(0,o.kt)("p",null,"In this case, you can easily just omit the generic type parameter, as we don't need to type the ",(0,o.kt)("inlineCode",{parentName:"p"},"useStage")," parameters."),(0,o.kt)("h2",{id:"learn-more"},"Learn more"),(0,o.kt)("p",null,"You can read the documentation for each ",(0,o.kt)("a",{parentName:"p",href:"/docs/extensions/official/"},"official extension")," to learn more\nabout writing extensions."))}d.isMDXComponent=!0}}]);