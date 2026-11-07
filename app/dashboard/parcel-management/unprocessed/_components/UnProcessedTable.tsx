"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useMemo, useState } from "react";
import { columns } from "./unProcessedCol";
import UpdateStatusModal from "../../hub-transfer/_components/UpdateStatusModal";
import {
  useGetDeliveryOutcomesQuery,
  useBulkReturnToMerchantMutation,
  useBulkRescheduleDeliveryMutation,
} from "@/redux/features/process-unprocess/processUnprocessApi";
import { useGetHubMerchantsQuery } from "@/redux/features/hubs/hubsApi";
import type { HubMerchant } from "@/redux/features/hubs/hubsTypes";
import CustomPagination from "@/components/reusable/CustomPagination";
import { toast } from "sonner";
import { Search } from "lucide-react";

function getMerchantList(data: unknown): HubMerchant[] {
  if (Array.isArray(data)) return data;
  if (
    data &&
    typeof data === "object" &&
    Array.isArray((data as { merchants?: HubMerchant[] }).merchants)
  ) {
    return (data as { merchants: HubMerchant[] }).merchants;
  }
  return [];
}

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "RETURNED", label: "Returned" },
  { value: "PAID_RETURN", label: "Paid Return" },
  { value: "EXCHANGE", label: "Exchange" },
  { value: "PARTIAL_DELIVERY", label: "Partial Delivery" },
];

export default function UnProcessedTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const [openStatusModal, setOpenStatusModal] = useState(false);

  // Queries
  const { data: unprocessedData, isLoading: isUnprocessedLoading } =
    useGetDeliveryOutcomesQuery({
      page,
      limit,
      search: search || undefined,
      status: (status as any) || undefined,
      merchantId: merchantId || undefined,
    });

  const { data: merchantsData, isLoading: isMerchantsLoading } =
    useGetHubMerchantsQuery();
  const merchants = getMerchantList(merchantsData?.data);

  const unprocessedParcels = unprocessedData?.data?.parcels || [];
  const pagination = unprocessedData?.data?.pagination;

  // Mutations
  const [bulkReturnToMerchant, { isLoading: isReturning }] =
    useBulkReturnToMerchantMutation();
  const [bulkRescheduleDelivery, { isLoading: isRescheduling }] =
    useBulkRescheduleDeliveryMutation();

  const parcelIds = useMemo(
    () => selectedRowIds.map(String),
    [selectedRowIds]
  );
  const isMutating = isReturning || isRescheduling;

  /* ------------------------------ Row Selection ------------------------------- */
  const handleToggleRow = (rowId: string | number) => {
    setSelectedRowIds((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  const handleToggleAll = (nextSelected: (string | number)[]) => {
    setSelectedRowIds(nextSelected);
  };

  const handleStatusUpdate = async (type: "reschedule" | "return") => {
    setOpenStatusModal(false);
    if (parcelIds.length === 0) return;

    try {
      if (type === "reschedule") {
        await bulkRescheduleDelivery({ parcel_ids: parcelIds }).unwrap();
        toast.success(`Rescheduled ${parcelIds.length} parcel(s) for delivery`);
      } else {
        await bulkReturnToMerchant({ parcel_ids: parcelIds }).unwrap();
        toast.success(`Returned ${parcelIds.length} parcel(s) to merchant`);
      }
      setSelectedRowIds([]);
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.message ||
          (type === "reschedule"
            ? "Failed to reschedule delivery"
            : "Failed to return to merchant")
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter and Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search parcel, phone, name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Merchant Filter */}
          <select
            value={merchantId}
            onChange={(e) => {
              setMerchantId(e.target.value);
              setPage(1);
            }}
            disabled={isMerchantsLoading}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Merchants</option>
            {merchants.map((m) => {
              const id = m.merchant_id || m.id;
              const name =
                m.merchant_name ||
                m.full_name ||
                m.business_name ||
                m.user?.full_name ||
                "Unknown";
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="text-sm font-medium text-gray-600">
            {selectedRowIds.length} Parcel{selectedRowIds.length === 1 ? "" : "s"} Selected
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            disabled={selectedRowIds.length === 0 || isMutating}
            onClick={() => setOpenStatusModal(true)}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
              selectedRowIds.length === 0 || isMutating
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-orange-600 text-white hover:bg-orange-700 shadow-sm"
            }`}
          >
            {isMutating ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        isLoading={isUnprocessedLoading}
        columns={columns}
        data={unprocessedParcels}
        selectable={true}
        getRowId={(row) => String(row.id || row.parcel_id || "")}
        selectedRowIds={selectedRowIds}
        onToggleRow={handleToggleRow}
        onToggleAll={handleToggleAll}
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <CustomPagination
          page={page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
          totalItems={pagination.total}
          itemsPerPage={limit}
          onItemsPerPageChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
          showItemsPerPage={true}
        />
      )}

      {/* Status Update Modal */}
      <UpdateStatusModal
        open={openStatusModal}
        setOpen={setOpenStatusModal}
        selected={selectedRowIds}
        onAction={handleStatusUpdate}
        isLoading={isMutating}
      />
    </div>
  );
}
