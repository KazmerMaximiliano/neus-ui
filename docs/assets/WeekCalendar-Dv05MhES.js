import{r as w,j as e}from"./iframe-B_QkuxBG.js";import{I as _}from"./IconButton-il8xQn7H.js";import{C,a as N}from"./chevron-right-Nousq_Bz.js";const T={purple:"#7e6594",pink:"#c86b7b",red:"#c6412f",yellow:"#d99e2b",blue:"#4a7b9d",green:"#5ca874"},E=n=>T[n]??n,R=(n,l)=>{const d=n.getTime();for(const s of l){const o=new Date(s.start);o.setHours(0,0,0,0);const i=new Date(s.end);if(i.setHours(0,0,0,0),d<o.getTime()||d>i.getTime())continue;const m=d===o.getTime(),c=d===i.getTime(),g=Math.round((i.getTime()-o.getTime())/864e5)+1;let u;return m&&c?u="single":m?u="start":c?u="end":u="continue",{type:u,event:s,durationDays:g}}return{type:"empty",event:null,durationDays:0}},h=({entry:n,days:l,color:d,hoverContent:s,onEventClick:o})=>{const[i,m]=w.useState(null),[c,g]=w.useState(null),u=a=>{m({x:a.clientX,y:a.clientY})},v=()=>{m(null),g(null)},p=E(d);return e.jsxs("div",{className:"week-calendar-row",children:[e.jsxs("div",{className:"week-calendar-row__category-cell week-calendar-row__category-cell--with-point",style:{"--category-dot-color":p},children:[e.jsx("p",{className:"week-calendar-row__category-name",children:n.category.title}),e.jsx("p",{className:"week-calendar-row__category-info",children:n.category.label})]}),l.map(a=>{const{type:t,event:r,durationDays:k}=R(a,n.events),j=r?.title?.charAt(0).toUpperCase()??"?",D=k>2,b=t==="single"||t==="start",y=t!=="empty";return e.jsxs("div",{className:`week-calendar-row__day-cell${y&&o?" week-calendar-row__day-cell--clickable":""}`,onMouseMove:y&&s&&r?x=>{u(x),g(r)}:void 0,onMouseLeave:y&&s?v:void 0,onClick:y&&o&&r?()=>o(r):void 0,children:[y&&e.jsx("div",{className:`week-calendar-row__event--${t}`,style:{backgroundColor:p}}),b&&e.jsxs("div",{className:"week-calendar-row__event-content",style:D?{width:`calc(${k} * 100%)`}:void 0,children:[e.jsx("span",{className:"week-calendar-row__event-avatar",children:j}),D&&r&&e.jsxs("div",{className:"week-calendar-row__event-info",children:[e.jsx("span",{className:"week-calendar-row__event-title",children:r.title}),r.description&&e.jsx("span",{className:"week-calendar-row__event-description",children:r.description})]})]})]},a.toISOString())}),s&&i&&c&&e.jsx("div",{className:"week-calendar-row__hover-tooltip",style:{left:i.x,top:i.y},children:s(c)})]})};h.__docgenInfo={description:"",methods:[],displayName:"WeekCalendarRow",props:{entry:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"number",required:!1}},{key:"title",value:{name:"string",required:!0}},{key:"start",value:{name:"Date",required:!0}},{key:"end",value:{name:"Date",required:!0}},{key:"description",value:{name:"string",required:!1}}]}}],raw:"CalendarEvent[]",required:!0}}]}},description:""},days:{required:!0,tsType:{name:"Array",elements:[{name:"Date"}],raw:"Date[]"},description:""},color:{required:!0,tsType:{name:"string"},description:""},hoverContent:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: CalendarEvent) => React.ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  id?: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}`,signature:{properties:[{key:"id",value:{name:"number",required:!1}},{key:"title",value:{name:"string",required:!0}},{key:"start",value:{name:"Date",required:!0}},{key:"end",value:{name:"Date",required:!0}},{key:"description",value:{name:"string",required:!1}}]}},name:"event"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},onEventClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: CalendarEvent) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  id?: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}`,signature:{properties:[{key:"id",value:{name:"number",required:!1}},{key:"title",value:{name:"string",required:!0}},{key:"start",value:{name:"Date",required:!0}},{key:"end",value:{name:"Date",required:!0}},{key:"description",value:{name:"string",required:!1}}]}},name:"event"}],return:{name:"void"}}},description:""}}};const S=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],q=["purple","pink","red","yellow","blue","green"],A=n=>Array.from({length:7},(l,d)=>{const s=new Date(n);return s.setDate(s.getDate()+d),s}),M=n=>{const l=new Date(n);return l.setDate(l.getDate()-3),l.setHours(0,0,0,0),l},f=n=>n.toLocaleDateString("en-US",{day:"numeric",month:"short"}),O=({title:n="Calendar",events:l=[],hoverContent:d,onEventClick:s,onDayChange:o})=>{const[i,m]=w.useState(()=>M(new Date)),c=new Date(i);c.setDate(c.getDate()+6);const g=A(i),u=new Date;u.setHours(0,0,0,0);const v=()=>{m(a=>{const t=new Date(a);t.setDate(t.getDate()-1);const r=new Date(t);return r.setDate(r.getDate()+6),o?.(t,r),t})},p=()=>{m(a=>{const t=new Date(a);t.setDate(t.getDate()+1);const r=new Date(t);return r.setDate(r.getDate()+6),o?.(t,r),t})};return e.jsxs("div",{className:"week-calendar",children:[e.jsxs("div",{className:"week-calendar__header",children:[e.jsx("div",{className:"week-calendar__title",children:n}),e.jsxs("div",{className:"week-calendar__selector",children:[e.jsx(_,{size:"small",variant:"text",icon:C,onClick:v}),e.jsxs("span",{children:[f(i)," - ",f(c)]}),e.jsx(_,{size:"small",variant:"text",icon:N,onClick:p})]})]}),e.jsxs("div",{className:"week-calendar__grid",children:[e.jsxs("div",{className:"week-calendar-row",children:[e.jsx("div",{className:"week-calendar-row__category-cell"}),g.map(a=>{const t=a.getTime()===u.getTime();return e.jsxs("div",{className:`week-calendar-row__day-cell${t?" week-calendar__day-cell--today":""}`,children:[e.jsx("span",{className:"week-calendar__day-name",children:S[a.getDay()]}),e.jsx("span",{className:"week-calendar__day-number",children:a.getDate()})]},a.toISOString())})]}),l.map((a,t)=>e.jsx(h,{entry:a,days:g,color:a.category.color??q[t%q.length],hoverContent:d,onEventClick:s},a.category.title))]})]})};O.__docgenInfo={description:"",methods:[],displayName:"WeekCalendar",props:{title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Calendar"',computed:!1}},events:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"number",required:!1}},{key:"title",value:{name:"string",required:!0}},{key:"start",value:{name:"Date",required:!0}},{key:"end",value:{name:"Date",required:!0}},{key:"description",value:{name:"string",required:!1}}]}}],raw:"CalendarEvent[]",required:!0}}]}}],raw:"EventsByCategory[]"},description:"",defaultValue:{value:"[]",computed:!1}},hoverContent:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: CalendarEvent) => React.ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  id?: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}`,signature:{properties:[{key:"id",value:{name:"number",required:!1}},{key:"title",value:{name:"string",required:!0}},{key:"start",value:{name:"Date",required:!0}},{key:"end",value:{name:"Date",required:!0}},{key:"description",value:{name:"string",required:!1}}]}},name:"event"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},onEventClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: CalendarEvent) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  id?: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}`,signature:{properties:[{key:"id",value:{name:"number",required:!1}},{key:"title",value:{name:"string",required:!0}},{key:"start",value:{name:"Date",required:!0}},{key:"end",value:{name:"Date",required:!0}},{key:"description",value:{name:"string",required:!1}}]}},name:"event"}],return:{name:"void"}}},description:""},onDayChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(weekStart: Date, weekEnd: Date) => void",signature:{arguments:[{type:{name:"Date"},name:"weekStart"},{type:{name:"Date"},name:"weekEnd"}],return:{name:"void"}}},description:""}}};export{O as W};
