import{r as l,j as e}from"./iframe-BUvYa3it.js";import{g as m,c as p,F as i,h as d,e as u,i as h}from"./index-hEV9iKXF.js";import{D as b}from"./Dropdown-Ddyffuzw.js";import"./Actions-CkKWxTBL.js";import"./Button-DluPL2-m.js";import"./Calendar-iAJrWFtx.js";import"./Card-B_L3kGWm.js";import"./Checkbox-CYzi5NdM.js";import"./Clock-MvfRomHC.js";import"./DataTable-SQqneJgU.js";import"./DateInput-C-7yYnXi.js";import"./FileUploader-u_79S5qC.js";import{I as v}from"./IconButton-DspjMOQ7.js";import"./Input-17uCfJQ_.js";import"./InteractiveMap-EvYZTJQr.js";import"./Link-JiexZ2hx.js";import"./Menu-yu22FrAG.js";import"./Modal-QWLs_Toc.js";import"./MultiSelect-BdVIYYWT.js";import"./Select-Bvpnv4cw.js";import{S as f}from"./Sidebar-Bc5HoZhM.js";import"./TimeInput-B2hOtwul.js";import"./WeekCalendar-BDwB3rCN.js";import"./preload-helper-PPVm8Dsz.js";import"./iconBase-DTFyxia5.js";import"./theme-CBIRwTD1.js";import"./index-DBY1-e6a.js";import"./index-BlUjfMkT.js";import"./useResponsive-B_4QzR2s.js";const g="NEUS UI",a=({children:n,routes:r,menu:s})=>{const[o,c]=l.useState(!1);return e.jsxs("div",{className:"app-template",children:[e.jsxs("div",{className:"header-container",children:[e.jsx(v,{icon:m,onClick:()=>c(!o)}),s]}),e.jsx("div",{className:`sidebar-container ${o?"sidebar-container--active":""}`,children:e.jsx(f,{title:g,items:r})}),e.jsx("div",{className:"content",children:e.jsx("div",{className:"content-container",children:n})})]})};a.__docgenInfo={description:"",methods:[],displayName:"AppTemplate",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},routes:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  label: string;
  icon?: IconType;
  onClick?: () => void;
  active?: boolean;
  visible?: boolean;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"icon",value:{name:"IconType",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"active",value:{name:"boolean",required:!1}},{key:"visible",value:{name:"boolean",required:!1}}]}}],raw:"SidebarItem[]"},description:""},menu:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const K={title:"Templates/AppTemplate",component:a,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{children:{control:!1,description:"Content to display in the main area",defaultValue:"Main content area"},routes:{control:"object",description:"Sidebar navigation items"},menu:{control:!1,description:"Optional menu component for the header"}}},k=[{label:"Home",icon:p,onClick:()=>console.log("Home clicked"),active:!0,visible:!0},{label:"Profile",icon:i,onClick:()=>console.log("Profile clicked"),active:!1,visible:!0},{label:"Search",icon:d,onClick:()=>console.log("Search clicked"),active:!1,visible:!0},{label:"Settings",icon:u,onClick:()=>console.log("Settings clicked"),active:!1,visible:!0},{label:"Notifications",icon:h,onClick:()=>console.log("Notifications clicked"),active:!1,visible:!1}],y=[{label:"Logout",onClick:()=>console.log("Logout clicked")}],t={args:{children:e.jsxs("div",{style:{padding:"2rem"},children:[e.jsx("h1",{children:"Welcome to the Application"}),e.jsx("br",{}),e.jsx("p",{children:"This is the main content area. You can edit this content and the sidebar items using the Storybook controls."})]}),routes:k,menu:e.jsx(b,{items:y,name:"User",icon:i})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
    menu: <Dropdown items={menuItems} name="User" icon={FaUser} />
  }
}`,...t.parameters?.docs?.source}}};const Q=["AppTemplate"];export{t as AppTemplate,Q as __namedExportsOrder,K as default};
