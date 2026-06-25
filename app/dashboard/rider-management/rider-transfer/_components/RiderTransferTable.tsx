"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useState } from "react";
import { riderTransferColumns } from "./riderTransferCol";
import CustomPagination from "@/components/reusable/CustomPagination";
import { useGetRidersForTransferQuery } from "@/redux/features/rider/riderApi";

export default function RiderTransferTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useGetRidersForTransferQuery({ page, limit });
  const riders = data?.data?.riders || [];
  const pagination = data?.data?.pagination;

  // filtering
  const filteredRiders = riders.filter((rider) => {
    const q = searchQuery.toLowerCase();
    return (
      rider.id.toLowerCase().includes(q) ||
      rider.rider_code?.toLowerCase().includes(q) ||
      rider.full_name.toLowerCase().includes(q) ||
      rider.phone.includes(q) ||
      rider.license_no?.toLowerCase().includes(q)
    );
  });

  const totalItems = pagination?.total ?? filteredRiders.length;
  const totalPages = pagination?.totalPages ?? Math.ceil(totalItems / limit);

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
        columns={riderTransferColumns}
        data={filteredRiders}
        selectable={true}
        getRowId={(row) => row.id}
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
        isLoading={isLoading}
      />

      <CustomPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        totalItems={totalItems}
        itemsPerPage={limit}
        show
        showItemsPerPage={false}
        showingLabel="Showing"
        resultsLabel="Results"
      />
    </div>
  );
}
