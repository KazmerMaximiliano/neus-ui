import type { DesignSystemId } from "../src/design-systems";

/** Preview-only controls; these are never part of a component's public API. */
export type DesignSystemPreviewArgs = {
  designSystem: DesignSystemId | "global";
};
