import{F as o,a}from"./FileUploader-Bd9_3r4h.js";import"./iframe-CODiBQEi.js";import"./preload-helper-PPVm8Dsz.js";import"./iconBase-pMZiL-3B.js";import"./Button-CHmjrgkf.js";import"./theme-B1ocwPRL.js";const c={title:"Components/FileUploader",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{allowedTypes:{control:"multi-select",options:Object.values(o)},maxWeight:{control:"number"},multiple:{control:"boolean"},error:{control:"text"},placeholder:{control:"text"},disabled:{control:"boolean",description:"Whether the file uploader is disabled"}}},e={args:{allowedTypes:[o.IMAGE,o.PDF,o.DOC],maxWeight:5*1024*1024,multiple:!1,disabled:!1,onChange:(l,r)=>{console.log("File upload data:",l),r&&console.error("Upload error:",r)}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    allowedTypes: [FileType.IMAGE, FileType.PDF, FileType.DOC],
    maxWeight: 5 * 1024 * 1024,
    multiple: false,
    disabled: false,
    onChange: (data, error) => {
      console.log("File upload data:", data);
      if (error) console.error("Upload error:", error);
    }
  }
}`,...e.parameters?.docs?.source}}};const m=["FileUploader"];export{e as FileUploader,m as __namedExportsOrder,c as default};
