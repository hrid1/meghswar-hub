// _components/parcelCol.tsx
import React from "react";
import { CopyValueButton, AddressHover, TextHover } from "@/lib/table.utils";

export const parcelColumns = (onClickUpdate: any) => [
  {
    key: "parcelid",
    header: "Id",
    width: "10%",
    render: (row: any) => (
      <div className="">
        <span className="font-medium text-xs flex items-center">
          {row.parcel_tx_id || row.tracking_number}{" "}
          <CopyValueButton
            value={row.parcel_tx_id || row.tracking_number}
            label="Parcel ID"
          />
        </span>
        <span className="text-xs text-gray-500 flex items-center gap-1">
          MID: {row.merchant_order_id}
          <CopyValueButton value={row.merchant_order_id} label="Merchant ID" />
        </span>
      </div>
    ),
  },
  {
    key: "customerInfo",
    header: "Customer",
    width: "18%",
    render: (row: any) => (
      <div className="flex flex-col">
        <span className="font-semibold">{row.customer_name}</span>
        <AddressHover address={row.customer_address} />
        <span className="text-xs text-gray-500">{row.customer_phone}</span>
        {row.customer_secondary_phone && (
          <span className="text-xs text-gray-400">
            Alt: {row.customer_secondary_phone}
          </span>
        )}
      </div>
    ),
  },
  {
    key: "additionalNote",
    header: "Additional Note",
    width: "18%",
    render: (row: any) => (
      <TextHover text={row.special_instructions} />
    ),
  },
  {
    key: "area",
    header: "Delivery Area",
    width: "20%",
    render: (row: any) => (
      <div className="text-sm text-gray-600">
        <div className=" text-gray-500 font-semibold">
          {row.delivery_area?.city},
        </div>

        <div className="text-xs">
          {row.delivery_area?.zone} &gt; {row.delivery_area?.area}
        </div>
      </div>
    ),
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "15%",
    render: (row: any) => (
      <div>
        <div className="font-semibold text-sm">{row.store?.business_name || "N/A"}</div>
        <div className="text-xs text-gray-400 mt-1">
         
           Store ID: {row.store?.store_code}
        </div>
      </div>
    ),
  },

  {
    key: "amount",
    header: "Amount",
    width: "10%",
    render: (row: any) => (
      <div>
        <span className="text-sm font-semibold text-green-600">
          ৳{parseFloat(row.cod_amount || 0).toLocaleString()}
        </span>
        {row.is_cod ? (
          <span className="text-xs bg-green-100 text-green-700 px-1 py-0.5 rounded ml-1">
            COD
          </span>
        ) : (
          <span className="text-xs bg-gray-100 text-gray-700 px-1 py-0.5 rounded ml-1">
            Prepaid
          </span>
        )}
        <div className="text-xs text-gray-500 mt-1">
          Total: ৳{parseFloat(row.total_charge || 0).toLocaleString()}
        </div>
      </div>
    ),
  },
  {
    key: "age",
    header: "Age",
    width: "9%",
    render: (row: any) => {
      const createdDate = row.created_at ? new Date(row.created_at) : null;
      const updatedDate = row.updated_at ? new Date(row.updated_at) : null;
      const receivedDate = row.received_at ? new Date(row.received_at) : null;
      const now = new Date();
      const diffDays = createdDate
        ? Math.floor(
            (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24),
          )
        : null;

      const fmt = (d: Date | null) =>
        d && !Number.isNaN(d.getTime()) ? d.toLocaleDateString() : "N/A";

      return (
        <div>
          <span className="text-sm text-gray-600">
            {diffDays !== null ? `${diffDays} days` : "N/A"}
          </span>
          <span className="text-xs text-gray-400 block">
            Created: {fmt(createdDate)}
          </span>
          <span className="text-xs text-gray-400 block">
            Updated: {fmt(updatedDate)}
          </span>
          <span className="text-xs text-gray-400 block">
            Received: {fmt(receivedDate)}
          </span>
        </div>
      );
    },
  },
];
