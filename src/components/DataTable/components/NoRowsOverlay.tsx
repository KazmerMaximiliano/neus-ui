import type { DataTableEmptyProps } from "../DataTable.types";

export const NoRowsOverlay = ({
  noDataTitle = "No data to show",
  noDataDescription = "No records found matching the search criteria",
  emptyStateStyle,
}: DataTableEmptyProps) => (
  <div className="data-table__no-rows" role="status" style={emptyStateStyle}>
    <h3 className="data-table__no-rows-title">{noDataTitle}</h3>
    <p className="data-table__no-rows-description">{noDataDescription}</p>
  </div>
);

