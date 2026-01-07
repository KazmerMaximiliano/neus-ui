import{r as l,j as e}from"./iframe-DS6A7Oju.js";import{f as m,b as p,a,g as d,d as u,h}from"./index-BD9ZhrtC.js";import{M as b}from"./Menu-DwdCbUoN.js";import"./Actions-CnZAX5A7.js";import"./Button-Banh19m4.js";import"./Checkbox-CNLOjtrl.js";import"./DataTable-B3Kk1wYm.js";import"./FileUploader-CMDXpFRd.js";import{I as v}from"./IconButton-CCYnqubk.js";import"./Input-9RGlwld0.js";import"./InteractiveMap-BgxsE3FC.js";import"./Link-MelhLpsn.js";import"./Modal-ZxQnclmm.js";import"./MultiSelect-CZqrStHw.js";import"./Select-Bbk94O7l.js";import{S as f}from"./Sidebar-CLa6tnDm.js";import"./preload-helper-PPVm8Dsz.js";import"./iconBase-DYa3aeiK.js";import"./theme-CnCMScLz.js";import"./index-BGr78rbd.js";import"./index-DlYu5KXR.js";import"./useResponsive-DCbf2ZyH.js";const g="NEUS UI",i=({children:n,routes:r,menu:s})=>{const[o,c]=l.useState(!1);return e.jsxs("div",{className:"app-template",children:[e.jsxs("div",{className:"header-container",children:[e.jsx(v,{icon:m,onClick:()=>c(!o)}),s]}),e.jsx("div",{className:`sidebar-container ${o?"sidebar-container--active":""}`,children:e.jsx(f,{title:g,items:r})}),e.jsx("div",{className:"content",children:e.jsx("div",{className:"content-container",children:n})})]})};i.__docgenInfo={description:"",methods:[],displayName:"AppTemplate",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},routes:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  label: string;
  icon?: IconType;
  onClick?: () => void;
  active?: boolean;
  visible?: boolean;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"icon",value:{name:"IconType",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"active",value:{name:"boolean",required:!1}},{key:"visible",value:{name:"boolean",required:!1}}]}}],raw:"SidebarItem[]"},description:""},menu:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const Y={title:"Templates/AppTemplate",component:i,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{children:{control:!1,description:"Content to display in the main area",defaultValue:"Main content area"},routes:{control:"object",description:"Sidebar navigation items"},menu:{control:!1,description:"Optional menu component for the header"}}},k=[{label:"Home",icon:p,onClick:()=>console.log("Home clicked"),active:!0,visible:!0},{label:"Profile",icon:a,onClick:()=>console.log("Profile clicked"),active:!1,visible:!0},{label:"Search",icon:d,onClick:()=>console.log("Search clicked"),active:!1,visible:!0},{label:"Settings",icon:u,onClick:()=>console.log("Settings clicked"),active:!1,visible:!0},{label:"Notifications",icon:h,onClick:()=>console.log("Notifications clicked"),active:!1,visible:!1}],y=[{label:"Logout",onClick:()=>console.log("Logout clicked")}],t={args:{children:e.jsxs("div",{style:{padding:"2rem"},children:[e.jsx("h1",{children:"Welcome to the Application"}),e.jsx("br",{}),e.jsx("p",{children:"This is the main content area. You can edit this content and the sidebar items using the Storybook controls."})]}),routes:k,menu:e.jsx(b,{items:y,name:"User",icon:a})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: <div style={{
      padding: "2rem"
    }}>
        <h1>Welcome to the Application</h1>
        <br />
        <p>
          This is the main content area. You can edit this content and the
          sidebar items using the Storybook controls.
        </p>
      </div>,
    routes: defaultRoutes,
    menu: <Menu items={menuItems} name="User" icon={FaUser} />
  }
}`,...t.parameters?.docs?.source}}};const $=["AppTemplate"];export{t as AppTemplate,$ as __namedExportsOrder,Y as default};
