"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useState } from "react";
import { riderStatusColumns } from "./riderPerformanceCol";

export const fakeriderData = [
  {
    date: "2025-01-20",
    rider: "Rahim Uddin",
    riderImg: "https://i.pravatar.cc/150?img=32",
    riderPhone: "01812-334455",
    delivered: 42,
    rescheduled: 5,
    return: 3,
    assigned: 50,
    comission: 1250,
    successRate: "84%",
    riderPerformance: 1250,
  },
  {
    date: "2025-01-20",
    rider: "Sabbir Khan",
    riderImg: "https://i.pravatar.cc/150?img=12",
    riderPhone: "01722-889900",
    delivered: 30,
    rescheduled: 8,
    return: 2,
    assigned: 40,
    comission: 980,
    successRate: "75%",
    riderPerformance: 980,
  },
  {
    date: "2025-01-20",
    rider: "Hasan Ali",
    riderImg: "https://i.pravatar.cc/150?img=45",
    riderPhone: "01955-667788",
    delivered: 55,
    rescheduled: 4,
    return: 1,
    assigned: 60,
    comission: 1500,
    successRate: "91%",
    riderPerformance: 1500,
  },
];

export default function PerformanceTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  // filtering
  const filteredParcels = fakeriderData.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.rider.toLowerCase().includes(q) ||
      p.riderPhone.includes(q) ||
      p.successRate.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6">
      {/* SEARCH BAR */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search rider..."
          className="border p-2 rounded w-60"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <DataTable
        columns={riderStatusColumns}
        data={filteredParcels}
        selectable={true}
        getRowId={(row, index) => `${row.date}-${row.rider}-${index}`}
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
