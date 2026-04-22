import { RiderPerformanceItem } from "@/redux/features/rider/riderType";

const formatDate = (iso: string | null) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const riderPerformanceColumns = [
  {
    key: "rider_name",
    header: "Rider",
    width: "22%",
    render: (row: RiderPerformanceItem) => (
      <div className="flex items-center gap-3">
        <img
          src={row.photo ?? `https://i.pravatar.cc/150?u=${row.rider_id}`}
          className="w-8 h-8 rounded-full object-cover shrink-0"
          alt={row.rider_name}
        />
        <div>
          <p className="font-semibold leading-tight">{row.rider_name}</p>
          <p className="text-xs text-gray-500">{row.rider_phone}</p>
        </div>
      </div>
    ),
  },
  {
    key: "delivered",
    header: "Delivered",
    width: "10%",
    render: (row: RiderPerformanceItem) => (
      <span className="font-medium text-green-600">{row.delivered}</span>
    ),
  },
  {
    key: "rescheduled",
    header: "Rescheduled",
    width: "11%",
    render: (row: RiderPerformanceItem) => (
      <span className="font-medium text-yellow-600">{row.rescheduled}</span>
    ),
  },
  {
    key: "returned",
    header: "Returned",
    width: "10%",
    render: (row: RiderPerformanceItem) => (
      <span className="font-medium text-red-500">{row.returned}</span>
    ),
  },
  {
    key: "assigned",
    header: "Assigned",
    width: "10%",
  },
  {
    key: "commission",
    header: "Commission",
    width: "12%",
    render: (row: RiderPerformanceItem) => (
      <span className="font-medium">৳{row.commission.toLocaleString()}</span>
    ),
  },
  {
    key: "success_rate",
    header: "Success Rate",
    width: "12%",
    render: (row: RiderPerformanceItem) => {
      const rate = row.success_rate;
      const color =
        rate >= 90
          ? "text-green-600"
          : rate >= 75
          ? "text-yellow-600"
          : "text-red-500";
      return <span className={`font-semibold ${color}`}>{rate}%</span>;
    },
  },
  {
    key: "last_delivery_date",
    header: "Last Delivery",
    width: "13%",
    render: (row: RiderPerformanceItem) => (
      <span className="text-gray-600">{formatDate(row.last_delivery_date)}</span>
    ),
  },
];
