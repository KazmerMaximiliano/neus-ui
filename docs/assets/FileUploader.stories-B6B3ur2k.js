import{F as o,a as l}from"./FileUploader-B9oFR91m.js";import"./iframe-CkFsuBe9.js";import"./preload-helper-PPVm8Dsz.js";import"./iconBase-CGPHW_o5.js";import"./Button-Bzlygi3B.js";import"./theme-DhDs8dNq.js";const d={title:"Components/FileUploader",component:l,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{allowedTypes:{control:"multi-select",options:Object.values(o)},maxWeight:{control:"number"},multiple:{control:"boolean"},error:{control:"text"},placeholder:{control:"text"}}},e={args:{allowedTypes:[o.IMAGE,o.PDF,o.DOC],maxWeight:5*1024*1024,multiple:!1,onChange:(a,r)=>{console.log("File upload data:",a),r&&console.error("Upload error:",r)}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    allowedTypes: [FileType.IMAGE, FileType.PDF, FileType.DOC],
    maxWeight: 5 * 1024 * 1024,
    multiple: false,
    onChange: (data, error) => {
      console.log("File upload data:", data);
      if (error) console.error("Upload error:", error);
    }
  }
}`,...e.parameters?.docs?.source}}};const m=["FileUploader"];export{e as FileUploader,m as __namedExportsOrder,d as default};
