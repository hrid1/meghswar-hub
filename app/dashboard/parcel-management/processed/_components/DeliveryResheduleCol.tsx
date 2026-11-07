import React from "react";
import { RescheduledParcel } from "@/redux/features/process-unprocess/processUnprocessType";
import { CopyValueButton, TextHover } from "@/lib/table.utils";

export const columns = [
  {
    key: "parcelId",
    header: "Parcel ID",
    width: "14%",
    render: (row: RescheduledParcel) => {
      const pid = row.parcel_tx_id || row.parcel_id || row.id;
      const mid = row.merchant_order_id;
      return (
        <div className="font-medium">
          <p className="flex items-center gap-1 whitespace-nowrap">
            <span>PID: {pid}</span>
            <CopyValueButton value={pid} label="Parcel ID" />
          </p>
          {mid && (
            <p className="text-xs text-gray-500 flex items-center gap-1 whitespace-nowrap">
              <span>MID: {mid}</span>
              <CopyValueButton value={mid} label="Merchant Order ID" />
            </p>
          )}
        </div>
      );
    },
  },
  {
    key: "reason",
    header: "Reason",
    width: "14%",
    render: (row: RescheduledParcel) => (
      <TextHover text={row.reason || "N/A"} maxLength={35} />
    ),
  },
  {
    key: "destination",
    header: "Destination",
    width: "16%",
    render: (row: RescheduledParcel) => (
      <div className="text-sm">
        {row.customer_name && (
          <p className="font-semibold text-gray-900">{row.customer_name}</p>
        )}
        {row.customer_phone && (
          <p className="text-xs text-gray-500">{row.customer_phone}</p>
        )}
        <TextHover
          text={row.destination || row.customer_address || "N/A"}
          maxLength={35}
          className="text-gray-600"
        />
      </div>
    ),
  },
  {
    key: "zone",
    header: "Zone",
    width: "12%",
    render: (row: RescheduledParcel) => {
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
      if (row.delivery_coverage_area) {
        const area = row.delivery_coverage_area;
        return (
          <div className="text-sm">
            <span className="font-semibold">{area.city || area.zone || "N/A"}</span>
            {area.area && <p className="text-xs text-gray-500">{area.area}</p>}
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
    render: (row: RescheduledParcel) => {
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
    render: (row: RescheduledParcel) => {
      return (
        <span className="px-2.5 py-1 text-xs font-medium rounded-full inline-block bg-blue-100 text-blue-700 border border-blue-200">
          {row.status?.replace(/_/g, " ") || "RESCHEDULED"}
        </span>
      );
    },
  },
  {
    key: "charges",
    header: "COD & Charges",
    width: "14%",
    render: (row: RescheduledParcel) => {
      const charges = row.charges || row.cod_breakdown;
      const cod = charges?.cod_amount ?? row.cod_amount ?? 0;
      return (
        <div>
          <div className="text-green-600 font-bold text-base">
            ৳{cod.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 mt-0.5 space-y-0.5">
            <div>Delivery: ৳{charges?.delivery_charge || 0}</div>
            <div>COD: ৳{charges?.cod_charge || 0}</div>
            <div>Total: ৳{charges?.total_charge || 0}</div>
          </div>
        </div>
      );
    },
  },
  {
    key: "rescheduleCount",
    header: "Reschedules",
    width: "8%",
    render: (row: RescheduledParcel) => (
      <div className="font-semibold text-center bg-orange-100 text-orange-800 rounded-md py-0.5 px-2 text-xs w-fit mx-auto">
        {row.reschedule_count ?? row.attempt ?? 1}
      </div>
    ),
  },
  {
    key: "age",
    header: "Age",
    width: "10%",
    render: (row: RescheduledParcel) => (
      <div className="text-sm">
        <span className="font-medium text-gray-700">
          {row.age?.display || row.age?.total_age || "N/A"}
        </span>
      </div>
    ),
  },
];
