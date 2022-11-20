"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[639],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(n),m=o,h=u["".concat(l,".").concat(m)]||u[m]||d[m]||i;return n?a.createElement(h,r(r({ref:t},p),{},{components:n})):a.createElement(h,r({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,r[1]=s;for(var c=2;c<i;c++)r[c]=n[c];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1747:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var a=n(7462),o=(n(7294),n(3905));const i={sidebar_position:1},r="The extension system",s={unversionedId:"extensions/writing-extensions",id:"extensions/writing-extensions",title:"The extension system",description:"ModularComponent aims to be a toolkit, and as such, it needs to be as agnostic as possible",source:"@site/docs/extensions/writing-extensions.md",sourceDirName:"extensions",slug:"/extensions/writing-extensions",permalink:"/docs/extensions/writing-extensions",draft:!1,editUrl:"https://github.com/modular-component/website/docs/extensions/writing-extensions.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Testing Components",permalink:"/docs/usage/testing-components"},next:{title:"Official extensions",permalink:"/docs/extensions/official/"}},l={},c=[{value:"Understanding stages",id:"understanding-stages",level:2},{value:"Extension conventions",id:"extension-conventions",level:2},{value:"Setting a name and a target argument",id:"setting-a-name-and-a-target-argument",level:2},{value:"Type-safe definition: the <code>createMethodRecord</code> helper",id:"type-safe-definition-the-createmethodrecord-helper",level:2},{value:"Transforming the argument before committing it to the map",id:"transforming-the-argument-before-committing-it-to-the-map",level:2},{value:"Telling TypeScript about a value transformation",id:"telling-typescript-about-a-value-transformation",level:2},{value:"Restricting the type of the passed value",id:"restricting-the-type-of-the-passed-value",level:2},{value:"Learn more",id:"learn-more",level:2}],p={toc:c};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"the-extension-system"},"The extension system"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"ModularComponent")," aims to be a toolkit, and as such, it needs to be as agnostic as possible\nof the application context. For this reason, the core factory only implements a single stage: ",(0,o.kt)("inlineCode",{parentName:"p"},"withRender"),",\nwhich is in fact a simple, traditional React function component."),(0,o.kt)("p",null,"Capabilities can then be added on a per-application basis, to construct a pipeline that\nmakes sense for a specific application context: adding a stage for connecting to a global\nstore, or for handling internationalization..."),(0,o.kt)("p",null,"Such capabilities are added through ",(0,o.kt)("strong",{parentName:"p"},"extensions"),". Extensions are configuration objects\ndetailing a new stage method to add to the pipeline."),(0,o.kt)("h2",{id:"understanding-stages"},"Understanding stages"),(0,o.kt)("p",null,"Each stage of a pipeline receives exactly one argument, that can be of any form."),(0,o.kt)("p",null,"The received value is passed to an optional transform function specific to each stage,\nand the resulting value from this call is added to the arguments map."),(0,o.kt)("p",null,"When executed, each stage modifies exactly one argument in the shared arguments map."),(0,o.kt)("h2",{id:"extension-conventions"},"Extension conventions"),(0,o.kt)("p",null,"Extensions are written as a map of method name to method configuration. They can register one or multiple\nnew stage at a time, depending on the needs covered by the extension."),(0,o.kt)("p",null,"By convention, an extension name starts with ",(0,o.kt)("inlineCode",{parentName:"p"},"With"),", capitalized. If it contains a single stage definition,\nthen it should be named after the function it creates. If it contains multiple stage definitions, then it\nshould be named after the common goal set by the stages."),(0,o.kt)("h2",{id:"setting-a-name-and-a-target-argument"},"Setting a name and a target argument"),(0,o.kt)("p",null,"At its simplest, a stage function definition should contain:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"A unique symbol used to identify the stage type"),(0,o.kt)("li",{parentName:"ul"},"The base name of the stage to add to the factory (",(0,o.kt)("inlineCode",{parentName:"li"},"Lifecycle"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"DefaultProps"),"...), which will be suffixed to the stage methods (",(0,o.kt)("inlineCode",{parentName:"li"},"withLifecycle"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"addLifecycle"),"...)"),(0,o.kt)("li",{parentName:"ul"},"The name of the argument modified by the stage (",(0,o.kt)("inlineCode",{parentName:"li"},"lifecycle"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"props"),"...)")),(0,o.kt)("p",null,"Extensions are written as a map of stage name to method configuration. For instance, the ",(0,o.kt)("inlineCode",{parentName:"p"},"withLifecycle"),"\ndefinition looks something like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"const withLifecycle = Symbol()\n\nexport const WithLifecycle = {\n  Lifecycle: {\n    symbol: withLifecycle,\n    field: 'lifecycle',\n  },\n} as const\n")),(0,o.kt)("p",null,"You can add as many stage methods as you want. Different stage methods can also impact\nthe same field if needed, for some advanced cases."),(0,o.kt)("h2",{id:"type-safe-definition-the-createmethodrecord-helper"},"Type-safe definition: the ",(0,o.kt)("inlineCode",{parentName:"h2"},"createMethodRecord")," helper"),(0,o.kt)("p",null,"To ensure the configuration you produce is valid, you can wrap it in ",(0,o.kt)("inlineCode",{parentName:"p"},"createMethodRecord")," exported\nby ",(0,o.kt)("inlineCode",{parentName:"p"},"@modular-component/core"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import { createMethodRecord } from '@modular-component/core'\n\nconst withLifecycle = Symbol()\n\nexport const WithLifecycle = createMethodRecord({\n  Lifecycle: {\n    symbol: withLifecycle,\n    field: 'lifecycle',\n  },\n} as const)\n")),(0,o.kt)("p",null,"Notice the ",(0,o.kt)("inlineCode",{parentName:"p"},"as const")," statement, making sure TypeScript narrows all\ntypes as much as possible. It is of paramount importance to always add this statement\nto ensure type inference works correctly. Otherwise, the ",(0,o.kt)("inlineCode",{parentName:"p"},"field")," parameter\ncould be inferred as ",(0,o.kt)("inlineCode",{parentName:"p"},"string"),", polluting the complete arguments map, and\nthe ",(0,o.kt)("inlineCode",{parentName:"p"},"symbol")," field would be inferred as a generic ",(0,o.kt)("inlineCode",{parentName:"p"},"symbol"),", rather than\nthe unique symbol type."),(0,o.kt)("p",null,"If you provide a misconfigured method, the ",(0,o.kt)("inlineCode",{parentName:"p"},"createMethodRecord")," function\nwill reject the argument, letting you know right away."),(0,o.kt)("h2",{id:"transforming-the-argument-before-committing-it-to-the-map"},"Transforming the argument before committing it to the map"),(0,o.kt)("p",null,"At its simplest, a stage will simply append the provided value as-is to the argument\nmap, but it might not be sufficient for all cases."),(0,o.kt)("p",null,"For instance, our ",(0,o.kt)("inlineCode",{parentName:"p"},"Lifecycle")," stage takes a hook as value, but should append ",(0,o.kt)("em",{parentName:"p"},"the result of this hook"),"\nto the arguments map."),(0,o.kt)("p",null,"For this purpose, a stage can also receive a ",(0,o.kt)("inlineCode",{parentName:"p"},"transform")," configuration parameter, detailing\nhow to generate the final value that will be added to the arguments map."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"transform")," function receives two parameters: the current arguments map received from\nprevious stages, and the value passed down to the stage by the user. It then returns the\ntransformed value to add to the arguments map:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"export const WithLifecycle = createMethodRecord({\n  Lifecycle: {\n    symbol: withLifecycle,\n    field: 'lifecycle',\n    transform: (args, useLifecycle) => {\n      return useLifecycle(args)\n    },\n  },\n} as const)\n")),(0,o.kt)("p",null,"In addition to the stage value, the transform function also receives the arguments map computed\nby upstream stages. In this case, the arguments map is passed as parameter to the lifecycle hook,\nallowing it to react to props and other upstream stages."),(0,o.kt)("p",null,"Note how we also renamed the parameter to ",(0,o.kt)("inlineCode",{parentName:"p"},"useLifecycle"),": as this can contain hook calls, we\nneed to name it accordingly to not break the rule of hooks here."),(0,o.kt)("h2",{id:"telling-typescript-about-a-value-transformation"},"Telling TypeScript about a value transformation"),(0,o.kt)("p",null,'Most of the time, the transformation that we apply on a value changes its type\nfrom the one passed as parameter. Unfortunately, as of TypeScript 4.8, there isn\'t\na way still to use "generic generic types". It is therefore not possible, as far as we can tell,\nto retrieve the type of the ',(0,o.kt)("inlineCode",{parentName:"p"},"transform")," configuration and use it to infer the final type\nof the argument."),(0,o.kt)("p",null,"The workaround implemented for now is an exposed interface, ",(0,o.kt)("inlineCode",{parentName:"p"},"ModularStages"),", that\ntakes generic parameters and contains typing information for our stages. An extension package\ncan overload this interface to add the correct information for the provided stage."),(0,o.kt)("p",null,"In order to avoid clashes between multiple extensions providing a similar\nstage function name, the typing map uses ",(0,o.kt)("em",{parentName:"p"},"symbols")," as its key to ensure\nuniqueness. The symbol must be passed to the corresponding stage function definition."),(0,o.kt)("p",null,"In the case of our lifecycle stage, we saw that we created a ",(0,o.kt)("inlineCode",{parentName:"p"},"withLifecycle")," symbol\nand passed it to the stage configuration. We can use it to correctly type the transform,\nwhich should extract the return type of the provided hook:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"// \ud83d\udc47 1. We create our unique symbol\nconst withLifecycle = Symbol()\n\nexport const WithLifecycle = createMethodRecord({\n  Lifecycle: {\n    symbol: withLifecycle, // \ud83d\udc48 2. We assign our symbol to our configuration\n    field: 'lifecycle',\n    transform: (args, useLifecycle) => {\n      return useLifecycle(args)\n    },\n  },\n} as const)\n\n// \ud83d\udc47 3. We extend the ModularStages interface to add our typings\ndeclare module '@modular-component/core' {\n  // The current arguments are passed as generic parameter...\n  //                              \ud83d\udc47\n  export interface ModularStages<Args, Value> {\n    // ... along with the original value \ud83d\udc46\n\n    [withLifecycle]: {\n      // \ud83d\udc46 4. We use our symbol as index for our entry\n      transform: Value extends (args: Args) => unknown\n        ? ReturnType<Value> // \ud83d\udc48 5. We apply our type transformation,\n                            // constraining the original value as needed\n        : never\n    }\n  }\n}\n")),(0,o.kt)("p",null,"With this, TypeScript will correctly infer the type of our lifecycle argument as the return\ntype of the provided hook!"),(0,o.kt)("h2",{id:"restricting-the-type-of-the-passed-value"},"Restricting the type of the passed value"),(0,o.kt)("p",null,"Specifically for TypeScript users, stage method type definition allows defining a type\nthat the passed value should match to be considered valid. This information will be\nsurfaced to the user, marking the stage call as incorrect if the value type do not match\nthe expected restriction."),(0,o.kt)("p",null,"Continuing with our lifecycle hook, we want to restrict the value to a function receiving\nthe arguments map as parameter."),(0,o.kt)("p",null,"This is done through the ",(0,o.kt)("inlineCode",{parentName:"p"},"restrict")," property:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"declare module '@modular-component/core' {\n  export interface ModularStages<Args, Value> {\n    [withLifecycle]: {\n      // Restrict the accepted value as a function of current\n      // arguments map  \ud83d\udc47\n      restrict: (args: Args) => unknown\n      //                           \ud83d\udc46 \n      // We don't want to restrict the form of the\n      // returned value\n      transform: Value extends (args: Args) => unknown\n              ? ReturnType<Value>\n              : never\n    }\n  }\n}\n")),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("mdxAdmonitionTitle",{parentName:"admonition"},(0,o.kt)("inlineCode",{parentName:"mdxAdmonitionTitle"},"restrict: undefined")),(0,o.kt)("p",{parentName:"admonition"},"Whenever ",(0,o.kt)("inlineCode",{parentName:"p"},"restrict: undefined")," is used on a stage method, the type\ndefinition will allow users to omit the argument completely. Useful for\nstages that return a constant value or only execute side-effects!")),(0,o.kt)("h2",{id:"learn-more"},"Learn more"),(0,o.kt)("p",null,"You can read the documentation for each ",(0,o.kt)("a",{parentName:"p",href:"/docs/extensions/official/"},"official extension")," to learn more\nabout writing extensions."))}d.isMDXComponent=!0}}]);