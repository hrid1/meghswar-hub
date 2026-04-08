import React from "react";
import { Truck, ShoppingBag } from "lucide-react";
import type { MerchantOverviewData } from "@/redux/features/merchant/merchantTypes";

export interface StatItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  colorKey?: string;
}

const colorMap: Record<string, { bg: string; text: string }> = {
  white: { bg: "bg-white", text: "text-gray-800" },
  delivered: { bg: "bg-green-100", text: "text-green-500" },
  returned: { bg: "bg-purple-100", text: "text-purple-500" },
  reported: { bg: "bg-red-100", text: "text-red-500" },
};

function StatsGrid({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
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

function buildStatsFromOverview(overview: MerchantOverviewData): StatItem[] {
  const { store_count, parcel_totals } = overview;
  return [
    {
      label: "No. Of Stores",
      value: store_count,
      icon: <ShoppingBag size={20} />,
      colorKey: "white",
    },
    {
      label: "Total Parcels",
      value: parcel_totals.total,
      icon: <Truck size={20} />,
      colorKey: "white",
    },
    {
      label: "Parcel Delivered",
      value: parcel_totals.delivered,
      icon: <Truck size={20} />,
      colorKey: "delivered",
    },
    {
      label: "Parcel Returned",
      value: parcel_totals.returned,
      colorKey: "returned",
    },
    {
      label: "Parcel Reported",
      value: parcel_totals.reported,
      colorKey: "reported",
    },
  ];
}

const fallbackStats: StatItem[] = [
  {
    label: "No. Of Stores",
    value: "—",
    icon: <ShoppingBag size={20} />,
    colorKey: "white",
  },
  {
    label: "Total Parcels",
    value: "—",
    icon: <Truck size={20} />,
    colorKey: "white",
  },
  {
    label: "Parcel Delivered",
    value: "—",
    icon: <Truck size={20} />,
    colorKey: "delivered",
  },
  {
    label: "Parcel Returned",
    value: "—",
    colorKey: "returned",
  },
  {
    label: "Parcel Reported",
    value: "—",
    colorKey: "reported",
  },
];

interface StatsGridsProps {
  overview?: MerchantOverviewData | null;
}

export default function StatsGrids({ overview }: StatsGridsProps) {
  const items = overview ? buildStatsFromOverview(overview) : fallbackStats;
  return <StatsGrid items={items} />;
}
