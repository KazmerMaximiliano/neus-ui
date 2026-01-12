import { ColDef, ColGroupDef } from "ag-grid-community";

export interface PaginationInfo {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginationChangeParams {
  currentPage: number;
  pageSize: number;
}

export type DataTableProps<T extends object = object> = {
  data: T[];
  pagination: PaginationInfo;
  onEdit?: (rowData: T) => void;
  onDelete?: (rowData: T) => void;
  onInfo?: (rowData: T) => void;
  onPaginationChange?: (params: PaginationChangeParams) => void;
  columnLabels?: Record<string, string>;
  useCardLayout?: boolean;
  noDataTitle?: string;
  noDataDescription?: string;
}

export type DataTableColDef = ColDef | ColGroupDef;
