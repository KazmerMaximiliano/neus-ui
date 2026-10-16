import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Checkbox as CheckboxComponent } from "./Checkbox";
import type { CheckboxStoryArgs } from "./Checkbox.types";

const meta: Meta<CheckboxStoryArgs> = {
  title: "Base/Checkbox",
  component: CheckboxComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the checkbox",
    },
    label: {
      control: "text",
      description: "Visible label that also names the checkbox",
    },
    name: {
      control: "text",
      description: "The name attribute of the native input",
    },
    value: {
      control: "text",
      description: "The value submitted with a form",
    },
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    indeterminate: {
      control: "boolean",
      description: "Mixed state for partially selected groups",
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox",
    },
    checkboxStyle: {
      control: "object",
      description: "CSS properties applied to the visual box",
    },
    labelStyle: {
      control: "object",
      description: "CSS properties applied to the label text",
    },
    onChange: {
      action: "changed",
      description: "Called with the new checked state",
    },
  },
};

export const Checkbox: StoryObj<CheckboxStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Accept terms",
    name: "terms",
    value: "accepted",
    checked: false,
    indeterminate: false,
    disabled: false,
    checkboxStyle: {},
    labelStyle: {},
  },
  render: function Render({ designSystem, onChange, ...args }) {
    const [, updateArgs] = useArgs<CheckboxStoryArgs>();
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <CheckboxComponent
          {...args}
          onChange={(checked) => {
            updateArgs({ checked, indeterminate: false });
            onChange?.(checked);
          }}
        />
      </ThemeProvider>
    );
  },
};

export default meta;
