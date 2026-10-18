import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Card } from "../Card/Card";
import { CardContent } from "../Card/components/CardContent/CardContent";
import { Grid as GridComponent } from "./Grid";
import type { GridStoryArgs } from "./Grid.types";

const FEATURES = ["Starts from how you feel", "Fits between two meetings", "Learns what works", "Works offline"];

const meta: Meta<GridStoryArgs> = {
  title: "Layout/Grid",
  component: GridComponent,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the grid",
    },
    as: {
      control: "select",
      options: ["div", "ul", "ol", "section"],
      description: "Rendered element; with ul, children are Card as=\"li\"",
    },
    columns: {
      control: "number",
      description: "Equal columns; default { base: 1, md: 2, lg: 3 }, in code also per breakpoint",
    },
    minItemWidth: {
      control: "text",
      description: "Fits as many columns of at least this width as fit, ignoring columns",
    },
    gap: {
      control: "select",
      options: [0, 1, 2, 3, 4, 6, 8, 12, 16],
      description: "Step of the --space-* scale; in code also { base, md, lg }",
    },
    children: {
      control: false,
      description: "Grid items",
    },
    className: {
      control: "text",
      description: "Additional classes on the grid",
    },
    style: {
      control: "object",
      description: "CSS properties on the grid, merged after the layout properties",
    },
  },
};

export const Grid: StoryObj<GridStoryArgs> = {
  args: {
    designSystem: "neus",
    as: "ul",
    columns: undefined,
    minItemWidth: undefined,
    gap: 6,
    children: FEATURES.map((feature) => (
      <Card key={feature} as="li">
        <CardContent>{feature}</CardContent>
      </Card>
    )),
    className: undefined,
    style: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <GridComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
