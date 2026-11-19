import { useState } from "react";
import { Star } from "lucide-react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { IconButton } from "../IconButton";
import { Stack } from "../Stack";
import { FormField as FormFieldComponent } from "./FormField";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { FormFieldControl, FormFieldStoryArgs } from "./FormField.types";
import "./FormField.stories.css";

// A control of the project's own, the kind FormField labels: five stars as a radio group.
const StarRating = ({ disabled, ...control }: FormFieldControl) => {
  // The rating belongs to this example control, not to FormField's args.
  const [rating, setRating] = useState(0);

  return (
    <Stack {...control} role="radiogroup" direction="row" gap={1}>
      {[1, 2, 3, 4, 5].map((stars) => (
        <IconButton
          key={stars}
          icon={Star}
          label={stars === 1 ? "1 star" : `${stars} stars`}
          variant="text"
          role="radio"
          aria-checked={stars === rating}
          disabled={disabled}
          iconClassName={stars <= rating ? "form-field-story__star--filled" : undefined}
          onClick={() => setRating(stars)}
        />
      ))}
    </Stack>
  );
};

const meta: Meta<FormFieldStoryArgs> = {
  title: "Form/FormField",
  component: FormFieldComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the field",
    },
    label: { control: "text", description: "Label that names the control" },
    description: { control: "text", description: "Help text announced with the control" },
    error: { control: "text", description: "Error message; marks the control invalid" },
    required: { control: "boolean", description: "Shows the required mark and sets aria-required" },
    disabled: { control: "boolean", description: "Disables the control and dims the label" },
    id: { control: "text", description: "The control's id; generated when omitted" },
    children: { control: false, description: "Renders the control with the props it receives" },
    className: { control: "text", description: "Additional classes on the field" },
    style: { control: "object", description: "CSS properties on the field" },
    labelClassName: { control: "text", description: "Additional classes on the label" },
    labelStyle: { control: "object", description: "CSS properties on the label" },
    requiredClassName: { control: "text", description: "Additional classes on the required mark" },
    requiredStyle: { control: "object", description: "CSS properties on the required mark" },
    descriptionClassName: { control: "text", description: "Additional classes on the description" },
    descriptionStyle: { control: "object", description: "CSS properties on the description" },
    errorClassName: { control: "text", description: "Additional classes on the error message" },
    errorStyle: { control: "object", description: "CSS properties on the error message" },
  },
};

export const FormField: StoryObj<FormFieldStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Rating",
    description: "How was your stay?",
    error: undefined,
    required: false,
    disabled: false,
    id: undefined,
    children: (control) => <StarRating {...control} />,
    className: undefined,
    style: {},
    labelClassName: undefined,
    labelStyle: {},
    requiredClassName: undefined,
    requiredStyle: {},
    descriptionClassName: undefined,
    descriptionStyle: {},
    errorClassName: undefined,
    errorStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <FormFieldComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
