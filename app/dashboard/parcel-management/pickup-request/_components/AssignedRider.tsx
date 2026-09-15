"use client";

import React, { useMemo, useState } from "react";
import { DataTable, type Column } from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { useGetAcceptedPickupsQuery } from "@/redux/features/pickup-request/pickupRequestApi";
import type { AcceptedPickup } from "@/redux/features/pickup-request/pickupRequestType";
import { useDebounce } from "@/hooks/useDebounce";

type RowId = string | number;

interface AcceptedPickupRow {
  id: string;
  requestId: string;
  storeName: string;
  storePhone: string;
  storeAddress: string;
  riderName: string;
  riderPhone: string;
  estimatedParcels: number;
  actualParcels: number;
  pickedUpCount: number;
  status: string;
  comment: string | null;
  requestedAt: string;
  confirmedAt: string | null;
  assignedAt: string | null;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getAcceptedPickupStatusConfig = (status: string) => {
  const statusConfig: Record<string, { label: string; bg: string; text: string; border: string; dot: string }> = {
    CONFIRMED: { label: "Confirmed", bg: "bg-green-50", text: "text-green-700", border: "border-green-200", dot: "bg-green-500" },
    PENDING: { label: "Pending", bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
    PICKED_UP: { label: "Picked Up", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500" },
    CANCELLED: { label: "Cancelled", bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
  };

  return statusConfig[status] ?? statusConfig.CONFIRMED;
};

const mapAcceptedPickupsToTableFormat = (
  apiResponse: { data?: { pickupRequests?: AcceptedPickup[] } } | undefined,
): AcceptedPickupRow[] => {
  if (!apiResponse?.data?.pickupRequests || !Array.isArray(apiResponse.data.pickupRequests)) {
    return [];
  }

  return apiResponse.data.pickupRequests.map((request) => ({
    id: request.id,
    requestId: request.request_code,
    storeName: request.store?.business_name || "N/A",
    storePhone: request.store?.phone_number || "N/A",
    storeAddress: request.store?.business_address || "N/A",
    riderName: request.assignedRider?.user?.full_name || "Not Assigned",
    riderPhone: request.assignedRider?.user?.phone || "N/A",
    estimatedParcels: request.estimated_parcels,
    actualParcels: request.actual_parcels,
    pickedUpCount: request.picked_up_count,
    status: request.status,
    comment: request.comment,
    requestedAt: formatDate(request.requested_at),
    confirmedAt: formatDate(request.confirmed_at),
    assignedAt: formatDate(request.rider_assigned_at),
  }));
};

const acceptedPickupColumns = (): Column<AcceptedPickupRow>[] => [
  {
    key: "requestId",
    header: "Request ID",
    width: "14%",
    render: (row) => <span className="font-semibold text-sm text-blue-600">{row.requestId}</span>,
  },
  {
    key: "store",
    header: "Store Info",
    width: "18%",
    render: (row) => (
      <div className="flex flex-col">
        <span className="font-semibold text-sm text-gray-800">{row.storeName}</span>
        <span className="text-xs text-gray-500">{row.storePhone}</span>
        <span className="max-w-[200px] truncate text-xs text-gray-400">{row.storeAddress}</span>
      </div>
    ),
  },
  {
    key: "parcels",
    header: "Parcels",
    width: "14%",
    render: (row) => (
      <div className="flex items-center gap-1">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
          {row.estimatedParcels}
        </span>
        <span className="text-gray-400">→</span>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
          {row.actualParcels}
        </span>
      </div>
    ),
  },
  {
    key: "rider",
    header: "Rider",
    width: "14%",
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
      const config = getAcceptedPickupStatusConfig(row.status);
      return (
        <div className={`flex w-fit items-center gap-1.5 rounded-full border px-2 py-1 text-xs font-medium ${config.bg} ${config.text} ${config.border}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </div>
      );
    },
  },
  {
    key: "dates",
    header: "Timeline",
    width: "14%",
    render: (row) => (
      <div className="flex flex-col text-[10px] text-gray-500">
        <div>Requested: {row.requestedAt}</div>
        {row.confirmedAt && row.confirmedAt !== "-" && <div>Confirmed: {row.confirmedAt}</div>}
        {row.assignedAt && row.assignedAt !== "-" && <div>Assigned: {row.assignedAt}</div>}
      </div>
    ),
  },
  {
    key: "comment",
    header: "Comment",
    width: "16%",
    wrap: true,
    render: (row) => <span className="text-sm text-gray-500 italic">{row.comment || "—"}</span>,
  },
];

export default function PickupRequestTableRider() {
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const debouncedSearch = useDebounce(searchQuery, 400);

  const { data, isLoading, isError, error, refetch } = useGetAcceptedPickupsQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: debouncedSearch.trim() || undefined,
  });

  const mappedRequests = useMemo(() => mapAcceptedPickupsToTableFormat(data), [data]);
  const paginationInfo = data?.data?.pagination;
  const columns = useMemo(() => acceptedPickupColumns(), []);

  const visibleIds = useMemo(() => mappedRequests.map((item) => item.id), [mappedRequests]);
  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds],
  );

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
        <p className="font-medium text-red-600">Error loading assigned pickups</p>
        <p className="mt-1 text-sm text-red-400">
          {(error as { data?: { message?: string }; message?: string })?.data?.message ||
            (error as { message?: string })?.message ||
            "Failed to fetch assigned pickups"}
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
          placeholder="Search by Request ID, Store, Rider or Address..."
          value={searchQuery}
          onChange={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
          className="max-w-2xl flex-1"
        />
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-[#FDEFE6] px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-[#F7C9AE] bg-white px-3 py-1 text-sm">
            <span className="font-semibold">{cleanedSelectedIds.length}</span> Selected
          </div>
          <div className="text-sm text-gray-600">
            Total: <span className="font-semibold">{paginationInfo?.total ?? mappedRequests.length}</span> assigned pickups
          </div>
          {paginationInfo && (
            <div className="text-sm text-gray-500">
              Page {paginationInfo.page} of {paginationInfo.totalPages}
            </div>
          )}
        </div>
      </div>

      <DataTable<AcceptedPickupRow>
        columns={columns}
        data={mappedRequests}
        selectable
        minWidth={1100}
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
