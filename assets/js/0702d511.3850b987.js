"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[222],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=o.createContext({}),l=function(e){var t=o.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=l(e.components);return o.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=l(n),d=a,g=m["".concat(p,".").concat(d)]||m[d]||u[d]||r;return n?o.createElement(g,i(i({ref:t},c),{},{components:n})):o.createElement(g,i({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<r;l++)i[l]=n[l];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8622:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>l});var o=n(7462),a=(n(7294),n(3905));const r={sidebar_position:2,title:"Writing Components"},i=void 0,s={unversionedId:"usage/writing-components",id:"usage/writing-components",title:"Writing Components",description:"All our guides are written in TypeScript, as ModularComponent was built from the ground up with TypeScript in mind.",source:"@site/docs/usage/writing-components.md",sourceDirName:"usage",slug:"/usage/writing-components",permalink:"/docs/usage/writing-components",draft:!1,editUrl:"https://github.com/modular-component/website/docs/usage/writing-components.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Writing Components"},sidebar:"tutorialSidebar",previous:{title:"Building the Factory",permalink:"/docs/usage/building-the-factory"},next:{title:"Reusing Components",permalink:"/docs/usage/reusing-components"}},p={},l=[{value:"Factory setup",id:"factory-setup",level:2},{value:"Configuring the component",id:"configuring-the-component",level:2},{value:"Component display name",id:"component-display-name",level:3},{value:"Component properties",id:"component-properties",level:3},{value:"Adding stages",id:"adding-stages",level:2},{value:"Custom stages",id:"custom-stages",level:3},{value:"Render stage",id:"render-stage",level:3}],c={toc:l};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"All our guides are written in TypeScript, as ",(0,a.kt)("inlineCode",{parentName:"p"},"ModularComponent")," was built from the ground up with TypeScript in mind.\nHowever, it is perfectly possible to take advantage of ",(0,a.kt)("inlineCode",{parentName:"p"},"ModularComponent")," with standard JavaScript.")),(0,a.kt)("h2",{id:"factory-setup"},"Factory setup"),(0,a.kt)("p",null,"Once you've ",(0,a.kt)("a",{parentName:"p",href:"/docs/usage/building-the-factory"},"created your component factory"),", you can start using it to build your component.\nIn this guide, we consider a factory exported with three stages:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"withDefaultProps")," allows setting default value for props"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"withLifecycle")," allows registering a custom hook to hold the component's logic"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"withComponents")," can inject a map of sub-components for which we can later swap implementations")),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"All those stages are availabe as ",(0,a.kt)("a",{parentName:"p",href:"/docs/extensions/official/"},"official extensions"))),(0,a.kt)("h2",{id:"configuring-the-component"},"Configuring the component"),(0,a.kt)("p",null,"At it simplest, a component is created by calling the factory:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"import { ModularComponent } from './modular-component'\n\nexport const MyComponent = ModularComponent()\n")),(0,a.kt)("p",null,"This is enough to get a valid, instantiable component. However, this component will do nothing: it does not handle\nany state, and renders ",(0,a.kt)("inlineCode",{parentName:"p"},"null")," by default."),(0,a.kt)("h3",{id:"component-display-name"},"Component display name"),(0,a.kt)("p",null,"One caveat of working with ",(0,a.kt)("inlineCode",{parentName:"p"},"ModularComponent")," is that React cannot infer its display name from the variable it is assigned too,\nbecause the actual component is created inside the factory. This can make debugging trickier, as stack traces and React Devtools\nwill show all components as anonymous components."),(0,a.kt)("p",null,"You can get around this limitation by manually providing an (optional) display name at component creation:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"import { ModularComponent } from './modular-component'\n\nexport const MyComponent = ModularComponent('MyComponent')\n")),(0,a.kt)("p",null,"It is a good practice to keep the debug name and the variable name in sync."),(0,a.kt)("h3",{id:"component-properties"},"Component properties"),(0,a.kt)("p",null,"When using TypeScript, you can pass a generic type parameter to the ",(0,a.kt)("inlineCode",{parentName:"p"},"ModularComponent")," call to set the component's props:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"import { ModularComponent } from './modular-component'\n\nexport const MyComponent = ModularComponent<{\n  isActive: boolean\n  label: string\n}>()\n")),(0,a.kt)("p",null,"The props typing will be passed along in each stage, and will also be used for the final typing of the component itself, so\nthat TypeScript knows about them when instantiating it."),(0,a.kt)("h2",{id:"adding-stages"},"Adding stages"),(0,a.kt)("p",null,"Now that our component is created, we can ",(0,a.kt)("strong",{parentName:"p"},"add stages")," to it to extend its capabilities. The result of the factory is a usable React ",(0,a.kt)("inlineCode",{parentName:"p"},"FunctionComponent"),",\non which custom factory functions (our defined ",(0,a.kt)("strong",{parentName:"p"},"stage functions"),") have been added. To add a stage to our component, we simply call one of those\nstage functions."),(0,a.kt)("p",null,"Note that just like ",(0,a.kt)("strong",{parentName:"p"},"factory builders"),", ",(0,a.kt)("strong",{parentName:"p"},"component factories")," are immutable. Because of this, you need to chain the stage calls in the same\nassignement as your component creation. You ",(0,a.kt)("em",{parentName:"p"},"cannot call them as side-effects"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"// \u26a0\ufe0f This will not work - `withStage` call returns a modified \n//    component but does not touch the original one\nconst MyComponent = ModularComponent()\n\nMyComponent.withStage()\n\n// \u2705 Do this instead - save the result of the `withStage` call\n//   as your component\nconst MyComponent = ModularComponent()\n  .withStage()\n")),(0,a.kt)("p",null,"This will come in very handy in the next chapter about ",(0,a.kt)("a",{parentName:"p",href:"/docs/usage/reusing-components"},"extending and reusing components"),", as well as for\n",(0,a.kt)("a",{parentName:"p",href:"/docs/usage/testing-components"},"testing components")),(0,a.kt)("h3",{id:"custom-stages"},"Custom stages"),(0,a.kt)("h3",{id:"render-stage"},"Render stage"))}u.isMDXComponent=!0}}]);