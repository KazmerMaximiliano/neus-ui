import { useMemo } from "react";
import { ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useResponsive } from "../../hooks/useResponsive";
import { Pagination } from "../Pagination";
import { NoRowsOverlay } from "./components/NoRowsOverlay";
import type { DataTableProps } from "./DataTable.types";
import { DATA_TABLE_GRID_MODULES, DATA_TABLE_THEME } from "./DataTable.consts";
import "./DataTable.styles.css";

ModuleRegistry.registerModules(DATA_TABLE_GRID_MODULES);

export const DataTable = <T extends object>({
  cardClassName,
  cardStyle,
  emptyStateClassName,
  noRowsDescriptionClassName,
  noRowsDescriptionStyle,
  noRowsTitleClassName,
  noRowsTitleStyle,
  cardsClassName,
  cardsStyle,
  gridClassName,
  gridStyle,
  paginationClassName,
  paginationInfoClassName,
  paginationInfoStyle,
  paginationLabels,
  data,
  columnDefs,
  pagination,
  renderMobileCard,
  onPaginationChange,
  noDataTitle,
  noDataDescription,
  className,
  style,
  paginationStyle,
  emptyStateStyle,
}: DataTableProps<T>) => {
  const { isMobile } = useResponsive();
  // AG Grid types rowData and columnDefs as mutable arrays: copy the readonly props once per change.
  const rowData = useMemo(() => [...data], [data]);
  const gridColumnDefs = useMemo(() => [...columnDefs], [columnDefs]);
  const { current_page, last_page, per_page } = pagination;
  return (
    <div
      className={["data-table", className].filter(Boolean).join(" ")}
      style={style}
    >
      {isMobile && renderMobileCard ? (
        data.length ? (
          <div
            className={["data-table__cards", cardsClassName]
              .filter(Boolean)
              .join(" ")}
            style={cardsStyle}
          >
            {data.map((row, index) => (
              <div
                key={index}
                className={["data-table__card", cardClassName]
                  .filter(Boolean)
                  .join(" ")}
                style={cardStyle}
              >
                {renderMobileCard(row)}
              </div>
            ))}
          </div>
        ) : (
          <NoRowsOverlay
            emptyStateClassName={emptyStateClassName}
            noRowsTitleClassName={noRowsTitleClassName}
            noRowsTitleStyle={noRowsTitleStyle}
            noRowsDescriptionClassName={noRowsDescriptionClassName}
            noRowsDescriptionStyle={noRowsDescriptionStyle}
            noDataTitle={noDataTitle}
            noDataDescription={noDataDescription}
            emptyStateStyle={emptyStateStyle}
          />
        )
      ) : (
        <div
          className={["data-table__grid", gridClassName]
            .filter(Boolean)
            .join(" ")}
          style={gridStyle}
        >
          <AgGridReact<T>
            theme={DATA_TABLE_THEME}
            rowData={rowData}
            columnDefs={gridColumnDefs}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
              minWidth: 100,
              flex: 1,
            }}
            pagination={false}
            domLayout="autoHeight"
            maintainColumnOrder
            suppressScrollOnNewData
            noRowsOverlayComponent={NoRowsOverlay}
            noRowsOverlayComponentParams={{
              emptyStateClassName,
              noRowsTitleClassName,
              noRowsTitleStyle,
              noRowsDescriptionClassName,
              noRowsDescriptionStyle,
              noDataTitle,
              noDataDescription,
              emptyStateStyle,
            }}
          />
        </div>
      )}
      <Pagination
        variant="compact"
        page={current_page}
        totalPages={last_page}
        onChange={(page) => onPaginationChange?.({ currentPage: page, pageSize: per_page })}
        labels={paginationLabels}
        className={["data-table__pagination", paginationClassName].filter(Boolean).join(" ")}
        style={paginationStyle}
        infoClassName={["data-table__pagination-info", paginationInfoClassName].filter(Boolean).join(" ")}
        infoStyle={paginationInfoStyle}
      />
    </div>
  );
};
