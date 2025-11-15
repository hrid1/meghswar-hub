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
    key: "rider",
    title: "Rider Info",
    width: 180,
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.rider.name}</div>
        <div className="text-xs text-gray-500">{row.rider.phone}</div>
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
    key: "reportType",
    title: "Report Type",
    width: 140,
  },

  {
    key: "reason",
    title: "Reason",
    width: 240,
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.reason}</span>
    ),
  },
  {
    key: "action",
    title: "Action",
    width: 240,
    render: (row: any) => (
      <div className="flex flex-col gap-2 items-center  justify-center">
        <Phone className="w-5 h-5 text-green-600 " />
        <Button
          onClick={() => {
            onClickUpdate(row);
            console.log("Update Status Clicked for Parcel:", row.id);
          }}
          size="sm"
          className="bg-red-400"
        >
          Update Status
        </Button>
      </div>
    ),
  },
];
