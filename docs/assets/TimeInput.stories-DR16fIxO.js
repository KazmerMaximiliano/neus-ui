import{T as t}from"./TimeInput-BVzHSwLY.js";import"./iframe-DqT70-mt.js";import"./preload-helper-PPVm8Dsz.js";import"./Clock-BZVR3SCu.js";const i={title:"Components/TimeInput",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:!1,description:"The current selected time(s)",table:{type:{summary:"TimeValue"}}},defaultValue:{control:!1,description:"The initial time(s) value",table:{type:{summary:"TimeValue"}}},name:{control:"text",description:"The name attribute for the input",table:{type:{summary:"string"}}},label:{control:"text",description:"Label text displayed above the input",table:{type:{summary:"string"}}},placeholder:{control:"text",description:"Placeholder text for the input",table:{type:{summary:"string"},defaultValue:{summary:"Select a time"}}},disabled:{control:"boolean",description:"Disables the input from user interaction",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},readonly:{control:"boolean",description:"Makes the input read-only",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},required:{control:"boolean",description:"Whether a time selection is required",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},error:{control:"text",description:"Error message to display",table:{type:{summary:"string"}}},format:{control:"radio",options:["12h","24h"],description:"Time display format (12-hour or 24-hour)",table:{type:{summary:'"12h" | "24h"'},defaultValue:{summary:'"24h"'}}},onChange:{control:!1,description:"Callback when time selection changes",table:{type:{summary:"(value: TimeValue | undefined) => void"}}}}},e={args:{label:"Select a time",name:"time-input",placeholder:"Pick a time...",disabled:!1,readonly:!1,required:!1,error:void 0,format:"24h"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Select a time",
    name: "time-input",
    placeholder: "Pick a time...",
    disabled: false,
    readonly: false,
    required: false,
    error: undefined,
    format: "24h"
  }
}`,...e.parameters?.docs?.source}}};const n=["TimeInput"];export{e as TimeInput,n as __namedExportsOrder,i as default};
