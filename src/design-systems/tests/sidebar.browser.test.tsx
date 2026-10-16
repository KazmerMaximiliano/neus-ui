import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import type {} from "@vitest/browser-playwright";
import { House } from "lucide-react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cdp, page, userEvent } from "vitest/browser";
import { Sidebar } from "../../components/Sidebar";
import "../../components/Sidebar/Sidebar.stories.css";
import "../../css/app.css";
import {
  contrastRatio,
  flatten,
  resolveColor,
} from "./design-systems.test-utils";
import { ThemeProvider } from "../../providers";
import { AppTemplate } from "../../templates/AppTemplate/AppTemplate";

const ITEMS = [
  { label: "Home", icon: House, active: true },
  { label: "Settings" },
];
const SYSTEMS = [
  { id: "neus", radius: "33px", border: "0px" },
  { id: "apple", radius: "10px", border: "1px" },
  { id: "carbon", radius: "0px", border: "1px" },
  { id: "material", radius: "28px", border: "0px" },
  { id: "neobrutalism", radius: "4px", border: "3px" },
  { id: "vercel", radius: "6px", border: "1px" },
] as const;

beforeEach(async () => {
  await page.viewport(1280, 800);
});

afterEach(async () => {
  cleanup();
  await userEvent.cleanup();
  await cdp().send("Emulation.setEmulatedMedia", { features: [] });
});

describe.each(["light", "dark"] as const)("Sidebar designs in %s", (scheme) => {
  it.each(SYSTEMS)(
    "renders $id tokens, surfaces, decoration and states",
    async (system) => {
      const { container } = render(
        <ThemeProvider
          scope="local"
          designSystem={system.id}
          colorScheme={scheme}
        >
          <Sidebar title="Navigation" items={ITEMS} />
        </ThemeProvider>,
      );
      const sidebar = container.querySelector(".sidebar")!;
      const nav = screen.getByRole("navigation");
      const header = container.querySelector(".sidebar__header")!;
      const home = screen.getByRole("button", { name: "Home" });
      const expectedToken =
        system.id === "neus"
          ? "--color-primary"
          : ["carbon", "material"].includes(system.id)
            ? "--color-surface-secondary"
            : "--color-surface";
      expect(getComputedStyle(nav).backgroundColor).toBe(
        resolveColor(nav, expectedToken),
      );
      expect(getComputedStyle(sidebar).width).toBe("250px");
      expect(getComputedStyle(home).borderRadius).toBe(system.radius);
      expect(
        getComputedStyle(container.querySelector(".sidebar__panel")!)
          .borderTopWidth,
      ).toBe(system.border);
      expect(getComputedStyle(header, "::after").display).toBe(
        system.id === "neus" ? "block" : "none",
      );
      expect(getComputedStyle(nav).borderTopRightRadius).toBe(
        system.id === "neus" ? "32px" : "0px",
      );
      expect(home).toHaveAttribute("aria-current", "page");
      if (system.id === "neobrutalism") {
        expect(getComputedStyle(home).color).toBe(
          resolveColor(home, "--color-text-on-primary"),
        );
        expect(getComputedStyle(home).backgroundColor).toBe(
          resolveColor(home, "--color-primary"),
        );
      }
      const settings = screen.getByRole("button", { name: "Settings" });
      await userEvent.hover(settings);
      await waitFor(() =>
        expect(getComputedStyle(settings).backgroundColor).not.toBe(
          "rgba(0, 0, 0, 0)",
        ),
      );
      await userEvent.tab();
      expect(home).toHaveFocus();
      expect(getComputedStyle(home).outlineStyle).toBe("solid");
      // Current location and keyboard focus stay legible together.
      const navBackground = getComputedStyle(nav).backgroundColor;
      const active = getComputedStyle(home);
      expect(
        contrastRatio(
          active.color,
          flatten(active.backgroundColor, navBackground),
        ),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(active.outlineColor, navBackground),
      ).toBeGreaterThanOrEqual(3);
      if (import.meta.env.VITE_SIDEBAR_VISUAL_QA === "true") {
        await page.screenshot({
          path: `__screenshots__/sidebar-${system.id}-${scheme}.png`,
        });
      }
    },
  );
});

