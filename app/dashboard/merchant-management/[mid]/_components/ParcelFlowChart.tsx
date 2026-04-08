"use client";

import { useId, useMemo, useState } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  ResponsiveContainer,
} from "recharts";
import type { GraphDataPoint } from "@/redux/features/merchant/merchantTypes";

/** Fallback when API sends no `graph` (same shape as Recharts expects) */
const EMPTY_CHART_DATA = [
  { name: "—", value: 0 },
];

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

function mapGraphToChartData(graph: GraphDataPoint[]) {
  return graph.map((g, index) => ({
    name: g.bucket ? formatBucketLabel(String(g.bucket)) : `Day ${index + 1}`,
    value: Number(g.count) || 0,
  }));
}

interface ParcelFlowChartProps {
  graph?: GraphDataPoint[];
  rangeLabel?: string;
}

export default function ParcelFlowChart({
  graph,
  rangeLabel,
}: ParcelFlowChartProps) {
  const gradientId = useId().replace(/:/g, "");
  const [activeTab, setActiveTab] = useState("weekly");

  const chartData = useMemo(() => {
    if (graph && graph.length > 0) {
      return mapGraphToChartData(graph);
    }
    return EMPTY_CHART_DATA;
  }, [graph]);

  const fillUrl = `url(#colorOrange-${gradientId})`;

  return (
    <div className="w-full bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Parcel Flow</h2>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("weekly")}
            className={`px-4 py-2 rounded-xl text-sm ${
              activeTab === "weekly"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {rangeLabel ? `Range (${rangeLabel})` : "Weekly (7 Days)"}
          </button>
        </div>
      </div>

      <div className="mt-6 h-[300px]">
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
            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
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
