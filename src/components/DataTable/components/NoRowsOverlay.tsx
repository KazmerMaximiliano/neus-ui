import type { DataTableEmptyProps } from "../DataTable.types";

export const NoRowsOverlay = ({
  emptyStateClassName,
  noRowsDescriptionClassName,
  noRowsDescriptionStyle,
  noRowsTitleClassName,
  noRowsTitleStyle,
  noDataTitle = "No data to show",
  noDataDescription = "No records found matching the search criteria",
  emptyStateStyle,
}: DataTableEmptyProps) => (
  <div
    className={["data-table__no-rows", emptyStateClassName]
      .filter(Boolean)
      .join(" ")}
    role="status"
    style={emptyStateStyle}
  >
    <h3
      className={["data-table__no-rows-title", noRowsTitleClassName]
        .filter(Boolean)
        .join(" ")}
      style={noRowsTitleStyle}
    >
      {noDataTitle}
    </h3>
    <p
      className={["data-table__no-rows-description", noRowsDescriptionClassName]
        .filter(Boolean)
        .join(" ")}
      style={noRowsDescriptionStyle}
    >
      {noDataDescription}
    </p>
  </div>
);
