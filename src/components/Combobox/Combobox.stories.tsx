import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Combobox as ComboboxComponent } from "./Combobox";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComboboxStoryArgs } from "./Combobox.types";
import "./Combobox.stories.css";

const meta: Meta<ComboboxStoryArgs> = {
  title: "Base/Combobox",
  component: ComboboxComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the field",
    },
    options: { control: "object", description: "Suggestions as value and label pairs" },
    value: { control: "text", description: "The chosen value (controlled)" },
    defaultValue: { control: false, description: "Initial value (uncontrolled)" },
    inputValue: { control: false, description: "The text in the field (controlled)" },
    filter: { control: "boolean", description: "Narrows the options to the typed text" },
    allowCustomValue: { control: "boolean", description: "Keeps text that matches no option as the value" },
    loading: { control: "boolean", description: "Shows a spinner and the loading text" },
    emptyLabel: { control: "text", description: "Text when nothing matches" },
    loadingLabel: { control: "text", description: "Text while loading without options" },
    label: { control: "text", description: "Visible label of the field" },
    placeholder: { control: "text", description: "Hint inside the empty field" },
    description: { control: "text", description: "Help text below the field" },
    error: { control: "text", description: "Error message; marks the field invalid" },
    name: { control: "text", description: "Submits the value in a hidden input" },
    disabled: { control: "boolean", description: "Disables the field" },
    readonly: { control: "boolean", description: "Shows the value without editing or opening the list" },
    required: { control: "boolean", description: "Adds an asterisk and aria-required; the app validates" },
    variant: { control: "select", options: ["auto", "filled", "outlined"], description: "Shared field variant" },
    labelPlacement: {
      control: "select",
      options: ["auto", "external", "floating"],
      description: "Shared field label placement",
    },
    size: { control: "select", options: ["small", "medium", "large"], description: "Shared field size" },
    className: { control: "text", description: "Additional classes on the field wrapper" },
    listClassName: { control: "text", description: "Additional classes on the list panel" },
    listStyle: { control: "object", description: "CSS properties on the list panel" },
    optionClassName: { control: "text", description: "Additional classes on each option" },
    optionStyle: { control: "object", description: "CSS properties on each option" },
    statusClassName: { control: "text", description: "Additional classes on the empty or loading text" },
    statusStyle: { control: "object", description: "CSS properties on the empty or loading text" },
    onChange: { action: "changed", description: "Called with the new value" },
    onInputChange: { action: "inputChanged", description: "Called with the text as it changes" },
  },
};

export const Combobox: StoryObj<ComboboxStoryArgs> = {
  args: {
    designSystem: "neus",
    options: [
      { value: "ar", label: "Argentina" },
      { value: "br", label: "Brazil" },
      { value: "ca", label: "Canada" },
      { value: "cl", label: "Chile" },
      { value: "co", label: "Colombia" },
      { value: "mx", label: "Mexico" },
      { value: "uy", label: "Uruguay" },
    ],
    value: "",
    filter: true,
    allowCustomValue: false,
    loading: false,
    emptyLabel: "No results",
    loadingLabel: "Loading…",
    label: "Country",
    placeholder: "Start typing",
    description: undefined,
    error: undefined,
    name: undefined,
    disabled: false,
    readonly: false,
    required: false,
    variant: "auto",
    labelPlacement: "auto",
    size: "medium",
    className: undefined,
    listClassName: undefined,
    listStyle: {},
    optionClassName: undefined,
    optionStyle: {},
    statusClassName: undefined,
    statusStyle: {},
  },
  render: function Render({ designSystem, onChange, ...args }) {
    const [, updateArgs] = useArgs<ComboboxStoryArgs>();
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <div className="combobox-story">
          <ComboboxComponent
            {...args}
            onChange={(value) => {
              updateArgs({ value });
              onChange?.(value);
            }}
          />
        </div>
      </ThemeProvider>
    );
  },
};

export default meta;
