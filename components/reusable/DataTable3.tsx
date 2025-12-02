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
  const allSelected = selectedRows.length === data.length;

  return (
  <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm">
  <table className=" w-full">
        <thead>
          <tr className="bg-orange-500 text-white">
            {/* Select All Checkbox */}
            <th style={{ width: 10 }} className="px-4 py-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
              />
            </th>

            {columns.map((col: any) => (
              <th
                key={col.key}
                className="px-4 py-3 font-semibold text-left whitespace-nowrap"
                style={{ width: col.width }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row: any, index: number) => {
            const isSelected = selectedRows.includes(index);

            return (
              <tr
                key={row[rowKey] || index}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                {/* Row checkbox */}
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelectRow(index)}
                  />
                </td>

                {/* Row data */}
                {columns.map((col: any) => (
                  <td key={col.key} className="pl-2 pr-4 py-4 align-">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
