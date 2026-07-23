"use client";

import { useGetDashboardRiderStatusQuery } from "@/redux/features/dashboard/dashboardApi";
import type { DashboardRiderStatusItem } from "@/redux/features/dashboard/dashboardTypes";
import { Bike, Loader2, RefreshCw, Users } from "lucide-react";
import { useMemo, useState } from "react";

type Filter = "all" | "on_duty" | "break" | "leave";

const statusColors: Record<string, { dot: string; text: string }> = {
  on_duty: { dot: "bg-green-500", text: "text-green-700" },
  break: { dot: "bg-amber-500", text: "text-amber-700" },
  leave: { dot: "bg-gray-400", text: "text-gray-600" },
};

export default function RiderStatus() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const { data, isLoading, isError, refetch, isFetching } =
    useGetDashboardRiderStatusQuery();

  const riderData = data?.data;
  const items = useMemo(() => {
    const riders = riderData?.items ?? [];
    return activeFilter === "all"
      ? riders
      : riders.filter((rider) => rider.status === activeFilter);
  }, [activeFilter, riderData?.items]);

  const filters: { value: Filter; label: string; color?: string }[] = [
    { value: "all", label: "All" },
    { value: "on_duty", label: "On Duty", color: "bg-green-500" },
    { value: "break", label: "Break", color: "bg-amber-500" },
    { value: "leave", label: "Leave", color: "bg-gray-400" },
  ];

  return (
    <section className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Rider Status</h3>
            <p className="mt-1 text-sm text-gray-500">
              Live availability and workload
            </p>
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
            aria-label="Refresh rider status"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const count = riderData?.counts[filter.value] ?? 0;
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? "border-[#FE5000] bg-orange-50 text-[#FE5000]"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {filter.color && (
                  <span className={`h-2 w-2 rounded-full ${filter.color}`} />
                )}
                {filter.label}
                <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="custom-scroll h-[315px] overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-[#FE5000]" />
            Loading riders…
          </div>
        ) : isError ? (
          <div className="flex h-full flex-col items-center justify-center text-center text-sm text-red-600">
            <p>Failed to load rider status.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-2 font-medium underline"
            >
              Try again
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-gray-400">
            <Users className="mb-2 h-8 w-8" />
            <p className="text-sm">No riders in this status</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((rider) => (
              <RiderRow key={rider.id} rider={rider} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function RiderRow({ rider }: { rider: DashboardRiderStatusItem }) {
  const colors = statusColors[rider.status] || statusColors.leave;
  const initials = rider.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-gray-50">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-700 bg-cover bg-center text-sm font-semibold text-white"
        style={
          rider.photo ? { backgroundImage: `url("${rider.photo}")` } : undefined
        }
      >
        {!rider.photo && initials}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-semibold text-gray-900">{rider.name}</p>
          <span className="shrink-0 text-xs text-gray-400">
            {rider.rider_code || "—"}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <p className={`flex items-center gap-2 text-xs ${colors.text}`}>
            <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
            {rider.status_label}
          </p>
          <p className="flex items-center gap-1 text-xs text-gray-500">
            <Bike className="h-3.5 w-3.5" />
            {rider.assigned_parcels_count} assigned
          </p>
        </div>
      </div>
    </div>
  );
}
