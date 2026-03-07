"use client";

import React from "react";
import { Printer, Copy } from "lucide-react";

// Define column configuration type
export interface ColumnConfig {
  key: string;
  header: string;
  width: string;
  wrap?: boolean;
  render: (row: any) => React.ReactNode;
}

// Columns generator function
export const getParcelColumns = (): ColumnConfig[] => [
  {
    key: "id",
    header: "ID",
    width: "13%",
    render: (row: any) => (
      <div className="">
        <p className="text-nowrap flex items-center">
          PID:{row.id}{" "}
          <span>
            <Copy className="w-3 ml-1" />
          </span>
        </p>
        <p className="text-nowrap flex items-center">
          MID:{row.merchantInvoice}
          <span>
            <Copy className="w-3 ml-1" />
          </span>
        </p>
        <p className="text-xs text-gray-500">{row.tracking_number}</p>
      </div>
    ),
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "15%",
    render: (row: any) => <p className="text-nowrap">{row.merchant}</p>,
  },
  {
    key: "additionalNote",
    header: "Additional Note",
    width: "16%",
    wrap: true,
    render: (row: any) => {
      const note = row.additionalNote || "";
      const shortNote = note.length > 50 ? note.slice(0, 50) + "..." : note;

      return (
        <div className="relative group">
          <p className="text-sm text-gray-600 break-words cursor-help">
            {shortNote}
          </p>
          {/* Tooltip */}
          <div className="absolute z-20 hidden max-w-full rounded bg-orange-400 text-white px-2 py-1 text-xs group-hover:block -top-1 left-0 ml-2">
            {note}
          </div>
        </div>
      );
    },
  },
  {
    key: "customer",
    header: "Customer Info",
    width: "20%",
    wrap: true,
    render: (row: any) => {
      const address: string = row.address || "";
      const shortAddress = address.length > 30 ? address.slice(0, 30) + "..." : address;
      const tooltipAddress = address.length > 100 ? address.slice(0, 100) + "..." : address;

      return (
        <div className="text-sm break-words">
          <div className="font-semibold">{row.customer}</div>
          <div className="text-gray-600">{row.phone}</div>
          <div className="relative group mt-1">
            <div className="text-gray-500 text-xs cursor-pointer">
              {shortAddress}
            </div>
            <div className="absolute left-0 bottom-full mt-1 z-20 hidden group-hover:flex">
              <div className="rounded-md bg-orange-400 px-2 py-1 text-[11px] leading-snug text-white shadow-lg whitespace-nowrap">
                {tooltipAddress}
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    key: "deliveryArea",
    header: "Delivery Area",
    width: "12%",
    render: (row: any) => <p className="text-sm">{row.deliveryArea}</p>,
  },
  {
    key: "amount",
    header: "Amount",
    width: "12%",
    render: (row: any) => (
      <div className="break-words w-30">
        <div className="text-green-600 font-bold text-lg">
          ৳{row.collectableAmount?.toLocaleString() || 0}
        </div>
        <div className="text-xs text-gray-600 mt-1">
          <div>Delivery Charge: ৳{row.deliveryCharge || 0}</div>
          <div>COD Charge: ৳{row.codCharge || 0}</div>
          <div>Weight Charge: ৳{row.weightCharge || 0}</div>
        </div>
      </div>
    ),
  },
  {
    key: "weight",
    header: "Weight",
    width: "7%",
    render: (row: any) => <div className="w-12 pl-2">{row.weight || 0} kg</div>,
  },
  {
    key: "delivery",
    header: "Delivery",
    width: "8%",
    render: (row: any) => (
      <div className="rounded-md w-fit px-2 py-1 font-medium">
        ৳{row.delivery || 0}
      </div>
    ),
  },
  {
    key: "action",
    header: "Action",
    width: "7%",
    render: () => (
      <button className="bg-orange-100 text-orange-600 px-3 py-2 rounded-md">
        <Printer className="w-3 h-3 inline-block" />{" "}
        <span className="text-black font-medium text-sm">Print</span>
      </button>
    ),
  },
];