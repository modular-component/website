"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[168],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),p=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return o.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,h=u["".concat(s,".").concat(m)]||u[m]||d[m]||r;return n?o.createElement(h,i(i({ref:t},c),{},{components:n})):o.createElement(h,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<r;p++)i[p]=n[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5226:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var o=n(7462),a=(n(7294),n(3905));const r={sidebar_position:1},i="Building the Factory",l={unversionedId:"usage/building-the-factory",id:"usage/building-the-factory",title:"Building the Factory",description:"When setting up ModularComponent in a project, the first thing to do is to build your factory.",source:"@site/docs/usage/building-the-factory.md",sourceDirName:"usage",slug:"/usage/building-the-factory",permalink:"/docs/usage/building-the-factory",draft:!1,editUrl:"https://github.com/modular-component/website/docs/usage/building-the-factory.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"ModularComponent",permalink:"/docs/intro"},next:{title:"Writing Components",permalink:"/docs/usage/writing-components"}},s={},p=[{value:"The <code>modularFactory</code> export",id:"the-modularfactory-export",level:2},{value:"Adding stages",id:"adding-stages",level:2},{value:"Using published extensions",id:"using-published-extensions",level:3},{value:"Using custom stages",id:"using-custom-stages",level:3},{value:"Building and exporting the factory",id:"building-and-exporting-the-factory",level:2},{value:"Exporting multiple factories",id:"exporting-multiple-factories",level:2},{value:"For different kind of components",id:"for-different-kind-of-components",level:3},{value:"For modular hooks",id:"for-modular-hooks",level:3}],c={toc:p};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"building-the-factory"},"Building the Factory"),(0,a.kt)("p",null,"When setting up ",(0,a.kt)("inlineCode",{parentName:"p"},"ModularComponent")," in a project, the first thing to do is to ",(0,a.kt)("strong",{parentName:"p"},"build your factory"),"."),(0,a.kt)("p",null,"With ",(0,a.kt)("inlineCode",{parentName:"p"},"ModularComponent"),", the factory itself is modular. There are no preconceptions about your application,\nhow it works, what library you are using...\nSetting up a factory that allows components to hook into your specific application context is up to you."),(0,a.kt)("h2",{id:"the-modularfactory-export"},"The ",(0,a.kt)("inlineCode",{parentName:"h2"},"modularFactory")," export"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"@modular-component/core")," exports a ",(0,a.kt)("inlineCode",{parentName:"p"},"modularFactory")," object, which is a ",(0,a.kt)("strong",{parentName:"p"},"factory builder")," instance. Through it, you can register\n",(0,a.kt)("strong",{parentName:"p"},"stage methods")," and build the final ",(0,a.kt)("strong",{parentName:"p"},"component factory"),". The object exposes two methods:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"extend(stages: StageRecord)"),": create a new ",(0,a.kt)("strong",{parentName:"p"},"factory builder")," inheriting all previously configured stages, and adding the new stages\npassed as parameter."),(0,a.kt)("p",{parentName:"li"},"Just like the components we will later build, the factory is ",(0,a.kt)("em",{parentName:"p"},"immutable"),", so calling extend on it will not modify the core object, but create a new one."),(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"extend")," takes a map of stage methods, so you can build your whole factory with a single ",(0,a.kt)("inlineCode",{parentName:"p"},"extend")," call; but it also returns a ",(0,a.kt)("strong",{parentName:"p"},"factory builder")," object,\nwhich allows you to chain multiple ",(0,a.kt)("inlineCode",{parentName:"p"},"extend")," calls, allowing to apply multiple pre-configured extensions without manually spreading them.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"build()"),": generates the component factory itself, that can later be used to create components. The return of the ",(0,a.kt)("inlineCode",{parentName:"p"},"build")," method is a ",(0,a.kt)("strong",{parentName:"p"},"component factory"),", not a ",(0,a.kt)("strong",{parentName:"p"},"factory builder")," anymore, which means that it's not possible to extend it with more stages after that."))),(0,a.kt)("h2",{id:"adding-stages"},"Adding stages"),(0,a.kt)("h3",{id:"using-published-extensions"},"Using published extensions"),(0,a.kt)("p",null,"For some use cases, it's possible to use pre-configured stage methods to build your factory. For instance, the ",(0,a.kt)("inlineCode",{parentName:"p"},"ModularComponent")," team maintain a list of\n",(0,a.kt)("a",{parentName:"p",href:"/docs/extensions/official/"},"official extensions")," for the most common use cases."),(0,a.kt)("p",null,"The convention for published extensions is to export ",(0,a.kt)("strong",{parentName:"p"},"stage records"),", which are maps of stage function names to stage function configurations.\nSuch records are most of the time prefixed with ",(0,a.kt)("inlineCode",{parentName:"p"},"With"),", capitalized. For instance, the default stage record exposed by ",(0,a.kt)("inlineCode",{parentName:"p"},"@modular-component/default"),"\nis ",(0,a.kt)("inlineCode",{parentName:"p"},"WithDefaultStages"),"."),(0,a.kt)("p",null,"In order to use those in your factory, simply pass them to an ",(0,a.kt)("inlineCode",{parentName:"p"},"extend")," call:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { modularFactory } from '@modular-component/core'\n\nimport { WithDefaultStages } from '@modular-component/default'\nimport { WithComponents } from '@modular-component/with-components'\n\nconst factoryBuilder = modularFactory\n  .extend(WithDefaultStages)\n  .extend(WithComponents)\n")),(0,a.kt)("h3",{id:"using-custom-stages"},"Using custom stages"),(0,a.kt)("p",null,"In other cases, pre-configured stage methods might not cover your needs. In this case, you can easily add your custom stages by providing your own\nstage records to ",(0,a.kt)("inlineCode",{parentName:"p"},"extend")," calls, either inline or as their own variable. "),(0,a.kt)("p",null,"If you don't want to inline your stage records, you can still get TypeScript validation by wrapping them in the ",(0,a.kt)("inlineCode",{parentName:"p"},"createStageRecord")," helper exported by\n",(0,a.kt)("inlineCode",{parentName:"p"},"@modular-component/core"),", just as if you were ",(0,a.kt)("a",{parentName:"p",href:"/docs/extensions/writing-extensions"},"writing your own extension"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { modularFactory, createStageRecord } from '@modular-component/core'\n\nimport { WithDefaultStages } from '@modular-component/default'\nimport { WithComponents } from '@modular-component/with-components'\n\nimport { WithStore } from './store/stage-method'\n\nconst WithVariable = createStageRecord({\n  withVariable: {\n    field: 'variable'\n  }\n})\n\nconst factoryBuilder = modularFactory\n  .extend(WithDefaultStages)\n  .extend(WithComponents)\n  .extend(WithStore)\n  .extend(WithVariable)\n  .extend({\n    withInline: { field: 'inline' }\n  })\n")),(0,a.kt)("h2",{id:"building-and-exporting-the-factory"},"Building and exporting the factory"),(0,a.kt)("p",null,"Once you've finished adding all the stages necessary for your application, you can build and export your factory.\nYou will then be able to import it from any component file to build the component step by step."),(0,a.kt)("p",null,"Building the factory is as easy as calling ",(0,a.kt)("inlineCode",{parentName:"p"},"build()")," on your ",(0,a.kt)("strong",{parentName:"p"},"factory builder"),"."),(0,a.kt)("p",null,"By convention, the modular component factory is called ",(0,a.kt)("inlineCode",{parentName:"p"},"ModularComponent"),", but you can choose any name you want."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { modularFactory, createStageRecord } from '@modular-component/core'\n\nimport { WithDefaultStages } from '@modular-component/default'\nimport { WithComponents } from '@modular-component/with-components'\n\n// Exported custom extension connecting to an eventual global store\nimport { WithStore } from './store/stage-method'\n\n// Local custom extension adding an hypothetic `withVariable` stage\nconst WithVariable = createStageRecord({\n  withVariable: {\n    field: 'variable'\n  }\n})\n\nconst factoryBuilder = modularFactory\n  .extend(WithDefaultStages)\n  .extend(WithComponents)\n  .extend(WithStore)\n  .extend(WithVariable)\n  // Inline custom extension adding an hypothetic `withInline` stage\n  .extend({\n    withInline: { field: 'inline' }\n  })\n\nexport const ModularComponent = factoryBuilder.build()\n")),(0,a.kt)("h2",{id:"exporting-multiple-factories"},"Exporting multiple factories"),(0,a.kt)("h3",{id:"for-different-kind-of-components"},"For different kind of components"),(0,a.kt)("p",null,"As a factory is a standard JS exported variable, you can create as many as you want. For instance, you might want to differentiate ",(0,a.kt)("strong",{parentName:"p"},"UI components"),"\nfrom ",(0,a.kt)("strong",{parentName:"p"},"View components"),": the UI components are the building blocks of your app and will never need access to an eventual global store,\nwhile the view components are a higher abstraction that maps application data to the viewport."),(0,a.kt)("p",null,"You can take advantage of the ",(0,a.kt)("strong",{parentName:"p"},"factory builder")," immutability to share stages between your factories, too."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { modularFactory } from '@modular-component/core'\n\nimport { WithDefaultStages } from '@modular-component/default'\nimport { WithComponents } from '@modular-component/with-components'\n\nimport { WithStore } from './store/stage-method'\n\n\nconst sharedFactory = modularFactory\n  .extend(WithDefaultStages)\n  .extend(WithComponents)\n\nconst viewFactory = sharedFactory\n  .extend(WithStore)\n\nexport const UIComponent = sharedFactory.build()\nexport const ViewComponent = viewFactory.build()\n")),(0,a.kt)("h3",{id:"for-modular-hooks"},"For modular hooks"),(0,a.kt)("p",null,"Some people might also like to use ",(0,a.kt)("inlineCode",{parentName:"p"},"ModularComponent")," to write their hooks, in order to take advantage of specific stages.\nA dedicated hook factory would most likely not need the default stages and ",(0,a.kt)("inlineCode",{parentName:"p"},"withComponents")," stage."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { modularFactory } from '@modular-component/core'\n\nimport { WithDefaultStages } from '@modular-component/default'\nimport { WithComponents } from '@modular-component/with-components'\n\n// Custom extension connecting to an eventual global store\nimport { WithStore } from './store/stage-method'\n\nconst sharedFactory = modularFactory\n  .extend(WithStore)\n\nconst componentFactory = sharedFactory\n  .extend(WithDefaultStages)\n  .extend(WithComponents)\n\nexport const ModularHook = sharedFactory.build()\nexport const ModularComponent = componentFactory.build()\n")))}d.isMDXComponent=!0}}]);