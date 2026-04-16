// ParcelCol.tsx
"use client";

import { txt } from "@/lib/utils";
import { EyeIcon, TruckIcon } from "lucide-react";

export const parcelColumns = (onClickUpdate?: (row: any) => void) => [
  // 1. Parcel ID
  {
    key: "parcelId",
    header: "ID",
    width: "13%",
    wrap: true,
    render: (row: any) => (
      <div className="flex flex-col items-start min-w-0">
        <span className="text-xs font-medium truncate w-full">
          PID: {txt(row.parcel_tx_id) || txt(row.id) || "—"}
        </span>
        <span className="text-xs text-gray-500 truncate w-full">
          MID: {txt(row.merchant_order_id) || "—"}
        </span>
      </div>
    ),
  },

  // 2. Store
  {
    key: "store",
    header: "Store",
    width: "13%",
    render: (row: any) => {
      const storeName =
        txt(row.store_name) || txt(row.store?.business_name) || "N/A";
      const storeId = txt(row.store?.store_code);
      return (
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate">{storeName}</p>
          <p className="text-xs text-gray-500 ">
            {storeId ? `ID: ${storeId}` : "N/A"}
          </p>
        </div>
      );
    },
  },

  // 3. Customer Info
  {
    key: "customerInfo",
    header: "Customer",
    width: "18%",
    wrap: true,
    render: (row: any) => {
      if (!row) return <span>No data</span>;

      const c = row.customer;
      const customerName =
        txt(row.customer_name) || txt(c?.customer_name) || "N/A";
      const customerPhone =
        txt(row.customer_phone) || txt(c?.phone_number) || "—";
      const secondary =
        txt(row.customer_secondary_phone) || txt(c?.secondary_number) || "";
      const address =
        txt(row.customer_address) || txt(c?.customer_address) || "";
      const shortAddress =
        address.length > 40 ? address.slice(0, 40) + "..." : address;
      const tooltipAddress =
        address.length > 80 ? address.slice(0, 80) + "..." : address;

      return (
        <div className="text-sm min-w-0">
          <div className="font-semibold text-gray-900 truncate">{customerName}</div>
       
          <div className="relative group mt-1">
            <div className="text-gray-500 text-xs cursor-default break-words">
              {shortAddress || "No address provided"}
            </div>
            {address.length > 40 && (
              <div className="absolute left-0 bottom-full mb-1 z-30 hidden group-hover:block">
                <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg whitespace-nowrap max-w-xs">
                  {tooltipAddress}
                  {address.length > 80 && "..."}
                </div>
                <div className="w-3 h-3 bg-gray-800 rotate-45 absolute left-4 -bottom-1.5" />
              </div>
            )}
          </div>

          <div className="text-gray-600 text-xs mt-0.5">{customerPhone}</div>
          {secondary && (
            <div className="text-gray-400 text-xs">{secondary}</div>
          )}
        </div>
      );
    },
  },

  // 4. Special Instructions
  {
    key: "special_instructions",
    header: "Instructions",
    width: "13%",
    wrap: true,
    render: (row: any) => {
      const note = txt(row.special_instructions) || "";
      const short = note.length > 50 ? note.slice(0, 50) + "..." : note;
      return (
        <div className="relative group">
          <p className="text-xs text-gray-600 break-words cursor-default">
            {short || "No instructions"}
          </p>
          {note.length > 50 && (
            <div className="absolute left-0 bottom-full mb-1 z-30 hidden group-hover:block">
              <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg max-w-xs whitespace-normal">
                {note}
              </div>
              <div className="w-3 h-3 bg-gray-800 rotate-45 absolute left-4 -bottom-1.5" />
            </div>
          )}
        </div>
      );
    },
  },

  // 5. Delivery Area
  {
    key: "deliveryArea",
    header: "Delivery Area",
    width: "10%",
    render: (row: any) => (
      <div className="text-sm">
        <div className="text-gray-500 font-semibold text-xs">{row.delivery_area?.city}</div>
        <div className="text-gray-600 text-xs">{row.delivery_area?.area} &gt; {row.delivery_area?.zone}</div>
        
      </div>
    ),
  },

  // 6. Status
  {
    key: "status",
    header: "Status",
    width: "11%",
    render: (row: any) => {
      const status = txt(row?.status) || "N/A";

      const styles: Record<string, string> = {
        PENDING: "bg-orange-100 text-orange-700",
        IN_PROGRESS: "bg-green-100 text-green-700",
        PARTIAL_DELIVERY: "bg-purple-100 text-purple-700",
        DELIVERED: "bg-blue-100 text-blue-700",
        RETURNED: "bg-red-100 text-red-700",
        CANCELLED: "bg-gray-100 text-gray-700",
        AT_HUB: "bg-blue-100 text-blue-600",
      };

      const displayStatus = status
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (l: string) => l.toUpperCase());

      return (
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
            styles[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {displayStatus}
        </span>
      );
    },
  },

  // 7. Amount
  {
    key: "amount",
    header: "Amount",
    width: "12%",
    render: (row: any) => {
      const codAmount = parseFloat(row.cod_amount || 0);
      const totalCharge = parseFloat(row.total_charge || 0);
      const deliveryCharge = parseFloat(row.delivery_charge || 0);
      const codCharge = parseFloat(row.cod_charge || 0);
      const weightCharge = parseFloat(row.weight_charge || 0);

      return (
        <div className="text-sm space-y-0.5">
          <div className="font-bold text-green-600">
            ৳ {codAmount.toLocaleString()}
            <span className="ml-1 text-[10px] font-normal text-gray-500">
              {row.is_cod ? "COD" : "Prepaid"}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Delivery: ৳{deliveryCharge.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            COD: ৳{codCharge.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            Weight: ৳{weightCharge.toLocaleString()}
          </div>
          <div className="text-xs font-semibold text-gray-700 border-t pt-0.5">
            Total: ৳{totalCharge.toLocaleString()}
          </div>
        </div>
      );
    },
  },

  // 8. Age / Dates
  {
    key: "age",
    header: "Age",
    width: "12%",
    render: (row: any) => {
      const createdAt = row.created_at ? new Date(row.created_at) : null;
      const updatedAt = row.updated_at ? new Date(row.updated_at) : null;

      const ageDays = createdAt
        ? Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
        : null;

      const fmt = (d: Date) =>
        d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) +
        ", " +
        d.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

      return (
        <div className="text-sm space-y-1.5">
          {ageDays !== null && (
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-2.5 py-1 rounded-full">
              {ageDays} {ageDays === 1 ? "Day" : "Days"}
            </span>
          )}
          {createdAt && (
            <div>
              <div className="text-xs text-gray-500 font-medium">Created:</div>
              <div className="text-xs text-gray-700">{fmt(createdAt)}</div>
            </div>
          )}
          {updatedAt && (
            <div>
              <div className="text-xs text-gray-500 font-medium">Updated:</div>
              <div className="text-xs text-gray-700">{fmt(updatedAt)}</div>
            </div>
          )}
        </div>
      );
    },
  },

  // 9. Action
  // {
  //   key: "action",
  //   header: "Action",
  //   width: "7%",
  //   render: (row: any) => (
  //     <div className="flex items-center flex-wrap gap-1 justify-center">
  //       <button className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
  //         <EyeIcon className="w-4 h-4" />
  //       </button>
  //       {onClickUpdate && (
  //         <button
  //           onClick={() => onClickUpdate(row)}
  //           className="px-2 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
  //         >
  //           <TruckIcon className="w-4 h-4" />
  //         </button>
  //       )}
  //     </div>
  //   ),
  // },
];
