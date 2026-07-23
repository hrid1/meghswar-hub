"use client";

import CustomPagination from "@/components/reusable/CustomPagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetDashboardOnGoingDeliveriesQuery } from "@/redux/features/dashboard/dashboardApi";
import type { DashboardOngoingDeliveryItem } from "@/redux/features/dashboard/dashboardTypes";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, Loader2, Phone, RefreshCw, Truck } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const statusStyles: Record<string, string> = {
  OUT_FOR_DELIVERY: "bg-blue-100 text-blue-700",
  IN_TRANSIT: "bg-violet-100 text-violet-700",
  PARTIAL_DELIVERY: "bg-amber-100 text-amber-700",
  EXCHANGE: "bg-purple-100 text-purple-700",
  DELIVERY_RESCHEDULED: "bg-orange-100 text-orange-700",
};

function getStatusStyle(status: string) {
  return statusStyles[status.toUpperCase()] || "bg-gray-100 text-gray-700";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const columns: ColumnDef<DashboardOngoingDeliveryItem>[] = [
  {
    id: "parcel",
    header: "Parcel",
    cell: ({ row }) => (
      <div>
        <p className="font-semibold text-gray-900">{row.original.parcel_id}</p>
        <p className="mt-0.5 text-xs text-gray-500">
          {row.original.tracking_number}
        </p>
      </div>
    ),
  },
  {
    id: "rider",
    header: "Rider",
    cell: ({ row }) => {
      const rider = row.original.rider;
      if (!rider) {
        return (
          <div className="flex min-w-40 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <Truck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Unassigned</p>
              <p className="text-xs text-gray-400">No rider assigned</p>
            </div>
          </div>
        );
      }

      return (
        <div className="flex min-w-40 items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700 bg-cover bg-center text-xs font-semibold text-white"
            style={
              rider.photo
                ? { backgroundImage: `url("${rider.photo}")` }
                : undefined
            }
          >
            {!rider.photo && getInitials(rider.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">
              {rider.name}
            </p>
            <p className="text-xs text-gray-500">
              {rider.vehicle.replaceAll("_", " ")}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    id: "destination",
    header: "Destination",
    cell: ({ row }) => {
      const destination = row.original.destination;
      if (!destination) {
        return <span className="text-sm text-gray-400">No destination</span>;
      }

      const area = [destination.area, destination.zone, destination.city]
        .filter(Boolean)
        .join(", ");
      return (
        <div className="max-w-72">
          <p className="line-clamp-2 text-sm text-gray-700">
            {destination.address || "—"}
          </p>
          {area && <p className="mt-1 text-xs text-gray-500">{area}</p>}
        </div>
      );
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
          row.original.status,
        )}`}
      >
        {row.original.status_label ||
          row.original.status.replaceAll("_", " ")}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const delivery = row.original;
      return (
        <div className="flex items-center gap-2">
          {delivery.actions.can_view && (
            <Link
              href={`/dashboard/parcel-management/all-parcel/${delivery.id}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
              aria-label={`View parcel ${delivery.parcel_id}`}
            >
              <Eye className="h-4 w-4" />
            </Link>
          )}
          {delivery.actions.can_call_rider && delivery.rider?.phone && (
            <a
              href={`tel:${delivery.rider.phone}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 transition hover:bg-green-200"
              aria-label={`Call ${delivery.rider.name}`}
            >
              <Phone className="h-4 w-4" />
            </a>
          )}
        </div>
      );
    },
  },
];

export default function OnGoingDelivery() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetDashboardOnGoingDeliveriesQuery({ page, limit });

  const deliveries = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const stableData = useMemo(() => deliveries, [deliveries]);
  const table = useReactTable({
    data: stableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 p-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Ongoing Deliveries
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {pagination?.total ?? 0} deliveries currently in progress
          </p>
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          aria-label="Refresh ongoing deliveries"
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap text-xs font-semibold uppercase text-gray-500"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-52 text-center text-sm text-gray-500"
                >
                  <Loader2 className="mx-auto mb-2 h-6 w-6 animate-spin text-[#FE5000]" />
                  Loading ongoing deliveries…
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-52 text-center text-sm text-red-600"
                >
                  Failed to load ongoing deliveries.
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="ml-2 font-medium underline"
                  >
                    Try again
                  </button>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.original.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-52 text-center text-gray-500"
                >
                  <Truck className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                  No ongoing deliveries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="border-t border-gray-200 p-4">
          <CustomPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
            totalItems={pagination.total}
            itemsPerPage={pagination.limit}
            show
            showItemsPerPage={false}
            showingLabel="Showing"
            resultsLabel="deliveries"
          />
        </div>
      )}
    </section>
  );
}
