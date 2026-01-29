import{C as a}from"./Clock-MXUT5Dst.js";import"./iframe-CODiBQEi.js";import"./preload-helper-PPVm8Dsz.js";const s={title:"Components/Clock",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:!1,description:"The current selected time",table:{type:{summary:"{ hours: number; minutes: number }"}}},disabled:{control:"boolean",description:"Disables the clock from user interaction",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},readonly:{control:"boolean",description:"Makes the clock read-only",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},format:{control:"select",options:["12h","24h"],description:"Time format (12-hour or 24-hour)",table:{type:{summary:"12h | 24h"},defaultValue:{summary:"12h"}}},onChange:{control:!1,description:"Callback when time selection changes",table:{type:{summary:"(value: { hours: number; minutes: number }) => void"}}}}},e={args:{format:"12h",disabled:!1,readonly:!1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    format: "12h",
    disabled: false,
    readonly: false
  }
}`,...e.parameters?.docs?.source}}};const l=["Clock"];export{e as Clock,l as __namedExportsOrder,s as default};
