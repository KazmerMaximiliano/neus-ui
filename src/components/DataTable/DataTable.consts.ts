import { themeQuartz } from "ag-grid-community";

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
