import type { ComponentPropsWithRef, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { Responsive } from "../../utils/resolveResponsive";

/** grid: plain blocks; list: one row per item, title beside text; cards: each item a Card. */
export type FeatureListVariant = "grid" | "list" | "cards";

export type FeatureListProps = Omit<ComponentPropsWithRef<"ul">, "children"> & {
  /** FeatureItem elements. */
  children: ReactNode;
  variant?: FeatureListVariant;
  /** Columns of grid and cards; default 1, 2 from 768px and 3 from 1024px. */
  columns?: Responsive<number>;
};

export type FeatureListStoryArgs = FeatureListProps & { designSystem: DesignSystemId };
