import type { Column } from "@/components/reusable/DataTable";
import { txt } from "@/lib/utils";
import type { ParcelHistoryItem } from "@/redux/features/parcels/parcelTypes";

const formatMoney = (value: number | string | null | undefined) =>
  Number(value ?? 0).toLocaleString();

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
};

const getStatusClass = (status: string) => {
  const normalized = status.toUpperCase();
  if (normalized === "DELIVERED") return "bg-green-100 text-green-700";
  if (normalized === "PARTIAL_DELIVERY") return "bg-emerald-100 text-emerald-700";
  if (normalized === "EXCHANGE") return "bg-purple-100 text-purple-700";
  if (normalized === "PAID_RETURN") return "bg-amber-100 text-amber-700";
  if (normalized.includes("RETURN")) return "bg-red-100 text-red-700";
  return "bg-orange-100 text-orange-700";
};

const riderName = (row: ParcelHistoryItem) => {
  const rider = row.assigned_rider as
    | string
    | {
        full_name?: string | null;
        rider_name?: string | null;
        phone?: string | null;
        user?: { full_name?: string | null; phone?: string | null } | null;
      }
    | null
    | undefined;
  if (!rider) return { name: "Not assigned", phone: "" };
  if (typeof rider === "string") return { name: rider, phone: "" };
  return {
    name:
      txt(rider.full_name) ||
      txt(rider.rider_name) ||
      txt(rider.user?.full_name) ||
      "Not assigned",
    phone: txt(rider.phone) || txt(rider.user?.phone),
  };
};

export const parcelHistoryColumns: Column<ParcelHistoryItem>[] = [
  {
    key: "parcel",
    header: "Parcel",
    width: "12%",
    render: (row) => (
      <div>
        <p className="font-semibold">{txt(row.parcel_tx_id, "—")}</p>
        <p className="text-xs text-gray-500">{txt(row.tracking_number, "—")}</p>
        {txt(row.merchant_order_id) && (
          <p className="text-xs text-gray-400">Order: {txt(row.merchant_order_id)}</p>
        )}
      </div>
    ),
  },
  {
    key: "customerInfo",
    header: "Customer",
    width: "17%",
    wrap: true,
    render: (row) => (
      <div className="flex flex-col">
        <span className="font-semibold">
          {txt(row.customer?.customer_name) || txt(row.customer_name, "—")}
        </span>
        <span className="text-sm text-gray-500">
          {txt(row.customer?.phone_number) || txt(row.customer_phone, "—")}
        </span>
        <span className="text-xs text-gray-400 line-clamp-2">
          {txt(row.customer?.customer_address) || txt(row.customer_address, "—")}
        </span>
      </div>
    ),
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "14%",
    render: (row) => {
      const store = row.store as {
        name?: string;
        phone?: string;
        business_name?: string;
        phone_number?: string;
      } | undefined;
      return (
        <div className="flex flex-col">
          <span className="font-semibold">
            {txt(store?.name) ||
              txt(store?.business_name) ||
              txt(row.merchant?.user?.full_name, "—")}
          </span>
          <span className="text-xs text-gray-500">
            {txt(store?.phone) ||
              txt(store?.phone_number) ||
              txt(row.merchant?.user?.phone, "—")}
          </span>
        </div>
      );
    },
  },
  {
    key: "rider",
    header: "Rider",
    width: "13%",
    render: (row) => {
      const rider = riderName(row);
      return (
        <div className="flex flex-col">
          <span className="font-semibold">{rider.name}</span>
          <span className="text-xs text-gray-500">{rider.phone || "—"}</span>
        </div>
      );
    },
  },
  {
    key: "status",
    header: "Status",
    width: "11%",
    render: (row) => (
      <span
        className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusClass(
          txt(row.status),
        )}`}
      >
        {txt(row.status, "—").replaceAll("_", " ")}
      </span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    width: "10%",
    render: (row) => (
      <div>
        <p className="font-semibold">
          ৳ {formatMoney(row.cod_breakdown?.cod_amount ?? row.cod_amount)}
        </p>
        <p className="text-xs text-gray-500">
          {row.is_cod ? "COD" : "Prepaid"}
        </p>
      </div>
    ),
  },
  {
    key: "deliveryCharge",
    header: "Charges",
    width: "13%",
    render: (row) => (
      <div className="text-xs text-gray-600 leading-4">
        <p>
          Delivery: ৳
          {formatMoney(
            row.cod_breakdown?.delivery_charge ?? row.delivery_charge,
          )}
        </p>
        <p>
          Weight: ৳
          {formatMoney(row.cod_breakdown?.weight_charge ?? row.weight_charge)}
        </p>
        <p>Total: ৳{formatMoney(row.total_charge)}</p>
      </div>
    ),
  },
  {
    key: "createdAt",
    header: "Timeline",
    width: "14%",
    render: (row) => (
      <div className="text-xs text-gray-500">
        <p>Created: {formatDate(row.created_at)}</p>
        <p>Updated: {formatDate(row.updated_at)}</p>
        {row.delivered_at && <p>Delivered: {formatDate(row.delivered_at)}</p>}
      </div>
    ),
  },
];
