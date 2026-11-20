import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { cdp, page, userEvent as pointer } from "vitest/browser";
import { Input } from "../../components/Input";
import { Slider } from "../../components/Slider";
import { Toggle } from "../../components/Toggle";
import { ToggleGroup } from "../../components/ToggleGroup";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", control: 24, thumb: 20, inset: 10, stop: 0, toggle: 40 },
  { id: "apple", control: 24, thumb: 24, inset: 12, stop: 0, toggle: 32 },
  { id: "carbon", control: 24, thumb: 14, inset: 7, stop: 0, toggle: 40 },
  { id: "material", control: 44, thumb: 4, inset: 8, stop: 4, toggle: 40 },
  { id: "neobrutalism", control: 24, thumb: 20, inset: 10, stop: 0, toggle: 40 },
  { id: "vercel", control: 24, thumb: 12, inset: 6, stop: 0, toggle: 32 },
] as const;

const typography = (element: Element) => {
  const { fontSize, fontWeight, fontFamily } = getComputedStyle(element);
  return { fontSize, fontWeight, fontFamily };
};

/** The text color against what is painted behind it, down to the page surface. */
const textContrast = (element: HTMLElement, ...layers: HTMLElement[]) => {
  const surface = resolveColor(element, "--color-surface");
  const ground = [element, ...layers].reduceRight(
    (backdrop, layer) => flatten(getComputedStyle(layer).backgroundColor, backdrop),
    surface,
  );
  return contrastRatio(getComputedStyle(element).color, ground);
};

describe.each(["light", "dark"] as const)("Selection controls in %s mode", (scheme) => {
  it.each(SYSTEMS)("draws the $id slider from its recipe, with its value perceivable", (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <Slider label="Rooms" min={1} max={8} defaultValue={3} description="Bedrooms only." />
        <Slider label="Price" range defaultValue={[25, 75]} />
        <Input label="Name" labelPlacement="external" />
      </ThemeProvider>,
    );
    const slider = screen.getByRole("slider", { name: "Rooms" });
    const control = slider.parentElement!;
    const surface = resolveColor(control, "--color-surface");
    const track = flatten(resolveColor(control, "--slider-track-background"), surface);
    const fill = resolveColor(control, "--slider-fill-background");
    const thumbEdge = parseFloat(getComputedStyle(control).getPropertyValue("--slider-thumb-border-width")) > 0
      ? resolveColor(control, "--slider-thumb-border-color")
      : resolveColor(control, "--slider-thumb-background");
    const [low, high] = screen.getAllByRole("slider", { name: /imum/ });
    const range = low.parentElement!.getBoundingClientRect();
    // Computed styles do not reach the thumb pseudo-element; hit testing finds it where it is drawn.
    const thumbAt = (share: number) => range.left + system.inset + share * (range.width - 2 * system.inset);
    const middle = range.top + range.height / 2;

    expect(control.offsetHeight).toBe(system.control);
    expect(document.elementFromPoint(thumbAt(0.25), middle)).toBe(low);
    expect(document.elementFromPoint(thumbAt(0.75), middle)).toBe(high);
    expect(document.elementFromPoint(thumbAt(0.25) + system.thumb / 2 + 2, middle)).toBe(low.parentElement);
    // The value reads from the fill against the track, or from the thumb against the page.
    expect(Math.max(contrastRatio(fill, track), contrastRatio(thumbEdge, surface))).toBeGreaterThanOrEqual(3);
    expect(typography(screen.getByText("Rooms"))).toEqual(typography(screen.getByText("Name")));
    for (const text of ["Rooms", "3", "Bedrooms only."]) {
      expect(textContrast(screen.getByText(text))).toBeGreaterThanOrEqual(4.5);
    }
  });

  it.each(SYSTEMS)("marks the $id steps under the thumb positions, with readable marks", (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <Slider label="Rooms" min={0} max={4} defaultValue={2} showSteps />
      </ThemeProvider>,
    );
    const slider = screen.getByRole("slider");
    const control = slider.parentElement!;
    const box = control.getBoundingClientRect();
    const marks = [...control.querySelectorAll<HTMLElement>(".slider__step")];
    const rail = control.querySelector<HTMLElement>(".slider__rail--after")!;
    const center = (mark: HTMLElement) => {
      const { left, width } = mark.getBoundingClientRect();
      return left + width / 2;
    };

    expect(marks.map((mark) => Math.round(center(mark) - box.left)))
      .toEqual([0, 1, 2, 3, 4].map((step) => Math.round(system.inset + (step / 4) * (box.width - 2 * system.inset))));
    // A mark tells a step apart from the stretch it sits on.
    const markColor = getComputedStyle(marks[4]).backgroundColor;
    const railColor = flatten(getComputedStyle(rail).backgroundColor, resolveColor(control, "--color-surface"));
    expect(markColor).not.toBe(railColor);
    // On the fill, a mark differs in color or, like Carbon's ticks, crosses the track.
    const fill = control.querySelector<HTMLElement>(".slider__fill")!;
    expect(getComputedStyle(marks[0]).backgroundColor !== getComputedStyle(fill).backgroundColor
      || marks[0].offsetHeight > fill.offsetHeight).toBe(true);
    expect(getComputedStyle(rail, "::after").width).toBe(`${system.stop}px`);
  });

  it.each(SYSTEMS)("draws the $id toggle at rest and pressed with readable text", async (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <Toggle label="Bold" />
        <Toggle label="Italic" defaultPressed />
      </ThemeProvider>,
    );
    const rest = screen.getByRole("button", { name: "Bold" });
    const pressed = screen.getByRole("button", { name: "Italic" });

    expect(rest.offsetHeight).toBe(system.toggle);
    expect(textContrast(rest)).toBeGreaterThanOrEqual(4.5);
    expect(textContrast(pressed)).toBeGreaterThanOrEqual(4.5);
    expect([getComputedStyle(pressed).backgroundColor, getComputedStyle(pressed).borderColor])
      .not.toEqual([getComputedStyle(rest).backgroundColor, getComputedStyle(rest).borderColor]);

    // Resolved outside waitFor: the probe it appends would wake waitFor's DOM observer forever.
    const hover = resolveColor(rest, "--toggle-hover-background");
    await pointer.hover(rest);
    await waitFor(() => expect(getComputedStyle(rest).backgroundColor).toBe(hover));
    expect(textContrast(rest)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(SYSTEMS)("draws the $id toggle group with readable options and a visible focus", async (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <ToggleGroup label="View" defaultValue="grid">
          <Toggle value="list" label="List" />
          <Toggle value="grid" label="Grid" />
          <Toggle value="map" label="Map" />
        </ToggleGroup>
      </ThemeProvider>,
    );
    const group = screen.getByRole("radiogroup", { name: "View" });
    const [list, grid, map] = screen.getAllByRole("radio");

    expect(textContrast(list, group)).toBeGreaterThanOrEqual(4.5);
    expect(textContrast(grid, group)).toBeGreaterThanOrEqual(4.5);
    expect(getComputedStyle(grid).backgroundColor).not.toBe(getComputedStyle(list).backgroundColor);
    expect(list.getBoundingClientRect().top).toBe(map.getBoundingClientRect().top);
    expect(grid.offsetWidth).toBe(map.offsetWidth);

    await pointer.tab();
    expect(grid).toHaveFocus();
    expect(getComputedStyle(grid).outlineStyle).toBe("solid");
  });
});

