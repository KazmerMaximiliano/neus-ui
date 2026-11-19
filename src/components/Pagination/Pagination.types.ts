import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type PaginationVariant = "pages" | "compact";

export type PaginationLabels = {
  /** Accessible name of the navigation landmark. */
  readonly navigation?: string;
  readonly previous?: string;
  readonly next?: string;
  /** Accessible name of a page button. */
  readonly page?: (page: number) => string;
  /** Label of the page-size select. */
  readonly pageSize?: string;
};

export type PaginationProps = Omit<ComponentPropsWithRef<"nav">, "children" | "onChange"> & {
  /** The current page, from 1. */
  readonly page: number;
  readonly totalPages: number;
  readonly onChange?: (page: number) => void;
  /** Pages shown on each side of the current one before an ellipsis. */
  readonly siblingCount?: number;
  /** Page buttons, or only previous and next around "page / total". */
  readonly variant?: PaginationVariant;
  /** With pageSizeOptions, a select that changes how many items a page holds. */
  readonly pageSize?: number;
  readonly pageSizeOptions?: readonly number[];
  readonly onPageSizeChange?: (pageSize: number) => void;
  readonly labels?: PaginationLabels;
  readonly listClassName?: string;
  readonly listStyle?: CSSProperties;
  readonly pageClassName?: string;
  readonly pageStyle?: CSSProperties;
  readonly ellipsisClassName?: string;
  readonly ellipsisStyle?: CSSProperties;
  readonly infoClassName?: string;
  readonly infoStyle?: CSSProperties;
  readonly pageSizeClassName?: string;
  readonly pageSizeStyle?: CSSProperties;
};

export type PaginationItem = number | "start-ellipsis" | "end-ellipsis";

export type PaginationStoryArgs = PaginationProps & {
  readonly designSystem: DesignSystemId;
};
