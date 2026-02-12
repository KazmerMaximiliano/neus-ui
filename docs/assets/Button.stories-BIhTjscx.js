import{B as o}from"./Button-B-OzqstF.js";import"./iframe-BvDr7JdR.js";import"./preload-helper-PPVm8Dsz.js";import"./theme-DzhxdF8a.js";const l={title:"Components/Button",component:o,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{label:{control:"text",description:"The text displayed inside the button"},type:{control:"select",options:["button","submit","reset"],description:"The HTML button type"},variant:{control:"select",options:["solid","outlined","text"],description:"The visual style variant of the button"},color:{control:"select",options:["primary","success","error","info"],description:"The color scheme of the button"},disabled:{control:"boolean",description:"Disables the button when true"},fullWidth:{control:"boolean",description:"Makes the button take full width when true"},loading:{control:"boolean",description:"Shows a loading spinner when true"},onClick:{action:"clicked",description:"Callback function triggered on button click"}}},t={args:{label:"Click Me",type:"button",variant:"solid",color:"primary",disabled:!1,fullWidth:!1,loading:!1}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Click Me",
    type: "button",
    variant: "solid",
    color: "primary",
    disabled: false,
    fullWidth: false,
    loading: false
  }
}`,...t.parameters?.docs?.source}}};const s=["Button"];export{t as Button,s as __namedExportsOrder,l as default};
