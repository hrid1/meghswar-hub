"use client";

import { DataTable } from "@/components/reusable/DataTable";
import CustomPagination from "@/components/reusable/CustomPagination";
import React, { useState } from "react";
import { confirmedPickupColumns } from "./riderAssignCol";
import { useGetAcceptedPickupsQuery } from "@/redux/features/pickup-request/pickupRequestApi";
import { Search } from "lucide-react";

export default function ConfirmPickupRequest() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetAcceptedPickupsQuery({
    page,
    limit: 20,
    search: searchQuery || undefined,
  });

  const pickupRequests = data?.data.pickupRequests ?? [];
  const pagination = data?.data.pagination ?? {
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Confirmed Pickup Requests</h1>
        <p className="text-sm text-gray-500 mt-1">
          Pickups accepted by the hub and assigned to riders.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by store or request ID..."
            className="border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-[#FE5000]/30"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      <DataTable
        columns={confirmedPickupColumns()}
        data={pickupRequests}
        isLoading={isLoading}
        selectable={false}
        getRowId={(row) => row.id}
        emptyMessage="No confirmed pickup requests found."
      />

      <CustomPagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
        totalItems={pagination.total}
        itemsPerPage={pagination.limit}
        show={pagination.totalPages > 0}
      />
    </div>
  );
}
