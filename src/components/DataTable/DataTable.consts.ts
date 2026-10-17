import {
  CellStyleModule,
  ClientSideRowModelModule,
  DateFilterModule,
  NumberFilterModule,
  TextFilterModule,
  themeQuartz,
} from "ag-grid-community";

/**
 * Only the AG Grid modules DataTable's own options need. Projects whose
 * columnDefs use other grid features register those modules themselves.
 */
export const DATA_TABLE_GRID_MODULES = [
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CellStyleModule,
];

export const DATA_TABLE_THEME = themeQuartz.withParams({
  accentColor: "var(--data-table-accent)",
  backgroundColor: "var(--data-table-background)",
  foregroundColor: "var(--data-table-color)",
  headerBackgroundColor: "var(--data-table-header-background)",
  headerTextColor: "var(--data-table-header-color)",
  borderColor: "var(--data-table-border-color)",
  rowHoverColor: "var(--data-table-hover-background)",
  selectedRowBackgroundColor: "var(--data-table-selection-background)",
  fontFamily: "var(--data-table-font-family)",
  fontSize: "var(--data-table-font-size)",
  headerFontSize: "var(--data-table-header-font-size)",
  spacing: "var(--data-table-spacing)",
  borderRadius: "var(--data-table-control-radius)",
  wrapperBorderRadius: "var(--data-table-radius)",
  rowHeight: "var(--data-table-row-height)",
  headerHeight: "var(--data-table-header-height)",
  browserColorScheme: "var(--theme-color-scheme)",
  popupShadow: "var(--overlay-shadow)",
});
