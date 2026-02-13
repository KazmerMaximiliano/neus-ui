import{I as r}from"./Input-9a5tfjT1.js";import"./iframe-D-iemo5l.js";import"./preload-helper-PPVm8Dsz.js";const p={title:"Components/Input",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{name:{control:{type:"text"},description:"The name attribute for the input element",table:{type:{summary:"string"},category:"Props"}},value:{control:{type:"text"},description:"The current value for the input",table:{type:{summary:"string | number"},category:"Props"}},defaultValue:{control:{type:"text"},description:"The default value for the input (for uncontrolled usage)",table:{type:{summary:"string | number"},category:"Props"}},placeholder:{control:{type:"text"},description:"Placeholder text for the input",table:{type:{summary:"string"},category:"Props"}},label:{control:{type:"text"},description:"Label text for the input",table:{type:{summary:"string"},category:"Props"}},error:{control:{type:"text"},description:"Error message to display",table:{type:{summary:"string"},category:"Props"}},type:{control:{type:"select"},options:["text","password","email","number","color","tel","url"],description:"The type of input field",table:{type:{summary:"'text' | 'password' | 'email' | 'number' | 'color' | 'tel' | 'url'"},category:"Props"}},min:{control:{type:"text"},description:"The minimum value (for number, date, time types)",table:{type:{summary:"string | number"},category:"Props"}},max:{control:{type:"text"},description:"The maximum value (for number, date, time types)",table:{type:{summary:"string | number"},category:"Props"}},step:{control:{type:"text"},description:"The step increment (for number, date, time types)",table:{type:{summary:"string | number"},category:"Props"}},disabled:{control:{type:"boolean"},description:"Whether the input is disabled",table:{type:{summary:"boolean"},category:"Props"}},readonly:{control:{type:"boolean"},description:"Whether the input is read-only",table:{type:{summary:"boolean"},category:"Props"}},required:{control:{type:"boolean"},description:"Whether the input is required (shows red asterisk)",table:{type:{summary:"boolean"},category:"Props"}},onChange:{action:"input changed",description:"Callback function triggered when input value changes",table:{type:{summary:"(value: string) => void"},category:"Events"}}}},e={args:{name:"example-input",placeholder:"Enter text here...",label:"Example Input",type:"text",value:"",error:"",min:"",max:"",step:"",disabled:!1,required:!1,onChange:t=>console.log("Input changed:",t)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    name: "example-input",
    placeholder: "Enter text here...",
    label: "Example Input",
    type: "text",
    value: "",
    error: "",
    min: "",
    max: "",
    step: "",
    disabled: false,
    required: false,
    onChange: (value: string) => console.log("Input changed:", value)
  }
}`,...e.parameters?.docs?.source}}};const s=["Input"];export{e as Input,s as __namedExportsOrder,p as default};
