import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Slider as SliderComponent } from "./Slider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SliderStoryArgs } from "./Slider.types";
import "./Slider.stories.css";

const meta: Meta<SliderStoryArgs> = {
  title: "Base/Slider",
  // No `component`: the args preview each variant through plain controls, not the component's union of props.
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the slider",
    },
    range: { control: "boolean", description: "Two thumbs that pick a range" },
    value: { control: "number", description: "The value, or the lower end of a range (controlled)" },
    upperValue: { control: "number", description: "Preview only: the upper end of a range" },
    label: { control: "text", description: "Label that names the slider" },
    description: { control: "text", description: "Help text announced with the slider" },
    error: { control: "text", description: "Error message; marks the slider invalid" },
    min: { control: "number", description: "Lowest value" },
    max: { control: "number", description: "Highest value" },
    step: { control: "number", description: "Distance between values" },
    disabled: { control: "boolean", description: "Disables the slider" },
    name: { control: "text", description: "The name submitted with a form" },
    showValue: { control: "boolean", description: "Shows the value at the end of the label row" },
    showSteps: { control: "boolean", description: "Marks every step on the track (up to 100)" },
    locale: { control: "text", description: "Locale that formats the value" },
    formatOptions: { control: "object", description: "Intl.NumberFormat options: currency, percent, unit" },
    labels: { control: "object", description: "Names of the two thumbs of a range" },
    className: { control: "text", description: "Additional classes on the slider" },
    style: { control: "object", description: "CSS properties on the slider" },
    labelClassName: { control: "text", description: "Additional classes on the label" },
    labelStyle: { control: "object", description: "CSS properties on the label" },
    valueClassName: { control: "text", description: "Additional classes on the value" },
    valueStyle: { control: "object", description: "CSS properties on the value" },
    descriptionClassName: { control: "text", description: "Additional classes on the description" },
    descriptionStyle: { control: "object", description: "CSS properties on the description" },
    controlClassName: { control: "text", description: "Additional classes on the control" },
    controlStyle: { control: "object", description: "CSS properties on the control" },
    trackClassName: { control: "text", description: "Additional classes on the track" },
    trackStyle: { control: "object", description: "CSS properties on the track" },
    fillClassName: { control: "text", description: "Additional classes on the filled stretch" },
    fillStyle: { control: "object", description: "CSS properties on the filled stretch" },
    railClassName: { control: "text", description: "Additional classes on the stretches outside the value" },
    railStyle: { control: "object", description: "CSS properties on the stretches outside the value" },
    stepClassName: { control: "text", description: "Additional classes on every step mark" },
    stepStyle: { control: "object", description: "CSS properties on every step mark" },
    inputClassName: { control: "text", description: "Additional classes on each range input" },
    inputStyle: { control: "object", description: "CSS properties on each range input" },
    errorClassName: { control: "text", description: "Additional classes on the error message" },
    errorStyle: { control: "object", description: "CSS properties on the error message" },
    onChange: { action: "changed", description: "Called with the new value, or the new pair of a range" },
  },
};

export const Slider: StoryObj<SliderStoryArgs> = {
  args: {
    designSystem: "neus",
    range: false,
    value: 400,
    upperValue: 800,
    label: "Price per night",
    description: "Taxes included.",
    error: undefined,
    min: 0,
    max: 1000,
    step: 50,
    disabled: false,
    name: "price",
    showValue: true,
    showSteps: false,
    locale: "en-US",
    formatOptions: { style: "currency", currency: "USD", maximumFractionDigits: 0 },
    labels: { minimum: "Minimum price", maximum: "Maximum price" },
    className: undefined,
    style: {},
    labelClassName: undefined,
    labelStyle: {},
    valueClassName: undefined,
    valueStyle: {},
    descriptionClassName: undefined,
    descriptionStyle: {},
    controlClassName: undefined,
    controlStyle: {},
    trackClassName: undefined,
    trackStyle: {},
    fillClassName: undefined,
    fillStyle: {},
    railClassName: undefined,
    railStyle: {},
    stepClassName: undefined,
    stepStyle: {},
    inputClassName: undefined,
    inputStyle: {},
    errorClassName: undefined,
    errorStyle: {},
  },
  render: function Render({ designSystem, range, value = 0, upperValue = 0, onChange, ...args }) {
    const [, updateArgs] = useArgs<SliderStoryArgs>();
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <div className="slider-story">
          {range ? (
            <SliderComponent
              {...args}
              range
              value={[value, upperValue]}
              onChange={(next) => {
                updateArgs({ value: next[0], upperValue: next[1] });
                onChange?.(next);
              }}
            />
          ) : (
            <SliderComponent
              {...args}
              value={value}
              onChange={(next) => {
                updateArgs({ value: next });
                onChange?.(next);
              }}
            />
          )}
        </div>
      </ThemeProvider>
    );
  },
};

export default meta;
