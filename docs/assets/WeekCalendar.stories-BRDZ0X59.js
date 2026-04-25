import{j as o}from"./iframe-CMMVOOWB.js";import{W as s}from"./WeekCalendar-sIYsVeq7.js";import"./preload-helper-PPVm8Dsz.js";import"./IconButton-DfkmAWHQ.js";import"./theme-Cc5djzkT.js";import"./chevron-right-ihK7tVIo.js";import"./createLucideIcon-Dgryh80L.js";const t=new Date,r=new Date(t);r.setDate(r.getDate()+1);const a=new Date(t);a.setDate(a.getDate()+2);const i=new Date(t);i.setDate(i.getDate()+3);const v={title:"Components/WeekCalendar",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{title:{control:"text",description:"The title displayed in the calendar header"},events:{control:"object",description:"Array of event categories with their events"},hoverContent:{control:!1,description:"Render function called with the hovered CalendarEvent, returns a React node displayed as tooltip at the cursor position"},onEventClick:{action:"eventClicked",description:"Callback fired when clicking an event cell, receives the CalendarEvent"},onDayChange:{action:"dayChanged",description:"Callback fired when navigating to a different day, receives weekStart and weekEnd dates"}}},e={args:{title:"Events",hoverContent:n=>o.jsxs("div",{style:{padding:"8px 12px",backgroundColor:"#fff",border:"1px solid #e0e0e0",borderRadius:"8px",boxShadow:"0 2px 8px rgba(0,0,0,0.15)",fontSize:"13px"},children:[o.jsx("strong",{children:n.title}),n.description&&o.jsx("p",{style:{margin:"4px 0 0"},children:n.description})]}),events:[{category:{title:"Room A",label:"Suite",color:"#FF5733"},events:[{id:1,title:"John Doe",start:t,end:a,description:"2 guests"}]},{category:{title:"Room B",label:"Standard"},events:[{id:2,title:"Jane Smith",start:r,end:i,description:"1 guest"}]}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Events",
    hoverContent: event => <div style={{
      padding: "8px 12px",
      backgroundColor: "#fff",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      fontSize: "13px"
    }}>
        <strong>{event.title}</strong>
        {event.description && <p style={{
        margin: "4px 0 0"
      }}>{event.description}</p>}
      </div>,
    events: [{
      category: {
        title: "Room A",
        label: "Suite",
        color: "#FF5733"
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
}`,...e.parameters?.docs?.source}}};const x=["WeekCalendar"];export{e as WeekCalendar,x as __namedExportsOrder,v as default};
