// parcelColumns.ts

import { Button } from "@/components/ui/button";
import { Key, Phone } from "lucide-react";

export const parcelColumns = (onClickUpdate: any) => [
  {
    key: "parcelid",
    title: "Parcel Id",
    width: 120,
    render: (row: any) => <span className="font-semibold">{row.parcelid}</span>,
  },
  {
    key: "customerInfo",
    title: "Customer",
    width: 200,
    render: (row: any) => (
      <div className="flex flex-col">
        <span className="font-semibold">{row.customerInfo.name}</span>
        <span className="text-sm text-gray-500">{row.customerInfo.phone}</span>
        <span className="text-xs text-gray-400">
          {row.customerInfo.address}
        </span>
      </div>
    ),
  },

  {
    key: "additionalNote",
    title: "Additional Note",
    width: 220,
    render: (row: any) => <p>{row.additionalNote}</p>,
  },

  {
    key: "merchant",
    title: "Merchant",
    width: 180,
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.merchant.name}</div>
        <div className="text-xs text-gray-500">{row.merchant.phone}</div>
        <div className="text-xs text-gray-400">{row.area}</div>
      </div>
    ),
  },

  {
    key: "area",
    title: "Area",
    width: 240,
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.area}</span>
    ),
  },
  {
    key: "amount",
    title: "Amount",
    width: 100,
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.amount}</span>
    ),
  },
  {
    key: "age",
    title: "Age",
    width: 180,
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.age}</span>
    ),
  },
];
