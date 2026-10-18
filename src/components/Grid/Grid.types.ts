import type { ComponentPropsWithRef } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { Responsive } from "../../utils/resolveResponsive";
import type { SpaceStep } from "../Stack/Stack.types";

export type GridElement = "div" | "ul" | "ol" | "section";

export type GridProps<C extends GridElement = "div"> = ComponentPropsWithRef<NoInfer<C>> & {
  as?: C;
  /** Equal columns; per breakpoint with `{ base, md, lg }` (768px and 1024px). */
  columns?: Responsive<number>;
  /** Fits as many columns of at least this width as the row allows, ignoring `columns`. */
  minItemWidth?: string;
  gap?: Responsive<SpaceStep>;
};

export type GridStoryArgs = Omit<GridProps, "as"> & { as: GridElement; designSystem: DesignSystemId };
