import{S as t}from"./Sidebar-CI-rOdA1.js";import{H as i,S as n}from"./settings-DKOaoJ0U.js";import{U as l}from"./user-BS6TpjMR.js";import{c as o}from"./createLucideIcon-Ch3ffpfY.js";import"./iframe-CQynyMMU.js";import"./preload-helper-PPVm8Dsz.js";import"./useResponsive-Dw58UYQZ.js";const a=[["path",{d:"M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8",key:"14sh0y"}],["path",{d:"M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z",key:"1970lx"}],["path",{d:"M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1",key:"l4dndm"}]],s=o("files",a);const c=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],r=o("log-out",c),v={title:"Components/Sidebar",component:t,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{items:{control:{type:"object"},description:"Array of sidebar navigation items",table:{type:{summary:"SidebarItem[]"},category:"Props"}},title:{control:{type:"text"},description:"Optional title for the sidebar",table:{type:{summary:"string"},category:"Props"}}}},e={args:{title:"Navigation",items:[{label:"Dashboard",icon:i,onClick:()=>console.log("Dashboard clicked"),active:!0,visible:!0},{label:"Profile",icon:l,onClick:()=>console.log("Profile clicked"),active:!1,visible:!0},{label:"Documents",icon:s,onClick:()=>console.log("Documents clicked"),active:!1,visible:!0},{label:"Settings",icon:n,onClick:()=>console.log("Settings clicked"),active:!1,visible:!0},{label:"Logout",icon:r,onClick:()=>console.log("Logout clicked"),active:!1,visible:!0}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Navigation",
    items: [{
      label: "Dashboard",
      icon: House,
      onClick: () => console.log("Dashboard clicked"),
      active: true,
      visible: true
    }, {
      label: "Profile",
      icon: User,
      onClick: () => console.log("Profile clicked"),
      active: false,
      visible: true
    }, {
      label: "Documents",
      icon: Files,
      onClick: () => console.log("Documents clicked"),
      active: false,
      visible: true
    }, {
      label: "Settings",
      icon: Settings,
      onClick: () => console.log("Settings clicked"),
      active: false,
      visible: true
    }, {
      label: "Logout",
      icon: LogOut,
      onClick: () => console.log("Logout clicked"),
      active: false,
      visible: true
    }]
  }
}`,...e.parameters?.docs?.source}}};const f=["Sidebar"];export{e as Sidebar,f as __namedExportsOrder,v as default};
