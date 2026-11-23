import { EmptyState } from "../../EmptyState";
import type { DataTableEmptyProps } from "../DataTable.types";

/** The table's empty state: an EmptyState in the table's own look, announced as a status. */
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
  <EmptyState
    role="status"
    titleAs="h3"
    title={noDataTitle}
    description={noDataDescription}
    className={["data-table__no-rows", emptyStateClassName].filter(Boolean).join(" ")}
    style={emptyStateStyle}
    titleClassName={["data-table__no-rows-title", noRowsTitleClassName].filter(Boolean).join(" ")}
    titleStyle={noRowsTitleStyle}
    descriptionClassName={["data-table__no-rows-description", noRowsDescriptionClassName]
      .filter(Boolean)
      .join(" ")}
    descriptionStyle={noRowsDescriptionStyle}
  />
);
