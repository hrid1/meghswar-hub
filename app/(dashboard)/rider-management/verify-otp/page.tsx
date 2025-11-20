"use client";

import DataTable3 from "@/components/reusable/DataTable3";
import React, { useState } from "react";
import { fakeParcelData } from "./_components/fakeData";
import { riderTableColumns } from "./_components/RiderCol";

export default function ParcelReportTable() {
  const [searchQuery, setSearchQuery] = useState("");

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
    if (type === "approve") alert("approve done"+ riderId);
    if (type === "decline") alert("Decline Done"+ riderId);
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
      <DataTable3
        columns={riderTableColumns(handleAction)}
        data={filteredParcels}
        selectedRows={[]}
        onSelectRow={() => {}}
        onSelectAll={() => {}}
      />
    </div>
  );
}
