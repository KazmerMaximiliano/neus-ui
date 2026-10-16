import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { MultiSelect as MultiSelectComponent } from "./MultiSelect";
import type { MultiSelectStoryArgs } from "./MultiSelect.types";

const meta: Meta<MultiSelectStoryArgs> = {
  title: "Base/MultiSelect",
  component: MultiSelectComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the multiselect",
    },
    label: {
      control: "text",
      description: "Visible label naming the combobox",
    },
    placeholder: { control: "text", description: "Text shown without a value" },
    name: { control: "text", description: "Name of the hidden form input" },
    value: { control: "object", description: "Controlled values" },
    defaultValue: {
      control: "object",
      description: "Initial uncontrolled values",
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
    tagStyle: {
      control: "object",
      description: "CSS properties applied to every selected-value tag",
    },
    listStyle: {
      control: "object",
      description: "CSS properties applied to the floating list",
    },
    optionStyle: {
      control: "object",
      description: "CSS properties applied to every option",
    },
    onChange: {
      action: "changed",
      description: "Called with the selected values",
    },
  },
};

export const MultiSelect: StoryObj<MultiSelectStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Countries",
    placeholder: "Select countries",
    name: "countries",
    value: [],
    defaultValue: ["ar", "uy"],
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
    tagStyle: {},
    listStyle: {},
    optionStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div style={{ width: 320 }}>
        <MultiSelectComponent {...args} />
      </div>
    </ThemeProvider>
  ),
};

export default meta;
