import type { Column } from "@/components/reusable/DataTable";
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
  if (normalized.includes("DELIVERED")) return "bg-green-100 text-green-700";
  if (normalized.includes("RETURN")) return "bg-red-100 text-red-700";
  if (normalized.includes("TRANSIT") || normalized.includes("OUT_FOR"))
    return "bg-blue-100 text-blue-700";
  if (normalized.includes("CANCEL")) return "bg-gray-200 text-gray-700";
  return "bg-orange-100 text-orange-700";
};

export const parcelHistoryColumns: Column<ParcelHistoryItem>[] = [
  {
    key: "parcel",
    header: "Parcel",
    width: "12%",
    render: (row) => (
      <div>
        <p className="font-semibold">{row.parcel_tx_id || "—"}</p>
        <p className="text-xs text-gray-500">{row.tracking_number || "—"}</p>
        {row.merchant_order_id && (
          <p className="text-xs text-gray-400">
            Order: {row.merchant_order_id}
          </p>
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
          {row.customer?.customer_name || row.customer_name || "—"}
        </span>
        <span className="text-sm text-gray-500">
          {row.customer?.phone_number || row.customer_phone || "—"}
        </span>
        <span className="text-xs text-gray-400 line-clamp-2">
          {row.customer?.customer_address || row.customer_address || "—"}
        </span>
      </div>
    ),
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "14%",
    render: (row) => (
      <div className="flex flex-col">
        <span className="font-semibold">
          {row.store?.name || row.merchant?.user?.full_name || "—"}
        </span>
        <span className="text-xs text-gray-500">
          {row.store?.phone || row.merchant?.user?.phone || "—"}
        </span>
      </div>
    ),
  },
  {
    key: "rider",
    header: "Rider",
    width: "13%",
    render: (row) => (
      <div className="flex flex-col">
        <span className="font-semibold">
          {row.assigned_rider?.full_name || "Not assigned"}
        </span>
        <span className="text-xs text-gray-500">
          {row.assigned_rider?.phone || "—"}
        </span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "11%",
    render: (row) => (
      <span
        className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusClass(
          row.status,
        )}`}
      >
        {row.status.replaceAll("_", " ")}
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
