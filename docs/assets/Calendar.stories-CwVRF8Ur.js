import{C as a}from"./Calendar-DUVqUrtn.js";import"./iframe-CMMVOOWB.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-Dgryh80L.js";const o={title:"Components/Calendar",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:!1,description:"The current selected date(s)",table:{type:{summary:"Date | Date[] | DateRange"}}},defaultValue:{control:!1,description:"The initial date(s) value",table:{type:{summary:"Date | Date[] | DateRange"}}},name:{control:"text",description:"The name attribute for the input",table:{type:{summary:"string"}}},label:{control:"text",description:"Label text displayed above the calendar",table:{type:{summary:"string"}}},disabled:{control:"boolean",description:"Disables the calendar from user interaction",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},readonly:{control:"boolean",description:"Makes the calendar read-only",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},multiple:{control:"boolean",description:"Allows selection of multiple dates",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},error:{control:"text",description:"Error message to display",table:{type:{summary:"string"}}},onChange:{control:!1,description:"Callback when date selection changes",table:{type:{summary:"(value: Date | Date[] | DateRange | undefined) => void"}}},mode:{control:"select",options:["single","range","multiple"],description:"Calendar selection mode",table:{type:{summary:"single | range | multiple"}}},required:{control:"boolean",description:"Whether a date selection is required",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},selected:{control:!1,description:"The selected date(s) (from DayPicker)",table:{type:{summary:"Date | DateRange | Date[]"}}},yearRange:{control:"object",description:"Range of years available in the year picker",table:{type:{summary:"{ from: number; to: number }"},defaultValue:{summary:"currentYear - 50 to currentYear + 10"}}}}},e={args:{mode:"single",selected:new Date,required:!1,label:"Select a date",name:"calendar",disabled:!1,readonly:!1,multiple:!1,error:void 0,value:void 0,defaultValue:void 0,yearRange:{from:1970,to:2040}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    mode: "single",
    selected: new Date(),
    required: false,
    label: "Select a date",
    name: "calendar",
    disabled: false,
    readonly: false,
    multiple: false,
    error: undefined,
    value: undefined,
    defaultValue: undefined,
    yearRange: {
      from: 1970,
      to: 2040
    }
  }
}`,...e.parameters?.docs?.source}}};const s=["Calendar"];export{e as Calendar,s as __namedExportsOrder,o as default};
