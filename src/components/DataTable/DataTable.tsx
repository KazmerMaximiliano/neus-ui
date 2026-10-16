import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useResponsive } from "../../hooks/useResponsive";
import { IconButton } from "../IconButton/IconButton";
import { NoRowsOverlay } from "./components/NoRowsOverlay";
import { DATA_TABLE_THEME } from "./DataTable.consts";
import "./DataTable.styles.css";
import type { DataTableProps } from "./DataTable.types";

ModuleRegistry.registerModules([AllCommunityModule]);

export const DataTable = <T extends object>({
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
  const { current_page, last_page, per_page } = pagination;
  const paginate = (page: number) => {
    if (page === current_page || page < 1 || page > Math.max(1, last_page))
      return;
    onPaginationChange?.({ currentPage: page, pageSize: per_page });
  };
  return (
    <div
      className={["data-table", className].filter(Boolean).join(" ")}
      style={style}
    >
      {isMobile && renderMobileCard ? (
        data.length ? (
          <div className="data-table__cards">
            {data.map((row, index) => (
              <div key={index}>{renderMobileCard(row)}</div>
            ))}
          </div>
        ) : (
          <NoRowsOverlay
            noDataTitle={noDataTitle}
            noDataDescription={noDataDescription}
            emptyStateStyle={emptyStateStyle}
          />
        )
      ) : (
        <div className="data-table__grid">
          <AgGridReact<T>
            theme={DATA_TABLE_THEME}
            rowData={data}
            columnDefs={columnDefs}
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
              noDataTitle,
              noDataDescription,
              emptyStateStyle,
            }}
          />
        </div>
      )}
      <div className="data-table__pagination" style={paginationStyle}>
        <IconButton
          disabled={current_page <= 1}
          onClick={() => paginate(current_page - 1)}
          icon={ChevronLeft}
          label="Página anterior"
          size="small"
          variant="text"
        />
        <span className="data-table__pagination-info" aria-live="polite">
          {current_page} / {Math.max(1, last_page)}
        </span>
        <IconButton
          disabled={current_page >= Math.max(1, last_page)}
          onClick={() => paginate(current_page + 1)}
          icon={ChevronRight}
          label="Página siguiente"
          size="small"
          variant="text"
        />
      </div>
    </div>
  );
};
