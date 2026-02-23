"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useState } from "react";
import { fakeParcelData } from "./_components/fakeData";
import { riderTableColumns } from "./_components/RiderCol";
import { useGetRidersQuery } from "@/redux/features/rider/riderApi";

export default function ParcelReportTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);



  // filtering
  const filteredParcels = fakeParcelData.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.parcelId.toLowerCase().includes(q) ||
      p.riderName.toLowerCase().includes(q) ||
      p.riderPhone.includes(q) ||
      p.merchantName.toLowerCase().includes(q)
    );
  });

  const handleAction = (type: string, riderId: string) => {
    if (type === "approve") alert("approve done" + riderId);
    if (type === "decline") alert("Decline Done" + riderId);
  };

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
        columns={riderTableColumns(handleAction)}
        data={filteredParcels}
        selectable={true}
        getRowId={(row) => row.parcelId}
        selectedRowIds={selectedRowIds}
        onToggleRow={(rowId) => {
          setSelectedRowIds((prev) =>
            prev.includes(rowId)
              ? prev.filter((id) => id !== rowId)
              : [...prev, rowId],
          );
        }}
        onToggleAll={(nextSelected) => {
          setSelectedRowIds(nextSelected);
        }}
      />
    </div>
  );
}
