"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { confirmedPickupColumns } from "./riderAssignCol";
import { useGetConfirmedPickupsQuery } from "@/redux/features/pickup-request/pickupRequestApi";

export default function PickupRequestTableRider() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetConfirmedPickupsQuery({
    page: 1,
    limit: 20,
  });

  const pickupRequests = data?.data.pickupRequests || [];

  const filteredParcels = pickupRequests.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.request_code.toLowerCase().includes(q) ||
      p.store_name.toLowerCase().includes(q)
    );
  });

  if (isLoading) {
    return <div className="p-6">Loading confirmed pickups...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Confirmed Pickup Requests
      </h1>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search requests..."
          className="border p-2 rounded w-60"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <DataTable
        columns={confirmedPickupColumns()}
        data={filteredParcels}
        selectable={false}
        getRowId={(row) => row.id}
      />
    </div>
  );
}
