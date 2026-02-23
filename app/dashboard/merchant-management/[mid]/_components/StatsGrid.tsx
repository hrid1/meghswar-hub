import React from "react";


export interface StatItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  bgColor?: string; // e.g. "bg-green-100"
}

interface StatsGridProps {
  items: StatItem[];
}
import { User, Truck, ShoppingBag } from "lucide-react";


const stats: StatItem[] = [
  {
    label: "No. Of Stores",
    value: 7,
    icon: <ShoppingBag size={20} />,
    colorKey: "white",
  },
  {
    label: "No. Of Operators",
    value: 4,
    icon: <User size={20} />,
    colorKey: "white",
  },
  {
    label: "Total Transactions",
    value: "৳1,187",
    colorKey: "white",
  },
  {
    label: "Parcel Delivered",
    value: 125,
    icon: <Truck size={20} />,
    colorKey: "delivered",
  },
  {
    label: "Parcel Returned",
    value: 125,
    colorKey: "returned",
  },
  {
    label: "Parcel Reported",
    value: 125,
    colorKey: "reported",
  },
];

export default function StatsGrids() {
  return <StatsGrid items={stats} />;
}





// main 

export interface StatItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  colorKey?: string; // <-- use mapped keys
}

interface StatsGridProps {
  items: StatItem[];
}

// Color mapping
const colorMap: Record<string, { bg: string; text: string }> = {
  white: { bg: "bg-white", text: "text-gray-800" },
  delivered: { bg: "bg-green-100", text: "text-green-500" },
  returned: { bg: "bg-purple-100", text: "text-purple-500" },
  reported: { bg: "bg-red-100", text: "text-red-500" },
};

function StatsGrid({ items }: StatsGridProps) {
  return (
    <div className="grid grid-cols-6 gap-4 w-full">
      {items.map((item, index) => {
        const colors = colorMap[item.colorKey || "white"];

        return (
          <div
            key={index}
            className={`p-4 rounded-xl shadow-sm border ${colors.bg}`}
          >
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              {item.icon}
              {item.label}
            </div>

            <div className={`text-2xl font-semibold mt-2 ${colors.text}`}>
              {item.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
