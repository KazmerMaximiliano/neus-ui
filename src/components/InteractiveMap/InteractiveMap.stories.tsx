import { Meta, StoryObj } from "@storybook/react";
import { InteractiveMap as InteractiveMapComponent } from "./InteractiveMap";

const meta: Meta<typeof InteractiveMapComponent> = {
  title: "Components/InteractiveMap",
  component: InteractiveMapComponent,
  parameters: {
    layout: "centered",
    docs: {
      autodocs: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
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

const mockOnLocationSelect = (location: Record<string, unknown>) => {
  console.log("Location selected:", location);
};

export const InteractiveMap: Story = {
  args: {
    googleMapsApiKey: "",
    initialCoordinates: "-31.4201,-64.1888",
    initialAddress: "Plaza San Martín, Córdoba, Argentina",
    onLocationSelect: mockOnLocationSelect,
  },
};

export default meta;
