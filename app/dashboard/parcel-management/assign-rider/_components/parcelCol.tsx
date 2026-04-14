// _components/parcelCol.tsx
import React from "react";
import { Copy } from "lucide-react";

export const parcelColumns = (onClickUpdate: any) => [
  {
    key: "parcelid",
    header: "Parcel Id",
    width: "10%",
    render: (row: any) => (
      <div className="">
        <span className="font-semibold block flex items-center">
          {row.parcel_tx_id || row.tracking_number}{" "}
          <Copy className="w-3 h-3 ml-1 cursor-pointer text-gray-400" />
        </span>
        <span className="text-xs text-gray-500 block">
          MID: {row.merchant_order_id}
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
        <span className="text-sm text-gray-500">{row.customer_phone}</span>
        {row.customer_secondary_phone && (
          <span className="text-xs text-gray-400">
            Alt: {row.customer_secondary_phone}
          </span>
        )}
        <span className="text-xs text-gray-400 mt-1 line-clamp-2">
          {row.customer_address}
        </span>
      </div>
    ),
  },
  {
    key: "additionalNote",
    header: "Additional Note",
    width: "18%",
    render: (row: any) => (
      <div>
        <p className="text-sm font-medium">
          {row.special_instructions || "No description"}
        </p>
      </div>
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

        <div className="text-xs">{row.delivery_area?.zone} &gt; {row.delivery_area?.area}</div>
      </div>
    ),
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "15%",
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.store?.business_name || "N/A"}</div>
        <div className="text-xs text-gray-400 mt-1">
          Store ID: {row.store?.id?.slice(0, 8)}...
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
      const createdDate = new Date(row.created_at);
      const now = new Date();
      const diffDays = Math.floor(
        (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      return (
        <div>
          <span className="text-sm text-gray-600">{diffDays} days</span>
          <span className="text-xs text-gray-400 block">
            {createdDate.toLocaleDateString()}
          </span>
        </div>
      );
    },
  },
];
