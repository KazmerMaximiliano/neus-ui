import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Select as SelectComponent } from "./Select";
import type { SelectStoryArgs } from "./Select.types";

const meta: Meta<SelectStoryArgs> = {
  title: "Base/Select",
  component: SelectComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the select",
    },
    label: {
      control: "text",
      description: "Visible label naming the combobox",
    },
    placeholder: { control: "text", description: "Text shown without a value" },
    name: { control: "text", description: "Name of the hidden form input" },
    value: { control: "text", description: "Controlled value" },
    defaultValue: {
      control: "text",
      description: "Initial uncontrolled value",
    },
    options: { control: "object", description: "Options with value and label" },
    error: {
      control: "text",
      description: "Error message linked to the field",
    },
    disabled: { control: "boolean", description: "Disables the field" },
    viewSearchBar: { control: "boolean", description: "Shows the search box" },
    searchBarPlaceholder: {
      control: "text",
      description: "Placeholder and accessible name of the search box",
    },
    fieldStyle: {
      control: "object",
      description: "CSS properties applied to the field box",
    },
    listStyle: {
      control: "object",
      description: "CSS properties applied to the floating list",
    },
    optionStyle: {
      control: "object",
      description: "CSS properties applied to every option",
    },
    onChange: { action: "changed", description: "Called with the new value" },
  },
};

export const Select: StoryObj<SelectStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Country",
    placeholder: "Select a country",
    name: "country",
    value: undefined,
    defaultValue: "ar",
    options: [
      { value: "ar", label: "Argentina" },
      { value: "br", label: "Brasil" },
      { value: "cl", label: "Chile" },
      { value: "uy", label: "Uruguay" },
    ],
    error: "",
    disabled: false,
    viewSearchBar: true,
    searchBarPlaceholder: "Buscar...",
    fieldStyle: {},
    listStyle: {},
    optionStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div style={{ width: 320 }}>
        <SelectComponent {...args} />
      </div>
    </ThemeProvider>
  ),
};

export default meta;
