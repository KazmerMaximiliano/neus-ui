import{F as o,a}from"./FileUploader-kn8dvErC.js";import"./iframe-DvNkofA_.js";import"./preload-helper-PPVm8Dsz.js";import"./iconBase-Cz-05w-g.js";import"./Button-Btl2ENYn.js";import"./theme-B1I8RgB0.js";const c={title:"Components/FileUploader",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{allowedTypes:{control:"multi-select",options:Object.values(o)},maxWeight:{control:"number"},multiple:{control:"boolean"},error:{control:"text"},placeholder:{control:"text"},disabled:{control:"boolean",description:"Whether the file uploader is disabled"}}},e={args:{allowedTypes:[o.IMAGE,o.PDF,o.DOC],maxWeight:5*1024*1024,multiple:!1,disabled:!1,onChange:(l,r)=>{console.log("File upload data:",l),r&&console.error("Upload error:",r)}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
