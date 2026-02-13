import{S as o}from"./Select-DRAX74Zu.js";import"./iframe-pxy-Q_P9.js";import"./preload-helper-PPVm8Dsz.js";const r={title:"Components/Select",component:o,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{options:{control:{type:"object"},description:"Array of options with value and label properties",table:{type:{summary:"SelectOption[]"},category:"Props"}},name:{control:{type:"text"},description:"The name attribute for the select input",table:{type:{summary:"string"},category:"Props"}},value:{control:{type:"text"},description:"The current selected value",table:{type:{summary:"string"},category:"Props"}},defaultValue:{control:{type:"text"},description:"The default selected value (for uncontrolled usage)",table:{type:{summary:"string"},category:"Props"}},placeholder:{control:{type:"text"},description:"Placeholder text for the select",table:{type:{summary:"string"},category:"Props"}},label:{control:{type:"text"},description:"Label text for the select (automatically used when placeholder is provided)",table:{type:{summary:"string"},category:"Props"}},error:{control:{type:"text"},description:"Error message to display",table:{type:{summary:"string"},category:"Props"}},disabled:{control:{type:"boolean"},description:"Whether the select is disabled",table:{type:{summary:"boolean"},category:"Props"}},onChange:{action:"value changed",description:"Callback function triggered when selected value changes",table:{type:{summary:"(value: string) => void"},category:"Events"}}}},e={args:{options:[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"},{value:"option4",label:"Option 4"}],name:"example-select",placeholder:"Select an option...",value:"option1",disabled:!1,onChange:t=>console.log("Selected value:",t)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
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
    name: "example-select",
    placeholder: "Select an option...",
    value: "option1",
    disabled: false,
    onChange: (value: string) => console.log("Selected value:", value)
  }
}`,...e.parameters?.docs?.source}}};const s=["Select"];export{e as Select,s as __namedExportsOrder,r as default};
