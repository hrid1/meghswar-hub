import type { TopCards } from "@/redux/features/dashboard/dashboardTypes";
import { Bike, CircleCheck, TriangleAlert, Truck } from "lucide-react";
import React from "react";

const statusColors: Record<string, { background: string; foreground: string }> = {
  orange: { background: "bg-[#FFE9DA]", foreground: "text-[#FE5000]" },
  blue: { background: "bg-[#E8F4FD]", foreground: "text-[#1890FF]" },
  green: { background: "bg-[#E6F4EE]", foreground: "text-[#3A9D23]" },
  red: { background: "bg-[#FFEBEE]", foreground: "text-[#FF4D4F]" },
  gray: { background: "bg-[#F5F5F5]", foreground: "text-[#8C8C8C]" },
};

export default function StatsCard({ topCards }: { topCards: TopCards }) {
  const cards = [
    {
      number: topCards.parcels_to_process.value,
      subText: `+${topCards.parcels_to_process.received_last_hour} received last hour`,
      title: "Parcels to Process",
      icon: <TriangleAlert />,
      colorScheme: "orange",
    },
    {
      number: topCards.riders_active.value,
      subText: `${topCards.riders_active.value} of ${topCards.riders_active.total} riders`,
      title: "Riders Active",
      icon: <Bike />,
      colorScheme: "green",
    },
    {
      number: topCards.deliveries_in_progress.value,
      subText: `${topCards.deliveries_in_progress.average_per_active_rider.toFixed(1)} avg. per active rider`,
      title: "Deliveries in Progress",
      icon: <Truck />,
      colorScheme: "blue",
    },
    {
      number: `${topCards.live_success_rate.value}${topCards.live_success_rate.unit}`,
      subText: `${topCards.live_success_rate.today_change >= 0 ? "+" : ""}${topCards.live_success_rate.today_change}${topCards.live_success_rate.unit} ${topCards.live_success_rate.comparison}`,
      title: "Live Success Rate",
      icon: <CircleCheck />,
      colorScheme: "red",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <ParcelCard key={card.title} {...card} />
      ))}
    </section>
  );
}

const ParcelCard = ({
  number = 24,
  subText = "+3 in last hour",
  title = "Parcels to Process",
  icon,
  colorScheme,
}: {
  number: string | number;
  subText: string;
  title: string;
  icon: React.ReactNode;
  colorScheme: string;
}) => {
  const colors = statusColors[colorScheme] || statusColors.gray;

  return (
    <div className="flex min-h-36 flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors.background} ${colors.foreground}`}>
          {icon}
        </div>
        <div className="min-w-0 text-right">
          <p className="text-2xl font-bold text-gray-900">{number}</p>
          <p className="mt-1 text-xs leading-4 text-gray-500">{subText}</p>
        </div>
      </div>
      <h2 className="mt-5 text-base font-semibold text-gray-800">
        {title}
      </h2>
    </div>
  );
};
