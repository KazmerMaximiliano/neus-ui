import type { ComponentPropsWithRef } from "react";
import type { DesignSystemId } from "../../design-systems";

export type SeparatorOrientation = "horizontal" | "vertical";

/** Native attributes (id, data-*…) and the ref land on the line. */
export type SeparatorProps = Omit<ComponentPropsWithRef<"div">, "children" | "role" | "dangerouslySetInnerHTML"> & {
  readonly orientation?: SeparatorOrientation;
  /** Hides the line from assistive technology when it only decorates. */
  readonly decorative?: boolean;
};

export type SeparatorStoryArgs = SeparatorProps & {
  readonly designSystem: DesignSystemId;
};
