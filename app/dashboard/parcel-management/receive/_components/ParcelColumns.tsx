// app/(dashboard)/receive-parcels/_components/ParcelColumns.tsx
"use client";

import React from "react";
import { Printer } from "lucide-react";
import { EditableCell } from "./EditableCell";
import { CopyValueButton, AddressHover, TextHover } from "@/lib/table.utils";


export interface UpdateChargesHandler {
  (id: string, charges: { delivery_charge?: number; weight_charge?: number }): Promise<void>;
}

export const getParcelColumns = (
    onUpdateCharges?: UpdateChargesHandler,
    onPrintParcels?: (originalId: string) => void
): any => [
  {
    key: "id",
    header: "ID",
    width: "%10",
    render: (row: any) => (
      <div className="">
        <p className="text-nowrap flex items-center">
          PID:{row.id}{" "}
          <CopyValueButton value={row.id} label="Parcel ID" />
        </p>
        <p className="text-nowrap flex items-center">
          MID:{row.merchantInvoice}
          <CopyValueButton value={row.merchantInvoice} label="Merchant ID" />
        </p>
      </div>
    ),
  },
  {
    key: "store",
    header: "Store",
    width: "12%",
    render: (row: any) => <p className="text-nowrap font-medium">{row.store} <br /> <span className="text-xs text-gray-500">{row.storePhone}</span></p>,
  },
  {
    key: "additionalNote",
    header: "Additional Note",
    width: "12%",
    wrap: true,
    render: (row: any) => (
      <TextHover text={row.additionalNote || "No instructions"} />
    ),
  },
  {
    key: "customer",
    header: "Customer Info",
    width: "18%",
    wrap: true,
    render: (row: any) => (
      <div className="text-sm break-words">
        <div className="font-semibold">{row.customer}</div>
        <AddressHover address={row.address} maxLength={35} />
        <div className="text-gray-600 text-xs">{row.phone}</div>
        <div className="text-gray-600 text-xs">{row.secondary_phone}</div>
      </div>
    ),
  },
  {
    key: "deliveryArea",
    header: "Delivery Area",
    width: "10%",
    render: (row: any) => (
      <div className="text-sm">
        <div className="text-gray-600 text-xs">{row.city}</div>
        <div className="text-gray-600 text-xs">{row.area} &gt; {row.zone}</div>
        
      </div>
    ),
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
        <div className="text-xs text-gray-700 mt-1 space-y-0.5">
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
      />
    ),
  },
 
  
  {
    key: "action",
    header: "Action",
    width: "7%",

    render: (row: any) => (
      <button 
        onClick={() => onPrintParcels?.(row.originalId)}
        className="bg-orange-50 hover:bg-orange-100 text-orange-600 px-3 py-1.5 rounded-md transition-colors"
      >
        <Printer className="w-3 h-3 inline-block mr-1" />
        <span className="text-sm font-medium">Print</span>
      </button>
    ),
  },
];