import { AcceptedPickup } from "@/redux/features/pickup-request/pickupRequestType";

const formatDate = (iso: string | null) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const confirmedPickupColumns = () => [
  {
    key: "request_code",
    header: "Request ID",
    width: "12%",
    render: (row: AcceptedPickup) => (
      <span className="font-semibold text-[#FE5000]">{row.request_code}</span>
    ),
  },
  {
    key: "store",
    header: "Store",
    width: "20%",
    render: (row: AcceptedPickup) => (
      <div>
        <p className="font-semibold leading-tight">{row.store.business_name}</p>
        <p className="text-xs text-gray-500">{row.store.phone_number}</p>
        <p className="text-xs text-gray-400 truncate max-w-[180px]">
          {row.store.business_address}
        </p>
      </div>
    ),
  },
  {
    key: "assignedRider",
    header: "Assigned Rider",
    width: "18%",
    render: (row: AcceptedPickup) =>
      row.assignedRider ? (
        <div className="flex items-center gap-2">
          <img
            src={
              row.assignedRider.photo ??
              `https://i.pravatar.cc/150?u=${row.assignedRider.id}`
            }
            className="w-7 h-7 rounded-full object-cover shrink-0"
            alt={row.assignedRider.user.full_name}
          />
          <div>
            <p className="font-semibold leading-tight">
              {row.assignedRider.user.full_name}
            </p>
            <p className="text-xs text-gray-500">
              {row.assignedRider.user.phone}
            </p>
          </div>
        </div>
      ) : (
        <span className="text-gray-400 text-sm">Unassigned</span>
      ),
  },
  {
    key: "estimated_parcels",
    header: "Parcels",
    width: "9%",
    render: (row: AcceptedPickup) => (
      <div className="text-center">
        <p className="font-semibold">{row.estimated_parcels}</p>
        <p className="text-xs text-gray-400">estimated</p>
      </div>
    ),
  },
  {
    key: "picked_up_count",
    header: "Picked Up",
    width: "10%",
    render: (row: AcceptedPickup) => (
      <span className="font-medium">{row.picked_up_count}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "11%",
    render: (row: AcceptedPickup) => {
      const colors: Record<string, string> = {
        CONFIRMED: "bg-blue-100 text-blue-700",
        PICKED_UP: "bg-green-100 text-green-700",
        CANCELLED: "bg-red-100 text-red-600",
        COMPLETED: "bg-emerald-100 text-emerald-700",
      };
      return (
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            colors[row.status] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {row.status}
        </span>
      );
    },
  },
  {
    key: "comment",
    header: "Comment",
    width: "12%",
    render: (row: AcceptedPickup) => (
      <span className="text-sm text-gray-500">{row.comment || "—"}</span>
    ),
  },
  {
    key: "confirmed_at",
    header: "Confirmed At",
    width: "12%",
    render: (row: AcceptedPickup) => (
      <span className="text-sm text-gray-600">
        {formatDate(row.confirmed_at)}
      </span>
    ),
  },
];
