"use client";
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

const data = [
  { name: "Parcels Received", value: 892, color: "#FF7300" },
  { name: "Parcels Dispatched", value: 756, color: "#00C49F" },
  { name: "Parcels Reported", value: 103, color: "#FF6B6B" },
];

export default function ParcelFlowChart() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg">Parcel Flow</h2>
          <p className="text-gray-500 text-sm">Today</p>
        </div>
        <select className="border border-gray-300 rounded-lg px-2 py-1 text-sm">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" barSize={60} radius={[8, 8, 0, 0]}>
            <LabelList dataKey="value" position="top" />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
