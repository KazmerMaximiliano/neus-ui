import { createRef, useState } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DrawerContent } from "./components/DrawerContent";
import { DrawerFooter } from "./components/DrawerFooter";
import { DrawerHeader } from "./components/DrawerHeader";
import { Drawer } from "./Drawer";
import * as stories from "./Drawer.stories";
import { isOutside, tabbables } from "./Drawer.utils";

afterEach(cleanup);

const { Drawer: DrawerStory } = composeStories(stories);

const Example = ({ onClose = vi.fn() }: { onClose?: () => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Drawer
        isOpen={open}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
      >
        <DrawerHeader>Filters</DrawerHeader>
        <DrawerContent>
          <input aria-label="Search" />
        </DrawerContent>
        <DrawerFooter>
          <button onClick={() => setOpen(false)}>Done</button>
        </DrawerFooter>
      </Drawer>
    </>
  );
};

describe("Drawer", () => {
  describe("rendering", () => {
    it("keeps a closed drawer and its content out of the accessibility tree, but mounted", () => {
      const { container } = render(
        <Drawer>
          <DrawerContent>Body</DrawerContent>
        </Drawer>,
      );

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(container.querySelector(".drawer-content")).toHaveTextContent("Body");
    });

    it("opens as a modal dialog named by its header, on the end side by default", () => {
      const showModal = vi.spyOn(HTMLDialogElement.prototype, "showModal");
      render(
        <Drawer isOpen>
          <DrawerHeader>Filters</DrawerHeader>
        </Drawer>,
      );

      expect(showModal).toHaveBeenCalledOnce();
      const drawer = screen.getByRole("dialog", { name: "Filters" });
      expect(drawer).toHaveClass("drawer");
      expect(drawer).toHaveAttribute("data-side", "end");
      showModal.mockRestore();
    });

    it("takes its side, and an aria-label over the header's name", () => {
      render(
        <Drawer isOpen side="bottom" aria-label="Share" aria-labelledby="ignored">
          <DrawerHeader>Filters</DrawerHeader>
        </Drawer>,
      );

      const drawer = screen.getByRole("dialog", { name: "Share" });
      expect(drawer).toHaveAttribute("data-side", "bottom");
      expect(drawer).toHaveAttribute("aria-labelledby", "ignored");
    });

    it("renders its story", () => {
      render(<DrawerStory isOpen />);

      expect(screen.getByRole("dialog", { name: "Filters" })).toBeInTheDocument();
      expect(screen.getByRole("checkbox", { name: "In stock" })).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("restores focus to its opener after closing", async () => {
      const user = userEvent.setup();
      render(<Example />);
      const opener = screen.getByRole("button", { name: "Open" });

      await user.click(opener);
      await user.click(screen.getByRole("button", { name: "Done" }));

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(opener).toHaveFocus();
    });

    it("asks to close on Escape's cancel and on a native close, once", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Example onClose={onClose} />);

      await user.click(screen.getByRole("button", { name: "Open" }));
      fireEvent(screen.getByRole("dialog"), new Event("cancel", { cancelable: true }));
      expect(onClose).toHaveBeenCalledOnce();

      await user.click(screen.getByRole("button", { name: "Open" }));
      const dialog = screen.getByRole("dialog") as HTMLDialogElement;
      dialog.removeAttribute("open");
      fireEvent(dialog, new Event("close"));
      expect(onClose).toHaveBeenCalledTimes(2);
    });

    it("does not report its own close as a request", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Example onClose={onClose} />);

      await user.click(screen.getByRole("button", { name: "Open" }));
      await user.click(screen.getByRole("button", { name: "Done" }));

      expect(onClose).not.toHaveBeenCalled();
    });

    it("closes only when a press starts and ends on the backdrop", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Example onClose={onClose} />);
      await user.click(screen.getByRole("button", { name: "Open" }));
      const dialog = screen.getByRole("dialog");
      vi.spyOn(dialog, "getBoundingClientRect").mockReturnValue(new DOMRect(500, 0, 400, 700));

      await user.pointer({ keys: "[MouseLeft]", target: dialog, coords: { clientX: 600, clientY: 10 } });
      expect(onClose).not.toHaveBeenCalled();
      await user.pointer([
        { keys: "[MouseLeft>]", target: screen.getByRole("button", { name: "Done" }) },
        { target: dialog, coords: { clientX: 100, clientY: 10 } },
        { keys: "[/MouseLeft]" },
      ]);
      expect(onClose).not.toHaveBeenCalled();
      await user.pointer({ keys: "[MouseLeft]", target: dialog, coords: { clientX: 100, clientY: 10 } });
      expect(onClose).toHaveBeenCalledOnce();
    });

    it("wraps Tab and Shift+Tab inside the drawer", async () => {
      const user = userEvent.setup();
      render(<Example />);
      await user.click(screen.getByRole("button", { name: "Open" }));
      vi.spyOn(HTMLElement.prototype, "getClientRects").mockReturnValue([{}] as unknown as DOMRectList);
      const search = screen.getByRole("textbox", { name: "Search" });
      const done = screen.getByRole("button", { name: "Done" });

      done.focus();
      await user.tab();
      expect(search).toHaveFocus();
      await user.tab({ shift: true });
      expect(done).toHaveFocus();
      vi.restoreAllMocks();
    });

    it("lets a keydown handler that prevents the default keep Tab", async () => {
      const user = userEvent.setup();
      const onKeyDown = vi.fn((event: { preventDefault: () => void }) => event.preventDefault());
      render(
        <Drawer isOpen onKeyDown={onKeyDown}>
          <button>Only</button>
        </Drawer>,
      );
      vi.spyOn(HTMLElement.prototype, "getClientRects").mockReturnValue([{}] as unknown as DOMRectList);
      screen.getByRole("button", { name: "Only" }).focus();

      await user.tab();

      expect(onKeyDown).toHaveBeenCalled();
      vi.restoreAllMocks();
    });
  });

  describe("customization", () => {
    it("forwards classes, styles, native attributes and a dialog reference", () => {
      const ref = createRef<HTMLDialogElement>();
      render(<Drawer isOpen ref={ref} className="extra" style={{ padding: 30 }} data-testid="drawer" aria-label="Menu" />);
      const drawer = screen.getByTestId("drawer");

      expect(ref.current).toBe(drawer);
      expect(drawer).toHaveClass("drawer", "extra");
      expect(drawer).toHaveStyle({ padding: "30px" });
    });

    it("calls a ref callback and the native click and pointer handlers", async () => {
      const user = userEvent.setup();
      const ref = vi.fn();
      const onClick = vi.fn();
      const onPointerDown = vi.fn();
      render(<Drawer isOpen ref={ref} onClick={onClick} onPointerDown={onPointerDown} aria-label="Menu"><button>Go</button></Drawer>);

      await user.click(screen.getByRole("button", { name: "Go" }));

      expect(ref).toHaveBeenCalledWith(screen.getByRole("dialog"));
      expect(onClick).toHaveBeenCalledOnce();
      expect(onPointerDown).toHaveBeenCalledOnce();
    });
  });

  describe("utilities", () => {
    it("tells a point outside a box and finds the controls Tab reaches", () => {
      const box = document.createElement("div");
      box.getBoundingClientRect = () => new DOMRect(10, 10, 100, 100);
      expect(isOutside(box, 5, 50)).toBe(true);
      expect(isOutside(box, 50, 50)).toBe(false);

      box.innerHTML = '<button>A</button><button disabled>B</button><span tabindex="-1">C</span><a href="#d">D</a>';
      vi.spyOn(HTMLElement.prototype, "getClientRects").mockReturnValue([{}] as unknown as DOMRectList);
      expect(tabbables(box).map((element) => element.textContent)).toEqual(["A", "D"]);
      vi.restoreAllMocks();
    });
  });
});
