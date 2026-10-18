import type { ComponentPropsWithRef } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { Responsive } from "../../utils/resolveResponsive";

/** Steps of the `--space-*` scale; 0 removes the gap. */
export type SpaceStep = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16;
export type StackElement = "div" | "ul" | "ol" | "section" | "nav" | "header" | "footer" | "article" | "aside" | "form";
export type StackDirection = "column" | "row";
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify = "start" | "center" | "end" | "between";

export type StackProps<C extends StackElement = "div"> = ComponentPropsWithRef<NoInfer<C>> & {
  as?: C;
  /** Main axis; per breakpoint with `{ base, md, lg }` (768px and 1024px). */
  direction?: Responsive<StackDirection>;
  gap?: Responsive<SpaceStep>;
  /** Cross-axis alignment of the children. */
  align?: StackAlign;
  /** Main-axis distribution of the children. */
  justify?: StackJustify;
  wrap?: boolean;
};

export type StackStoryArgs = Omit<StackProps, "as"> & { as: StackElement; designSystem: DesignSystemId };
