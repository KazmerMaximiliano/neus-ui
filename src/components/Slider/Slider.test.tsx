import { composeStories } from "@storybook/react-vite";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Slider } from "./Slider";
import * as stories from "./Slider.stories";
import { SLIDER_MAX_STEPS } from "./Slider.consts";
import { clamp, shareOf, stepShares } from "./Slider.utils";

afterEach(cleanup);

const { Slider: SliderStory } = composeStories(stories);

// jsdom does not step range inputs from the keyboard or the pointer, so changes are fired.
const slide = (slider: HTMLElement, value: number) =>
  fireEvent.change(slider, { target: { value: String(value) } });

describe("Slider", () => {
  describe("rendering", () => {
    it("names the slider with its label and shows the value", () => {
      render(<Slider label="Volume" defaultValue={40} />);
      const slider = screen.getByRole("slider", { name: "Volume" });

      expect(slider).toHaveValue("40");
      expect(slider).toHaveAttribute("min", "0");
      expect(slider).toHaveAttribute("max", "100");
      expect(screen.getByText("40")).toHaveAttribute("aria-hidden", "true");
    });

    it("formats the value text with the locale and format options", () => {
      render(
        <Slider
          label="Price"
          defaultValue={1500}
          max={5000}
          locale="de-DE"
          formatOptions={{ style: "currency", currency: "EUR", maximumFractionDigits: 0 }}
        />,
      );

      expect(screen.getByRole("slider")).toHaveAttribute("aria-valuetext", "1.500 €");
      expect(screen.getByText("1.500 €")).toBeInTheDocument();
    });

    it("starts at min without a value", () => {
      render(<Slider label="Rooms" min={1} max={8} />);

      expect(screen.getByRole("slider")).toHaveValue("1");
    });

    it("hides the value with showValue false", () => {
      const { container } = render(<Slider label="Volume" defaultValue={40} showValue={false} />);

      expect(container.querySelector(".slider__value")).toBeNull();
    });

    it("describes the slider with its help text and error", () => {
      render(<Slider label="Volume" description="Applies to every room." error="Too loud." />);
      const slider = screen.getByRole("slider");

      expect(slider).toHaveAccessibleDescription("Applies to every room. Too loud.");
      expect(slider).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByText("Volume").closest(".slider")).toHaveClass("slider--invalid");
    });

    it("clamps a value outside the range", () => {
      render(<Slider label="Volume" value={140} />);

      expect(screen.getByRole("slider")).toHaveValue("100");
    });

    it("fills up to the value", () => {
      const { container } = render(<Slider label="Volume" defaultValue={25} />);
      const control = container.querySelector<HTMLElement>(".slider__control")!;

      expect(control.style.getPropertyValue("--slider-start")).toBe("0");
      expect(control.style.getPropertyValue("--slider-end")).toBe("0.25");
    });

    it("draws the track as a fill and the rest, with a rail before the fill of a range", () => {
      const { container, rerender } = render(<Slider label="Volume" defaultValue={25} />);
      const track = container.querySelector(".slider__track")!;

      expect(track).toHaveAttribute("aria-hidden", "true");
      expect([...track.children].map((part) => part.className)).toEqual(["slider__fill", "slider__rail slider__rail--after"]);
      rerender(<Slider label="Price" range defaultValue={[20, 60]} />);
      expect([...container.querySelector(".slider__track")!.children].map((part) => part.className))
        .toEqual(["slider__rail slider__rail--before", "slider__fill", "slider__rail slider__rail--after"]);
    });

    it("marks every step with showSteps, the ones inside the value as active", () => {
      const { container } = render(<Slider label="Rooms" min={1} max={5} defaultValue={3} showSteps />);
      const steps = [...container.querySelectorAll<HTMLElement>(".slider__step")];

      expect(steps.map((mark) => mark.style.getPropertyValue("--slider-step"))).toEqual(["0", "0.25", "0.5", "0.75", "1"]);
      expect(steps.map((mark) => mark.hasAttribute("data-active"))).toEqual([true, true, true, false, false]);
    });

    it("marks only the steps between the two values of a range as active", () => {
      const { container } = render(<Slider label="Price" range min={0} max={4} defaultValue={[1, 3]} showSteps />);

      expect([...container.querySelectorAll(".slider__step")].map((mark) => mark.hasAttribute("data-active")))
        .toEqual([false, true, true, true, false]);
    });

    it("draws no marks without showSteps, or past the most it draws", () => {
      const { container, rerender } = render(<Slider label="Volume" />);

      expect(container.querySelector(".slider__step")).toBeNull();
      rerender(<Slider label="Volume" max={SLIDER_MAX_STEPS + 1} showSteps />);
      expect(container.querySelector(".slider__step")).toBeNull();
      rerender(<Slider label="Volume" max={SLIDER_MAX_STEPS - 1} showSteps />);
      expect(container.querySelectorAll(".slider__step")).toHaveLength(SLIDER_MAX_STEPS);
    });

    it("renders a range as a group of two named thumbs", () => {
      render(<Slider label="Price" range defaultValue={[20, 60]} labels={{ minimum: "From" }} />);

      expect(screen.getByRole("group", { name: "Price" })).toBeInTheDocument();
      expect(screen.getByRole("slider", { name: "From" })).toHaveValue("20");
      expect(screen.getByRole("slider", { name: "Maximum" })).toHaveValue("60");
      expect(screen.getByText("20 – 60")).toBeInTheDocument();
    });

    it("submits the value, and both values of a range, under its name", () => {
      const { container } = render(
        <form>
          <Slider label="Volume" name="volume" defaultValue={30} />
          <Slider label="Price" name="price" range defaultValue={[10, 90]} />
        </form>,
      );
      const data = new FormData(container.querySelector("form")!);

      expect(data.get("volume")).toBe("30");
      expect(data.getAll("price")).toEqual(["10", "90"]);
    });

    it("renders its story", () => {
      render(<SliderStory />);

      expect(screen.getByRole("slider", { name: "Price per night" })).toHaveAttribute("aria-valuetext", "$400");
    });
  });

  describe("interactions", () => {
    it("moves and reports the value", () => {
      const handleChange = vi.fn();
      render(<Slider label="Volume" defaultValue={40} step={5} onChange={handleChange} />);
      const slider = screen.getByRole("slider");

      slide(slider, 45);

      expect(handleChange).toHaveBeenCalledWith(45);
      expect(slider).toHaveValue("45");
    });

    it("stays on a controlled value until the prop changes", () => {
      const handleChange = vi.fn();
      const { rerender } = render(<Slider label="Volume" value={40} onChange={handleChange} />);
      const slider = screen.getByRole("slider");

      slide(slider, 70);

      expect(handleChange).toHaveBeenCalledWith(70);
      expect(slider).toHaveValue("40");
      rerender(<Slider label="Volume" value={70} onChange={handleChange} />);
      expect(slider).toHaveValue("70");
    });

    it("reports both ends of a range and keeps the thumbs from crossing", () => {
      const handleChange = vi.fn();
      render(<Slider label="Price" range defaultValue={[20, 60]} onChange={handleChange} />);
      const [low, high] = screen.getAllByRole("slider");

      slide(low, 30);
      expect(handleChange).toHaveBeenLastCalledWith([30, 60]);

      slide(low, 80);
      expect(handleChange).toHaveBeenLastCalledWith([60, 60]);
      expect(low).toHaveValue("60");

      slide(high, 10);
      expect(handleChange).toHaveBeenCalledTimes(2);
      expect(high).toHaveValue("60");
    });

    it("raises the thumb in use so two thumbs on one spot can part", () => {
      render(<Slider label="Price" range defaultValue={[100, 100]} />);
      const [low, high] = screen.getAllByRole("slider");

      expect(low).toHaveAttribute("data-raised");
      fireEvent.focus(high);
      expect(low).toHaveAttribute("data-raised");
    });

    it("raises the upper thumb at min", () => {
      render(<Slider label="Price" range defaultValue={[0, 0]} />);
      const [low, high] = screen.getAllByRole("slider");

      fireEvent.focus(low);

      expect(high).toHaveAttribute("data-raised");
      expect(low).not.toHaveAttribute("data-raised");
    });

    it("disables both thumbs", () => {
      render(<Slider label="Price" range disabled />);

      for (const slider of screen.getAllByRole("slider")) expect(slider).toBeDisabled();
    });
  });

  describe("customization", () => {
    it.each([
      ["className", "style", "slider"],
      ["labelClassName", "labelStyle", "slider__label"],
      ["valueClassName", "valueStyle", "slider__value"],
      ["descriptionClassName", "descriptionStyle", "field__description"],
      ["controlClassName", "controlStyle", "slider__control"],
      ["trackClassName", "trackStyle", "slider__track"],
      ["fillClassName", "fillStyle", "slider__fill"],
      ["railClassName", "railStyle", "slider__rail"],
      ["stepClassName", "stepStyle", "slider__step"],
      ["inputClassName", "inputStyle", "slider__input"],
      ["errorClassName", "errorStyle", "slider__error"],
    ])("applies and removes %s and %s on .%s", (classProp, styleProp, base) => {
      const props = { label: "Volume", description: "Help.", error: "Wrong.", max: 4, showSteps: true };
      const { container, rerender } = render(
        <Slider {...props} {...{ [classProp]: "consumer-part", [styleProp]: { outlineOffset: "7px" } }} />,
      );
      const part = container.querySelector<HTMLElement>(".consumer-part")!;

      expect(part).toHaveClass(base);
      expect(part).toHaveStyle({ outlineOffset: "7px" });
      rerender(<Slider {...props} />);
      expect(container.querySelector(".consumer-part")).toBeNull();
      expect(part.style.outlineOffset).toBe("");
    });

    it("keeps the runtime fill when controlStyle is set", () => {
      const { container } = render(<Slider label="Volume" defaultValue={50} controlStyle={{ color: "red" }} />);

      expect(container.querySelector<HTMLElement>(".slider__control")!.style.getPropertyValue("--slider-end")).toBe("0.5");
    });

    it("passes native attributes to the root", () => {
      const { container } = render(<Slider label="Volume" id="volume" data-testid="root" />);

      expect(container.firstElementChild).toHaveAttribute("id", "volume");
      expect(screen.getByTestId("root")).toHaveClass("slider");
    });

    it("types the value by mode", () => {
      // @ts-expect-error A range takes a pair of numbers.
      void (<Slider label="Price" range value={20} />);
      // @ts-expect-error One value takes a number.
      void (<Slider label="Volume" value={[1, 2]} />);
    });
  });

  describe("utilities", () => {
    it("clamps and measures shares", () => {
      expect(clamp(12, 0, 10)).toBe(10);
      expect(clamp(-1, 0, 10)).toBe(0);
      expect(shareOf(5, 0, 10)).toBe(0.5);
      expect(shareOf(3, 3, 3)).toBe(0);
      expect(stepShares(0, 10, 4)).toEqual([0, 0.4, 0.8]);
      expect(stepShares(0, 1, 0.1)).toHaveLength(11);
      expect(stepShares(0, 10, 0)).toEqual([0]);
    });
  });
});
