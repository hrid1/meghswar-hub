"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useState } from "react";
import { fakeDeliveryVerificationData } from "./_components/fakeData";
import { riderTableColumns } from "./_components/RiderCol";
import {
  useGetPendingHubApprovalsQuery,
  useGetRidersQuery,
} from "@/redux/features/rider/riderApi";

export default function ParcelReportTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");

 
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  // filtering
  const filteredParcels = fakeDeliveryVerificationData.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.parcel_id.toLowerCase().includes(q) ||
      p.rider_name?.toLowerCase().includes(q) ||
      p.rider_phone?.toLowerCase().includes(q) 
      
    );
  });

  const handleAction = (type: string, riderId: string) => {
    if (type === "approve") alert("approve done" + riderId);
    if (type === "decline") alert("Decline Done" + riderId);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Verify OTP: {filteredParcels.length > 0 ? "fake data" : "backend data"}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Verify OTP for all active riders.
        </p>
      </div>
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
        data={fakeDeliveryVerificationData}
        selectable={true}
        getRowId={(row) => row.verification_id}
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
