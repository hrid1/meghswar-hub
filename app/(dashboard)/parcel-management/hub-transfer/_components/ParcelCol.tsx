// parcelColumns.ts

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export const parcelColumns = (onClickUpdate: any) => [
  {
    key: "id",
    title: "Parcel Id",
    width: 120,
    render: (row: any) => <span className="font-semibold">{row.id}</span>,
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
    key: "note",
    title: "Additional Note",
    width: 240,
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.note}</span>
    ),
  },

  {
    key: "area",
    title: "Area",
    width: 100,
    render: (row: any) => <span>{row.area}</span>,
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
    key: "amount",
    title: "Amount",
    width: 180,
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.amount}</div>
      </div>
    ),
  },

  {
    key: "status",
    title: "Status",
    width: 200,
    render: (row: any) => (
      <span
        className={`px-3 py-1 text-xs rounded-full ${
          row.status === "Delivered"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {row.status}
      </span>
    ),
  },

  {
    key: "Attempt",
    title: "attempt",
    width: 140,
  },
  {
    key: "age",
    title: "Age",
    width: 140,
  },
];



export const parcelColumns1 = (onClickUpdate: any) => [
  {
    key: "id",
    title: "Parcel Id",
    width: 120,
    render: (row: any) => <span className="font-semibold">{row.id}</span>,
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
    key: "note",
    title: "Additional Note",
    width: 240,
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.note}</span>
    ),
  },

  {
    key: "assignHub",
    title: "Assign Hub",
    width: 100,
    render: (row: any) => <span>{row.assignHub}</span>,
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
    key: "amount",
    title: "Amount",
    width: 180,
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.amount}</div>
      </div>
    ),
  },

  {
    key: "status",
    title: "Status",
    width: 200,
    render: (row: any) => (
      <span
        className={`px-3 py-1 text-xs rounded-full ${
          row.status === "Delivered"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {row.status}
      </span>
    ),
  },

  {
    key: "Attempt",
    title: "attempt",
    width: 140,
  },
  {
    key: "age",
    title: "Age",
    width: 140,
  },
];
