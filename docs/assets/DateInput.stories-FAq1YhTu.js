import{D as a}from"./DateInput-BrlpFlId.js";import"./iframe-B2R9Ead3.js";import"./preload-helper-PPVm8Dsz.js";import"./Calendar-7FUvpuBh.js";const n={title:"Components/DateInput",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:!1,description:"The current selected date(s)",table:{type:{summary:"Date | DateRange"}}},defaultValue:{control:!1,description:"The initial date(s) value",table:{type:{summary:"Date | DateRange"}}},name:{control:"text",description:"The name attribute for the input",table:{type:{summary:"string"}}},label:{control:"text",description:"Label text displayed above the input",table:{type:{summary:"string"}}},placeholder:{control:"text",description:"Placeholder text for the input",table:{type:{summary:"string"},defaultValue:{summary:"Select a date"}}},disabled:{control:"boolean",description:"Disables the input from user interaction",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},readonly:{control:"boolean",description:"Makes the input read-only",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},required:{control:"boolean",description:"Whether a date selection is required",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},error:{control:"text",description:"Error message to display",table:{type:{summary:"string"}}},mode:{control:"select",options:["single","range"],description:"Date selection mode",table:{type:{summary:"single | range"},defaultValue:{summary:"single"}}},onChange:{control:!1,description:"Callback when date selection changes",table:{type:{summary:"(value: Date | DateRange | undefined) => void"}}}}},e={args:{mode:"single",label:"Select a date",name:"date-input",placeholder:"Pick a date...",disabled:!1,readonly:!1,required:!1,error:void 0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    mode: "single",
    label: "Select a date",
    name: "date-input",
    placeholder: "Pick a date...",
    disabled: false,
    readonly: false,
    required: false,
    error: undefined
  }
}`,...e.parameters?.docs?.source}}};const s=["DateInput"];export{e as DateInput,s as __namedExportsOrder,n as default};
