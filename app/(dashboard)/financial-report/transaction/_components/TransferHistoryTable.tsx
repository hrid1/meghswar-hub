"use client"

import { DataTable } from "@/components/reusable/DataTable";
import React, { useState } from "react";
import { riderStatusColumns } from "./transferHistoryCol";


export default function TransferHistoryTable() {
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Transfer History</h2>
      <DataTable
        columns={riderStatusColumns}
        data={riderStatusData}
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


const riderStatusData = [
  {
    id: 1,
    date: "2025-01-12",
    bank: "DBBL",
    amount: "৳1,200",
    proof: "proof1.pdf",
    note: "Payment received successfully",
    successRate: "98%",
  },
  {
    id: 2,
    date: "2025-01-15",
    bank: "Islami Bank",
    amount: "৳900",
    proof: "proof2.jpg",
    note: "Delayed due to verification",
    successRate: "87%",
  },
  {
    id: 3,
    date: "2025-01-18",
    bank: "BRAC Bank",
    amount: "৳1,450",
    proof: "proof3.png",
    note: "Cleared instantly",
    successRate: "92%",
  },
  {
    id: 4,
    date: "2025-01-18",
    bank: "BRAC Bank",
    amount: "৳1,450",
    proof: "proof3.png",
    note: "Cleared instantly",
    successRate: "92%",
  },
  {
    id: 5,
    date: "2025-01-18",
    bank: "BRAC Bank",
    amount: "৳1,450",
    proof: "proof3.png",
    note: "Cleared instantly",
    successRate: "92%",
  },
];
