import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Textarea as TextareaComponent } from "./Textarea";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TextareaStoryArgs } from "./Textarea.types";

const meta: Meta<TextareaStoryArgs> = {
  title: "Base/Textarea",
  component: TextareaComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the field",
    },
    label: {
      control: "text",
      description: "Visible label that also names the field",
    },
    description: {
      control: "text",
      description: "Help text announced with the field",
    },
    error: {
      control: "text",
      description: "Error message; marks the field invalid",
    },
    placeholder: {
      control: "text",
      description: "Example value shown while the field is empty",
    },
    value: { control: "text", description: "Current text (controlled)" },
    rows: { control: "number", description: "Visible lines at rest" },
    maxRows: {
      control: "number",
      description: "Lines the field may grow to before it scrolls",
    },
    autoResize: {
      control: "boolean",
      description: "Grows with its content, up to maxRows",
    },
    variant: {
      control: "select",
      options: ["auto", "filled", "outlined"],
      description: "Field surface; auto follows the design system",
    },
    labelPlacement: {
      control: "select",
      options: ["auto", "external", "floating"],
      description:
        "Label above the field or floating inside it; auto follows the design system",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Padding and line position of the field",
    },
    required: { control: "boolean", description: "Marks the field required" },
    disabled: { control: "boolean", description: "Disables the field" },
    readonly: {
      control: "boolean",
      description: "Keeps the text readable but not editable",
    },
    className: {
      control: "text",
      description: "Additional classes on the wrapper",
    },
    wrapperStyle: {
      control: "object",
      description: "CSS properties on the wrapper",
    },
    labelClassName: {
      control: "text",
      description: "Additional classes on the label",
    },
    labelStyle: {
      control: "object",
      description: "CSS properties on the label",
    },
    requiredClassName: {
      control: "text",
      description: "Additional classes on the required marker",
    },
    requiredStyle: {
      control: "object",
      description: "CSS properties on the required marker",
    },
    textareaClassName: {
      control: "text",
      description: "Additional classes on the textarea",
    },
    textareaStyle: {
      control: "object",
      description: "CSS properties on the textarea",
    },
    descriptionClassName: {
      control: "text",
      description: "Additional classes on the description",
    },
    descriptionStyle: {
      control: "object",
      description: "CSS properties on the description",
    },
    errorClassName: {
      control: "text",
      description: "Additional classes on the error message",
    },
    errorStyle: {
      control: "object",
      description: "CSS properties on the error message",
    },
    onChange: { action: "changed", description: "Called with the new text" },
  },
};

export const Textarea: StoryObj<TextareaStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Message",
    description: "Tell us what you need; we reply within a day.",
    error: "",
    placeholder: "",
    value: "",
    rows: 3,
    maxRows: 8,
    autoResize: true,
    variant: "auto",
    labelPlacement: "auto",
    size: "medium",
    required: false,
    disabled: false,
    readonly: false,
    className: undefined,
    wrapperStyle: {},
    labelClassName: undefined,
    labelStyle: {},
    requiredClassName: undefined,
    requiredStyle: {},
    textareaClassName: undefined,
    textareaStyle: {},
    descriptionClassName: undefined,
    descriptionStyle: {},
    errorClassName: undefined,
    errorStyle: {},
  },
  render: function Render({ designSystem, onChange, ...args }) {
    const [, updateArgs] = useArgs<TextareaStoryArgs>();
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <div className="textarea-story">
          <TextareaComponent
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
