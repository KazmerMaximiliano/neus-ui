import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ThemeProvider } from "../../providers";
import { MultiSelect } from "./MultiSelect";

afterEach(() => {
  cleanup();
});

const defaultOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const renderMultiSelect = (
  props: Partial<React.ComponentProps<typeof MultiSelect>> = {},
) => {
  return render(
    <ThemeProvider>
      <MultiSelect
        name="test-select"
        options={defaultOptions}
        placeholder="Select options"
        {...props}
      />
    </ThemeProvider>,
  );
};

describe("MultiSelect", () => {
  describe("Rendering", () => {
    it("renders with placeholder when no value is selected", () => {
      const { container } = renderMultiSelect();
      const placeholder = container.querySelector(".multiselect-placeholder");
      expect(placeholder).toBeInTheDocument();
      expect(placeholder).toHaveTextContent("Select options");
    });

    it("renders with label", () => {
      const { container } = renderMultiSelect({
        label: "Choose items",
      });
      const label = container.querySelector(".multiselect-label");
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Choose items");
    });

    it("uses placeholder as label when label prop is not provided", () => {
      const { container } = renderMultiSelect({
        placeholder: "Select multiple items",
        label: undefined,
      });
      const label = container.querySelector(".multiselect-label");
      expect(label).toHaveTextContent("Select multiple items");
    });

    it("renders hidden inputs for each selected value", () => {
      const { container } = renderMultiSelect({
        value: ["option1", "option2"],
      });

      const hiddenInputs = container.querySelectorAll('input[type="hidden"]');
      expect(hiddenInputs).toHaveLength(2);
      expect(hiddenInputs[0]).toHaveValue("option1");
      expect(hiddenInputs[1]).toHaveValue("option2");
    });

    it("renders error state when error prop is provided", () => {
      const { container } = renderMultiSelect({
        error: "This field is required",
      });
      const errorElement = container.querySelector(".multiselect-error");
      expect(errorElement).toHaveTextContent("This field is required");
    });
  });

  describe("Dropdown functionality", () => {
    it("opens dropdown when clicked", async () => {
      const { container } = renderMultiSelect();
      const multiSelectElement = container.querySelector(
        ".multiselect",
      ) as HTMLElement;

      expect(
        container.querySelector(".multiselect-dropdown"),
      ).not.toBeInTheDocument();

      fireEvent.click(multiSelectElement);

      await waitFor(() => {
        expect(
          container.querySelector(".multiselect-dropdown"),
        ).toBeInTheDocument();
      });
    });

    it("toggles dropdown visibility", async () => {
      const { container } = renderMultiSelect();
      const multiSelectElement = container.querySelector(
        ".multiselect",
      ) as HTMLElement;

      fireEvent.click(multiSelectElement);
      await waitFor(() => {
        expect(
          container.querySelector(".multiselect-dropdown"),
        ).toBeInTheDocument();
      });

      fireEvent.click(multiSelectElement);
      await waitFor(() => {
        expect(
          container.querySelector(".multiselect-dropdown"),
        ).not.toBeInTheDocument();
      });
    });

    it("does not open dropdown when disabled", () => {
      const { container } = renderMultiSelect({
        disabled: true,
      });
      const multiSelectElement = container.querySelector(
        ".multiselect",
      ) as HTMLElement;

      fireEvent.click(multiSelectElement);

      expect(
        container.querySelector(".multiselect-dropdown"),
      ).not.toBeInTheDocument();
    });
  });

  describe("Selection functionality", () => {
    it("selects an option when clicked", async () => {
      const handleChange = vi.fn();
      const { container } = renderMultiSelect({
        onChange: handleChange,
      });

      const multiSelectElement = container.querySelector(
        ".multiselect",
      ) as HTMLElement;
      fireEvent.click(multiSelectElement);

      await waitFor(() => {
        expect(
          container.querySelector(".multiselect-dropdown"),
        ).toBeInTheDocument();
      });

      const firstOption = container.querySelector(
        ".multiselect-option",
      ) as HTMLElement;
      fireEvent.click(firstOption);

      expect(handleChange).toHaveBeenCalledWith(["option1"]);
    });

    it("displays selected values as tags", async () => {
      const { container } = renderMultiSelect({
        value: ["option1", "option2"],
      });

      const tags = container.querySelectorAll(".multiselect-tag");
      expect(tags).toHaveLength(2);
    });

    it("deselects an option when clicked again", async () => {
      const handleChange = vi.fn();
      const { container } = renderMultiSelect({
        value: ["option1"],
        onChange: handleChange,
      });

      const multiSelectElement = container.querySelector(
        ".multiselect",
      ) as HTMLElement;
      fireEvent.click(multiSelectElement);

      await waitFor(() => {
        expect(
          container.querySelector(".multiselect-dropdown"),
        ).toBeInTheDocument();
      });

      const firstOption = container.querySelector(
        ".multiselect-option",
      ) as HTMLElement;
      fireEvent.click(firstOption);

      expect(handleChange).toHaveBeenCalledWith([]);
    });

    it("selects multiple options", async () => {
      const handleChange = vi.fn();
      const { container } = renderMultiSelect({
        onChange: handleChange,
      });

      const multiSelectElement = container.querySelector(
        ".multiselect",
      ) as HTMLElement;
      fireEvent.click(multiSelectElement);

      await waitFor(() => {
        expect(
          container.querySelector(".multiselect-dropdown"),
        ).toBeInTheDocument();
      });

      const options = container.querySelectorAll(".multiselect-option");
      fireEvent.click(options[0]);
      fireEvent.click(options[1]);

      expect(handleChange).toHaveBeenLastCalledWith(["option1", "option2"]);
    });

    it("removes a tag when the remove button is clicked", async () => {
      const handleChange = vi.fn();
      const { container } = renderMultiSelect({
        value: ["option1", "option2"],
        onChange: handleChange,
      });

      const removeTags = container.querySelectorAll(".multiselect-tag-remove");
      fireEvent.click(removeTags[0]);

      expect(handleChange).toHaveBeenCalledWith(["option2"]);
    });

    it("does not select option when disabled", async () => {
      const handleChange = vi.fn();
      const { container } = renderMultiSelect({
        disabled: true,
        onChange: handleChange,
      });

      const multiSelectElement = container.querySelector(
        ".multiselect",
      ) as HTMLElement;
      fireEvent.click(multiSelectElement);

      expect(handleChange).not.toHaveBeenCalled();
      expect(
        container.querySelector(".multiselect-dropdown"),
      ).not.toBeInTheDocument();
    });

    it("does not remove tag when disabled", () => {
      const { container } = renderMultiSelect({
        value: ["option1"],
        disabled: true,
      });

      const removeTag = container.querySelector(".multiselect-tag-remove");
      expect(removeTag).not.toBeInTheDocument();
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("uses defaultValue for uncontrolled component", () => {
      const { container } = renderMultiSelect({
        defaultValue: ["option1"],
        value: undefined,
      });

      const tags = container.querySelectorAll(".multiselect-tag");
      expect(tags).toHaveLength(1);
    });

    it("initializes with value prop", () => {
      const { container } = renderMultiSelect({
        value: ["option1"],
      });

      const tags = container.querySelectorAll(".multiselect-tag");
      expect(tags).toHaveLength(1);
    });

    it("can be updated by user interactions", async () => {
      const handleChange = vi.fn();
      const { container } = renderMultiSelect({
        value: ["option1"],
        onChange: handleChange,
      });

      const multiSelectElement = container.querySelector(
        ".multiselect",
      ) as HTMLElement;
      fireEvent.click(multiSelectElement);

      await waitFor(() => {
        expect(
          container.querySelector(".multiselect-dropdown"),
        ).toBeInTheDocument();
      });

      const options = container.querySelectorAll(".multiselect-option");
      fireEvent.click(options[1]); // Seleccionar option2

      expect(handleChange).toHaveBeenCalledWith(["option1", "option2"]);
    });
  });

  describe("Accessibility", () => {
    it("has tabIndex for keyboard navigation when enabled", () => {
      const { container } = renderMultiSelect({
        disabled: false,
      });
      const multiSelectElement = container.querySelector(".multiselect");

      expect(multiSelectElement).toHaveAttribute("tabIndex", "0");
    });

    it("has tabIndex -1 when disabled", () => {
      const { container } = renderMultiSelect({
        disabled: true,
      });
      const multiSelectElement = container.querySelector(".multiselect");

      expect(multiSelectElement).toHaveAttribute("tabIndex", "-1");
    });
  });

  describe("Empty and edge cases", () => {
    it("renders with empty options array", () => {
      const { container } = renderMultiSelect({
        options: [],
      });

      const multiSelectElement = container.querySelector(
        ".multiselect",
      ) as HTMLElement;
      fireEvent.click(multiSelectElement);

      const options = container.querySelector(".multiselect-dropdown");
      expect(options?.children.length).toBe(0);
    });

    it("handles options with null value", () => {
      const { container } = renderMultiSelect({
        options: [
          { value: null, label: "Option with null value" },
          { value: "option1", label: "Option 1" },
        ],
      });

      const multiSelectElement = container.querySelector(
        ".multiselect",
      ) as HTMLElement;
      fireEvent.click(multiSelectElement);

      const optionsContainer = container.querySelector(".multiselect-dropdown");
      expect(optionsContainer?.children.length).toBe(2);
    });
  });
});
