"use client";

import { DataTable } from "@/components/reusable/DataTable";
import { ChevronDown } from "lucide-react";
import React, { useMemo, useState } from "react";
import { columns } from "./DeliveryResheduleCol";
import UpdateStatusModal from "../../hub-transfer/_components/UpdateStatusModal";
import { useGetRescheduledDeliveriesQuery, useBulkRescheduleDeliveryMutation } from "@/redux/features/process-unprocess/processUnprocessApi";
import type { RescheduledParcel } from "@/redux/features/process-unprocess/processUnprocessType";

export default function DeliveryRescheduleTable() {
  const { data: rescheduledData, isLoading, isError, error } =
    useGetRescheduledDeliveriesQuery({ page: 1, limit: 10 });
    
  const [bulkRescheduleDelivery, { isLoading: isBulkRescheduleLoading }] = 
    useBulkRescheduleDeliveryMutation();
    
  const rescheduledParcels: RescheduledParcel[] = rescheduledData?.data?.parcels || [];

  console.log("rescheduledParcels", rescheduledParcels);
  
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const [search, setSearch] = useState("");
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  /* ------------------------------- Filtering -------------------------------- */
  const filteredData = useMemo(() => {
    if (!rescheduledParcels.length) return [];
    
    if (!search.trim()) return rescheduledParcels;
    
    const searchLower = search.toLowerCase();
    return rescheduledParcels.filter((p) =>
      Object.values(p).some(value => 
        String(value).toLowerCase().includes(searchLower)
      )
    );
  }, [rescheduledParcels, search]);

  /* ------------------------------ Select Rows ------------------------------- */
  const handleToggleRow = (rowId: string | number, row: any) => {
    setSelectedRowIds((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  const handleToggleAll = (nextSelected: (string | number)[], rows: any[]) => {
    setSelectedRowIds(nextSelected);
  };

  /* ------------------------------- Handle Reschedule -------------------------------- */
  const handleRescheduleDelivery = async () => {
    try {
      setOpenStatusModal(false);
      
      const parcelIds = selectedRowIds.map(id => String(id));
      
      const response = await bulkRescheduleDelivery({ 
        parcel_ids: parcelIds 
      }).unwrap();
      
      alert(`Successfully rescheduled ${selectedRowIds.length} deliveries`);
      setSelectedRowIds([]); // Clear selection after successful action
      
    } catch (error) {
      console.error("Failed to reschedule deliveries:", error);
      alert("Failed to reschedule deliveries. Please try again.");
    }
  };

  /* ------------------------------- Handle Page Change -------------------------------- */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // You might want to refetch data with new page
    // refetch({ page, limit: itemsPerPage });
  };

  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
    // refetch({ page: 1, limit });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Error loading rescheduled deliveries: {String(error)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
              Filter by Merchant <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="font-semibold text-gray-700">
            {selectedRowIds.length} {selectedRowIds.length === 1 ? 'Parcel' : 'Parcels'} Selected
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search parcels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <button
            disabled={selectedRowIds.length === 0 || isBulkRescheduleLoading}
            onClick={() => setOpenStatusModal(true)}
            className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap ${
              selectedRowIds.length === 0 || isBulkRescheduleLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {isBulkRescheduleLoading ? "Processing..." : "Reschedule Delivery"}
          </button>
        </div>
      </div>

      {/* Summary Stats (if available) */}
      {rescheduledData?.data?.pagination && (
        <div className="bg-gray-50 p-4 rounded-lg flex flex-wrap gap-6 text-sm">
          <div>
            <span className="text-gray-600">Total Rescheduled: </span>
            <span className="font-semibold">{rescheduledData.data.pagination.total}</span>
          </div>
          <div>
            <span className="text-gray-600">Current Page: </span>
            <span className="font-semibold">
              {rescheduledData.data.pagination.page} of {rescheduledData.data.pagination.totalPages}
            </span>
          </div>
        </div>
      )}

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={filteredData}
        selectable={true}
        getRowId={(row) => row.parcel_id}
        selectedRowIds={selectedRowIds}
        onToggleRow={handleToggleRow}
        onToggleAll={handleToggleAll}
      />

      {/* Pagination Controls (if your DataTable doesn't include them) */}
      {rescheduledData?.data?.pagination && (
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 bg-orange-500 text-white rounded-md">
              {currentPage}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === rescheduledData.data.pagination.totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      <UpdateStatusModal
        open={openStatusModal}
        setOpen={setOpenStatusModal}
        selected={selectedRowIds}
        onAction={handleRescheduleDelivery}
        actionType="reschedule" // You might need to pass this to your modal
        isLoading={isBulkRescheduleLoading}
      />
    </div>
  );
}