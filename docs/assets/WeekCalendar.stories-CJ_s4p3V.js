import{j as a}from"./iframe-BvDr7JdR.js";import{W as i}from"./WeekCalendar-BRxdkhHd.js";import"./preload-helper-PPVm8Dsz.js";import"./iconBase-BNTVd_0l.js";import"./IconButton-BUkyvN20.js";import"./theme-DzhxdF8a.js";const t=new Date,n=new Date(t);n.setDate(n.getDate()+1);const o=new Date(t);o.setDate(o.getDate()+2);const r=new Date(t);r.setDate(r.getDate()+3);const m={title:"Components/WeekCalendar",component:i,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{title:{control:"text",description:"The title displayed in the calendar header"},events:{control:"object",description:"Array of event categories with their events"},hoverContent:{control:!1,description:"Custom React node displayed as a tooltip at the cursor position when hovering over event cells"},onEventClick:{action:"eventClicked",description:"Callback fired when clicking an event cell, receives the CalendarEvent"},onWeekChange:{action:"weekChanged",description:"Callback fired when navigating to a different week, receives weekStart and weekEnd dates"}}},e={args:{title:"Events",hoverContent:a.jsx("div",{style:{padding:"8px 12px",backgroundColor:"#fff",border:"1px solid #e0e0e0",borderRadius:"8px",boxShadow:"0 2px 8px rgba(0,0,0,0.15)",fontSize:"13px"},children:"Click to see details"}),events:[{category:{title:"Room A",label:"Suite",color:"purple"},events:[{id:1,title:"John Doe",start:t,end:o,description:"2 guests"}]},{category:{title:"Room B",label:"Standard"},events:[{id:2,title:"Jane Smith",start:n,end:r,description:"1 guest"}]}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Events",
    hoverContent: <div style={{
      padding: "8px 12px",
      backgroundColor: "#fff",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      fontSize: "13px"
    }}>
        Click to see details
      </div>,
    events: [{
      category: {
        title: "Room A",
        label: "Suite",
        color: "purple"
      },
      events: [{
        id: 1,
        title: "John Doe",
        start: today,
        end: dayAfterTomorrow,
        description: "2 guests"
      }]
    }, {
      category: {
        title: "Room B",
        label: "Standard"
      },
      events: [{
        id: 2,
        title: "Jane Smith",
        start: tomorrow,
        end: threeDaysLater,
        description: "1 guest"
      }]
    }]
  }
}`,...e.parameters?.docs?.source}}};const v=["WeekCalendar"];export{e as WeekCalendar,v as __namedExportsOrder,m as default};
