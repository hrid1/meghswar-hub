"use client";

import type { Parcel2 } from "@/redux/features/parcels/parcelTypes";

// Assigned parcel row (outgoing list API)
function deliveryAreaLabel(da: string | { area?: string; zone?: string; city?: string; division?: string } | null): string {
  if (da == null) return "—";
  if (typeof da === "string") return da;
  if (typeof da === "object" && da !== null) {
    const parts = [da.area, da.zone, da.city].filter(Boolean);
    return parts.length ? parts.join(", ") : (da.division ?? "—");
  }
  return "—";
}

export const parcelColumns1 = (onClickUpdate?: (row: Parcel2) => void) => [
  {
    key: "parcelId",
    header: "Parcel Id",
    width: "10%",
    render: (row: Parcel2) => (
      <div>
        <span className="font-semibold">{row.parcel_tx_id || row.id}</span>
        <div className="text-xs text-gray-500">{row.tracking_number}</div>
      </div>
    ),
  },
  {
    key: "customerInfo",
    header: "Customer",
    width: "18%",
    wrap: true,
    render: (row: Parcel2) => {
      const address = row.customer_address || "";
      const needsTruncation = address.length > 50;
      return (
        <div className="flex flex-col">
          <span className="font-semibold">{row.customer_name || "—"}</span>
          <span className="text-sm text-gray-500">{row.customer_phone || "—"}</span>
          <div className="relative group">
            <span className="text-xs text-gray-400 line-clamp-2">{address || "—"}</span>
            {needsTruncation && (
              <div className="absolute left-0 bottom-full mb-2 z-50 hidden group-hover:block">
                <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg max-w-xs whitespace-normal">
                  {address}
                  <div className="w-3 h-3 bg-gray-800 rotate-45 absolute left-4 -bottom-1.5" />
                </div>
              </div>
            )}
          </div>
        </div>
      );
    },
  },
  {
    key: "note",
    header: "Additional Note",
    width: "14%",
    wrap: true,
    render: (row: Parcel2) => {
      const note =
        row.special_instructions ||
        row.admin_notes ||
        row.product_description ||
        "";
      const needsTruncation = note.length > 50;
      if (!note) return <span className="text-gray-400">—</span>;
      return (
        <div className="relative group">
          <span className="text-sm text-gray-600 line-clamp-2">{note}</span>
          {needsTruncation && (
            <div className="absolute left-0 bottom-full mb-2 z-50 hidden group-hover:block">
              <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg max-w-xs whitespace-normal">
                {note}
                <div className="w-3 h-3 bg-gray-800 rotate-45 absolute left-4 -bottom-1.5" />
              </div>
            </div>
          )}
        </div>
      );
    },
  },
  {
    key: "assignHub",
    header: "Assign Hub",
    width: "10%",
    render: (row: Parcel2) => (
      <span className="text-sm">
        {row.destinationHub?.branch_name ?? "—"}
      </span>
    ),
  },
  {
    key: "area",
    header: "Area",
    width: "8%",
    render: (row: Parcel2) => (
      <span className="text-sm">
        {typeof row.delivery_area === "string"
          ? row.delivery_area
          : deliveryAreaLabel(row.delivery_area)}
      </span>
    ),
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "14%",
    render: (row: Parcel2) => (
      <div>
        <div className="font-semibold">
          {row.store?.business_name ?? "—"}
        </div>
        {row.store?.phone_number && (
          <div className="text-xs text-gray-500">{row.store.phone_number}</div>
        )}
      </div>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    width: "10%",
    render: (row: Parcel2) => (
      <div>
        <div className="font-semibold">
          ৳{Number(row.cod_amount ?? 0).toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">
          Charge: ৳{Number(row.total_charge ?? 0).toLocaleString()}
        </div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "10%",
    render: (row: Parcel2) => {
      const status = row.status ?? "";
      const statusLower = status.toLowerCase();
      const cls =
        statusLower.includes("delivered")
          ? "bg-green-100 text-green-600"
          : statusLower.includes("return")
            ? "bg-red-100 text-red-600"
            : statusLower.includes("transit") || statusLower.includes("out")
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-600";
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${cls}`}>
          {status.replace(/_/g, " ") || "—"}
        </span>
      );
    },
  },
  {
    key: "attempt",
    header: "Attempt",
    width: "6%",
    render: (row: Parcel2) => (
      <span className="font-medium">{row.reschedule_count ?? "—"}</span>
    ),
  },
  {
    key: "age",
    header: "Age",
    width: "8%",
    render: (row: Parcel2) =>
      row.created_at ? (
        <div className="text-xs">
          {new Date(row.created_at).toLocaleDateString()}
        </div>
      ) : (
        <span>—</span>
      ),
  },
  ...(onClickUpdate
    ? [
        {
          key: "action",
          header: "Action",
          width: "8%",
          render: (row: Parcel2) => (
            <button
              type="button"
              onClick={() => onClickUpdate(row)}
              className="px-2 py-1 text-xs bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Update
            </button>
          ),
        },
      ]
    : []),
];
