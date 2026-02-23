"use client";

import { useState } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { name: "Sat", value: 3200 },
  { name: "Sun", value: 4500 },
  { name: "Mon", value: 3000 },
  { name: "Tues", value: 5000 },
  { name: "Wed", value: 6200 },
  { name: "Thu", value: 4800 },
  { name: "Fri", value: 6000 },
];

export default function ParcelFlowChart() {
  const [activeTab, setActiveTab] = useState("weekly");

  return (
    <div className="w-full bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Parcel Flow</h2>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("weekly")}
            className={`px-4 py-2 rounded-xl text-sm ${
              activeTab === "weekly"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Weekly (7 Days)
          </button>

          <button className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 text-sm">
            Monthly (April) ▼
          </button>
        </div>
      </div>

      <div className="mt-6 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff6b00" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ff6b00" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#ff6b00"
              fillOpacity={1}
              fill="url(#colorOrange)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
