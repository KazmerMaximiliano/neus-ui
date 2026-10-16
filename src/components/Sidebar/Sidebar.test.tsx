import {
  act,
  cleanup,
  fireEvent as fireCustomization,
  fireEvent,
  render,
  render as renderCustomization,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Settings as CustomizationIcon, House } from "lucide-react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider as CustomizationThemeProvider } from "../../providers";
import { Sidebar as CustomizationComponent, Sidebar } from "./Sidebar";
import { lockSidebarScroll } from "./Sidebar.utils";

const resize = (width: number) =>
  act(() => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event("resize"));
  });

Object.defineProperties(HTMLDialogElement.prototype, {
  showModal: {
    configurable: true,
    writable: true,
    value() {
      this.setAttribute("open", "");
    },
  },
  close: {
    configurable: true,
    writable: true,
    value() {
      this.removeAttribute("open");
    },
  },
});

beforeEach(() => {
  resize(1280);

  vi.spyOn(HTMLDialogElement.prototype, "showModal").mockImplementation(
    function(this: HTMLDialogElement) {
      this.setAttribute("open", "");
    },
  );
  vi.spyOn(HTMLDialogElement.prototype, "close").mockImplementation(function(
    this: HTMLDialogElement,
  ) {
    this.removeAttribute("open");
  });
  vi.stubGlobal("PointerEvent", MouseEvent);
  vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: false }));
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Sidebar navigation", () => {
  it("preserves title, icons, active and visible items with native buttons", () => {
    render(
      <Sidebar
        title="My App"
        items={[
          { label: "Home", icon: House, active: true },
          { label: "Profile" },
          { label: "Hidden", visible: false },
        ]}
      />,
    );
    expect(screen.getByText("My App")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toHaveAccessibleName(
      "Navegación principal",
    );
    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    const profile = screen.getByRole("button", { name: "Profile" });
    expect(profile).not.toHaveAttribute("aria-current");
    expect(profile.querySelector(".sidebar__button-initial")).toHaveTextContent(
      "P",
    );
    expect(profile).toHaveAttribute("type", "button");
    expect(
      screen.queryByRole("button", { name: "Hidden" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Home" }).querySelector("svg"),
    ).toHaveAttribute("aria-hidden", "true");
  });

  it("supports empty navigation, absent title and missing callbacks", async () => {
    const { rerender, container } = render(<Sidebar items={[]} />);
    expect(screen.getByRole("navigation")).toBeEmptyDOMElement();
    expect(container.querySelector(".sidebar__title")).not.toBeInTheDocument();
    rerender(<Sidebar items={[{ label: "No callback" }]} />);
    await userEvent.click(screen.getByRole("button", { name: "No callback" }));
  });

  it("executes callbacks by keyboard without submitting its parent form", async () => {
    const onClick = vi.fn();
    const onSubmit = vi.fn((event) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Sidebar items={[{ label: "Home", onClick }]} />
      </form>,
    );
    const user = userEvent.setup();
    await user.tab();
    expect(screen.getByRole("button", { name: "Home" })).toHaveFocus();
    await user.keyboard("{Enter} ");
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("applies each override to its documented element and clears them", () => {
    const { container, rerender } = render(
      <Sidebar
        title="Title"
        className="custom"
        items={[{ label: "Home", icon: House }, { label: "Other" }]}
        sidebarStyle={{ width: 290 }}
        headerStyle={{ padding: 19 }}
        titleStyle={{ letterSpacing: 3 }}
        bodyStyle={{ gap: 23 }}
        itemStyle={{ borderRadius: 7 }}
        iconStyle={{ width: 22 }}
        labelStyle={{ fontSize: 17 }}
      />,
    );
    expect(container.querySelector(".sidebar")).toHaveClass(
      "sidebar",
      "custom",
    );
    expect(container.querySelector(".sidebar")).toHaveStyle({ width: "290px" });
    expect(container.querySelector(".sidebar__header")).toHaveStyle({
      padding: "19px",
    });
    expect(container.querySelector(".sidebar__title")).toHaveStyle({
      letterSpacing: "3px",
    });
    expect(screen.getByRole("navigation")).toHaveStyle({ gap: "23px" });
    for (const item of screen.getAllByRole("button"))
      expect(item).toHaveStyle({ borderRadius: "7px" });
    for (const icon of container.querySelectorAll(".sidebar__button-icon"))
      expect(icon).toHaveStyle({ width: "22px" });
    for (const label of container.querySelectorAll(".sidebar__button-label"))
      expect(label).toHaveStyle({ fontSize: "17px" });
    rerender(<Sidebar title="Title" items={[{ label: "Home" }]} />);
    for (const element of container.querySelectorAll("[style]"))
      expect(element.getAttribute("style")).toBe("");
  });

  it("renders a deterministic desktop shell on the server", () => {
    resize(375);
    expect(renderToString(<Sidebar items={[]} />)).toContain(
      "data-viewport=\"desktop\"",
    );
  });
});

describe("Sidebar branding", () => {
  it("uses one initial avatar as the tablet expansion control without an arrow", () => {
    resize(900);
    const { container } = render(<Sidebar title="NEUS UI" items={[]} />);
    const avatar = screen.getByRole("button", { name: "Expandir navegación" });
    expect(avatar).toHaveClass("sidebar__avatar");
    expect(avatar).toHaveTextContent("N");
    expect(avatar.querySelector("svg")).not.toBeInTheDocument();
    expect(container.querySelectorAll(".sidebar__title")).toHaveLength(1);
    expect(screen.queryByText("NEUS UI")).not.toBeInTheDocument();
  });

  it.each([375, 900, 1280])(
    "accepts custom header children at %i px",
    async (width) => {
      resize(width);
      const { container, rerender } = render(
        <Sidebar title="NEUS UI" items={[]} titleStyle={{ fontWeight: 900 }}>
          <span className="custom-brand">My brand</span>
        </Sidebar>,
      );
      if (width < 768)
        await userEvent.click(
          screen.getByRole("button", { name: "Abrir menú" }),
        );
      expect(screen.getByText("My brand")).toHaveClass("custom-brand");
      expect(container.querySelector(".sidebar__title")).toHaveStyle({
        fontWeight: "900",
      });
      expect(screen.queryByText("NEUS UI")).not.toBeInTheDocument();
      if (width < 1024)
        expect(container.querySelector(".sidebar__avatar")).toContainElement(
          screen.getByText("My brand"),
        );
      rerender(<Sidebar title="NEUS UI" items={[]} />);
      expect(screen.queryByText("My brand")).not.toBeInTheDocument();
      expect(container.querySelector(".sidebar__title")).toHaveTextContent(
        width < 1024 ? "N" : "NEUS UI",
      );
    },
  );
});

describe("Sidebar tablet", () => {
  it("pins expansion, reports focus expansion and resets when leaving tablet", async () => {
    resize(768);
    const { container } = render(
      <>
        <Sidebar title="Title" items={[{ label: "Home" }]} />
        <button>Outside</button>
      </>,
    );
    const user = userEvent.setup();
    const expand = screen.getByRole("button", { name: "Expandir navegación" });
    expect(expand).toHaveAttribute("aria-expanded", "false");
    await user.click(expand);
    expect(
      screen.getByRole("button", { name: "Contraer navegación" }),
    ).toHaveAttribute("aria-expanded", "true");
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(container.querySelector(".sidebar")).toHaveAttribute(
      "data-expanded",
      "true",
    );
    await user.click(
      screen.getByRole("button", { name: "Contraer navegación" }),
    );
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(container.querySelector(".sidebar")).toHaveAttribute(
      "data-expanded",
      "false",
    );
    fireEvent.focus(screen.getByRole("button", { name: "Home" }));
    expect(expand).toHaveAttribute("aria-expanded", "true");
    fireEvent.blur(screen.getByRole("button", { name: "Home" }), {
      relatedTarget: expand,
    });
    resize(1024);
    expect(
      screen.queryByRole("button", { name: "Expandir navegación" }),
    ).not.toBeInTheDocument();
    resize(1023);
    expect(
      screen.getByRole("button", { name: "Expandir navegación" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("supports pointer hover only when the device advertises hover", () => {
    resize(900);
    vi.stubGlobal(
      "PointerEvent",
      class extends MouseEvent {
        pointerType = "mouse";
      },
    );
    const matchMedia = vi.fn().mockReturnValue({ matches: true });
    vi.stubGlobal("matchMedia", matchMedia);
    const { container } = render(<Sidebar items={[]} />);
    const sidebar = container.querySelector(".sidebar")!;
    fireEvent.pointerEnter(sidebar);
    expect(sidebar).toHaveAttribute("data-expanded", "true");
    fireEvent.pointerLeave(sidebar);
    expect(sidebar).toHaveAttribute("data-expanded", "false");
    matchMedia.mockReturnValue({ matches: false });
    fireEvent.pointerEnter(sidebar);
    expect(sidebar).toHaveAttribute("data-expanded", "false");
  });
});

describe("Sidebar mobile", () => {
  beforeEach(() => resize(767));

  it("starts closed, opens with initial focus and closes with restored focus", async () => {
    render(
      <Sidebar
        title="App"
        items={[{ label: "Home" }]}
        toggleStyle={{ borderRadius: 5 }}
        closeButtonStyle={{ width: 48 }}
      />,
    );
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    const toggle = screen.getByRole("button", { name: "Abrir menú" });
    expect(toggle).toHaveStyle({ borderRadius: "5px" });
    const user = userEvent.setup();
    await user.click(toggle);
    const close = screen.getByRole("button", { name: "Cerrar menú" });
    expect(close).toHaveFocus();
    expect(close).toHaveStyle({ width: "48px" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "id",
      toggle.getAttribute("aria-controls"),
    );
    expect(document.documentElement).toHaveClass("sidebar-scroll-locked");
    await user.click(close);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.documentElement).not.toHaveClass("sidebar-scroll-locked");
  });

  it("closes on selection, cancel and native close, supporting custom names", async () => {
    const onClick = vi.fn();
    render(
      <Sidebar
        items={[{ label: "Home", onClick }]}
        labels={{ navigation: "Routes", open: "Open", close: "Close" }}
      />,
    );
    const user = userEvent.setup();
    const toggle = screen.getByRole("button", { name: "Open" });
    await user.click(toggle);
    expect(
      screen.getByRole("navigation", { name: "Routes" }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Home" }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { cancelable: true }),
    );
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    const dialog = screen.getByRole("dialog") as HTMLDialogElement;
    dialog.removeAttribute("open");
    fireEvent(dialog, new Event("close"));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes only when a pointer starts and finishes on the backdrop", async () => {
    render(<Sidebar items={[{ label: "Home" }]} />);
    await userEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
    const dialog = screen.getByRole("dialog");
    vi.spyOn(dialog, "getBoundingClientRect").mockReturnValue(
      new DOMRect(0, 0, 320, 700),
    );
    fireEvent.pointerDown(dialog, { clientX: 10, clientY: 10 });
    fireEvent.click(dialog, { clientX: 10, clientY: 10 });
    expect(dialog).toHaveAttribute("open");
    fireEvent.pointerDown(screen.getByRole("button", { name: "Home" }));
    fireEvent.click(dialog, { clientX: 400, clientY: 10 });
    expect(dialog).toHaveAttribute("open");
    fireEvent.pointerDown(dialog, { clientX: 400, clientY: 10 });
    fireEvent.click(dialog, { clientX: 400, clientY: 10 });
    expect(dialog).not.toHaveAttribute("open");
  });

  it("releases modal state on resize and unmount without changing existing scroll styles", async () => {
    document.body.style.overflow = "scroll";
    const { unmount } = render(<Sidebar items={[]} />);
    await userEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
    resize(768);
    expect(document.documentElement).not.toHaveClass("sidebar-scroll-locked");
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    resize(375);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
    unmount();
    expect(document.documentElement).not.toHaveClass("sidebar-scroll-locked");
    expect(document.body.style.overflow).toBe("scroll");
    document.body.style.overflow = "";
  });

  it("does not unlock scrolling while another owner still holds the lock", () => {
    const first = lockSidebarScroll(document);
    const second = lockSidebarScroll(document);
    first();
    expect(document.documentElement).toHaveClass("sidebar-scroll-locked");
    second();
    expect(document.documentElement).not.toHaveClass("sidebar-scroll-locked");
    document.documentElement.classList.add("sidebar-scroll-locked");
    lockSidebarScroll(document)();
    expect(document.documentElement).toHaveClass("sidebar-scroll-locked");
    document.documentElement.classList.remove("sidebar-scroll-locked");
  });
});

describe("Sidebar part customization", () => {
  it.each([
    {
      cls: "closeIconClassName",
      sty: "closeIconStyle",
      base: "sidebar__close-icon",
      phase: "mobile",
    },
    {
      cls: "toggleIconClassName",
      sty: "toggleIconStyle",
      base: "sidebar__toggle-icon",
      phase: "mobile",
    },
    {
      cls: "toggleClassName",
      sty: "toggleStyle",
      base: "sidebar__toggle",
      phase: "mobile",
    },

    {
      cls: "titleClassName",
      sty: "titleStyle",
      base: "sidebar__title",
      phase: "default",
    },
    {
      cls: "panelClassName",
      sty: "panelStyle",
      base: "sidebar__panel",
      phase: "default",
    },
    {
      cls: "headerClassName",
      sty: "headerStyle",
      base: "sidebar__header",
      phase: "default",
    },
    {
      cls: "headerInnerClassName",
      sty: "headerInnerStyle",
      base: "sidebar__header-inner",
      phase: "default",
    },
    {
      cls: "avatarClassName",
      sty: "avatarStyle",
      base: "sidebar__avatar",
      phase: "mobile",
    },
    {
      cls: "closeButtonClassName",
      sty: "closeButtonStyle",
      base: "sidebar__close",
      phase: "mobile",
    },
    {
      cls: "toggleClassName",
      sty: "toggleStyle",
      base: "sidebar__expand",
      phase: "tablet",
    },
    {
      cls: "bodyClassName",
      sty: "bodyStyle",
      base: "sidebar__body",
      phase: "default",
    },
    {
      cls: "itemClassName",
      sty: "itemStyle",
      base: "sidebar__button",
      phase: "default",
    },
    {
      cls: "iconClassName",
      sty: "iconStyle",
      base: "sidebar__button-icon",
      phase: "default",
    },
    {
      cls: "labelClassName",
      sty: "labelStyle",
      base: "sidebar__button-label",
      phase: "default",
    },
    {
      cls: "className",
      sty: "sidebarStyle",
      base: "sidebar",
      phase: "default",
    },
    {
      cls: "toggleClassName",
      sty: "toggleStyle",
      base: "sidebar__expand",
      phase: "tablet",
    },
    {
      cls: "dialogClassName",
      sty: "dialogStyle",
      base: "sidebar__dialog",
      phase: "mobile",
    },
  ])(
    "applies and removes $cls / $sty ($phase) while preserving base classes",
    async ({ cls, sty, base, phase }) => {
      resize(phase === "mobile" ? 375 : phase === "tablet" ? 900 : 1280);
      const overrides = {
        [cls]: "consumer-part",
        [sty]: { outlineOffset: "7px" },
      };
      const view = renderCustomization(
        <CustomizationThemeProvider scope="local">
          <CustomizationComponent
            title="Workspace"
            items={[
              { label: "Home", icon: CustomizationIcon, active: true },
              { label: "Settings" },
            ]}
            {...overrides}
          />
        </CustomizationThemeProvider>,
      );
      if (phase === "mobile")
        fireCustomization.click(
          view.container.querySelector(".sidebar__toggle")!,
        );
      const targets = view.container.querySelectorAll(".consumer-part");
      expect(targets.length).toBeGreaterThan(0);
      for (const target of targets) {
        expect(target).toHaveClass(base);
        expect(target).toHaveStyle({ outlineOffset: "7px" });
      }
      view.rerender(
        <CustomizationThemeProvider scope="local">
          <CustomizationComponent
            title="Workspace"
            items={[
              { label: "Home", icon: CustomizationIcon, active: true },
              { label: "Settings" },
            ]}
          />
        </CustomizationThemeProvider>,
      );
      expect(view.container.querySelector(".consumer-part")).toBeNull();
      for (const target of view.container.querySelectorAll("." + base)) {
        expect((target as HTMLElement).style.outlineOffset).not.toBe("7px");
      }
    },
  );
});
