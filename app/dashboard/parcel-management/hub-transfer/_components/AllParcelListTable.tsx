"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useMemo, useState } from "react";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import { parcelColumns } from "./ParcelCol";
import { useGetParcelsForAssignmentQuery } from "@/redux/features/parcels/parcelsApi";
import { Loader2 } from "lucide-react";
import { Parcel } from "@/redux/features/parcels/parcelTypes";
import AssignHubModal from "./AssignHubModal";

export default function PickupRequestTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const {
    data: parcels,
    isLoading,
    isError,
    error,
  } = useGetParcelsForAssignmentQuery({ page, limit });

  // Get parcels from API response
  const parcelsData: Parcel[] = parcels?.data?.parcels || [];

  console.log("parcelsData", parcelsData);

  // Table selections
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  // Modal state (Third Party)
  const [openModal, setOpenModal] = useState(false);
  // Modal state (Assign to Hub)
  const [openHubModal, setOpenHubModal] = useState(false);

  // For single update
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);

  // Radio value
  const [selectedStatus, setSelectedStatus] = useState("");

  // Search + filter state
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered parcels based on search
  const filteredParcels = useMemo(() => {
    if (!parcelsData.length) return [];

    if (!searchQuery.trim()) return parcelsData;

    const q = searchQuery.toLowerCase();
    return parcelsData.filter((p) => {
      return (
        p.parcel_tx_id?.toLowerCase().includes(q) ||
        p.tracking_number?.toLowerCase().includes(q) ||
        p.customer_name?.toLowerCase().includes(q) ||
        p.customer_phone?.toLowerCase().includes(q) ||
        p.store?.business_name?.toLowerCase().includes(q) ||
        p.product_description?.toLowerCase().includes(q)
      );
    });
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

  // SUBMIT (single + bulk)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStatus) return;

    let parcelIds: string[];

    // Single update
    if (selectedParcel) {
      parcelIds = [selectedParcel.id];
    } else {
      // Bulk update by selected IDs
      parcelIds = selectedRowIds.map((id) => String(id));
    }

    try {
      // Replace with your actual API endpoint
      const res = await fetch("/api/update-parcels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parcelIds,
          status: selectedStatus,
        }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      // Reset state
      setOpenModal(false);
      setSelectedStatus("");
      setSelectedParcel(null);
      setSelectedRowIds([]); // Clear selections after successful update
    } catch (err) {
      console.error("API error:", err);
    }
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
            Total: {parcels?.data?.pagination?.total || 0} parcels
          </span>

          {/* Show selected count */}
          {selectedRowIds.length > 0 && (
            <span className="text-sm font-semibold text-orange-600">
              {selectedRowIds.length} selected
            </span>
          )}
        </div>
        {/* 🔥 BULK UPDATE BUTTON */}
        
        <div className="flex flex-wrap items-center gap-4">
          <Button
            disabled={selectedRowIds.length === 0}
            className="bg-orange-600 hover:bg-orange-700 text-white"
            onClick={() => {
              setSelectedParcel(null); // bulk mode
              setOpenModal(true);
            }}
          >
            Assign Third Party ({selectedRowIds.length})
          </Button>

          <Button
            disabled={selectedRowIds.length === 0}
            className="bg-orange-600 hover:bg-orange-700 text-white"
            onClick={() => {
              setOpenHubModal(true);
            }}
          >
            Assign To Hub ({selectedRowIds.length})
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <DataTable
        columns={parcelColumns((row: Parcel) => {
          setSelectedParcel(row); // single mode
          setOpenModal(true);
        })}
        data={filteredParcels}
        selectable={true}
        getRowId={(row) => row.id}
        selectedRowIds={selectedRowIds}
        onToggleRow={handleToggleRow}
        onToggleAll={handleToggleAll}
      />

      {/* Pagination Controls (if your DataTable doesn't include them) */}
      {parcels?.data?.pagination && (
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
              {page} of {parcels.data.pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === parcels.data.pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* MODAL */}
      <CustomDialog open={openModal} setOpen={setOpenModal}>
        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold">
            {selectedParcel
              ? "Assign Third Party - Single Parcel"
              : "Assign Third Party - Bulk Update"}
          </h2>

          <div className="text-sm text-gray-600">
            {selectedParcel ? (
              <p>
                Parcel: {selectedParcel.parcel_tx_id} -{" "}
                {selectedParcel.customer_name}
              </p>
            ) : (
              <p>Selected {selectedRowIds.length} parcels for bulk update</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Select Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Choose status...</option>
              <option value="ASSIGNED">Assign to Third Party</option>
              <option value="PICKED_UP">Picked Up</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              type="submit"
              className="bg-orange-500 text-white flex-1 hover:bg-orange-600"
            >
              Confirm
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CustomDialog>

      <AssignHubModal
        open={openHubModal}
        setOpen={setOpenHubModal}
        selectedParcel={selectedParcel}
        selectedRowIds={selectedRowIds}
        onSuccess={() => {
          setSelectedParcel(null);
          setSelectedRowIds([]);
        }}
      />
    </div>
  );
}
