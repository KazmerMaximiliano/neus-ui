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
    tagRemoveIconClassName: {
      control: "text",
      description: "Customization for tagRemoveIcon",
    },
    tagRemoveIconStyle: {
      control: "object",
      description: "Customization for tagRemoveIcon",
    },
    boxClassName: {
      control: "text",
      description: "Additional classes for box",
    },
    boxStyle: { control: "object", description: "Style override for box" },
    caretClassName: {
      control: "text",
      description: "Additional classes for caret",
    },
    caretStyle: { control: "object", description: "Style override for caret" },
    checkboxClassName: {
      control: "text",
      description: "Additional classes for checkbox",
    },
    checkboxStyle: {
      control: "object",
      description: "Style override for checkbox",
    },
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
    iconClassName: {
      control: "text",
      description: "Additional classes for icon",
    },
    iconStyle: { control: "object", description: "Style override for icon" },
    labelClassName: {
      control: "text",
      description: "Additional classes for label",
    },
    labelStyle: { control: "object", description: "Style override for label" },
    required: { control: "boolean", description: "Adds an asterisk after the label and aria-required; the app validates" },
    requiredClassName: { control: "text", description: "Additional classes for the required asterisk" },
    requiredStyle: { control: "object", description: "Style override for the required asterisk" },
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
    placeholderClassName: {
      control: "text",
      description: "Additional classes for placeholder",
    },
    placeholderStyle: {
      control: "object",
      description: "Style override for placeholder",
    },
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
    srOnlyClassName: {
      control: "text",
      description: "Additional classes for srOnly",
    },
    srOnlyStyle: {
      control: "object",
      description: "Style override for srOnly",
    },
    style: { control: "object", description: "Style override for style" },
    tagClassName: {
      control: "text",
      description: "Additional classes for tag",
    },
    tagRemoveClassName: {
      control: "text",
      description: "Additional classes for tagRemove",
    },
    tagRemoveStyle: {
      control: "object",
      description: "Style override for tagRemove",
    },
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
    tagRemoveIconClassName: undefined,
    tagRemoveIconStyle: undefined,
    boxClassName: undefined,
    boxStyle: undefined,
    caretClassName: undefined,
    caretStyle: undefined,
    checkboxClassName: undefined,
    checkboxStyle: undefined,
    className: undefined,
    emptyClassName: undefined,
    emptyStyle: undefined,
    errorMessageClassName: undefined,
    errorMessageStyle: undefined,
    fieldClassName: undefined,
    iconClassName: undefined,
    iconStyle: undefined,
    labelClassName: undefined,
    labelStyle: undefined,
    required: false,
    requiredClassName: undefined,
    requiredStyle: undefined,
    listClassName: undefined,
    listContentClassName: undefined,
    listContentStyle: undefined,
    optionClassName: undefined,
    optionLabelClassName: undefined,
    optionLabelStyle: undefined,
    panelClassName: undefined,
    panelStyle: undefined,
    placeholderClassName: undefined,
    placeholderStyle: undefined,
    searchClassName: undefined,
    searchInputClassName: undefined,
    searchInputStyle: undefined,
    searchStyle: undefined,
    srOnlyClassName: undefined,
    srOnlyStyle: undefined,
    style: undefined,
    tagClassName: undefined,
    tagRemoveClassName: undefined,
    tagRemoveStyle: undefined,
    triggerClassName: undefined,
    triggerStyle: undefined,
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
    description: undefined,
    descriptionClassName: undefined,
    descriptionStyle: undefined,
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
