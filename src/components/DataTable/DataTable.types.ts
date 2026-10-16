import type { ColDef, ColGroupDef } from "ag-grid-community";
import type { CSSProperties, ReactNode } from "react";

export type PaginationInfo = { current_page: number; last_page: number; per_page: number; total: number; };
export type PaginationChangeParams = { currentPage: number; pageSize: number; };
export type DataTableColDef<T extends object = object> = ColDef<T> | ColGroupDef<T>;
export type DataTableEmptyProps = {
  noDataTitle?: string;
  noDataDescription?: string;
  emptyStateStyle?: CSSProperties;
};

export type DataTableProps<T extends object = object> = DataTableEmptyProps & {
  data: T[];
  columnDefs: DataTableColDef<T>[];
  pagination: PaginationInfo;
  renderMobileCard?: (row: T) => ReactNode;
  onPaginationChange?: (params: PaginationChangeParams) => void;
  className?: string;
  style?: CSSProperties;
  paginationStyle?: CSSProperties;
};

export type DataTableSampleRow = { id: number; name: string; email: string; };
