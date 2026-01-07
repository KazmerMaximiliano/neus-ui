import{j as o}from"./iframe-DUhPRjdD.js";import{D as n}from"./DataTable-tinQuUgZ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CqSabud8.js";import"./index-Bi_WUWnz.js";import"./index-BBFq8TI2.js";import"./iconBase-CWqiinTQ.js";import"./useResponsive-CVh_oTBo.js";import"./Actions-DLo6dNdf.js";import"./IconButton-CVWX5bC7.js";import"./theme-Dns3lYPg.js";const f={title:"Components/DataTable",component:n,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{data:{control:!1,description:"Array of data objects to display in the table"},pagination:{control:!1,description:"Pagination information object"},onEdit:{action:"edited",description:"Callback function when edit action is clicked"},onDelete:{action:"deleted",description:"Callback function when delete action is clicked"},onInfo:{action:"info",description:"Callback function when info action is clicked"},onPaginationChange:{action:"page-changed",description:"Callback function when pagination changes"},columnLabels:{control:"object",description:"Object mapping column fields to display labels"},noDataTitle:{control:"text",description:"Title to show when no data is available"},noDataDescription:{control:"text",description:"Description to show when no data is available"}}},t=[{id:1,name:"John Doe",email:"john.doe@example.com",role:"Admin",status:"Active",created_at:"2024-01-15"},{id:2,name:"Jane Smith",email:"jane.smith@example.com",role:"User",status:"Active",created_at:"2024-01-16"},{id:3,name:"Bob Johnson",email:"bob.johnson@example.com",role:"Moderator",status:"Inactive",created_at:"2024-01-17"},{id:4,name:"Alice Brown",email:"alice.brown@example.com",role:"User",status:"Active",created_at:"2024-01-18"},{id:5,name:"Charlie Wilson",email:"charlie.wilson@example.com",role:"User",status:"Active",created_at:"2024-01-19"}],i={current_page:1,last_page:3,per_page:5,total:15},r={id:"ID",name:"Full Name",email:"Email Address",role:"User Role",status:"Account Status",created_at:"Registration Date"},e={args:{data:t,pagination:i,columnLabels:r,noDataTitle:"No users found",noDataDescription:"Try adjusting your search criteria or add new users",onEdit:a=>{console.log("Edit user:",a)},onDelete:a=>{console.log("Delete user:",a)},onInfo:a=>{console.log("View user info:",a)},onPaginationChange:a=>{console.log("Pagination changed:",a)}},decorators:[a=>o.jsx("div",{style:{width:"60vw",padding:"1rem",display:"flex",flexDirection:"column",boxSizing:"border-box"},children:o.jsx(a,{})})]};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    data: sampleData,
    pagination: samplePagination,
    columnLabels,
    noDataTitle: "No users found",
    noDataDescription: "Try adjusting your search criteria or add new users",
    onEdit: (rowData: any) => {
      console.log("Edit user:", rowData);
    },
    onDelete: (rowData: any) => {
      console.log("Delete user:", rowData);
    },
    onInfo: (rowData: any) => {
      console.log("View user info:", rowData);
    },
    onPaginationChange: (params: any) => {
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
}`,...e.parameters?.docs?.source}}};const w=["DataTable"];export{e as DataTable,w as __namedExportsOrder,f as default};
