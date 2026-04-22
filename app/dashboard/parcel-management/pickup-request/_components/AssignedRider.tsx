"use client";

import { DataTable } from "@/components/reusable/DataTable";
import CustomPagination from "@/components/reusable/CustomPagination";
import React, { useState } from "react";
import { useGetConfirmedPickupsQuery } from "@/redux/features/pickup-request/pickupRequestApi";
import { ConfirmedPickup } from "@/redux/features/pickup-request/pickupRequestType";
import { Search } from "lucide-react";

const confirmedColumns = () => [
  {
    key: "request_code",
    header: "Request ID",
    width: "13%",
    render: (row: ConfirmedPickup) => (
      <span className="font-semibold text-[#FE5000]">{row.request_code}</span>
    ),
  },
  {
    key: "store_name",
    header: "Store",
    width: "20%",
    render: (row: ConfirmedPickup) => (
      <div>
        <p className="font-semibold leading-tight">{row.store_name}</p>
        <p className="text-xs text-gray-500">{row.store_phone}</p>
      </div>
    ),
  },
  {
    key: "pickup_location",
    header: "Pickup Location",
    width: "20%",
    render: (row: ConfirmedPickup) => (
      <p className="text-sm text-gray-700 truncate max-w-[180px]">
        {row.pickup_location || "—"}
      </p>
    ),
  },
  {
    key: "rider",
    header: "Rider",
    width: "18%",
    render: (row: ConfirmedPickup) =>
      row.rider ? (
        <div>
          <p className="font-semibold leading-tight">{row.rider.name}</p>
          <p className="text-xs text-gray-500">{row.rider.phone}</p>
        </div>
      ) : (
        <span className="text-gray-400 text-sm">—</span>
      ),
  },
  {
    key: "pickup_count",
    header: "Parcels",
    width: "9%",
    render: (row: ConfirmedPickup) => (
      <span className="font-semibold">{row.pickup_count}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "11%",
    render: (row: ConfirmedPickup) => {
      const colors: Record<string, string> = {
        CONFIRMED: "bg-blue-100 text-blue-700",
        PICKED_UP: "bg-green-100 text-green-700",
        DELIVERED: "bg-emerald-100 text-emerald-700",
        CANCELLED: "bg-red-100 text-red-600",
      };
      return (
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            colors[row.status] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {row.status}
        </span>
      );
    },
  },
  {
    key: "comment",
    header: "Comment",
    width: "9%",
    render: (row: ConfirmedPickup) => (
      <span className="text-sm text-gray-500">{row.comment || "—"}</span>
    ),
  },
];

export default function PickupRequestTableRider() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetConfirmedPickupsQuery({
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
        <h1 className="text-2xl font-bold">Assigned Pickup Requests</h1>
        <p className="text-sm text-gray-500 mt-1">
          Pickup requests confirmed and assigned to riders.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search requests..."
            className="border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-[#FE5000]/30"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <DataTable
        columns={confirmedColumns()}
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
