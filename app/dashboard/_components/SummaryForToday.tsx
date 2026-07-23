import type { SummaryForTodaysParcel } from "@/redux/features/dashboard/dashboardTypes";
import {
  CircleCheck,
  Clock3,
  PackagePlus,
  RotateCcw,
  UserCheck,
} from "lucide-react";

const colors = [
  "bg-orange-50 text-[#FE5000]",
  "bg-blue-50 text-blue-600",
  "bg-violet-50 text-violet-600",
  "bg-green-50 text-green-600",
  "bg-red-50 text-red-600",
];

export default function SummaryForToday({
  summary,
}: {
  summary: SummaryForTodaysParcel;
}) {
  const currency = summary.currency || "BDT";
  const items = [
    { title: "New Parcels", data: summary.new_parcels, icon: <PackagePlus /> },
    { title: "Picked Up", data: summary.pick_up, icon: <Clock3 /> },
    { title: "Assigned", data: summary.assigned, icon: <UserCheck /> },
    { title: "Delivered", data: summary.delivered, icon: <CircleCheck /> },
    {
      title: "Rescheduled",
      data: summary.delivery_rescheduled,
      icon: <RotateCcw />,
    },
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">
          Today&apos;s Parcel Summary
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Count and collection amount by current stage
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 2xl:grid-cols-5">
        {items.map((item, index) => (
          <div
            key={item.title}
            className="rounded-xl border border-gray-100 bg-gray-50/60 p-4"
          >
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${colors[index]}`}
            >
              {item.icon}
            </div>
            <p className="text-sm font-medium text-gray-600">{item.title}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {item.data.count.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {currency} {item.data.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