describe("Selection behavior, scopes and motion", () => {
  it("steps the slider with the real arrow keys and keeps range thumbs apart", async () => {
    render(
      <ThemeProvider scope="local">
        <Slider label="Volume" defaultValue={40} step={5} />
        <Slider label="Price" range defaultValue={[40, 60]} />
      </ThemeProvider>,
    );
    const volume = screen.getByRole("slider", { name: "Volume" });
    const [low, high] = screen.getAllByRole("slider", { name: /imum/ });

    volume.focus();
    await pointer.keyboard("{ArrowRight}");
    expect(volume).toHaveValue("45");

    low.focus();
    await pointer.keyboard("{End}");
    expect(low).toHaveValue("60");
    high.focus();
    await pointer.keyboard("{Home}");
    expect(high).toHaveValue("60");
  });

  it("fills the single slider from the start and the range between its thumbs, leaving Material's gaps", () => {
    render(
      <>
        <ThemeProvider scope="local">
          <Slider label="Volume" defaultValue={50} />
          <Slider label="Price" range defaultValue={[25, 75]} />
        </ThemeProvider>
        <ThemeProvider scope="local" designSystem="material">
          <Slider label="Level" defaultValue={50} />
        </ThemeProvider>
      </>,
    );
    const [single, range, material] = [...document.querySelectorAll<HTMLElement>(".slider__control")];
    const edges = (part: Element) => {
      const { left, right } = part.getBoundingClientRect();
      return [left, right].map(Math.round);
    };
    const at = (control: HTMLElement, share: number, inset: number) => {
      const { left, width } = control.getBoundingClientRect();
      return Math.round(left + inset + share * (width - 2 * inset));
    };

    expect(edges(single.querySelector(".slider__fill")!)).toEqual([Math.round(single.getBoundingClientRect().left), at(single, 0.5, 10)]);
    expect(edges(range.querySelector(".slider__rail--before")!)[1]).toBe(at(range, 0.25, 10));
    expect(edges(range.querySelector(".slider__fill")!)).toEqual([at(range, 0.25, 10), at(range, 0.75, 10)]);
    // Material clears 6px of track on each side of its 4px handle.
    expect(edges(material.querySelector(".slider__fill")!)[1]).toBe(at(material, 0.5, 8) - 8);
    expect(edges(material.querySelector(".slider__rail--after")!)[0]).toBe(at(material, 0.5, 8) + 8);
  });

  it("changes the thumb only while the pointer is on it, not anywhere on the track", async () => {
    await page.viewport(600, 400);
    render(
      <ThemeProvider scope="local">
        <div>
          <Slider label="Volume" defaultValue={0} showValue={false} />
        </div>
      </ThemeProvider>,
    );
    const slider = screen.getByRole("slider");
    const { width, height } = slider.getBoundingClientRect();
    const shot = () => page.screenshot({ element: slider.parentElement!, save: false, base64: true });

    await pointer.hover(document.body, { position: { x: 1, y: 1 } });
    const rest = await shot();
    await pointer.hover(slider, { position: { x: width * 0.75, y: height / 2 } });
    expect(await shot()).toBe(rest);
    await pointer.hover(slider, { position: { x: 10, y: height / 2 } });
    // The halo grows in over the transition: wait for it to settle before comparing.
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(await shot()).not.toBe(rest);
  });

  it("hides Material's end stop once the handle reaches it", () => {
    render(
      <ThemeProvider scope="local" designSystem="material">
        <Slider label="Low" defaultValue={10} />
        <Slider label="High" defaultValue={100} />
      </ThemeProvider>,
    );
    const [low, high] = [...document.querySelectorAll<HTMLElement>(".slider__rail--after")];

    expect(low.offsetWidth).toBeGreaterThan(8);
    expect(high.offsetWidth).toBe(0);
  });

  it("lets only the thumbs of a range take the pointer, and drags the one grabbed", async () => {
    render(
      <ThemeProvider scope="local">
        <Slider label="Price" range defaultValue={[25, 75]} />
      </ThemeProvider>,
    );
    const [low] = screen.getAllByRole("slider");
    const control = low.parentElement!;
    const { left, top, width, height } = control.getBoundingClientRect();

    expect(document.elementFromPoint(left + width / 2, top + height / 2)).toBe(control);
    await pointer.click(low, { position: { x: 10 + 0.25 * (width - 20), y: height / 2 } });
    expect(low).toHaveFocus();
  });

  it("joins Carbon's switcher segments and keeps Neus' tray tiles apart", () => {
    render(
      <>
        <ThemeProvider scope="local" designSystem="carbon">
          <ToggleGroup label="Carbon">
            <Toggle value="a" label="A" />
            <Toggle value="b" label="B" />
          </ToggleGroup>
        </ThemeProvider>
        <ThemeProvider scope="local">
          <ToggleGroup label="Neus">
            <Toggle value="a" label="A" />
            <Toggle value="b" label="B" />
          </ToggleGroup>
        </ThemeProvider>
      </>,
    );
    const [carbonA, carbonB, neusA, neusB] = screen.getAllByRole("radio");

    expect(carbonB.getBoundingClientRect().left).toBe(carbonA.getBoundingClientRect().right);
    expect(getComputedStyle(carbonB).borderInlineStartWidth).toBe("1px");
    expect(neusB.getBoundingClientRect().left - neusA.getBoundingClientRect().right).toBe(4);
  });

  it("stacks a vertical toggle group", () => {
    render(
      <ThemeProvider scope="local">
        <ToggleGroup label="Align" orientation="vertical">
          <Toggle value="top" label="Top" />
          <Toggle value="bottom" label="Bottom" />
        </ToggleGroup>
      </ThemeProvider>,
    );
    const [top, bottom] = screen.getAllByRole("radio");

    expect(bottom.getBoundingClientRect().top).toBeGreaterThanOrEqual(top.getBoundingClientRect().bottom);
    expect(top.offsetWidth).toBe(bottom.offsetWidth);
  });

  it("resets a nested Neus scope inside Material", () => {
    render(
      <ThemeProvider scope="local" designSystem="material">
        <Slider label="Outer" />
        <ThemeProvider designSystem="neus">
          <Slider label="Inner" />
        </ThemeProvider>
      </ThemeProvider>,
    );
    const [outer, inner] = document.querySelectorAll<HTMLElement>(".slider__control");

    expect(outer.offsetHeight).toBe(44);
    expect(inner.offsetHeight).toBe(24);
  });

  it("drops the toggle transition under reduced motion", async () => {
    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });
      render(
        <ThemeProvider scope="local">
          <Toggle label="Bold" />
        </ThemeProvider>,
      );
      expect(getComputedStyle(screen.getByRole("button")).transitionDuration).toBe("0s");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });
});
