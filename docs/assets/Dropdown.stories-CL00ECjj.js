import{D as e}from"./Dropdown-DfvjEsp1.js";import{U as o}from"./user-COaSB58f.js";import"./iframe-Dnphmdhb.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-DCICKiqX.js";const s={title:"Components/Dropdown",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{icon:{description:"Icon displayed in the dropdown avatar"},name:{description:"Name displayed at the top of the dropdown panel",control:"text"},items:{description:"Array of dropdown items with labels and onClick functions"}}},n={args:{icon:o,name:"John Doe",items:[{label:"My Profile",onClick:()=>alert("Navigating to profile")},{label:"Settings",onClick:()=>alert("Opening settings")},{label:"Help",onClick:()=>alert("Showing help")},{label:"Sign Out",onClick:()=>alert("Signing out")}]}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    icon: User,
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
}`,...n.parameters?.docs?.source}}};const p=["Dropdown"];export{n as Dropdown,p as __namedExportsOrder,s as default};
