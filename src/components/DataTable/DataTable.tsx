import {
  AllCommunityModule,
  ICellRendererParams,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useResponsive } from "../../hooks/useResponsive";
import { Actions } from "../Actions/Actions";
import { IconButton } from "../IconButton/IconButton";
import { useColors } from "../theme";
import "./DataTable.styles.css";
import { DataTableColDef, DataTableProps } from "./DataTable.types";

ModuleRegistry.registerModules([AllCommunityModule]);

const NoRowsOverlay = ({
  noDataTitle = "No data to show",
  noDataDescription = "No records found matching the search criteria",
}: {
  noDataTitle?: string;
  noDataDescription?: string;
}) => {
  return (
    <div className="no-rows-overlay">
      <div className="no-rows-content">
        <h3 className="no-rows-title">{noDataTitle}</h3>
        <p className="no-rows-description">{noDataDescription}</p>
      </div>
    </div>
  );
};

const DataTableComponent = <T extends object>({
  data,
  pagination,
  onEdit,
  onDelete,
  onInfo,
  onPaginationChange,
  columnLabels,
  useCardLayout = true,
  noDataTitle,
  noDataDescription,
  hiddenColumns = [],
}: DataTableProps<T>) => {
  const { isMobile, isTablet } = useResponsive();
  const colors = useColors();

  const { current_page, last_page, per_page } = pagination;

  const [rowData, setRowData] = useState(data);
  const [colDefs, setColDefs] = useState<DataTableColDef[]>([]);

  const memoizedColumnLabels = useMemo(
    () => columnLabels || {},
    [columnLabels],
  );

  const memoizedHiddenColumns = useMemo(
    () => hiddenColumns || [],
    [hiddenColumns],
  );

  const responsiveTheme = useMemo(() => {
    return themeQuartz.withParams({
      accentColor: colors.primary.main,
      borderRadius: 6,
      browserColorScheme: "light",
      columnBorder: false,
      fontFamily: ["Arial", "sans-serif"],
      fontSize: isMobile ? 14 : isTablet ? 15 : 16,
      headerFontSize: isMobile ? 14 : isTablet ? 15 : 16,
      spacing: isMobile ? 4 : isTablet ? 6 : 8,
      wrapperBorderRadius: 24,
    });
  }, [isMobile, isTablet, colors.primary.main]);

  const renderActions = useCallback(
    (params: ICellRendererParams) => {
      const rowData = params.data;

      if (!rowData) {
        return null;
      }

      return (
        <Actions
          onInfo={onInfo ? () => onInfo(rowData) : undefined}
          onEdit={onEdit ? () => onEdit(rowData) : undefined}
          onDelete={onDelete ? () => onDelete(rowData) : undefined}
        />
      );
    },
    [onInfo, onEdit, onDelete],
  );

  const defineColumnsByData = useCallback(() => {
    if (data.length === 0) {
      setColDefs([]);
      return;
    }

    const columns: DataTableColDef[] = Object.keys(data[0])
      .filter((key) => !memoizedHiddenColumns.includes(key))
      .map((key) => ({
        field: key,
        headerName: memoizedColumnLabels?.[key] || key,
      }));

    if (onEdit || onDelete || onInfo) {
      columns.push({
        field: "actions",
        headerName: "",
        cellRenderer: renderActions,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "right",
        cellClass: "actions-cell",
        headerClass: "actions-header",
        cellStyle: {
          borderLeft: "none",
          borderRight: "none",
        },
      });
    }

    setColDefs(columns);
  }, [
    data,
    memoizedHiddenColumns,
    memoizedColumnLabels,
    onEdit,
    onDelete,
    onInfo,
    renderActions,
  ]);

  const handlePaginate = useCallback(
    (current: number, size: number) => {
      if (current_page === current && per_page === size) {
        return;
      }

      if (onPaginationChange) {
        onPaginationChange({
          currentPage: current,
          pageSize: size,
        });
      }
    },
    [current_page, per_page, onPaginationChange],
  );

  const renderCardLayout = useCallback(() => {
    if (rowData.length === 0) {
      return (
        <NoRowsOverlay
          noDataTitle={noDataTitle}
          noDataDescription={noDataDescription}
        />
      );
    }

    return (
      <div className="data-table-cards">
        {rowData.map((row, index) => {
          const rowObject = row as Record<string, any>;
          return (
            <div key={index} className="data-table-card">
              <div className="card-content">
                {Object.entries(rowObject)
                  .filter(([key]) => !memoizedHiddenColumns.includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="card-row">
                      <strong className="card-label">
                        {memoizedColumnLabels?.[key] || key}:
                      </strong>
                      <span className="card-value">{String(value)}</span>
                    </div>
                  ))}
              </div>
              {(onEdit || onDelete || onInfo) && (
                <div className="card-actions">
                  <Actions
                    onInfo={onInfo ? () => onInfo(row) : undefined}
                    onEdit={onEdit ? () => onEdit(row) : undefined}
                    onDelete={onDelete ? () => onDelete(row) : undefined}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }, [
    rowData,
    memoizedColumnLabels,
    memoizedHiddenColumns,
    noDataTitle,
    noDataDescription,
    onEdit,
    onDelete,
    onInfo,
  ]);

  const handlePreviousPage = useCallback(() => {
    handlePaginate(current_page - 1, per_page);
  }, [current_page, per_page, handlePaginate]);

  const handleNextPage = useCallback(() => {
    handlePaginate(current_page + 1, per_page);
  }, [current_page, per_page, handlePaginate]);

  useEffect(() => {
    setRowData(data);
  }, [data]);

  useEffect(() => {
    defineColumnsByData();
  }, [defineColumnsByData]);

  return (
    <div className="data-table-container">
      {isMobile && useCardLayout ? (
        renderCardLayout()
      ) : (
        <AgGridReact
          theme={responsiveTheme}
          rowData={rowData}
          columnDefs={colDefs}
          pagination={false}
          paginationPageSize={per_page || 10}
          suppressPaginationPanel={false}
          paginationAutoPageSize={false}
          suppressScrollOnNewData={true}
          maintainColumnOrder={true}
          suppressColumnVirtualisation={isMobile}
          suppressHorizontalScroll={false}
          alwaysShowHorizontalScroll={false}
          suppressMenuHide={isMobile}
          suppressNoRowsOverlay={false}
          suppressRowHoverHighlight={false}
          rowHeight={isMobile ? 48 : undefined}
          headerHeight={isMobile ? 40 : undefined}
          domLayout="autoHeight"
          autoSizeStrategy={{
            type: "fitGridWidth",
            defaultMinWidth: 100,
          }}
          noRowsOverlayComponent={() => (
            <NoRowsOverlay
              noDataTitle={noDataTitle}
              noDataDescription={noDataDescription}
            />
          )}
        />
      )}

      <div className="pagination-controls">
        <IconButton
          disabled={current_page === 1}
          onClick={handlePreviousPage}
          icon={FaChevronLeft}
        />
        <span className="pagination-info">
          {`${current_page} / ${last_page}`}
        </span>
        <IconButton
          disabled={current_page === last_page}
          onClick={handleNextPage}
          icon={FaChevronRight}
        />
      </div>
    </div>
  );
};

export const DataTable = DataTableComponent as typeof DataTableComponent;
