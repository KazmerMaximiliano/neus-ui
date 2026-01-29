import{b as t}from"./index-B8_oL56h.js";import{M as n}from"./Menu-DlEhvH5t.js";import"./iconBase-Cz-05w-g.js";import"./iframe-DvNkofA_.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-Btl2ENYn.js";import"./theme-B1I8RgB0.js";import"./IconButton-CPgYrp58.js";const p={title:"Components/Menu",component:n,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{icon:{description:"Icon to display as the menu trigger (uses IconButton)"},text:{description:"Text to display as the menu trigger (uses Button)",control:"text"},items:{description:"Array of menu items with labels and onClick functions"}}},e={args:{icon:t,items:[{label:"Edit",onClick:()=>alert("Edit")},{label:"Delete",onClick:()=>alert("Delete")},{label:"Share",onClick:()=>alert("Share")}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    icon: FaEllipsisV,
    items: [{
      label: "Edit",
      onClick: () => alert("Edit")
    }, {
      label: "Delete",
      onClick: () => alert("Delete")
    }, {
      label: "Share",
      onClick: () => alert("Share")
    }]
  }
}`,...e.parameters?.docs?.source}}};const d=["Menu"];export{e as Menu,d as __namedExportsOrder,p as default};
