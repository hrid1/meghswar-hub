"use client";

import React, { useState } from "react";
import { mockParcelsHistory } from "./_components/mockData";
import { DataTable } from "@/components/reusable/DataTable";
import { parcelHistoryColumns } from "./_components/columns";


export default function ParcelHistoryTable() {
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  return (
    <div className="p-6">
      <DataTable
        columns={parcelHistoryColumns}
        data={mockParcelsHistory}
        selectable={true}
        getRowId={(row) => row.id}
        selectedRowIds={selectedRowIds}
        onToggleRow={(rowId) => {
          setSelectedRowIds((prev) =>
            prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
          );
        }}
        onToggleAll={(nextSelected) => {
          setSelectedRowIds(nextSelected);
        }}
      />
    </div>
  );
}
