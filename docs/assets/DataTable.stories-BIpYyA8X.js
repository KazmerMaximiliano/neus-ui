import{j as o}from"./iframe-CQynyMMU.js";import{D as n}from"./DataTable-CUaQz9_X.js";import"./preload-helper-PPVm8Dsz.js";import"./index-6RWmgpQt.js";import"./index-5uY27oyS.js";import"./useResponsive-Dw58UYQZ.js";import"./Actions-D4aKUo6m.js";import"./IconButton-B5tgVBhl.js";import"./theme-CRbcjS4r.js";import"./createLucideIcon-Ch3ffpfY.js";import"./pencil-DWQhHSHJ.js";import"./chevron-right-BKU6hfyy.js";const t=[{id:1,name:"John Doe",email:"john.doe@example.com",role:"Admin",status:"Active",created_at:"2024-01-15"},{id:2,name:"Jane Smith",email:"jane.smith@example.com",role:"User",status:"Active",created_at:"2024-01-16"},{id:3,name:"Bob Johnson",email:"bob.johnson@example.com",role:"Moderator",status:"Inactive",created_at:"2024-01-17"},{id:4,name:"Alice Brown",email:"alice.brown@example.com",role:"User",status:"Active",created_at:"2024-01-18"},{id:5,name:"Charlie Wilson",email:"charlie.wilson@example.com",role:"User",status:"Active",created_at:"2024-01-19"}],w={title:"Components/DataTable",component:n,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{data:{control:!1,description:"Array of data objects to display in the table"},pagination:{control:!1,description:"Pagination information object"},onEdit:{action:"edited",description:"Callback function when edit action is clicked"},onDelete:{action:"deleted",description:"Callback function when delete action is clicked"},onInfo:{action:"info",description:"Callback function when info action is clicked"},onPaginationChange:{action:"page-changed",description:"Callback function when pagination changes"},columnLabels:{control:"object",description:"Object mapping column fields to display labels"},useCardLayout:{control:"boolean",description:"Enable card layout on mobile devices"},noDataTitle:{control:"text",description:"Title to show when no data is available"},noDataDescription:{control:"text",description:"Description to show when no data is available"},hiddenColumns:{control:"object",description:"Array of column field names to hide"}}},i={current_page:1,last_page:3,per_page:5,total:15},r={id:"ID",name:"Full Name",email:"Email Address",role:"User Role",status:"Account Status",created_at:"Registration Date"},a={args:{data:t,pagination:i,columnLabels:r,useCardLayout:!0,noDataTitle:"No users found",hiddenColumns:[],noDataDescription:"Try adjusting your search criteria or add new users",onEdit:e=>{console.log("Edit user:",e)},onDelete:e=>{console.log("Delete user:",e)},onInfo:e=>{console.log("View user info:",e)},onPaginationChange:e=>{console.log("Pagination changed:",e)}},decorators:[e=>o.jsx("div",{style:{width:"60vw",padding:"1rem",display:"flex",flexDirection:"column",boxSizing:"border-box"},children:o.jsx(e,{})})]};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    data: sampleData,
    pagination: samplePagination,
    columnLabels,
    useCardLayout: true,
    noDataTitle: "No users found",
    hiddenColumns: [],
    noDataDescription: "Try adjusting your search criteria or add new users",
    onEdit: (rowData: SampleDataType) => {
      console.log("Edit user:", rowData);
    },
    onDelete: (rowData: SampleDataType) => {
      console.log("Delete user:", rowData);
    },
    onInfo: (rowData: SampleDataType) => {
      console.log("View user info:", rowData);
    },
    onPaginationChange: (params: {
      currentPage: number;
      pageSize: number;
    }) => {
      console.log("Pagination changed:", params);
    }
  },
  decorators: [Story => <div style={{
    width: "60vw",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box"
  }}>
        <Story />
      </div>]
}`,...a.parameters?.docs?.source}}};const y=["DataTable"];export{a as DataTable,y as __namedExportsOrder,w as default};
