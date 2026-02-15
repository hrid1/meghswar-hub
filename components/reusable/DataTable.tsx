"use client";

import React, { useEffect, useMemo, useRef } from "react";

export interface Column<T> {
  key: keyof T | string;
  header: React.ReactNode;
  width?: string | number; // Can be px, %, or fraction
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
  wrap?: boolean;
}

type RowId = string | number;

interface RowSelectionProps<T> {
  /** enable checkbox column */
  selectable?: boolean;

  /** how to get row unique id */
  getRowId?: (row: T, index: number) => RowId;

  /** controlled selection */
  selectedRowIds?: RowId[];

  /** events */
  onToggleRow?: (rowId: RowId, row: T) => void;
  onToggleAll?: (nextSelected: RowId[], rows: T[]) => void;

  /** disable selection for specific row */
  isRowSelectable?: (row: T) => boolean;
}

interface DataTableProps<T> extends RowSelectionProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  minWidth?: string | number;
  cellPaddingX?: string; // Horizontal padding class (e.g., "px-2", "px-4")
}

export function DataTable<T>({
  columns,
  data,
  onRowClick,
  emptyMessage = "No data found",
  minWidth = "100%", // Changed from 1000px to 100%
  cellPaddingX = "px-4", // Default horizontal padding

  // selection
  selectable = false,
  getRowId,
  selectedRowIds = [],
  onToggleRow,
  onToggleAll,
  isRowSelectable,
}: DataTableProps<T>) {
  const resolvedGetRowId = useMemo(() => {
    return (
      getRowId ??
      ((row: any, index: number) => {
        return (row?.id ?? row?._id ?? index) as RowId;
      })
    );
  }, [getRowId]);

  const allRowIds = useMemo(() => {
    if (!selectable) return [];
    return data
      .filter((row) => (isRowSelectable ? isRowSelectable(row) : true))
      .map((row, idx) => resolvedGetRowId(row, idx));
  }, [data, selectable, isRowSelectable, resolvedGetRowId]);

  const selectedSet = useMemo(() => new Set(selectedRowIds), [selectedRowIds]);

  const allSelected =
    selectable &&
    allRowIds.length > 0 &&
    allRowIds.every((id) => selectedSet.has(id));
  const noneSelected = !selectable || selectedRowIds.length === 0;
  const someSelected = selectable && !noneSelected && !allSelected;

  // header checkbox indeterminate
  const headerCheckboxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!headerCheckboxRef.current) return;
    headerCheckboxRef.current.indeterminate = someSelected;
  }, [someSelected]);

  const handleToggleAll = () => {
    if (!selectable || !onToggleAll) return;

    if (allSelected) {
      onToggleAll([], data);
    } else {
      onToggleAll(allRowIds, data);
    }
  };

  // Calculate widths for columns
  const getColumnWidth = (col: Column<T>) => {
    if (!col.width) return "auto";

    if (typeof col.width === "number") {
      // If it's a number, use it as pixels for small values or percentage for larger
      return col.width < 100 ? `${col.width}px` : `${col.width}%`;
    }

    // If it's already a string with %, px, or other units, use as is
    return col.width;
  };

  const renderHeaderCells = () =>
    columns.map((col) => {
      const headerClass = col.headerClassName ?? "";
      // Check for alignment overrides. 'text-center' or 'text-right'
      // If neither is present, default to 'text-left'
      const alignClass =
        headerClass.includes("text-center") || headerClass.includes("text-right")
          ? ""
          : "text-left";

      return (
        <th
          key={String(col.key)}
          style={{ width: getColumnWidth(col) }}
          className={`${cellPaddingX} py-3 ${alignClass} text-sm text-white whitespace-nowrap ${headerClass}`}
        >
          {col.header}
        </th>
      );
    });

  const renderRowCells = (row: T, index: number) =>
    columns.map((col) => {
      const wrapClass = col.wrap
        ? "whitespace-normal break-words"
        : "whitespace-nowrap";
      return (
        <td
          key={String(col.key)}
          className={`${cellPaddingX} py-3 text-sm ${wrapClass} ${col.cellClassName ?? ""
            }`}
          style={{ width: getColumnWidth(col) }}
        >
          {col.render ? col.render(row) : (row as any)[col.key]}
        </td>
      );
    });

  return (
    <div className="overflow-x-auto border border-[#E4E4E4] rounded-t-lg custom-scrollbar">
      <table className="w-full" style={{ minWidth }}>
        <thead className="bg-[#FE5000]">
          <tr>
            {/* Selection column - fixed small width */}
            {selectable && (
              <th className="px-2 py-3 w-10 min-w-10 max-w-10">
                <input
                  ref={headerCheckboxRef}
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleToggleAll}
                  className="h-4 w-4 accent-[#FE5000] mx-auto block"
                  aria-label="Select all rows"
                />
              </th>
            )}

            {renderHeaderCells()}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-4 py-10 text-center text-sm text-[#909296]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const rowId = resolvedGetRowId(row, index);
              const disabled = isRowSelectable ? !isRowSelectable(row) : false;
              const checked = selectedSet.has(rowId);

              return (
                <tr
                  key={String(rowId)}
                  onClick={() => onRowClick?.(row)}
                  className={`border-t border-[#E4E4E4] ${onRowClick ? "hover:bg-[#1D1D1D]/1 cursor-pointer" : ""
                    }`}
                >
                  {/* Row checkbox - fixed small width */}
                  {selectable && (
                    <td className="px-2 py-3 w-10 min-w-10 max-w-10">
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => {
                          if (disabled) return;
                          onToggleRow?.(rowId, row);
                        }}
                        className="h-4 w-4 accent-[#FE5000] mx-auto block"
                        aria-label="Select row"
                      />
                    </td>
                  )}

                  {renderRowCells(row, index)}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}