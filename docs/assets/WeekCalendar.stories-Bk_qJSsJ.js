import{W as a}from"./WeekCalendar-Cgq6dWMW.js";import"./iframe-PsgAzXph.js";import"./preload-helper-PPVm8Dsz.js";import"./iconBase-B0jNOneY.js";import"./IconButton-cYmsl4hh.js";import"./theme-BAciA7Tg.js";const t=new Date,n=new Date(t);n.setDate(n.getDate()+1);const o=new Date(t);o.setDate(o.getDate()+2);const r=new Date(t);r.setDate(r.getDate()+3);const m={title:"Components/WeekCalendar",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{title:{control:"text",description:"The title displayed in the calendar header"},events:{control:"object",description:"Array of event categories with their events"}}},e={args:{title:"Events",events:[{category:{title:"Room A",label:"Suite",color:"purple"},events:[{id:1,title:"John Doe",start:t,end:o,description:"2 guests"}]},{category:{title:"Room B",label:"Standard"},events:[{id:2,title:"Jane Smith",start:n,end:r,description:"1 guest"}]}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Events",
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
}`,...e.parameters?.docs?.source}}};const g=["WeekCalendar"];export{e as WeekCalendar,g as __namedExportsOrder,m as default};
