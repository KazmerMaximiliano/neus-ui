import type { ColDef, ColGroupDef } from "ag-grid-community";
import type { CSSProperties, ReactNode } from "react";

export type PaginationInfo = { readonly current_page: number; readonly last_page: number; readonly per_page: number; readonly total: number; };
export type PaginationChangeParams = { currentPage: number; pageSize: number; };
export type DataTableColDef<T extends object = object> = ColDef<T> | ColGroupDef<T>;
export type DataTableEmptyProps = {
  readonly emptyStateClassName?: string;
  readonly noRowsDescriptionClassName?: string;
  readonly noRowsDescriptionStyle?: CSSProperties;
  readonly noRowsTitleClassName?: string;
  readonly noRowsTitleStyle?: CSSProperties;
  readonly noDataTitle?: string;
  readonly noDataDescription?: string;
  readonly emptyStateStyle?: CSSProperties;
};

export type DataTableProps<T extends object = object> = DataTableEmptyProps & {
  readonly cardClassName?: string;
  readonly cardStyle?: CSSProperties;
  readonly cardsClassName?: string;
  readonly cardsStyle?: CSSProperties;
  readonly gridClassName?: string;
  readonly gridStyle?: CSSProperties;
  readonly paginationClassName?: string;
  readonly paginationInfoClassName?: string;
  readonly paginationInfoStyle?: CSSProperties;
  readonly data: readonly T[];
  readonly columnDefs: readonly DataTableColDef<T>[];
  readonly pagination: PaginationInfo;
  readonly renderMobileCard?: (row: T) => ReactNode;
  readonly onPaginationChange?: (params: PaginationChangeParams) => void;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly paginationStyle?: CSSProperties;
};

export type DataTableSampleRow = { id: number; name: string; email: string; };
