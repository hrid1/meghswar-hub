"use client";

import { AddressHover, CopyableText } from "@/lib/table.utils";
import { txt } from "@/lib/utils";
import { EditIcon, EyeIcon } from "lucide-react";
import Link from "next/link";

export const columns = [
  {
    key: "parcelId",
    header: "ID",
    width: "11%",
    wrap: true,
    render: (row: any) => {
      const pid = txt(row.parcel_tx_id) || txt(row.parcelId);
      const mid = txt(row.merchant_order_id) || txt(row.marchantId);

      return (
        <div className="flex flex-col items-start min-w-0 gap-0.5">
          <CopyableText
            value={pid}
            label="Parcel ID"
            prefix="PID:"
            className="text-sm font-medium w-full"
          />
          <CopyableText
            value={mid}
            label="Merchant order ID"
            prefix="MID:"
            className="text-xs text-gray-500 w-full"
          />
        </div>
      );
    },
  },

  {
    key: "customer",
    header: "Customer Info",
    width: "18%",
    wrap: true,
    render: (row: any) => {
      const c = row.customer;
      const customerName =
        txt(row.customer_name) || txt(c?.customer_name) || "N/A";
      const customerPhone =
        txt(row.customer_phone) || txt(c?.phone_number);
      const customerSecondaryPhone =
        txt(row.customer_secondary_phone) || txt(c?.secondary_number);
      const address =
        txt(row.customer_address) ||
        txt(c?.customer_address) ||
        txt(row.address);

      return (
        <div className="text-sm min-w-0">
          <div className="font-semibold text-gray-900 truncate">{customerName}</div>
          <AddressHover address={address} />
          <div className="flex flex-col gap-0.5 mt-0.5">
            <CopyableText
              value={customerPhone}
              label="Customer phone"
              className="text-gray-600 text-xs"
            />
            {customerSecondaryPhone && (
              <CopyableText
                value={customerSecondaryPhone}
                label="Secondary phone"
                className="text-gray-600 text-xs"
              />
            )}
          </div>
        </div>
      );
    },
  },

  {
    key: "store",
    header: "Store",
    width: "22%",
    render: (row: any) => {
      const m = row.merchant;
      const storeName =
        txt(row.store_name) ||
        txt(row.store?.business_name) ||
        txt(m?.user?.full_name) ||
        txt(m?.full_name) ||
        "N/A";
      const storePhone = txt(row.store?.phone_number) || txt(m?.phone_number);

      return (
        <div className="flex items-center space-x-3">
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{storeName}</p>
            <CopyableText
              value={storePhone}
              label="Store phone"
              className="text-xs text-gray-500"
            />
          </div>
        </div>
      );
    },
  },

  {
    key: "rider",
    header: "Rider",
    width: "20%",
    render: (row: any) => {
      const r = row.assigned_rider;
      const riderName =
        txt(row.rider) ||
        txt(r?.full_name) ||
        txt(r?.user?.full_name) ||
        "Not Assigned";
      const riderPhone = txt(row.riderPhone) || txt(r?.phone);

      return (
        <div className="flex items-center space-x-3">
          <div className="min-w-0">
            <p className="font-medium text-sm">{riderName}</p>
            <CopyableText
              value={riderPhone}
              label="Rider phone"
              className="text-xs text-gray-500"
            />
          </div>
        </div>
      );
    },
  },

  {
    key: "status",
    header: "Status",
    width: "13%",
    render: (row: any) => {
      const status = txt(row.status) || "N/A";
      const styles: Record<string, string> = {
        PENDING: "bg-orange-100 text-orange-700",
        IN_PROGRESS: "bg-green-100 text-green-700",
        PARTIAL_DELIVERY: "bg-purple-100 text-purple-700",
        DELIVERED: "bg-blue-100 text-blue-700",
        RETURNED: "bg-red-100 text-red-700",
        CANCELLED: "bg-gray-100 text-gray-700",
        "N/A": "bg-gray-100 text-gray-700",
      };

      const displayStatus = status
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (l: string) => l.toUpperCase());

      return (
        <span
          className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap ${
            styles[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {displayStatus}
        </span>
      );
    },
  },

  {
    key: "amount",
    header: "Amount",
    width: "13%",
    render: (row: any) => {
      const totalCharge = parseFloat(row.cod_amount || row.amount || 0);
      const deliveryCharge = parseFloat(row.delivery_charge || 0);
      const codCharge = parseFloat(row.cod_charge || 0);
      const weightCharge = parseFloat(row.weight_charge || 0);
      const discount = parseFloat(row.discount || 0);

      return (
        <div className="text-sm space-y-0.5">
          <div className=" text-green-600 font-semibold">
            ৳ {totalCharge.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            Delivery Charge: &nbsp;৳ {deliveryCharge.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            COD Charge: &nbsp;৳ {codCharge.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            Weight Charge: &nbsp;৳ {weightCharge.toLocaleString()}
          </div>
          <div className="text-xs text-orange-500 font-medium">
            Discount: &nbsp;৳ {discount.toLocaleString()}
          </div>
        </div>
      );
    },
  },

  {
    key: "attempt",
    header: "Attempt",
    width: "6%",
    render: (row: any) => (
      <div className="text-center font-semibold  bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
        {txt(row.attempt) || 0}
      </div>
    ),
  },

  {
    key: "deliveryTime",
    header: "Age",
    width: "13%",
    render: (row: any) => {
      const receivedAt = row.received_at ? new Date(row.received_at) : null;

      const ageDays = receivedAt
        ? Math.floor((Date.now() - receivedAt.getTime()) / (1000 * 60 * 60 * 24))
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
          {ageDays !== null ? (
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
              {ageDays} {ageDays === 1 ? "Day" : "Days"}
            </span>
          ) : (
            <span className="inline-block bg-gray-100 text-gray-400 text-xs font-semibold px-3 py-1 rounded-full">
              N/A
            </span>
          )}
          {receivedAt && (
            <div>
              <div className="text-xs text-gray-500 font-medium">Received:</div>
              <div className="text-xs text-gray-700">{fmt(receivedAt)}</div>
            </div>
          )}
        </div>
      );
    },
  },

  {
    key: "action",
    header: "Action",
    width: "10%",
    render: (row: any) => (
      <div className="text-center font-semibold text-gray-900 flex items-center  flex-wrap gap-1 justify-center">
        <Link
          href={`/dashboard/parcel-management/all-parcel/${row.id}`}
          className="px-3 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          <EyeIcon className="w-4 h-4" />
        </Link>
        <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <EditIcon className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];
