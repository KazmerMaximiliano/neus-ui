import{I as e}from"./InteractiveMap-CwTNmpAr.js";import"./iframe-BBmzJCBT.js";import"./preload-helper-PPVm8Dsz.js";import"./index-GN8RQs3y.js";import"./index-DxrYyNu5.js";import"./Input-DVh9GUG3.js";import"./theme-jLv7A-8A.js";const p={title:"Components/InteractiveMap",component:e,parameters:{layout:"centered",docs:{autodocs:!0}},tags:["autodocs"],argTypes:{googleMapsApiKey:{control:"text",description:"Google Maps API key for map functionality"},initialCoordinates:{control:"text",description:"Initial coordinates in 'lat,lng' format"},initialAddress:{control:"text",description:"Initial address to display in search box"},searchBoxPlaceholder:{control:"text",description:"Placeholder text for the search box"},instructionsText:{control:"text",description:"Custom instructions text below the map"},readonly:{control:"boolean",description:"If true, the map is in read-only mode"},onLocationSelect:{action:"location-selected",description:"Callback when a location is selected"}}},a=o=>{console.log("Location selected:",o)},t={args:{googleMapsApiKey:"",initialCoordinates:"-31.4201,-64.1888",initialAddress:"Plaza San Martín, Córdoba, Argentina",onLocationSelect:a}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    googleMapsApiKey: "",
    initialCoordinates: "-31.4201,-64.1888",
    initialAddress: "Plaza San Martín, Córdoba, Argentina",
    onLocationSelect: mockOnLocationSelect
  }
}`,...t.parameters?.docs?.source}}};const m=["InteractiveMap"];export{t as InteractiveMap,m as __namedExportsOrder,p as default};
