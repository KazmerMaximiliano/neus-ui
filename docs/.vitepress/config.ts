import { defineConfig } from "vitepress";

const storybookUrl = "https://kazmermaximiliano.github.io/neus-ui/storybook/";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/neus-ui/",
  ignoreDeadLinks: [
    /^\/storybook\//,
  ],
  title: "NEUS UI",
  description:
    "An AI-first React UI component library built with TypeScript and dynamic theming.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Get Started", link: "/introduction" },
      { text: "AI-First", link: "/ai-first" },
      { text: "Components", link: "/components" },
      { text: "Storybook", link: storybookUrl, target: "_self" },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/introduction" },
          { text: "Installation", link: "/installation" },
          { text: "Theming", link: "/theming" },
          { text: "Testing", link: "/testing" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "AI-First Workflow", link: "/ai-first" },
          { text: "Design System", link: "/design-system" },
          { text: "All Components", link: "/components" },
          { text: "Storybook", link: storybookUrl, target: "_self" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/KazmerMaximiliano/neus-ui" },
    ],
  },
});
