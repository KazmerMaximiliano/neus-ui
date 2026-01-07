import{C as a}from"./Checkbox-DeBTGg6s.js";import"./iframe-ngWylFNu.js";import"./preload-helper-PPVm8Dsz.js";const r={title:"Components/Checkbox",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{name:{control:{type:"text"},description:"The name attribute for the checkbox input",table:{type:{summary:"string"},category:"Props"}},checked:{control:{type:"boolean"},description:"Whether the checkbox is checked",table:{type:{summary:"boolean"},category:"Props"}},disabled:{control:{type:"boolean"},description:"Whether the checkbox is disabled",table:{type:{summary:"boolean"},category:"Props"}},onChange:{action:"checkbox changed",description:"Callback function triggered when checkbox state changes",table:{type:{summary:"(checked: boolean) => void"},category:"Events"}}}},e={args:{name:"example-checkbox",checked:!1,disabled:!1,onChange:o=>console.log("Checkbox changed:",o)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    name: "example-checkbox",
    checked: false,
    disabled: false,
    onChange: (checked: boolean) => console.log("Checkbox changed:", checked)
  }
}`,...e.parameters?.docs?.source}}};const s=["Checkbox"];export{e as Checkbox,s as __namedExportsOrder,r as default};
