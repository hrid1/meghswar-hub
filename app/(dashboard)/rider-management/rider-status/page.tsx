"use client";

import DataTable3 from "@/components/reusable/DataTable3";
import React, { useState } from "react";
import { riderStatusColumns } from "./_components/riderStatusCol";

const fakeRiderData = [
  {
    riderId: "R-101",
    riderImg: "https://i.pravatar.cc/150?img=32",
    rider: "Tanvir Hasan",
    riderPhone: "01711-223344",
    status: "Active",
    licenseNo: "DL-548721",
    riderPerformance: 3200,
  },
  {
    riderId: "R-102",
    riderImg: "https://i.pravatar.cc/150?img=15",
    rider: "Shakib Rahman",
    riderPhone: "01822-556677",
    status: "Inactive",
    licenseNo: "DL-982134",
    riderPerformance: 1850,
  },
  {
    riderId: "R-103",
    riderImg: "https://i.pravatar.cc/150?img=48",
    rider: "Maruf Islam",
    riderPhone: "01633-778899",
    status: "Active",
    licenseNo: "DL-441298",
    riderPerformance: 2750,
  },
];


export default function ParcelReportTable() {
  const [searchQuery, setSearchQuery] = useState("");

  // filtering
  const filteredParcels = fakeRiderData.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.riderId.toLowerCase().includes(q) ||
      p.rider.toLowerCase().includes(q) ||
      p.riderPhone.includes(q) ||
      p.licenseNo.toLowerCase().includes(q)
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
      <DataTable3
        columns={riderStatusColumns}
        data={filteredParcels}
        selectedRows={[]}
        onSelectRow={() => {}}
        onSelectAll={() => {}}
      />
    </div>
  );
}
