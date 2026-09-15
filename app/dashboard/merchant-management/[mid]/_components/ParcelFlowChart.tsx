"use client";

import { useId, useMemo } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  ResponsiveContainer,
} from "recharts";
import type {
  GraphDataPoint,
  MerchantOverviewRangeMode,
  ParcelFlowTotals,
} from "@/redux/features/merchant/merchantTypes";
import { Loader2 } from "lucide-react";

const EMPTY_CHART_DATA = [{ name: "—", value: 0 }];

function formatBucketLabel(bucket: string) {
  try {
    const d = new Date(bucket);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
    }
  } catch {
    /* ignore */
  }
  return bucket.length >= 10 ? bucket.slice(5, 10) : bucket;
}

function formatMoney(value?: number | null, currency = "BDT") {
  return `${currency} ${Number(value || 0).toLocaleString()}`;
}

function mapGraphToChartData(graph: GraphDataPoint[], currency: string) {
  return graph.map((point, index) => ({
    name: point.bucket
      ? formatBucketLabel(String(point.bucket))
      : `Day ${index + 1}`,
    value: Number(point.received_count ?? point.count) || 0,
    received_value: Number(point.received_value) || 0,
    platform_charge: Number(point.platform_charge) || 0,
    currency,
  }));
}

function FlowTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ payload: { value: number; received_value: number; platform_charge: number; currency: string } }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-3 text-sm shadow">
      <p className="mb-1 font-medium text-gray-800">{label}</p>
      <p>Received: {Number(point.value).toLocaleString()}</p>
      <p>Value: {formatMoney(point.received_value, point.currency)}</p>
      <p>Platform charge: {formatMoney(point.platform_charge, point.currency)}</p>
    </div>
  );
}

interface ParcelFlowChartProps {
  graph?: GraphDataPoint[];
  totals?: ParcelFlowTotals | null;
  rangeLabel?: string;
  mode: MerchantOverviewRangeMode;
  month: string;
  startDate: string;
  endDate: string;
  isFetching?: boolean;
  onModeChange: (mode: MerchantOverviewRangeMode) => void;
  onMonthChange: (month: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

const RANGE_TABS: { label: string; value: MerchantOverviewRangeMode }[] = [
  { label: "Last 7 Days", value: "last7d" },
  { label: "Month", value: "month" },
  { label: "Custom", value: "custom" },
];

export default function ParcelFlowChart({
  graph,
  totals,
  rangeLabel,
  mode,
  month,
  startDate,
  endDate,
  isFetching = false,
  onModeChange,
  onMonthChange,
  onStartDateChange,
  onEndDateChange,
}: ParcelFlowChartProps) {
  const gradientId = useId().replace(/:/g, "");
  const currency = totals?.currency || "BDT";

  const chartData = useMemo(() => {
    if (graph && graph.length > 0) {
      return mapGraphToChartData(graph, currency);
    }
    return EMPTY_CHART_DATA;
  }, [graph, currency]);

  const fillUrl = `url(#colorOrange-${gradientId})`;

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Parcel Flow</h2>
          {rangeLabel ? (
            <p className="mt-1 text-sm text-gray-500">Range: {rangeLabel}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 rounded-xl bg-gray-100 p-1">
            {RANGE_TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => onModeChange(tab.value)}
                className={`rounded-lg px-3 py-1.5 text-sm ${
                  mode === tab.value
                    ? "bg-orange-500 text-white"
                    : "text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {mode === "month" ? (
            <input
              type="month"
              value={month}
              onChange={(event) => onMonthChange(event.target.value)}
              className="h-9 rounded-lg border border-gray-200 px-3 text-sm text-gray-900 outline-none [color-scheme:light] focus:border-orange-500"
            />
          ) : null}

          {mode === "custom" ? (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(event) => onStartDateChange(event.target.value)}
                className="h-9 rounded-lg border border-gray-200 px-3 text-sm text-gray-900 outline-none [color-scheme:light] focus:border-orange-500"
              />
              <span className="text-sm text-gray-400">to</span>
              <input
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(event) => onEndDateChange(event.target.value)}
                className="h-9 rounded-lg border border-gray-200 px-3 text-sm text-gray-900 outline-none [color-scheme:light] focus:border-orange-500"
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Received Parcels</p>
          <p className="mt-2 text-2xl font-semibold text-orange-600">
            {Number(totals?.received_count || 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Received Value</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800">
            {formatMoney(totals?.received_value, currency)}
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Platform Charge</p>
          <p className="mt-2 text-2xl font-semibold text-green-600">
            {formatMoney(totals?.platform_charge, currency)}
          </p>
        </div>
      </div>

      <div className="relative mt-6 h-[300px]">
        {isFetching ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/70 text-sm text-gray-500">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-orange-500" />
            Updating parcel flow…
          </div>
        ) : null}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient
                id={`colorOrange-${gradientId}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#ff6b00" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ff6b00" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip content={<FlowTooltip />} />

            <Area
              type="monotone"
              dataKey="value"
              name="Received"
              stroke="#ff6b00"
              fillOpacity={1}
              fill={fillUrl}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
