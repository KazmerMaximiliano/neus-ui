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
    placeholderClassName: {
      control: "text",
      description: "Additional CSS classes for placeholder",
    },
    placeholderStyle: {
      control: "object",
      description: "Inline CSS override for placeholder",
    },
    caretClassName: {
      control: "text",
      description: "Additional classes for caret",
    },
    caretStyle: { control: "object", description: "Style override for caret" },
    className: {
      control: "text",
      description: "Additional classes for className",
    },
    emptyClassName: {
      control: "text",
      description: "Additional classes for empty",
    },
    emptyStyle: { control: "object", description: "Style override for empty" },
    errorMessageClassName: {
      control: "text",
      description: "Additional classes for errorMessage",
    },
    errorMessageStyle: {
      control: "object",
      description: "Style override for errorMessage",
    },
    fieldClassName: {
      control: "text",
      description: "Additional classes for field",
    },
    labelClassName: {
      control: "text",
      description: "Additional classes for label",
    },
    labelStyle: { control: "object", description: "Style override for label" },
    listClassName: {
      control: "text",
      description: "Additional classes for list",
    },
    listContentClassName: {
      control: "text",
      description: "Additional classes for listContent",
    },
    listContentStyle: {
      control: "object",
      description: "Style override for listContent",
    },
    optionCheckClassName: {
      control: "text",
      description: "Additional classes for optionCheck",
    },
    optionCheckStyle: {
      control: "object",
      description: "Style override for optionCheck",
    },
    optionClassName: {
      control: "text",
      description: "Additional classes for option",
    },
    optionLabelClassName: {
      control: "text",
      description: "Additional classes for optionLabel",
    },
    optionLabelStyle: {
      control: "object",
      description: "Style override for optionLabel",
    },
    panelClassName: {
      control: "text",
      description: "Additional classes for panel",
    },
    panelStyle: { control: "object", description: "Style override for panel" },
    searchClassName: {
      control: "text",
      description: "Additional classes for search",
    },
    searchInputClassName: {
      control: "text",
      description: "Additional classes for searchInput",
    },
    searchInputStyle: {
      control: "object",
      description: "Style override for searchInput",
    },
    searchStyle: {
      control: "object",
      description: "Style override for search",
    },
    valueClassName: {
      control: "text",
      description: "Additional classes for select",
    },
    valueStyle: { control: "object", description: "Style override for select" },
    style: { control: "object", description: "Style override for style" },
    triggerClassName: {
      control: "text",
      description: "Additional classes for trigger",
    },
    triggerStyle: {
      control: "object",
      description: "Style override for trigger",
    },
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
    description: {
      control: "text",
      description: "Help text below the field, announced through aria-describedby; JSX supported in application code",
    },
    descriptionClassName: { control: "text", description: "Additional classes for the description" },
    descriptionStyle: { control: "object", description: "Styles for the description" },
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
    placeholderClassName: undefined,
    placeholderStyle: undefined,
    caretClassName: undefined,
    caretStyle: undefined,
    className: undefined,
    emptyClassName: undefined,
    emptyStyle: undefined,
    errorMessageClassName: undefined,
    errorMessageStyle: undefined,
    fieldClassName: undefined,
    labelClassName: undefined,
    labelStyle: undefined,
    listClassName: undefined,
    listContentClassName: undefined,
    listContentStyle: undefined,
    optionCheckClassName: undefined,
    optionCheckStyle: undefined,
    optionClassName: undefined,
    optionLabelClassName: undefined,
    optionLabelStyle: undefined,
    panelClassName: undefined,
    panelStyle: undefined,
    searchClassName: undefined,
    searchInputClassName: undefined,
    searchInputStyle: undefined,
    searchStyle: undefined,
    valueClassName: undefined,
    valueStyle: undefined,
    style: undefined,
    triggerClassName: undefined,
    triggerStyle: undefined,
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
    description: undefined,
    descriptionClassName: undefined,
    descriptionStyle: undefined,
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
