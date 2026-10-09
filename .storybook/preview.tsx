import type { Preview } from "@storybook/react-vite";
import { DESIGN_SYSTEMS } from "../src/design-systems";
import { ThemeProvider } from "../src/providers";
import "../src/css/app.css";
import type { DesignSystemId } from "../src/design-systems";
import type { ColorScheme } from "../src/providers";

const preview: Preview = {
  globalTypes: {
    designSystem: {
      description: "Design system",
      toolbar: {
        title: "Design system",
        icon: "paintbrush",
        items: DESIGN_SYSTEMS.map(({ id, name }) => ({ value: id, title: name })),
        dynamicTitle: true,
      },
    },
    colorScheme: {
      description: "Color scheme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { designSystem: "neus", colorScheme: "light" },
  parameters: {
    layout: "centered",
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    a11y: { test: "todo" },
  },
  decorators: [
    (Story, context) => (
      <ThemeProvider
        designSystem={(context.globals.designSystem as DesignSystemId) ?? "neus"}
        colorScheme={(context.globals.colorScheme as ColorScheme) ?? "light"}
      >
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
