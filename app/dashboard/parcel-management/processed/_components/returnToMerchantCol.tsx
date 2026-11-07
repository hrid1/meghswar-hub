import React from "react";
import { CopyValueButton, TextHover } from "@/lib/table.utils";
import { ReturnParcel } from "@/redux/features/process-unprocess/processUnprocessType";

export const columns = [
  {
    key: "pid",
    header: "Original / Order ID",
    width: "14%",
    render: (row: ReturnParcel) => {
      const origId = row.original_parcel_id || row.parcel_tx_id;
      const orderId = row.merchant_order_id;
      return (
        <div className="font-medium">
          {origId && (
            <p className="flex items-center gap-1 whitespace-nowrap">
              <span>PID: {origId}</span>
              <CopyValueButton value={origId} label="Original Parcel ID" />
            </p>
          )}
          {orderId && (
            <p className="text-xs text-gray-500 flex items-center gap-1 whitespace-nowrap">
              <span>MID: {orderId}</span>
              <CopyValueButton value={orderId} label="Merchant Order ID" />
            </p>
          )}
        </div>
      );
    },
  },
  {
    key: "rid",
    header: "Return Parcel ID",
    width: "14%",
    render: (row: ReturnParcel) => {
      const returnId = row.new_parcel_id || row.return_parcel?.parcel_tx_id;
      const trk = row.return_parcel?.tracking_number;
      return (
        <div className="font-medium">
          {returnId ? (
            <p className="flex items-center gap-1 whitespace-nowrap text-purple-700">
              <span>RID: {returnId}</span>
              <CopyValueButton value={returnId} label="Return Parcel ID" />
            </p>
          ) : (
            <span className="text-xs text-gray-400">Pending RID</span>
          )}
          {trk && (
            <p className="text-xs text-gray-500 flex items-center gap-1 whitespace-nowrap">
              <span>TRK: {trk}</span>
              <CopyValueButton value={trk} label="Tracking Number" />
            </p>
          )}
        </div>
      );
    },
  },
  {
    key: "destination",
    header: "Destination",
    width: "16%",
    render: (row: ReturnParcel) => (
      <TextHover
        text={row.destination || "N/A"}
        maxLength={40}
        className="text-gray-700 text-sm"
      />
    ),
  },
  {
    key: "zone",
    header: "Zone",
    width: "12%",
    render: (row: ReturnParcel) => {
      if (typeof row.zone === "object" && row.zone !== null) {
        return (
          <div className="text-sm">
            <span className="font-semibold">{row.zone.name || "N/A"}</span>
            {row.zone.area_name && (
              <p className="text-xs text-gray-500">{row.zone.area_name}</p>
            )}
          </div>
        );
      }
      return <span className="font-semibold text-sm">{row.zone || "N/A"}</span>;
    },
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "15%",
    render: (row: ReturnParcel) => {
      const merchantName =
        row.merchant_name || row.merchant?.name || row.store?.name || "N/A";
      const merchantPhone =
        row.merchant_phone || row.merchant?.phone || row.store?.phone || "";
      return (
        <div>
          <div className="font-semibold text-gray-900 text-sm">{merchantName}</div>
          {merchantPhone && (
            <div className="text-xs text-gray-500">{merchantPhone}</div>
          )}
        </div>
      );
    },
  },
  {
    key: "status",
    header: "Status",
    width: "12%",
    render: (row: ReturnParcel) => {
      return (
        <span className="px-2.5 py-1 text-xs font-medium rounded-full inline-block bg-red-100 text-red-700 border border-red-200">
          {row.status?.replace(/_/g, " ") || "RETURN TO MERCHANT"}
        </span>
      );
    },
  },
  {
    key: "charges",
    header: "Charges",
    width: "14%",
    render: (row: ReturnParcel) => {
      const charges = row.charges || row.cod_breakdown;
      const cod = charges?.cod_amount ?? charges?.cod_collected_amount ?? 0;
      return (
        <div>
          <div className="text-green-600 font-bold text-base">
            ৳{cod.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 mt-0.5 space-y-0.5">
            <div>Delivery: ৳{charges?.delivery_charge || 0}</div>
            <div>Return Charge: ৳{charges?.return_charge || 0}</div>
            <div>Total: ৳{charges?.total_charge || 0}</div>
          </div>
        </div>
      );
    },
  },
  {
    key: "age",
    header: "Age",
    width: "10%",
    render: (row: ReturnParcel) => (
      <div className="text-sm">
        <span className="font-medium text-gray-700">
          {row.age?.display || row.age?.total_age || "N/A"}
        </span>
      </div>
    ),
  },
];
