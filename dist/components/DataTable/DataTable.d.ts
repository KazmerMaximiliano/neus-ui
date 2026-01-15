import "./DataTable.styles.css";
import { DataTableProps } from "./DataTable.types";
declare const DataTableComponent: <T extends object>({ data, pagination, onEdit, onDelete, onInfo, onPaginationChange, columnLabels, useCardLayout, noDataTitle, noDataDescription, hiddenColumns, }: DataTableProps<T>) => import("react/jsx-runtime").JSX.Element;
export declare const DataTable: typeof DataTableComponent;
export {};
