import{j as e}from"./iframe-BY7DbhaD.js";import{C as a}from"./Card-CuS2-a18.js";import"./preload-helper-PPVm8Dsz.js";const s={title:"Components/Card",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{children:{control:!1,description:"The main content of the card, which can be any React node (text, elements, etc.)"},avatarImage:{control:"text",description:"URL of the avatar image to display in the card."},avatarAlt:{control:"text",description:"Alternative text for the avatar image, used for accessibility."},leading:{control:!1,description:"Content to display in the leading section of the card header (e.g., title, icon)."},trailing:{control:!1,description:"Content to display in the trailing section of the card header (e.g., action buttons, status)."},fill:{control:"boolean",description:"If true, the card will take up the full width of its container."},color:{control:"select",options:["purple","pink","red","yellow","blue","green"],description:"The color theme of the card."}}},n=()=>e.jsxs("div",{children:[e.jsx("p",{children:"This is a card component. You can put any content here."}),e.jsx("p",{children:"It supports text, images, and other React elements."})]}),t={args:{children:e.jsx(n,{}),avatarAlt:"Username",leading:e.jsx("h3",{children:"Card Title"}),trailing:e.jsx("span",{children:"Trailing Info"}),fill:!0,color:"blue"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: <CardContent />,
    avatarAlt: "Username",
    leading: <h3>Card Title</h3>,
    trailing: <span>Trailing Info</span>,
    fill: true,
    color: "blue"
  }
}`,...t.parameters?.docs?.source}}};const l=["Card"];export{t as Card,l as __namedExportsOrder,s as default};
