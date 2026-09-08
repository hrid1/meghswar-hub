"use client";

import React, { useMemo, useState } from "react";
import { DataTable, type Column } from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { useGetConfirmedPickupsQuery } from "@/redux/features/pickup-request/pickupRequestApi";
import type { ConfirmedPickup } from "@/redux/features/pickup-request/pickupRequestType";

type RowId = string | number;

interface ConfirmedPickupRow {
  id: string;
  requestId: string;
  pickupLocation: string;
  storeName: string;
  storePhone: string;
  riderName: string;
  riderPhone: string;
  pickupCount: number;
  status: "CONFIRMED" | "PICKED_UP" | "DELIVERED" | "CANCELLED";
  comment: string | null;
  date: string;
}

const getConfirmedPickupStatusConfig = (status: ConfirmedPickupRow["status"]) => {
  const statusConfig = {
    CONFIRMED: { label: "Confirmed", bg: "bg-green-50", text: "text-green-700", border: "border-green-200", dot: "bg-green-500" },
    PICKED_UP: { label: "Picked Up", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500" },
    DELIVERED: { label: "Delivered", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
    CANCELLED: { label: "Cancelled", bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
  };

  return statusConfig[status] ?? statusConfig.CONFIRMED;
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const mapConfirmedPickupsToTableFormat = (apiResponse: any): ConfirmedPickupRow[] => {
  if (!apiResponse?.data?.pickupRequests || !Array.isArray(apiResponse.data.pickupRequests)) {
    return [];
  }

  return apiResponse.data.pickupRequests.map((request: ConfirmedPickup) => ({
    id: request.id,
    requestId: request.request_code,
    pickupLocation: request.pickup_location,
    storeName: request.store_name,
    storePhone: request.store_phone,
    riderName: request.rider?.name || "Not Assigned",
    riderPhone: request.rider?.phone || "N/A",
    pickupCount: request.pickup_count,
    status: request.status as ConfirmedPickupRow["status"],
    comment: request.comment,
    date: formatDate(request.date),
  }));
};

const confirmedPickupColumns = (onViewDetails: (row: ConfirmedPickupRow) => void): Column<ConfirmedPickupRow>[] => [
  {
    key: "requestId",
    header: "Request ID",
    width: "10%",
    render: (row) => <span className="font-semibold text-sm text-blue-600">{row.requestId}</span>,
  },
  {
    key: "store",
    header: "Store Info",
    width: "20%",
    render: (row) => (
      <div className="flex flex-col">
        <span className="font-semibold text-sm text-gray-800">{row.storeName}</span>
        <span className="text-xs text-gray-500">{row.storePhone}</span>
        <span className="max-w-[200px] truncate text-xs text-gray-400">{row.pickupLocation}</span>
      </div>
    ),
  },
  {
    key: "pickupCount",
    header: "Parcels",
    width: "8%",
    render: (row) => (
      <div className="text-center">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
          {row.pickupCount}
        </span>
      </div>
    ),
  },
  {
    key: "rider",
    header: "Rider",
    width: "15%",
    render: (row) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-800">{row.riderName}</span>
        <span className="text-xs text-gray-500">{row.riderPhone}</span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "10%",
    render: (row) => {
      const config = getConfirmedPickupStatusConfig(row.status);
      return (
        <div className={`flex w-fit items-center gap-1.5 rounded-full border px-2 py-1 text-xs font-medium ${config.bg} ${config.text} ${config.border}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </div>
      );
    },
  },
  {
    key: "date",
    header: "Date",
    width: "10%",
    render: (row) => <span className="text-sm text-gray-700">{row.date}</span>,
  },
  {
    key: "comment",
    header: "Comment",
    width: "15%",
    wrap: true,
    render: (row) => <span className="text-sm text-gray-500 italic">{row.comment || "—"}</span>,
  },
  {
    key: "actions",
    header: "Actions",
    width: "12%",
    render: (row) => (
      <Button size="sm" variant="outline" className="h-7 px-2 text-xs" onClick={() => onViewDetails(row)}>
        View Details
      </Button>
    ),
  },
];

export default function PickupRequestTableRider() {
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isError, error, refetch } = useGetConfirmedPickupsQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchQuery || undefined,
  });

  const mappedRequests = useMemo(() => mapConfirmedPickupsToTableFormat(data), [data]);
  const paginationInfo = data?.data?.pagination;

  const filteredRequests = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return mappedRequests;

    return mappedRequests.filter((request) =>
      request.requestId.toLowerCase().includes(q) ||
      request.storeName.toLowerCase().includes(q) ||
      request.storePhone.toLowerCase().includes(q) ||
      request.riderName.toLowerCase().includes(q) ||
      request.pickupLocation.toLowerCase().includes(q),
    );
  }, [searchQuery, mappedRequests]);

  const visibleIds = useMemo(() => filteredRequests.map((item) => item.id), [filteredRequests]);
  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds],
  );

  const handleViewDetails = (row: ConfirmedPickupRow) => {
    console.log("View details for", row.requestId);
  };

  const columns = useMemo(() => confirmedPickupColumns(handleViewDetails), []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-4 rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="font-medium text-red-600">Error loading confirmed pickups</p>
        <p className="mt-1 text-sm text-red-400">
          {(error as any)?.data?.message || (error as any)?.message || "Failed to fetch confirmed pickups"}
        </p>
        <Button variant="outline" className="mt-3" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <CustomSearchInput
          placeholder="Search by Request ID, Store, Rider or Location..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="max-w-2xl flex-1"
        />
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-[#FDEFE6] px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-[#F7C9AE] bg-white px-3 py-1 text-sm">
            <span className="font-semibold">{cleanedSelectedIds.length}</span> Selected
          </div>
          <div className="text-sm text-gray-600">
            Total: <span className="font-semibold">{mappedRequests.length}</span> confirmed pickups
          </div>
          {paginationInfo && (
            <div className="text-sm text-gray-500">
              Page {paginationInfo.page} of {paginationInfo.totalPages}
            </div>
          )}
        </div>
      </div>

      <DataTable<ConfirmedPickupRow>
        columns={columns}
        data={filteredRequests}
        selectable
        minWidth={1000}
        getRowId={(row) => row.id}
        selectedRowIds={cleanedSelectedIds}
        onToggleRow={(rowId) => {
          setSelectedIds((prev) =>
            prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId],
          );
        }}
        onToggleAll={(nextSelected) => setSelectedIds(nextSelected)}
      />

      {paginationInfo && paginationInfo.totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-3 border-t px-4 py-3 md:flex-row">
          <div className="text-sm text-gray-500">
            Showing {((paginationInfo.page - 1) * paginationInfo.limit) + 1} to{" "}
            {Math.min(paginationInfo.page * paginationInfo.limit, paginationInfo.total)} of {paginationInfo.total} requests
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={paginationInfo.page === 1}
              className="rounded border px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm">
              Page {paginationInfo.page} of {paginationInfo.totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((page) => page + 1)}
              disabled={paginationInfo.page === paginationInfo.totalPages}
              className="rounded border px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Per page:</span>
            <select
              value={itemsPerPage}
              onChange={(event) => {
                setItemsPerPage(Number(event.target.value));
                setCurrentPage(1);
              }}
              className="rounded border px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
