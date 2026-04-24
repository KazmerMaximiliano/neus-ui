import{F as e,a}from"./FileUploader-1dObRERZ.js";import"./iframe-CczPaPep.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-C2p7NykP.js";import"./theme-BSzYbSrn.js";import"./createLucideIcon-B_UWBsNk.js";const c={title:"Components/FileUploader",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{allowedTypes:{control:"multi-select",options:Object.values(e)},maxWeight:{control:"number"},multiple:{control:"boolean"},error:{control:"text"},placeholder:{control:"text"},disabled:{control:"boolean",description:"Whether the file uploader is disabled"}}},o={args:{allowedTypes:[e.JPG,e.PNG,e.SVG,e.PDF,e.DOC],maxWeight:5*1024*1024,multiple:!1,disabled:!1,onChange:(r,l)=>{console.log("File upload data:",r),l&&console.error("Upload error:",l)}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    allowedTypes: [FileType.JPG, FileType.PNG, FileType.SVG, FileType.PDF, FileType.DOC],
    maxWeight: 5 * 1024 * 1024,
    multiple: false,
    disabled: false,
    onChange: (data, error) => {
      console.log("File upload data:", data);
      if (error) console.error("Upload error:", error);
    }
  }
}`,...o.parameters?.docs?.source}}};const m=["FileUploader"];export{o as FileUploader,m as __namedExportsOrder,c as default};
