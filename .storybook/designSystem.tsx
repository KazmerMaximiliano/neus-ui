import type { Decorator } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../src/design-systems";
import { ThemeProvider } from "../src/providers";
import type { DesignSystemPreviewArgs } from "./designSystem.types";

export const designSystemControl = {
  control: { type: "select" as const, labels: { global: "Heredar global" } },
  options: ["global", ...DESIGN_SYSTEMS.map(({ id }) => id)],
  description: "Preview design system; inherits the toolbar selection by default. Color scheme always follows the toolbar.",
};

/** Local system previews retain the scheme supplied by the global decorator. */
export const withDesignSystem: Decorator<DesignSystemPreviewArgs> = (Story, context) => (
  <ThemeProvider scope="local" designSystem={context.args.designSystem === "global" ? undefined : context.args.designSystem}>
    <Story />
  </ThemeProvider>
);
