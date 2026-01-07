import{M as o}from"./MultiSelect-CZqrStHw.js";import"./iframe-DS6A7Oju.js";import"./preload-helper-PPVm8Dsz.js";import"./Checkbox-CNLOjtrl.js";const s={title:"Components/MultiSelect",component:o,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{name:{control:{type:"text"},description:"The name attribute for the multiselect input",table:{type:{summary:"string"},category:"Props"}},options:{control:{type:"object"},description:"Array of options with value and label properties",table:{type:{summary:"{ value: string; label: string }[]"},category:"Props"}},error:{control:{type:"text"},description:"Error message to display",table:{type:{summary:"string"},category:"Props"}},placeholder:{control:{type:"text"},description:"Placeholder text for the multiselect",table:{type:{summary:"string"},category:"Props"}},label:{control:{type:"text"},description:"Label text for the multiselect (automatically used when placeholder is provided)",table:{type:{summary:"string"},category:"Props"}},value:{control:{type:"object"},description:"Array of currently selected values",table:{type:{summary:"string[]"},category:"Props"}},defaultValue:{control:{type:"object"},description:"Array of default selected values (for uncontrolled usage)",table:{type:{summary:"string[]"},category:"Props"}},disabled:{control:{type:"boolean"},description:"Whether the multiselect is disabled",table:{type:{summary:"boolean"},category:"Props"}},onChange:{action:"values changed",description:"Callback function triggered when selected values change",table:{type:{summary:"(values: string[]) => void"},category:"Events"}}}},e={args:{name:"example-multiselect",options:[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"},{value:"option4",label:"Option 4"}],placeholder:"Select multiple options...",value:["option1"],defaultValue:[],disabled:!1,onChange:t=>console.log("Selected values:",t)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    name: "example-multiselect",
    options: [{
      value: "option1",
      label: "Option 1"
    }, {
      value: "option2",
      label: "Option 2"
    }, {
      value: "option3",
      label: "Option 3"
    }, {
      value: "option4",
      label: "Option 4"
    }],
    placeholder: "Select multiple options...",
    value: ["option1"],
    defaultValue: [],
    disabled: false,
    onChange: (values: string[]) => console.log("Selected values:", values)
  }
}`,...e.parameters?.docs?.source}}};const i=["MultiSelect"];export{e as MultiSelect,i as __namedExportsOrder,s as default};
