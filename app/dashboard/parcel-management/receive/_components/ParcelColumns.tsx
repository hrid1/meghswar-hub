// app/(dashboard)/receive-parcels/_components/ParcelColumns.tsx
"use client";

import React from "react";
import { Printer, Copy } from "lucide-react";
import { EditableCell } from "./EditableCell";


export interface UpdateChargesHandler {
  (id: string, charges: { delivery_charge?: number; weight_charge?: number }): Promise<void>;
}

export const getParcelColumns = (
  onUpdateCharges?: UpdateChargesHandler
): any => [
  {
    key: "id",
    header: "ID",
    width: "13%",
    render: (row: any) => (
      <div className="">
        <p className="text-nowrap flex items-center">
          PID:{row.id}{" "}
          <span>
            <Copy className="w-3 ml-1 cursor-pointer hover:text-orange-500" />
          </span>
        </p>
        <p className="text-nowrap flex items-center">
          MID:{row.merchantInvoice}
          <span>
            <Copy className="w-3 ml-1 cursor-pointer hover:text-orange-500" />
          </span>
        </p>
        <p className="text-xs text-gray-500">{row.tracking_number}</p>
      </div>
    ),
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "12%",
    render: (row: any) => <p className="text-nowrap font-medium">{row.merchant}</p>,
  },
  {
    key: "additionalNote",
    header: "Additional Note",
    width: "12%",
    wrap: true,
    render: (row: any) => {
      const note = row.additionalNote || "";
      const shortNote = note.length > 40 ? note.slice(0, 40) + "..." : note;

      return (
        <div className="relative group">
          <p className="text-sm text-gray-600 break-words cursor-help">
            {shortNote}
          </p>
          {note.length > 40 && (
            <div className="absolute z-20 hidden max-w-xs rounded bg-orange-400 text-white px-2 py-1 text-xs group-hover:block -top-1 left-0 ml-2 whitespace-normal">
              {note}
            </div>
          )}
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
      const address: string = row.address || "";
      const shortAddress = address.length > 35 ? address.slice(0, 35) + "..." : address;

      return (
        <div className="text-sm break-words">
          <div className="font-semibold">{row.customer}</div>
          <div className="text-gray-600 text-xs">{row.phone}</div>
          <div className="relative group mt-1">
            <div className="text-gray-500 text-xs cursor-help">
              {shortAddress}
            </div>
            {address.length > 35 && (
              <div className="absolute left-0 bottom-full mb-1 z-20 hidden group-hover:block">
                <div className="rounded-md bg-orange-400 px-2 py-1 text-[11px] leading-snug text-white shadow-lg max-w-xs whitespace-normal">
                  {address}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    },
  },
  {
    key: "deliveryArea",
    header: "Delivery Area",
    width: "10%",
    render: (row: any) => <p className="text-sm">{row.deliveryArea}</p>,
  },
  {
    key: "amount",
    header: "Amount Details",
    width: "12%",
    render: (row: any) => (
      <div className="break-words">
        <div className="text-green-600 font-bold text-sm">
          ৳{row.collectableAmount?.toLocaleString() || 0}
        </div>
        <div className="text-xs text-gray-500 mt-1 space-y-0.5">
          <div>Delivery: ৳{row.deliveryCharge || 0}</div>
          <div>COD: ৳{row.codCharge || 0}</div>
          <div>Weight: ৳{row.weightCharge || 0}</div>
        </div>
      </div>
    ),
  },
  {
    key: "weight",
    header: "Weight (kg)",
    width: "8%",
    render: (row: any) => (
      <EditableCell
        value={row.weight || 0}
        onSave={async (newValue) => {
          if (onUpdateCharges) {
            // Calculate weight charge based on weight (e.g., 40 TK per kg)
            const weightCharge = newValue * 40;
            await onUpdateCharges(row.originalId, {
              weight_charge: weightCharge,
            });
          }
        }}
        suffix=" kg"
        disabled={row.status !== "pending"} // Only allow editing for pending parcels
      />
    ),
  },
  {
    key: "deliveryCharge",
    header: "Delivery (৳)",
    width: "8%",
    render: (row: any) => (
      <EditableCell
        value={row.deliveryCharge || 0}
        onSave={async (newValue) => {
          if (onUpdateCharges) {
            await onUpdateCharges(row.originalId, {
              delivery_charge: newValue,
            });
          }
        }}
        prefix="৳"
        disabled={row.status !== "pending"}
      />
    ),
  },
  {
    key: "weightCharge",
    header: "Weight (৳)",
    width: "8%",
    render: (row: any) => (
      <EditableCell
        value={row.weightCharge || 0}
        onSave={async (newValue) => {
          if (onUpdateCharges) {
            await onUpdateCharges(row.originalId, {
              weight_charge: newValue,
            });
          }
        }}
        prefix="৳"
        disabled={row.status !== "pending"}
      />
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "8%",
    render: (row: any) => (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        row.status === "pending" ? "bg-yellow-100 text-yellow-800" :
        row.status === "received" ? "bg-green-100 text-green-800" :
        "bg-gray-100 text-gray-800"
      }`}>
        {row.status}
      </span>
    ),
  },
  {
    key: "action",
    header: "Action",
    width: "7%",
    render: (row: any) => (
      <button 
        onClick={() => window.open(`/parcels/${row.originalId}/print`, '_blank')}
        className="bg-orange-50 hover:bg-orange-100 text-orange-600 px-3 py-1.5 rounded-md transition-colors"
      >
        <Printer className="w-3 h-3 inline-block mr-1" />
        <span className="text-sm font-medium">Print</span>
      </button>
    ),
  },
];