describe("Sidebar theme boundaries and transparent curves", () => {
  it("resets decoration and geometry in nested and sibling scopes and updates designs", () => {
    const { container, rerender } = render(
      <>
        <ThemeProvider
          scope="local"
          designSystem="neobrutalism"
          colorScheme="dark"
        >
          <Sidebar title="Outer" items={[]} />
          <ThemeProvider designSystem="neus" colorScheme="light">
            <Sidebar title="Inner" items={[]} />
          </ThemeProvider>
        </ThemeProvider>
        <ThemeProvider scope="local" designSystem="vercel">
          <Sidebar title="Sibling" items={[]} />
        </ThemeProvider>
      </>,
    );
    const headers = container.querySelectorAll(".sidebar__header");
    expect(getComputedStyle(headers[0], "::after").display).toBe("none");
    expect(getComputedStyle(headers[1], "::after").display).toBe("block");
    expect(getComputedStyle(headers[2], "::after").display).toBe("none");
    const panels = container.querySelectorAll(".sidebar__panel");
    expect(getComputedStyle(panels[0]).borderTopWidth).toBe("3px");
    expect(getComputedStyle(panels[1]).borderTopWidth).toBe("0px");
    expect(getComputedStyle(panels[2]).borderTopWidth).toBe("1px");
    rerender(
      <ThemeProvider scope="local" designSystem="carbon" colorScheme="dark">
        <Sidebar title="Inner" items={ITEMS} />
      </ThemeProvider>,
    );
    expect(
      getComputedStyle(container.querySelector(".sidebar__header")!, "::after")
        .display,
    ).toBe("none");
    expect(
      getComputedStyle(screen.getByRole("navigation")).backgroundColor,
    ).toBe("rgb(38, 38, 38)");
    rerender(
      <ThemeProvider scope="local" designSystem="neus" colorScheme="light">
        <Sidebar title="Inner" items={ITEMS} />
      </ThemeProvider>,
    );
    expect(
      getComputedStyle(container.querySelector(".sidebar__header")!, "::after")
        .display,
    ).toBe("block");
  });

  it.each(["solid", "gradient", "image"])(
    "keeps genuine transparent cutouts on a %s background and shared custom surface",
    async (background) => {
      const { container, rerender } = render(
        <ThemeProvider scope="local">
          <style>
            {
              ".custom-sidebar { --sidebar-background: rgb(5, 98, 73); --sidebar-concave-radius: 40px; --sidebar-convex-radius: 40px; }"
            }
          </style>
          <div className={`sidebar-story sidebar-story--${background}`}>
            <Sidebar
              title="Custom surface"
              items={ITEMS}
              className="custom-sidebar"
              headerStyle={{ height: 100 }}
            />
          </div>
        </ThemeProvider>,
      );
      const header = container.querySelector(".sidebar__header")!;
      expect(getComputedStyle(header).backgroundColor).toBe("rgba(0, 0, 0, 0)");
      expect(getComputedStyle(header, "::after").maskImage).toContain(
        "radial-gradient",
      );
      expect(getComputedStyle(header, "::after").width).toBe("40px");
      expect(getComputedStyle(header, "::after").backgroundColor).toBe(
        "rgb(5, 98, 73)",
      );
      expect(
        getComputedStyle(screen.getByRole("navigation")).backgroundColor,
      ).toBe("rgb(5, 98, 73)");
      expect(getComputedStyle(header).maskImage).toBe("none");
      if (import.meta.env.VITE_SIDEBAR_VISUAL_QA === "true") {
        await page.screenshot({
          path: `__screenshots__/sidebar-background-${background}.png`,
        });
      }
      rerender(
        <ThemeProvider scope="local">
          <Sidebar items={ITEMS} />
        </ThemeProvider>,
      );
      expect(
        getComputedStyle(screen.getByRole("navigation")).backgroundColor,
      ).toBe("rgb(40, 53, 147)");
    },
  );

  it("honors part overrides and reduced motion without clipping focus outlines", async () => {
    await cdp().send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }],
    });
    const { container, rerender } = render(
      <ThemeProvider scope="local">
        <Sidebar
          title="Title"
          items={ITEMS}
          headerStyle={{ padding: 23 }}
          bodyStyle={{ gap: 21 }}
          titleStyle={{ fontSize: 20 }}
          itemStyle={{ borderRadius: 9 }}
          iconStyle={{ width: 24 }}
          labelStyle={{ fontSize: 16 }}
        />
      </ThemeProvider>,
    );
    expect(
      getComputedStyle(container.querySelector(".sidebar")!).transitionDuration,
    ).toBe("0s");
    expect(
      getComputedStyle(container.querySelector(".sidebar__header")!).padding,
    ).toBe("23px");
    expect(getComputedStyle(screen.getByRole("navigation")).gap).toBe("21px");
    expect(
      getComputedStyle(screen.getByRole("button", { name: "Home" }))
        .borderRadius,
    ).toBe("9px");
    expect(
      getComputedStyle(container.querySelector(".sidebar__button-icon")!).width,
    ).toBe("24px");
    expect(
      getComputedStyle(container.querySelector(".sidebar__button-label")!)
        .fontSize,
    ).toBe("16px");
    rerender(
      <ThemeProvider scope="local">
        <Sidebar items={ITEMS} />
      </ThemeProvider>,
    );
    expect(getComputedStyle(screen.getByRole("navigation")).gap).toBe("16px");
  });
});

