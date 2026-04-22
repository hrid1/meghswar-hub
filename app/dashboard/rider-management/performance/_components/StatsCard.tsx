import {
  Users,
  TrendingUp,
  PackageCheck,
  PackageX,
  CalendarClock,
  ClipboardList,
} from "lucide-react";
import React from "react";

interface StatsCardProps {
  total_active_riders: number;
  overall_success_rate: number;
  total_delivered: number;
  total_assigned: number;
  total_rescheduled: number;
  total_returned: number;
}

export default function StatsCard({
  total_active_riders,
  overall_success_rate,
  total_delivered,
  total_assigned,
  total_rescheduled,
  total_returned,
}: StatsCardProps) {
  const stats = [
    {
      label: "Active Riders",
      value: total_active_riders,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Overall Success Rate",
      value: `${overall_success_rate}%`,
      icon: TrendingUp,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Total Delivered",
      value: total_delivered,
      icon: PackageCheck,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      label: "Total Assigned",
      value: total_assigned,
      icon: ClipboardList,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      label: "Total Rescheduled",
      value: total_rescheduled,
      icon: CalendarClock,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      label: "Total Returned",
      value: total_returned,
      icon: PackageX,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },
  ];

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const StatCard = ({ label, value, icon: Icon, iconBg, iconColor }: StatCardProps) => (
  <div className="border border-[#E3E3E3] rounded-xl p-5 flex flex-col gap-4">
    <span className={`${iconBg} rounded-lg inline-block mr-auto p-3`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </span>
    <div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-sm font-medium text-gray-400 mt-0.5">{label}</p>
    </div>
  </div>
);
