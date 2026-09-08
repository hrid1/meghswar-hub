"use client";

import React, { useMemo, useState } from "react";
import { DataTable, type Column } from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { useGetPickupRequestsQuery } from "@/redux/features/pickup-request/pickupRequestApi";
import type { PickupRequest } from "@/redux/features/pickup-request/pickupRequestType";

type RowId = string | number;

type PickupRequestStatus =
  | "PENDING"
  | "ASSIGNED"
  | "CONFIRMED"
  | "PICKED_UP"
  | "COMPLETED"
  | "CANCELLED";

interface PickupRequestRow {
  id: string;
  requestId: string;
  pickupLocation: string;
  storeName: string;
  storePhone: string;
  comment: string | null;
  parcelQuantity: number;
  status: PickupRequestStatus;
  assignedRiderId: string | null;
}

const getPickupRequestStatusConfig = (status: PickupRequestStatus) => {
  const statusConfig = {
    PENDING: { label: "Pending", bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
    ASSIGNED: { label: "Assigned", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500" },
    CONFIRMED: { label: "Confirmed", bg: "bg-green-50", text: "text-green-700", border: "border-green-200", dot: "bg-green-500" },
    PICKED_UP: { label: "Picked Up", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500" },
    COMPLETED: { label: "Completed", bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", dot: "bg-gray-500" },
    CANCELLED: { label: "Cancelled", bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
  };

  return statusConfig[status] ?? statusConfig.PENDING;
};

const mapPickupRequestsToTableFormat = (apiResponse: any): PickupRequestRow[] => {
  if (!apiResponse?.data?.pickupRequests || !Array.isArray(apiResponse.data.pickupRequests)) {
    return [];
  }

  return apiResponse.data.pickupRequests.map((request: PickupRequest) => ({
    id: request.id,
    requestId: request.request_code,
    pickupLocation: request.pickup_location,
    storeName: request.store_name,
    storePhone: request.store_phone,
    comment: request.comment,
    parcelQuantity: request.pickup_count,
    status: request.status as PickupRequestStatus,
    assignedRiderId: request.assigned_rider_id,
  }));
};

const pickupRequestColumns = (onAssignRider: (row: PickupRequestRow) => void): Column<PickupRequestRow>[] => [
  {
    key: "requestId",
    header: "Request ID",
    width: "12%",
    render: (row) => <span className="font-semibold text-sm text-blue-600">{row.requestId}</span>,
  },
  {
    key: "pickupLocation",
    header: "Pickup Location",
    width: "25%",
    wrap: true,
    render: (row) => <span className="text-sm text-gray-800">{row.pickupLocation}</span>,
  },
  {
    key: "store",
    header: "Store Info",
    width: "18%",
    render: (row) => (
      <div>
        <div className="font-semibold text-sm text-gray-800">{row.storeName}</div>
        <div className="text-xs text-gray-500">{row.storePhone}</div>
      </div>
    ),
  },
  {
    key: "comment",
    header: "Comment",
    width: "15%",
    wrap: true,
    render: (row) => <span className="text-sm text-gray-500 italic">{row.comment || "—"}</span>,
  },
  {
    key: "parcelQuantity",
    header: "Parcel Quantity",
    width: "10%",
    render: (row) => (
      <div className="text-center">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
          {row.parcelQuantity}
        </span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "12%",
    render: (row) => {
      const config = getPickupRequestStatusConfig(row.status);
      return (
        <div className={`flex w-fit items-center gap-1.5 rounded-full border px-2 py-1 text-xs font-medium ${config.bg} ${config.text} ${config.border}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </div>
      );
    },
  },
  {
    key: "actions",
    header: "Actions",
    width: "8%",
    render: (row) => (
      <div className="flex gap-2">
        {row.status === "PENDING" && (
          <Button size="sm" variant="outline" className="h-7 px-2 text-xs text-blue-600 hover:bg-blue-50" onClick={() => onAssignRider(row)}>
            Assign
          </Button>
        )}
      </div>
    ),
  },
];

export default function PickupRequestTable() {
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [statusFilter, setStatusFilter] = useState("");

  const { data, isLoading, isError, error, refetch } = useGetPickupRequestsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter || undefined,
  });

  const mappedRequests = useMemo(() => mapPickupRequestsToTableFormat(data), [data]);
  const paginationInfo = data?.data?.pagination;

  const filteredRequests = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return mappedRequests;

    return mappedRequests.filter((request) =>
      request.requestId.toLowerCase().includes(q) ||
      request.storeName.toLowerCase().includes(q) ||
      request.storePhone.toLowerCase().includes(q) ||
      request.pickupLocation.toLowerCase().includes(q),
    );
  }, [searchQuery, mappedRequests]);

  const visibleIds = useMemo(() => filteredRequests.map((item) => item.id), [filteredRequests]);
  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds],
  );

  const handleAssignRider = (row: PickupRequestRow) => {
    console.log("Assign rider for", row.requestId);
  };

  const columns = useMemo(() => pickupRequestColumns(handleAssignRider), []);

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
        <p className="font-medium text-red-600">Error loading pickup requests</p>
        <p className="mt-1 text-sm text-red-400">
          {(error as any)?.data?.message || (error as any)?.message || "Failed to fetch pickup requests"}
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
          placeholder="Search by Request ID, Store, Phone or Location..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="max-w-2xl flex-1"
        />
        <div className="flex gap-2">
          <select
            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PICKED_UP">Picked Up</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-[#FDEFE6] px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-[#F7C9AE] bg-white px-3 py-1 text-sm">
            <span className="font-semibold">{cleanedSelectedIds.length}</span> Selected
          </div>
          <div className="text-sm text-gray-600">
            Total: <span className="font-semibold">{mappedRequests.length}</span> requests
          </div>
          {paginationInfo && (
            <div className="text-sm text-gray-500">
              Page {paginationInfo.page} of {paginationInfo.totalPages}
            </div>
          )}
        </div>
      </div>

      <DataTable<PickupRequestRow>
        columns={columns}
        data={filteredRequests}
        selectable
        minWidth={900}
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