describe("Sidebar responsive integration", () => {
  it("hides the mobile opener behind the transparent brand header and restores it on close", async () => {
    await page.viewport(375, 800);
    const { container } = render(
      <ThemeProvider scope="local">
        <Sidebar title="NEUS UI" items={ITEMS} />
      </ThemeProvider>,
    );
    const toggle = screen.getByRole("button", { name: "Abrir menú" });
    expect(getComputedStyle(toggle).visibility).toBe("visible");
    await userEvent.click(toggle);
    expect(getComputedStyle(toggle).visibility).toBe("hidden");
    const avatar = container.querySelector(".sidebar__avatar")!;
    expect(getComputedStyle(avatar).borderTopWidth).toBe("0px");
    expect(getComputedStyle(avatar).boxShadow).toBe("none");
    expect(
      getComputedStyle(container.querySelector(".sidebar__header")!)
        .backgroundColor,
    ).toBe("rgba(0, 0, 0, 0)");
    if (import.meta.env.VITE_SIDEBAR_VISUAL_QA === "true") {
      await page.screenshot({
        path: "__screenshots__/sidebar-mobile-clean-avatar.png",
      });
    }
    await userEvent.click(screen.getByRole("button", { name: "Cerrar menú" }));
    expect(getComputedStyle(toggle).visibility).toBe("visible");
    expect(toggle).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(toggle).toHaveFocus();
    expect(getComputedStyle(toggle).visibility).toBe("visible");
  });
  it("accepts custom branding through children while the avatar remains keyboard operable", async () => {
    await page.viewport(900, 800);
    const { container } = render(
      <ThemeProvider scope="local">
        <Sidebar title="App" items={ITEMS}>
          <span className="brand-mark">AC</span>
        </Sidebar>
      </ThemeProvider>,
    );
    const avatar = screen.getByRole("button", { name: "Expandir navegación" });
    expect(avatar.querySelector(".brand-mark")).toHaveTextContent("AC");
    await userEvent.tab();
    expect(avatar).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(
      screen.getByRole("button", { name: "Contraer navegación" }),
    ).toBeInTheDocument();
    await page.viewport(375, 800);
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Abrir menú" }),
      ).toBeInTheDocument(),
    );
    await userEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
    const brand = screen.getByText("AC");
    expect(container.querySelector(".sidebar__avatar")).toContainElement(brand);
    expect(container.querySelector(".sidebar__avatar")!.tagName).toBe("DIV");
    expect(screen.getByRole("button", { name: "Cerrar menú" })).toHaveFocus();
  });
  it.each([767, 768, 1023, 1024])(
    "matches AppTemplate layout at %i px",
    async (width) => {
      await page.viewport(width, 800);
      const { container } = render(
        <ThemeProvider scope="local">
          <AppTemplate routes={ITEMS} menu={<button>Account</button>}>
            <h1>Content</h1>
          </AppTemplate>
        </ThemeProvider>,
      );
      const app = container.querySelector(".app-template")!;
      await userEvent.hover(screen.getByRole("button", { name: "Account" }));
      const expectedWidth =
        width < 768 ? "0px" : width < 1024 ? "100px" : "250px";
      await waitFor(() =>
        expect(getComputedStyle(app).marginLeft).toBe(expectedWidth),
      );
      if (width < 768) {
        expect(
          screen.getAllByRole("button", { name: "Abrir menú" }),
        ).toHaveLength(1);
        expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
      } else {
        expect(screen.getByRole("navigation")).toBeInTheDocument();
        expect(
          getComputedStyle(container.querySelector(".sidebar")!).width,
        ).toBe(expectedWidth);
        expect(
          getComputedStyle(container.querySelector(".sidebar__button-label")!)
            .display,
        ).toBe(width < 1024 ? "none" : "block");
      }
    },
  );

  it("expands the tablet rail on hover, keyboard focus and explicit touch control", async () => {
    await page.viewport(900, 800);
    const { container } = render(
      <ThemeProvider scope="local">
        <AppTemplate routes={ITEMS} menu={<button>Outside</button>}>
          <p>Content</p>
        </AppTemplate>
      </ThemeProvider>,
    );
    const sidebar = container.querySelector(".sidebar")!;
    const app = container.querySelector(".app-template")!;
    const avatar = screen.getByRole("button", { name: "Expandir navegación" });
    expect(avatar).toHaveTextContent("N");
    expect(avatar.querySelector("svg")).toBeNull();
    expect(getComputedStyle(avatar).borderRadius).toBe("50%");
    expect(avatar.getBoundingClientRect().width).toBe(44);
    expect(container.querySelectorAll(".sidebar__title")).toHaveLength(1);
    await userEvent.hover(screen.getByRole("button", { name: "Home" }));
    await waitFor(() => expect(getComputedStyle(sidebar).width).toBe("250px"));
    expect(
      screen.getByRole("button", { name: "Expandir navegación" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      getComputedStyle(container.querySelector(".sidebar__button-label")!)
        .display,
    ).not.toBe("none");
    if (import.meta.env.VITE_SIDEBAR_VISUAL_QA === "true") {
      await page.screenshot({
        path: "__screenshots__/sidebar-tablet-expanded.png",
      });
    }
    await userEvent.hover(screen.getByRole("button", { name: "Outside" }));
    await waitFor(() => expect(getComputedStyle(sidebar).width).toBe("100px"));
    if (import.meta.env.VITE_SIDEBAR_VISUAL_QA === "true") {
      await page.screenshot({
        path: "__screenshots__/sidebar-tablet-compact.png",
      });
    }
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Outside" })).toHaveFocus();
    await userEvent.tab();
    await waitFor(() => expect(getComputedStyle(sidebar).width).toBe("250px"));
    fireEvent.blur(document.activeElement!, { relatedTarget: document.body });
    (document.activeElement as HTMLElement).blur();
    fireEvent.pointerEnter(sidebar, { pointerType: "touch" });
    expect(sidebar).toHaveAttribute("data-expanded", "false");
    await userEvent.click(
      screen.getByRole("button", { name: "Expandir navegación" }),
    );
    await userEvent.click(screen.getByRole("button", { name: "Outside" }));
    await waitFor(() => expect(getComputedStyle(app).marginLeft).toBe("250px"));
    await userEvent.click(
      screen.getByRole("button", { name: "Contraer navegación" }),
    );
    await userEvent.click(screen.getByRole("button", { name: "Outside" }));
    await waitFor(() => expect(getComputedStyle(app).marginLeft).toBe("100px"));
  });

  it("uses native mobile modality, contains focus, restores focus and closes on all paths", async () => {
    await page.viewport(767, 800);
    const onClick = vi.fn();
    const { container } = render(
      <ThemeProvider scope="local" designSystem="carbon" colorScheme="dark">
        <Sidebar title="Mobile" items={[{ label: "Home", onClick }]} />
        <button>Outside</button>
      </ThemeProvider>,
    );
    const toggle = screen.getByRole("button", { name: "Abrir menú" });
    await userEvent.click(toggle);
    const dialog = screen.getByRole("dialog") as HTMLDialogElement;
    expect(dialog.matches(":modal")).toBe(true);
    expect(dialog.closest('[data-design-system="carbon"]')).not.toBeNull();
    expect(
      getComputedStyle(screen.getByRole("navigation")).backgroundColor,
    ).toBe("rgb(38, 38, 38)");
    expect(screen.getByRole("button", { name: "Cerrar menú" })).toHaveFocus();
    expect(getComputedStyle(document.documentElement).overflow).toBe("hidden");
    await userEvent.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Home" })).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Cerrar menú" })).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Home" })).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Outside" })).not.toHaveFocus();
    await userEvent.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
    expect(document.documentElement).not.toHaveClass("sidebar-scroll-locked");
    await userEvent.click(toggle);
    await userEvent.click(screen.getByRole("button", { name: "Home" }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(toggle).toHaveFocus();
    await userEvent.click(toggle);
    await userEvent.click(screen.getByRole("dialog"), {
      position: { x: 400, y: 30 },
      force: true,
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await userEvent.click(toggle);
    await userEvent.click(screen.getByRole("button", { name: "Cerrar menú" }));
    expect(toggle).toHaveFocus();
    expect(container.querySelectorAll("nav")).toHaveLength(1);
    if (import.meta.env.VITE_SIDEBAR_VISUAL_QA === "true") {
      await userEvent.click(toggle);
      await page.screenshot({ path: "__screenshots__/sidebar-mobile.png" });
    }
  });

  it("resets mobile and pinned state across viewport changes and supports a scrollable narrow drawer", async () => {
    await page.viewport(375, 600);
    const { container, unmount } = render(
      <ThemeProvider scope="local">
        <Sidebar
          items={Array.from({ length: 30 }, (_, i) => ({
            label: `Route ${i}`,
          }))}
        />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
    const nav = screen.getByRole("navigation");
    const dialog = screen.getByRole("dialog");
    expect(dialog.getBoundingClientRect().width).toBe(320);
    expect(nav.scrollHeight).toBeGreaterThan(nav.clientHeight);
    await page.viewport(280, 600);
    await waitFor(() => expect(dialog.getBoundingClientRect().width).toBe(264));
    await page.viewport(768, 600);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(document.documentElement).not.toHaveClass("sidebar-scroll-locked");
    await userEvent.click(
      screen.getByRole("button", { name: "Expandir navegación" }),
    );
    await page.viewport(1024, 600);
    await waitFor(() =>
      expect(container.querySelector(".sidebar")).toHaveAttribute(
        "data-viewport",
        "desktop",
      ),
    );
    await page.viewport(1023, 600);
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Expandir navegación" }),
      ).toBeInTheDocument(),
    );
    await page.viewport(767, 600);
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Abrir menú" }),
      ).toHaveAttribute("aria-expanded", "false"),
    );
    expect(container.querySelectorAll("nav")).toHaveLength(1);
    await userEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
    unmount();
    expect(document.documentElement).not.toHaveClass("sidebar-scroll-locked");
  });
});
