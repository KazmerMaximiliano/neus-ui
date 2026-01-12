import{a as n}from"./index-Cf_3owKX.js";import{M as t}from"./Menu-DEeNlTRr.js";import"./iconBase-DuaqxvJM.js";import"./iframe-BBmzJCBT.js";import"./preload-helper-PPVm8Dsz.js";const s={title:"Components/Menu",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{icon:{description:"Icon displayed in the menu avatar"},name:{description:"Name displayed at the top of the dropdown menu",control:"text"},items:{description:"Array of menu items with labels and onClick functions"}}},e={args:{icon:n,name:"John Doe",items:[{label:"My Profile",onClick:()=>alert("Navigating to profile")},{label:"Settings",onClick:()=>alert("Opening settings")},{label:"Help",onClick:()=>alert("Showing help")},{label:"Sign Out",onClick:()=>alert("Signing out")}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    icon: FaUser,
    name: "John Doe",
    items: [{
      label: "My Profile",
      onClick: () => alert("Navigating to profile")
    }, {
      label: "Settings",
      onClick: () => alert("Opening settings")
    }, {
      label: "Help",
      onClick: () => alert("Showing help")
    }, {
      label: "Sign Out",
      onClick: () => alert("Signing out")
    }]
  }
}`,...e.parameters?.docs?.source}}};const c=["Menu"];export{e as Menu,c as __namedExportsOrder,s as default};
