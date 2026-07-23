"use client";
import type { HubDashboardParcelFlowResponse } from "@/redux/features/dashboard/dashboardTypes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import { Loader2 } from "lucide-react";

export default function ParcelFlowChart({
  flow,
  isLoading = false,
  isError = false,
}: {
  flow?: HubDashboardParcelFlowResponse["data"];
  isLoading?: boolean;
  isError?: boolean;
}) {
  const metrics = flow?.metrics;
  const data = [
    {
      name: "Received",
      value: metrics?.parcels_received ?? 0,
      color: "#FE5000",
    },
    {
      name: "Dispatched",
      value: metrics?.parcels_dispatched ?? 0,
      color: "#22C55E",
    },
    {
      name: "Reported",
      value: metrics?.parcels_reported ?? 0,
      color: "#EF4444",
    },
  ];

  const rangeLabel =
    flow?.range.start_date && flow?.range.end_date
      ? `${new Date(flow.range.start_date).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })} – ${new Date(flow.range.end_date).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })}`
      : "Current range";

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Parcel Flow</h2>
          <p className="mt-1 text-sm text-gray-500">
            Received, dispatched and reported parcels
          </p>
        </div>
        <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-medium text-[#FE5000]">
          {rangeLabel}
        </span>
      </div>

      {isLoading ? (
        <div className="flex h-[300px] items-center justify-center text-gray-500">
          <Loader2 className="mr-2 h-5 w-5 animate-spin text-[#FE5000]" />
          Loading parcel flow…
        </div>
      ) : isError ? (
        <div className="flex h-[300px] items-center justify-center text-sm text-red-600">
          Failed to load parcel flow.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: -15, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => Number(value).toLocaleString()} />
            <Bar dataKey="value" barSize={56} radius={[8, 8, 0, 0]}>
              <LabelList dataKey="value" position="top" />
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
