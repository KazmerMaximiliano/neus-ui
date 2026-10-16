import { Meta, StoryObj } from "@storybook/react";
import { InteractiveMap as InteractiveMapComponent } from "./InteractiveMap";

const meta: Meta<typeof InteractiveMapComponent> = {
  title: "Location/InteractiveMap",
  component: InteractiveMapComponent,
  parameters: {
    layout: "centered",
    docs: {
      autodocs: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text", description: "className override" },
    style: { control: "object", description: "style override" },
    mapStyle: { control: "object", description: "mapStyle override" },
    searchStyle: { control: "object", description: "searchStyle override" },
    instructionsStyle: {
      control: "object",
      description: "instructionsStyle override",
    },
    loadingStyle: { control: "object", description: "loadingStyle override" },
    errorStyle: { control: "object", description: "errorStyle override" },
    mapOptions: { control: "object", description: "mapOptions override" },
    onError: { action: "onError", description: "Reports map errors" },

    googleMapsApiKey: {
      control: "text",
      description: "Google Maps API key for map functionality",
    },
    initialCoordinates: {
      control: "text",
      description: "Initial coordinates in 'lat,lng' format",
    },
    initialAddress: {
      control: "text",
      description: "Initial address to display in search box",
    },
    searchBoxPlaceholder: {
      control: "text",
      description: "Placeholder text for the search box",
    },
    instructionsText: {
      control: "text",
      description: "Custom instructions text below the map",
    },
    readonly: {
      control: "boolean",
      description: "If true, the map is in read-only mode",
    },
    onLocationSelect: {
      action: "location-selected",
      description: "Callback when a location is selected",
    },
  },
};

type Story = StoryObj<typeof meta>;

export const InteractiveMap: Story = {
  args: {
    className: undefined,
    style: {},
    mapStyle: {},
    searchStyle: {},
    instructionsStyle: {},
    loadingStyle: {},
    errorStyle: {},
    mapOptions: {},

    googleMapsApiKey: "",
    initialCoordinates: "-31.4201,-64.1888",
    initialAddress: "Plaza San Martín, Córdoba, Argentina",
  },
};

export default meta;
