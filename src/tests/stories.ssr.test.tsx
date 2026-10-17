import { composeStories } from "@storybook/react";
import type { ComponentType } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../providers";

// Every public component and template has one story with complete args.
const STORY_MODULES = import.meta.glob<Parameters<typeof composeStories>[0]>(
  "../{components,templates}/**/*.stories.tsx",
  { eager: true },
);
const STORIES = Object.entries(STORY_MODULES).flatMap(([file, module]) =>
  Object.entries(composeStories(module)).map(([name, Story]) => ({ file, name, Story: Story as ComponentType })),
);

describe("server rendering", () => {
  it("finds the stories", () => {
    expect(STORIES.length).toBeGreaterThanOrEqual(30);
  });

  it.each(STORIES)("renders $name ($file) without a DOM", ({ Story }) => {
    const html = renderToString(
      <ThemeProvider designSystem="vercel">
        <Story />
      </ThemeProvider>,
    );
    expect(html.length).toBeGreaterThan(0);
  });
});
