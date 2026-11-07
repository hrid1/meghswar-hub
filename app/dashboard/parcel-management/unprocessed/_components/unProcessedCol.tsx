import React from "react";
import { CopyValueButton, TextHover } from "@/lib/table.utils";
import { DeliveryOutcomeParcel } from "@/redux/features/process-unprocess/processUnprocessType";

export const columns = [
  {
    key: "parcel_tx_id",
    header: "Parcel ID",
    width: "14%",
    render: (row: DeliveryOutcomeParcel) => {
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
    render: (row: DeliveryOutcomeParcel) => (
      <TextHover text={row.reason || "N/A"} maxLength={35} />
    ),
  },
  {
    key: "destination",
    header: "Destination",
    width: "15%",
    render: (row: DeliveryOutcomeParcel) => {
      const customer = row.customer;
      return (
        <div className="text-sm">
          {customer?.name && (
            <p className="font-semibold text-gray-900">{customer.name}</p>
          )}
          {customer?.phone && (
            <p className="text-xs text-gray-500">{customer.phone}</p>
          )}
          <TextHover
            text={row.destination || "N/A"}
            maxLength={35}
            className="text-gray-600"
          />
        </div>
      );
    },
  },
  {
    key: "zone",
    header: "Zone",
    width: "12%",
    render: (row: DeliveryOutcomeParcel) => {
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
      return <span className="font-semibold">{row.zone || "N/A"}</span>;
    },
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "15%",
    render: (row: DeliveryOutcomeParcel) => {
      const merchantName = row.merchant?.name || row.store?.name || "N/A";
      const merchantPhone = row.merchant?.phone || row.store?.phone || "";
      return (
        <div>
          <div className="font-semibold text-gray-900">{merchantName}</div>
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
    render: (row: DeliveryOutcomeParcel) => {
      const getStatusBadge = (status?: string) => {
        switch (status) {
          case "PARTIAL_DELIVERY":
            return "bg-yellow-100 text-yellow-700 border border-yellow-200";
          case "DELIVERED":
            return "bg-green-100 text-green-700 border border-green-200";
          case "PAID_RETURN":
            return "bg-purple-100 text-purple-700 border border-purple-200";
          case "EXCHANGE":
            return "bg-blue-100 text-blue-700 border border-blue-200";
          case "RETURNED":
          default:
            return "bg-red-100 text-red-700 border border-red-200";
        }
      };

      return (
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full inline-block ${getStatusBadge(
            row.status
          )}`}
        >
          {row.status?.replace(/_/g, " ") || "UNKNOWN"}
        </span>
      );
    },
  },
  {
    key: "charges",
    header: "Charges",
    width: "15%",
    render: (row: DeliveryOutcomeParcel) => {
      const charges = row.charges || row.cod_breakdown;
      const cod = charges?.cod_amount ?? charges?.cod_collected_amount ?? 0;
      return (
        <div>
          <div className="text-green-600 font-bold text-base">
            ৳{cod.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 mt-0.5 space-y-0.5">
            <div>Delivery: ৳{charges?.delivery_charge || 0}</div>
            <div>Return: ৳{charges?.return_charge || 0}</div>
            <div>Total: ৳{charges?.total_charge || 0}</div>
          </div>
        </div>
      );
    },
  },
  {
    key: "attempt",
    header: "Attempt",
    width: "6%",
    render: (row: DeliveryOutcomeParcel) => (
      <div className="font-semibold text-center bg-orange-100 text-orange-800 rounded-md py-0.5 px-2 text-xs w-fit mx-auto">
        {row.attempt || 1}
      </div>
    ),
  },
  {
    key: "age",
    header: "Age",
    width: "10%",
    render: (row: DeliveryOutcomeParcel) => (
      <div className="text-sm">
        <span className="font-medium text-gray-700">
          {row.age?.display || row.age?.total_age || "N/A"}
        </span>
      </div>
    ),
  },
];
