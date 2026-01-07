import{b as o,a as i,c as l,d as t,e as a}from"./index-BD9ZhrtC.js";import{S as n}from"./Sidebar-CLa6tnDm.js";import"./iconBase-DYa3aeiK.js";import"./iframe-DS6A7Oju.js";import"./preload-helper-PPVm8Dsz.js";import"./useResponsive-DCbf2ZyH.js";const d={title:"Components/Sidebar",component:n,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{items:{control:{type:"object"},description:"Array of sidebar navigation items",table:{type:{summary:"SidebarItem[]"},category:"Props"}},title:{control:{type:"text"},description:"Optional title for the sidebar",table:{type:{summary:"string"},category:"Props"}}}},e={args:{title:"Navigation",items:[{label:"Dashboard",icon:o,onClick:()=>console.log("Dashboard clicked"),active:!0,visible:!0},{label:"Profile",icon:i,onClick:()=>console.log("Profile clicked"),active:!1,visible:!0},{label:"Documents",icon:l,onClick:()=>console.log("Documents clicked"),active:!1,visible:!0},{label:"Settings",icon:t,onClick:()=>console.log("Settings clicked"),active:!1,visible:!0},{label:"Logout",icon:a,onClick:()=>console.log("Logout clicked"),active:!1,visible:!0}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Navigation",
    items: [{
      label: "Dashboard",
      icon: FaHome,
      onClick: () => console.log("Dashboard clicked"),
      active: true,
      visible: true
    }, {
      label: "Profile",
      icon: FaUser,
      onClick: () => console.log("Profile clicked"),
      active: false,
      visible: true
    }, {
      label: "Documents",
      icon: FaFile,
      onClick: () => console.log("Documents clicked"),
      active: false,
      visible: true
    }, {
      label: "Settings",
      icon: FaCog,
      onClick: () => console.log("Settings clicked"),
      active: false,
      visible: true
    }, {
      label: "Logout",
      icon: FaSignOutAlt,
      onClick: () => console.log("Logout clicked"),
      active: false,
      visible: true
    }]
  }
}`,...e.parameters?.docs?.source}}};const u=["Sidebar"];export{e as Sidebar,u as __namedExportsOrder,d as default};
