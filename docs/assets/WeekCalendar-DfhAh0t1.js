import{r as f,j as e}from"./iframe-CQynyMMU.js";import{I as k}from"./IconButton-B5tgVBhl.js";import{C as j,a as x}from"./chevron-right-BKU6hfyy.js";const N={purple:"#9681bd",pink:"#f39dc1",red:"#f1576b",yellow:"#fac755",blue:"#75cdd1",green:"#6ec6a3"},C=(s,l)=>{const o=s.getTime();for(const n of l){const d=new Date(n.start);d.setHours(0,0,0,0);const i=new Date(n.end);if(i.setHours(0,0,0,0),o<d.getTime()||o>i.getTime())continue;const m=o===d.getTime(),g=o===i.getTime(),p=Math.round((i.getTime()-d.getTime())/864e5)+1;let r;return m&&g?r="single":m?r="start":g?r="end":r="continue",{type:r,event:n,durationDays:p}}return{type:"empty",event:null,durationDays:0}},h=({entry:s,days:l,color:o,hoverContent:n,onEventClick:d})=>{const[i,m]=f.useState(null),g=r=>{m({x:r.clientX,y:r.clientY})},p=()=>{m(null)};return e.jsxs("div",{className:"week-calendar-row",children:[e.jsxs("div",{className:`week-calendar-category-cell with-point ${o}`,children:[e.jsx("p",{className:"week-calendar-category-name",children:s.category.title}),e.jsx("p",{className:"week-calendar-category-info",children:s.category.label})]}),l.map(r=>{const{type:y,event:u,durationDays:a}=C(r,s.events),t=u?.title?.charAt(0).toUpperCase()??"?",c=a>2,q=y==="single"||y==="start",v=y!=="empty";return e.jsxs("div",{className:`week-calendar-day-cell${v&&d?" clickable":""}`,onMouseMove:v&&n?g:void 0,onMouseLeave:v&&n?p:void 0,onClick:v&&d&&u?()=>d(u):void 0,children:[v&&e.jsx("div",{className:`event-${y}`,style:{backgroundColor:N[o]}}),q&&e.jsxs("div",{className:"event-content",style:c?{width:`calc(${a} * 100%)`}:void 0,children:[e.jsx("span",{className:"event-avatar",children:t}),c&&u&&e.jsxs("div",{className:"event-info",children:[e.jsx("span",{className:"event-title",children:u.title}),u.description&&e.jsx("span",{className:"event-description",children:u.description})]})]})]},r.toISOString())}),n&&i&&e.jsx("div",{className:"week-calendar-hover-tooltip",style:{left:i.x,top:i.y},children:n})]})};h.__docgenInfo={description:"",methods:[],displayName:"WeekCalendarRow",props:{entry:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  category: Category;
  events: CalendarEvent[];
}`,signature:{properties:[{key:"category",value:{name:"signature",type:"object",raw:`{
  color?: string;
  title: string;
  label: string;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!1}},{key:"title",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}}]},required:!0}},{key:"events",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id?: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}`,signature:{properties:[{key:"id",value:{name:"number",required:!1}},{key:"title",value:{name:"string",required:!0}},{key:"start",value:{name:"Date",required:!0}},{key:"end",value:{name:"Date",required:!0}},{key:"description",value:{name:"string",required:!1}}]}}],raw:"CalendarEvent[]",required:!0}}]}},description:""},days:{required:!0,tsType:{name:"Array",elements:[{name:"Date"}],raw:"Date[]"},description:""},color:{required:!0,tsType:{name:"string"},description:""},hoverContent:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onEventClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: CalendarEvent) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  id?: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}`,signature:{properties:[{key:"id",value:{name:"number",required:!1}},{key:"title",value:{name:"string",required:!0}},{key:"start",value:{name:"Date",required:!0}},{key:"end",value:{name:"Date",required:!0}},{key:"description",value:{name:"string",required:!1}}]}},name:"event"}],return:{name:"void"}}},description:""}}};const b=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],w=["purple","pink","red","yellow","blue","green"],T=s=>Array.from({length:7},(l,o)=>{const n=new Date(s);return n.setDate(n.getDate()+o),n}),E=s=>{const l=new Date(s);return l.setDate(l.getDate()-3),l.setHours(0,0,0,0),l},D=s=>s.toLocaleDateString("en-US",{day:"numeric",month:"short"}),S=({title:s="Calendar",events:l=[],hoverContent:o,onEventClick:n,onDayChange:d})=>{const[i,m]=f.useState(()=>E(new Date)),g=new Date(i);g.setDate(g.getDate()+6);const p=T(i),r=new Date;r.setHours(0,0,0,0);const y=()=>{m(a=>{const t=new Date(a);t.setDate(t.getDate()-1);const c=new Date(t);return c.setDate(c.getDate()+6),d?.(t,c),t})},u=()=>{m(a=>{const t=new Date(a);t.setDate(t.getDate()+1);const c=new Date(t);return c.setDate(c.getDate()+6),d?.(t,c),t})};return e.jsxs("div",{className:"week-calendar-container",children:[e.jsxs("div",{className:"week-calendar-header",children:[e.jsx("div",{className:"week-calendar-title",children:s}),e.jsxs("div",{className:"week-selector",children:[e.jsx(k,{size:"small",variant:"text",icon:j,onClick:y}),e.jsxs("span",{children:[D(i)," - ",D(g)]}),e.jsx(k,{size:"small",variant:"text",icon:x,onClick:u})]})]}),e.jsxs("div",{className:"week-calendar",children:[e.jsxs("div",{className:"week-calendar-row",children:[e.jsx("div",{className:"week-calendar-category-cell"}),p.map(a=>{const t=a.getTime()===r.getTime();return e.jsxs("div",{className:`week-calendar-day-cell${t?" week-calendar-day-today":""}`,children:[e.jsx("span",{className:"week-calendar-day-name",children:b[a.getDay()]}),e.jsx("span",{className:"week-calendar-day-number",children:a.getDate()})]},a.toISOString())})]}),l.map((a,t)=>e.jsx(h,{entry:a,days:p,color:a.category.color??w[t%w.length],hoverContent:o,onEventClick:n},a.category.title))]})]})};S.__docgenInfo={description:"",methods:[],displayName:"WeekCalendar",props:{title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Calendar"',computed:!1}},events:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  category: Category;
  events: CalendarEvent[];
}`,signature:{properties:[{key:"category",value:{name:"signature",type:"object",raw:`{
  color?: string;
  title: string;
  label: string;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!1}},{key:"title",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}}]},required:!0}},{key:"events",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id?: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}`,signature:{properties:[{key:"id",value:{name:"number",required:!1}},{key:"title",value:{name:"string",required:!0}},{key:"start",value:{name:"Date",required:!0}},{key:"end",value:{name:"Date",required:!0}},{key:"description",value:{name:"string",required:!1}}]}}],raw:"CalendarEvent[]",required:!0}}]}}],raw:"EventsByCategory[]"},description:"",defaultValue:{value:"[]",computed:!1}},hoverContent:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onEventClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: CalendarEvent) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  id?: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}`,signature:{properties:[{key:"id",value:{name:"number",required:!1}},{key:"title",value:{name:"string",required:!0}},{key:"start",value:{name:"Date",required:!0}},{key:"end",value:{name:"Date",required:!0}},{key:"description",value:{name:"string",required:!1}}]}},name:"event"}],return:{name:"void"}}},description:""},onDayChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(weekStart: Date, weekEnd: Date) => void",signature:{arguments:[{type:{name:"Date"},name:"weekStart"},{type:{name:"Date"},name:"weekEnd"}],return:{name:"void"}}},description:""}}};export{S as W};
