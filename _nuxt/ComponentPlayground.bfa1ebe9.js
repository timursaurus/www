import{u as m}from"./asyncData.8ad4344b.js";import{U as c,I as p,d as i,r as u,M as e,ah as l,l as d}from"./entry.3574c8c4.js";import f from"./Ellipsis.0a9a62fd.js";import _ from"./ComponentPlaygroundData.da840cd4.js";import"./TabsHeader.873a4cff.js";import"./ComponentPlaygroundProps.2c212e22.js";import"./ProseH4.0b20352c.js";import"./ProseCodeInline.e12fe66d.js";import"./Badge.5550d37d.js";import"./ContentSlot.4ea9481f.js";import"./ProseP.6f43986c.js";import"./index.d16e2147.js";import"./ComponentPlaygroundSlots.vue.5a8d58b4.js";import"./ComponentPlaygroundTokens.vue.ee9c1380.js";async function y(o){const t=c(o);{const{data:n}=await m(`nuxt-component-meta${t?`-${t}`:""}`,()=>$fetch(`/api/component-meta${t?`/${t}`:""}`));return p(()=>n.value)}}const g=i({props:{component:{type:String,required:!0},props:{type:Object,required:!1,default:()=>({})}},async setup(o){const t=p(()=>l(o.component)),n=u({...o.props}),r=await y(o.component);return{as:t,formProps:n,componentData:r}},render(o){const t=Object.entries(this.$slots).reduce((n,[r,a])=>{if(r.startsWith("component-")){const s=r.replace("component-","");n[s]=a}return n},{});return e("div",{class:"component-playground"},[e("div",{class:"component-playground-wrapper"},[e(f,{class:"component-playground-ellipsis",blur:"5vw",height:"100%",width:"100%"}),e(o.as,{...o.formProps,class:"component-playground-component"},{...t})]),e(_,{modelValue:o.formProps,componentData:o.componentData,"onUpdate:modelValue":n=>o.formProps=n})])}});const U=d(g,[["__scopeId","data-v-ffdff82a"]]);export{U as default};