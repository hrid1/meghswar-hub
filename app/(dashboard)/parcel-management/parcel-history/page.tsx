"use client";

import React, { useState } from "react";
import { mockParcelsHistory } from "./_components/mockData";
import DataTable3 from "@/components/reusable/DataTable3";
import { parcelHistoryColumns } from "./_components/columns";


export default function ParcelHistoryTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectRow = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === mockParcelsHistory.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockParcelsHistory.map((_, i) => i));
    }
  };

  return (
    <div className="p-6">
      <DataTable3
        columns={parcelHistoryColumns}
        data={mockParcelsHistory}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        onSelectAll={handleSelectAll}
        rowKey="id"
      />
    </div>
  );
}
