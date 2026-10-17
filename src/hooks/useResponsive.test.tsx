import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useResponsive } from "./useResponsive";

const Probe = () => <span>{useResponsive().isMobile ? "mobile" : "desktop"}</span>;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useResponsive", () => {
  it("hydrates server HTML on a phone without a mismatch, then reports mobile", async () => {
    vi.stubGlobal("innerWidth", 390);
    const container = document.createElement("div");
    container.innerHTML = renderToString(<Probe />);
    expect(container.textContent).toBe("desktop");
    const onRecoverableError = vi.fn();

    await act(async () => {
      hydrateRoot(container, <Probe />, { onRecoverableError });
    });

    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(container.textContent).toBe("mobile");
  });

  it("follows window resizes", async () => {
    vi.stubGlobal("innerWidth", 1280);
    const container = document.createElement("div");
    container.innerHTML = renderToString(<Probe />);
    await act(async () => {
      hydrateRoot(container, <Probe />);
    });
    await act(async () => {
      vi.stubGlobal("innerWidth", 600);
      window.dispatchEvent(new Event("resize"));
    });
    expect(container.textContent).toBe("mobile");
  });
});
