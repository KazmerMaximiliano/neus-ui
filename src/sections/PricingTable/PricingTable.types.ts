import type { ComponentPropsWithRef, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { Responsive } from "../../utils/resolveResponsive";

export type PricingTableProps = Omit<ComponentPropsWithRef<"ul">, "children"> & {
  /** PricingCard elements, one per plan. */
  readonly children: ReactNode;
  /** Columns; default 1, 2 from 768px and 3 from 1024px. */
  readonly columns?: Responsive<number>;
};

export type PricingTableStoryArgs = PricingTableProps & { readonly designSystem: DesignSystemId };
