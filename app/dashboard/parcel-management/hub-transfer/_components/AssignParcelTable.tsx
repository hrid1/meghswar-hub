"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useMemo, useState } from "react";
import { useGetHubOutgoingParcelsQuery } from "@/redux/features/parcels/parcelsApi";
import { Loader2 } from "lucide-react";
import type { Parcel2 } from "@/redux/features/parcels/parcelTypes";
// import { parcelColumns1 } from "./AssignParcelCols";
import { Button } from "@/components/ui/button";
import { assignParcelColumns } from "./AssignParcelCols";

export default function AssignParcelTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const {
    data: assignedResponse,
    isLoading,
    isError,
    error,
  } = useGetHubOutgoingParcelsQuery({ page, limit });

  // Assigned/outgoing parcels (Parcel2 from API)
  const parcelsData: Parcel2[] = assignedResponse?.data?.parcels ?? [];
  const pagination = assignedResponse?.data;

  // Table selections
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  // Search + filter state
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered parcels based on search
  const filteredParcels = useMemo(() => {
    if (!parcelsData.length) return [];
    if (!searchQuery.trim()) return parcelsData;
    const q = searchQuery.toLowerCase();
    return parcelsData.filter(
      (p) =>
        p.parcel_tx_id?.toLowerCase().includes(q) ||
        p.tracking_number?.toLowerCase().includes(q) ||
        p.customer_name?.toLowerCase().includes(q) ||
        p.customer_phone?.toLowerCase().includes(q) ||
        p.store?.business_name?.toLowerCase().includes(q) ||
        p.product_description?.toLowerCase().includes(q) ||
        p.destinationHub?.branch_name?.toLowerCase().includes(q)
    );
  }, [parcelsData, searchQuery]);

  // Toggle a single row by ID
  const handleToggleRow = (rowId: string | number, row: any) => {
    setSelectedRowIds((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId],
    );
  };

  // Toggle all rows
  const handleToggleAll = (nextSelected: (string | number)[], rows: any[]) => {
    setSelectedRowIds(nextSelected);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle limit change
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing items per page
  };

  // Loading state
  if (isLoading) {
    return (
      <span className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        <span className="ml-2 text-gray-600">Loading parcels...</span>
      </span>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Error loading parcels: {String(error)}
      </div>
    );
  }

  return (
    <div className="p-6 container mx-auto">
      {/* 🔍 SEARCH + FILTER */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by ID, customer, phone, store..."
            className="border p-2 rounded w-80 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Show total count */}
          <span className="text-sm text-gray-600">
            Total: {pagination?.total ?? 0} parcels
          </span>

          {/* Show selected count */}
          {selectedRowIds.length > 0 && (
            <span className="text-sm font-semibold text-orange-600">
              {selectedRowIds.length} selected
            </span>
          )}
        </div>
      </div>

      {/* TABLE */}
      <DataTable
        columns={assignParcelColumns((row: Parcel2) => {
          console.log("row", row);
        })} 
        data={filteredParcels}
        selectable
        getRowId={(row) => row.id}
        selectedRowIds={selectedRowIds}
        onToggleRow={handleToggleRow}
        onToggleAll={handleToggleAll}
        emptyMessage="No assigned parcels found"
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 0 && (
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select
              value={limit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="px-3 py-1 bg-orange-500 text-white rounded-md">
              {page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}