import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Toggle } from "../Toggle";
import { ToggleGroup } from "./ToggleGroup";
import * as stories from "./ToggleGroup.stories";
import { enabledValues, toList } from "./ToggleGroup.utils";

afterEach(cleanup);

const { ToggleGroup: ToggleGroupStory } = composeStories(stories);

const VIEWS = (
  <>
    <Toggle value="list" label="List" />
    <Toggle value="grid" label="Grid" />
    <Toggle value="map" label="Map" />
  </>
);

describe("ToggleGroup", () => {
  describe("single", () => {
    it("renders a named radio group of toggles", () => {
      render(<ToggleGroup label="View" defaultValue="grid">{VIEWS}</ToggleGroup>);

      expect(screen.getByRole("radiogroup", { name: "View" })).toHaveAttribute("data-orientation", "horizontal");
      expect(screen.getByRole("radio", { name: "Grid" })).toBeChecked();
      expect(screen.getByRole("radio", { name: "List" })).not.toBeChecked();
      expect(screen.getByRole("radio", { name: "Grid" })).not.toHaveAttribute("aria-pressed");
    });

    it("presses one toggle at a time and keeps it when pressed again", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ToggleGroup label="View" onChange={handleChange}>{VIEWS}</ToggleGroup>);

      await user.click(screen.getByRole("radio", { name: "Map" }));
      expect(screen.getByRole("radio", { name: "Map" })).toBeChecked();
      expect(handleChange).toHaveBeenLastCalledWith("map");

      await user.click(screen.getByRole("radio", { name: "Map" }));
      expect(screen.getByRole("radio", { name: "Map" })).toBeChecked();
      expect(handleChange).toHaveBeenCalledOnce();
    });

    it("lets Tab reach the pressed toggle only, and arrows choose", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ToggleGroup label="View" defaultValue="grid" onChange={handleChange}>{VIEWS}</ToggleGroup>);

      await user.tab();
      expect(screen.getByRole("radio", { name: "Grid" })).toHaveFocus();
      expect(screen.getByRole("radio", { name: "List" })).toHaveAttribute("tabindex", "-1");

      await user.keyboard("{ArrowRight}");
      expect(screen.getByRole("radio", { name: "Map" })).toHaveFocus();
      expect(screen.getByRole("radio", { name: "Map" })).toBeChecked();

      await user.keyboard("{ArrowRight}");
      expect(screen.getByRole("radio", { name: "List" })).toBeChecked();

      await user.keyboard("{End}");
      expect(handleChange).toHaveBeenLastCalledWith("map");
    });

    it("moves with the vertical arrows in a column", async () => {
      const user = userEvent.setup();
      render(<ToggleGroup label="View" orientation="vertical" defaultValue="list">{VIEWS}</ToggleGroup>);

      await user.tab();
      await user.keyboard("{ArrowDown}");

      expect(screen.getByRole("radio", { name: "Grid" })).toBeChecked();
    });

    it("starts Tab at the first enabled toggle without a value, and skips disabled ones", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup label="View">
          <Toggle value="list" label="List" disabled />
          <Toggle value="grid" label="Grid" />
          <Toggle value="map" label="Map" />
        </ToggleGroup>,
      );

      await user.tab();
      expect(screen.getByRole("radio", { name: "Grid" })).toHaveFocus();
      await user.keyboard("{ArrowLeft}");
      expect(screen.getByRole("radio", { name: "Map" })).toHaveFocus();
    });

    it("follows a controlled value", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { rerender } = render(<ToggleGroup label="View" value="list" onChange={handleChange}>{VIEWS}</ToggleGroup>);

      await user.click(screen.getByRole("radio", { name: "Grid" }));

      expect(handleChange).toHaveBeenCalledWith("grid");
      expect(screen.getByRole("radio", { name: "List" })).toBeChecked();
      rerender(<ToggleGroup label="View" value="grid" onChange={handleChange}>{VIEWS}</ToggleGroup>);
      expect(screen.getByRole("radio", { name: "Grid" })).toBeChecked();
    });
  });

  describe("multiple", () => {
    it("presses any number of toggles", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ToggleGroup type="multiple" label="Format" defaultValue={["list"]} onChange={handleChange}>{VIEWS}</ToggleGroup>);

      expect(screen.getByRole("group", { name: "Format" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "List" })).toHaveAttribute("aria-pressed", "true");

      await user.click(screen.getByRole("button", { name: "Map" }));
      expect(handleChange).toHaveBeenLastCalledWith(["list", "map"]);

      await user.click(screen.getByRole("button", { name: "List" }));
      expect(handleChange).toHaveBeenLastCalledWith(["map"]);
      expect(screen.getByRole("button", { name: "List" })).toHaveAttribute("aria-pressed", "false");
    });

    it("moves focus with the arrows without pressing", async () => {
      const user = userEvent.setup();
      render(<ToggleGroup type="multiple" label="Format">{VIEWS}</ToggleGroup>);

      await user.tab();
      await user.keyboard("{ArrowRight}");

      expect(screen.getByRole("button", { name: "Grid" })).toHaveFocus();
      expect(screen.getByRole("button", { name: "Grid" })).toHaveAttribute("aria-pressed", "false");
      await user.tab({ shift: true });
      await user.tab();
      expect(screen.getByRole("button", { name: "Grid" })).toHaveFocus();
    });
  });

  describe("toggles inside", () => {
    it("gives its size and disabled state to toggles that do not set their own", () => {
      render(
        <ToggleGroup label="View" size="small" disabled>
          <Toggle value="list" label="List" />
          <Toggle value="grid" label="Grid" size="large" disabled={false} />
        </ToggleGroup>,
      );

      expect(screen.getByRole("radio", { name: "List" })).toHaveAttribute("data-size", "small");
      expect(screen.getByRole("radio", { name: "List" })).toBeDisabled();
      expect(screen.getByRole("radio", { name: "Grid" })).toHaveAttribute("data-size", "large");
      expect(screen.getByRole("radio", { name: "Grid" })).toBeEnabled();
    });

    it("leaves a toggle without a value on its own", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <ToggleGroup label="Tools" onChange={handleChange}>
          <Toggle label="Pin" />
        </ToggleGroup>,
      );

      await user.click(screen.getByRole("button", { name: "Pin" }));

      expect(screen.getByRole("button", { name: "Pin" })).toHaveAttribute("aria-pressed", "true");
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("tells a toggle's own onPressedChange", async () => {
      const user = userEvent.setup();
      const handlePressed = vi.fn();
      render(
        <ToggleGroup type="multiple" label="Format">
          <Toggle value="bold" label="Bold" onPressedChange={handlePressed} />
        </ToggleGroup>,
      );

      await user.click(screen.getByRole("button", { name: "Bold" }));

      expect(handlePressed).toHaveBeenCalledWith(true);
    });
  });

  describe("customization", () => {
    it("applies className, style and native attributes to the group", () => {
      render(<ToggleGroup label="View" className="consumer" style={{ outlineOffset: "7px" }} data-testid="group">{VIEWS}</ToggleGroup>);
      const group = screen.getByTestId("group");

      expect(group).toHaveClass("toggle-group", "consumer");
      expect(group).toHaveStyle({ outlineOffset: "7px" });
    });

    it("renders its story", () => {
      render(<ToggleGroupStory />);

      expect(screen.getByRole("radio", { name: "List" })).toBeChecked();
    });

    it("types the value by type", () => {
      // @ts-expect-error A multiple group takes a list of values.
      void (<ToggleGroup type="multiple" label="Format" value="bold">{VIEWS}</ToggleGroup>);
    });
  });

  describe("utilities", () => {
    it("reads values as a list and finds the enabled toggles", () => {
      expect(toList(null)).toEqual([]);
      expect(toList("a")).toEqual(["a"]);
      expect(toList(["a", "b"])).toEqual(["a", "b"]);
      expect(enabledValues([<Toggle key="a" value="a" label="A" disabled />, <Toggle key="b" value="b" label="B" />, "text"])).toEqual(["b"]);
      expect(enabledValues(VIEWS)).toEqual(["list", "grid", "map"]);
    });
  });
});
