import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Input as InputComponent } from "./Input";
import type {
  InputStoryArgs,
  InputStoryPreviewProps,
  InputStoryState,
} from "./Input.types";

const InputPreview = ({
  designSystem,
  updateArgs,
  ...args
}: InputStoryPreviewProps) => {
  const controlled = args.value !== undefined;
  const [preview, setPreview] = useState<InputStoryState>({
    value: args.value,
    argsValue: args.value,
    pendingValues: [],
  });

  if (args.value !== preview.argsValue) {
    const pendingIndex =
      typeof args.value === "string"
        ? preview.pendingValues.indexOf(args.value)
        : -1;
    setPreview({
      argsValue: args.value,
      value: pendingIndex < 0 ? args.value : preview.value,
      pendingValues:
        pendingIndex < 0 ? [] : preview.pendingValues.slice(pendingIndex + 1),
    });
  }

  return (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <InputComponent
        {...args}
        key={controlled ? "controlled" : "uncontrolled"}
        value={controlled ? preview.value : undefined}
        defaultValue={controlled ? undefined : args.defaultValue}
        onChange={(value) => {
          args.onChange?.(value);
          if (controlled) {
            setPreview((current) => ({
              ...current,
              value,
              pendingValues: [...current.pendingValues, value],
            }));
            updateArgs({ value });
          }
        }}
      />
    </ThemeProvider>
  );
};

const meta: Meta<InputStoryArgs> = {
  title: "Base/Input",
  component: InputComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["auto", "filled", "outlined"],
      description: "Field surface",
    },
    labelPlacement: {
      control: "select",
      options: ["auto", "external", "floating"],
      description: "Label presentation",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Field size",
    },
    prefix: {
      control: "text",
      description: "Content for prefix; JSX supported in application code",
    },
    suffix: {
      control: "text",
      description: "Content for suffix; JSX supported in application code",
    },
    errorIcon: {
      control: "text",
      description: "Content for errorIcon; JSX supported in application code",
    },
    prefixStyle: { control: "object", description: "Styles for prefix" },
    suffixStyle: { control: "object", description: "Styles for suffix" },
    errorIconStyle: { control: "object", description: "Styles for errorIcon" },

    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "Design system used for this local preview",
    },
    id: { control: "text", description: "Field ID; generated when omitted" },
    "aria-label": {
      control: "text",
      description: "Accessible name for a field without a visible label",
    },
    wrapperStyle: {
      control: "object",
      description: "Styles for the outer container",
    },
    inputStyle: {
      control: "object",
      description: "Styles for the native input",
    },
    labelStyle: { control: "object", description: "Styles for the label" },
    requiredStyle: {
      control: "object",
      description: "Styles for the required marker",
    },
    errorStyle: {
      control: "object",
      description: "Styles for the error message",
    },
    name: {
      control: { type: "text" },
      description: "The name attribute for the input element",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    value: {
      control: { type: "text" },
      description: "The current value for the input",
      table: {
        type: { summary: "string | number" },
        category: "Props",
      },
    },
    defaultValue: {
      control: { type: "text" },
      description: "The default value for the input (for uncontrolled usage)",
      table: {
        type: { summary: "string | number" },
        category: "Props",
      },
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text for the input",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    label: {
      control: { type: "text" },
      description: "Label text for the input",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    error: {
      control: { type: "text" },
      description: "Error message to display",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number", "color", "tel", "url"],
      description: "The type of input field",
      table: {
        type: {
          summary:
            "'text' | 'password' | 'email' | 'number' | 'color' | 'tel' | 'url'",
        },
        category: "Props",
      },
    },
    min: {
      control: { type: "text" },
      description: "The minimum value (for number inputs)",
      table: {
        type: { summary: "string | number" },
        category: "Props",
      },
    },
    max: {
      control: { type: "text" },
      description: "The maximum value (for number inputs)",
      table: {
        type: { summary: "string | number" },
        category: "Props",
      },
    },
    step: {
      control: { type: "text" },
      description: "The step increment (for number inputs)",
      table: {
        type: { summary: "string | number" },
        category: "Props",
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled",
      table: {
        type: { summary: "boolean" },
        category: "Props",
      },
    },
    readonly: {
      control: { type: "boolean" },
      description: "Whether the input is read-only",
      table: {
        type: { summary: "boolean" },
        category: "Props",
      },
    },
    required: {
      control: { type: "boolean" },
      description: "Whether the input is required (shows red asterisk)",
      table: {
        type: { summary: "boolean" },
        category: "Props",
      },
    },
    onChange: {
      action: "input changed",
      description: "Callback function triggered when input value changes",
      table: {
        type: { summary: "(value: string) => void" },
        category: "Events",
      },
    },
  },
};

export const Input: StoryObj<typeof meta> = {
  args: {
    designSystem: "neus",
    variant: "auto",
    labelPlacement: "auto",
    size: "medium",
    prefix: undefined,
    suffix: undefined,
    errorIcon: undefined,
    prefixStyle: {},
    suffixStyle: {},
    errorIconStyle: {},
    id: undefined,
    "aria-label": undefined,
    name: "example-input",
    defaultValue: undefined,
    readonly: false,
    wrapperStyle: {},
    inputStyle: {},
    labelStyle: {},
    requiredStyle: {},
    errorStyle: {},
    placeholder: "Enter text here...",
    label: "Example Input",
    type: "text",
    value: "",
    error: "",
    min: "",
    max: "",
    step: "",
    disabled: false,
    required: false,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<InputStoryArgs>();
    return <InputPreview {...args} updateArgs={updateArgs} />;
  },
};

export default meta;
