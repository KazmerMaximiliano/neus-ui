import { cdp } from "vitest/browser";
import type {} from "@vitest/browser-playwright";

// Forces :hover or :active through DevTools: a synthetic press does not set :active in headless Chromium.
export const forceState = async (element: HTMLElement, pseudoClasses: string[]) => {
  element.setAttribute("data-force-state", "target");
  const session = cdp();
  await session.send("DOM.enable");
  await session.send("CSS.enable");
  const { root } = await session.send("DOM.getDocument", {
    depth: -1,
    pierce: true,
  });
  const find = (node: typeof root): number | undefined => {
    if (
      node.attributes?.some(
        (value, index, attributes) =>
          value === "data-force-state" && attributes[index + 1] === "target",
      )
    )
      return node.nodeId;
    for (const child of [
      ...(node.children ?? []),
      ...(node.shadowRoots ?? []),
      ...(node.contentDocument ? [node.contentDocument] : []),
    ]) {
      const id = find(child);
      if (id !== undefined) return id;
    }
  };
  const nodeId = find(root);
  if (nodeId === undefined)
    throw new Error("Browser state target was not found");
  await session.send("CSS.forcePseudoState", {
    nodeId,
    forcedPseudoClasses: pseudoClasses,
  });
  element.removeAttribute("data-force-state");
};
