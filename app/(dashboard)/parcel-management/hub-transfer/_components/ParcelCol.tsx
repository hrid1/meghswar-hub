// parcelColumns.ts

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export const parcelColumns = (onClickUpdate: any) => [
  {
    key: "id",
    header: "Parcel Id",
    width: "10%",
    render: (row: any) => <span className="font-semibold">{row.id}</span>,
  },
  {
    key: "customerInfo",
    header: "Customer",
    width: "20%",
    wrap: true,
    render: (row: any) => {
      const address = row.customerInfo.address || "";
      const needsTruncation = address.length > 50; // Approximate 2 lines
      
      return (
        <div className="flex flex-col">
          <span className="font-semibold">{row.customerInfo.name}</span>
          <span className="text-sm text-gray-500">{row.customerInfo.phone}</span>
          <div className="relative group">
            <span className="text-xs text-gray-400 line-clamp-2">
              {address}
            </span>
            {needsTruncation && (
              <div className="absolute left-0 bottom-full mb-2 z-50 top hidden group-hover:block">
                <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg max-w-xs whitespace-normal">
                  {address}
                  {/* Tail */}
                  <div className="w-3 h-3 bg-gray-800 rotate-45 absolute left-4 -bottom-1.5"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    },
  },

  {
    key: "note",
    header: "Additional Note",
    width: "18%",
    wrap: true,
    render: (row: any) => {
      const note = row.note || "";
      const needsTruncation = note.length > 60; // Approximate 2 lines
      
      return (
        <div className="relative group">
          <span className="text-sm text-gray-600 line-clamp-2">
            {note}
          </span>
          {needsTruncation && (
            <div className="absolute left-0  -bottom-4 mb-2 z-50 hidden group-hover:block">
              <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg max-w-xs whitespace-normal">
                {note}
                {/* Tail */}
                <div className="w-3 h-3 bg-gray-800 rotate-45 absolute left-4  right-4"></div>
              </div>
            </div>
          )}
        </div>
      );
    },
  },

  {
    key: "area",
    header: "Area",
    width: "8%",
    render: (row: any) => <span>{row.area}</span>,
  },

  {
    key: "merchant",
    header: "Merchant",
    width: "15%",
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
    header: "Amount",
    width: "10%",
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.amount}</div>
      </div>
    ),
  },

  {
    key: "status",
    header: "Status",
    width: "12%",
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
    header: "attempt",
    width: "9%",
  },
  {
    key: "age",
    header: "Age",
    width: "10%",
  },
];



export const parcelColumns1 = (onClickUpdate: any) => [
  {
    key: "id",
    header: "Parcel Id",
    width: "10%",
    render: (row: any) => <span className="font-semibold">{row.id}</span>,
  },
  {
    key: "customerInfo",
    header: "Customer",
    width: "18%",
    wrap: true,
    render: (row: any) => {
      const address = row.customerInfo.address || "";
      const needsTruncation = address.length > 60; // Approximate 2 lines
      
      return (
        <div className="flex flex-col">
          <span className="font-semibold">{row.customerInfo.name}</span>
          <span className="text-sm text-gray-500">{row.customerInfo.phone}</span>
          <div className="relative group">
            <span className="text-xs text-gray-400 line-clamp-2">
              {address}
            </span>
            {needsTruncation && (
              <div className="absolute left-0 bottom-full mb-2 z-50 hidden group-hover:block">
                <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg max-w-xs whitespace-normal">
                  {address}
                  {/* Tail */}
                  <div className="w-3 h-3 bg-gray-800 rotate-45 absolute left-4 -bottom-1.5"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    },
  },

  {
    key: "note",
    header: "Additional Note",
    width: "18%",
    wrap: true,
    render: (row: any) => {
      const note = row.note || "";
      const needsTruncation = note.length > 60; // Approximate 2 lines
      
      return (
        <div className="relative group">
          <span className="text-sm text-gray-600 line-clamp-2">
            {note}
          </span>
          {needsTruncation && (
            <div className="absolute left-0 bottom-full mb-2 z-50 hidden group-hover:block">
              <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg max-w-xs whitespace-normal">
                {note}
                {/* Tail */}
                <div className="w-3 h-3 bg-gray-800 rotate-45 absolute left-4 -bottom-1.5"></div>
              </div>
            </div>
          )}
        </div>
      );
    },
  },

  {
    key: "assignHub",
    header: "Assign Hub",
    width: "8%",
    render: (row: any) => <span>{row.assignHub}</span>,
  },

  {
    key: "merchant",
    header: "Merchant",
    width: "15%",
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
    header: "Amount",
    width: "10%",
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.amount}</div>
      </div>
    ),
  },

  {
    key: "status",
    header: "Status",
    width: "12%",
    render: (row: any) => (
      <span
        className={`px-3 py-1 text-xs rounded-full w-40 ${
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
    header: "attempt",
    width: "9%",
  },
  {
    key: "age",
    header: "Age",
    width: "10%",
  },
];
