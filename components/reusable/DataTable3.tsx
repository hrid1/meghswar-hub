"use client";

import React from "react";

export default function DataTable3({
  columns,
  data,
  selectedRows,
  onSelectRow,
  onSelectAll,
  rowKey = "id",
}: any) {
  const allSelected =
    Array.isArray(data) &&
    data.length > 0 &&
    selectedRows.length === data.length;

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="w-full min-w-full text-xs md:text-sm">
          <thead>
            <tr className="bg-orange-500 text-white">
              {/* Select All Checkbox */}
              <th className="pl-2 w-10 md:w-12">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                />
              </th>

              {columns.map((col: any) => {
                const widthStyle = col.width
                  ? {
                      width:
                        typeof col.width === "number"
                          ? `${col.width}px`
                          : col.width,
                    }
                  : undefined;

                const wrapHeaderClass = col.wrap ? "" : "md:whitespace-nowrap";

                return (
                  <th
                    key={col.key}
                    className={`py-3 font-semibold text-left pr-2 ${wrapHeaderClass} ${
                      col.headerClassName ?? ""
                    }`}
                    style={widthStyle}
                  >
                    {col.title}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {data.map((row: any, index: number) => {
              const isSelected = selectedRows.includes(index);

              return (
                <tr
                  key={row[rowKey] ?? index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  {/* Row checkbox */}
                  <td className="pl-2 w-10 md:w-12 ">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectRow(index)}
                    />
                  </td>

                  {/* Row data */}
                  {columns.map((col: any) => {
                    const wrapCellClass = col.wrap
                      ? "whitespace-normal break-words"
                      : "whitespace-nowrap md:whitespace-normal";

                    return (
                      <td
                        key={col.key}
                        className={`pr-2 py-3 align-middle  ${wrapCellClass} ${
                          col.cellClassName ?? ""
                        }`}
                      >
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-6 text-center text-gray-500 text-sm"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
