import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export const riderTableColumns = (onAction?: (type: string, id: string) => void) => [
  {
    key: "parcelId",
    title: "Parcel ID",
    width: 120,
    render: (row: any) => <span className="font-semibold">{row.parcelId}</span>,
  },
  {
    key: "rider",
    title: "Rider",
    width: 200,
    render: (row: any) => (
      <div className="flex items-center gap-2">
        <img src={row.riderImg} className="w-8 h-8 rounded-full" alt="rider" />
        <div>
          <p className="font-semibold">{row.riderName}</p>
          <p className="text-xs text-gray-500">{row.riderPhone}</p>
        </div>
      </div>
    ),
  },
  {
    key: "status",
    title: "Requested For",
    width: 140,
    render: (row: any) => (
      <div className="flex flex-col">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          row.status === "Delivered"
            ? "bg-green-100 text-green-700"
            : row.status === "Partial Delivery"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}>
          {row.status}
        </span>
        <span className="text-xs text-gray-400 mt-1">{row.date}</span>
      </div>
    ),
  },
  {
    key: "customerInfo",
    title: "Customer Info",
    width: 250,
    render: (row: any) => (
      <div className="text-xs">
        <p className="font-semibold">{row.customerName}</p>
        <p>{row.customerPhone}</p>
        <p className="text-gray-500">{row.customerAddress}</p>
      </div>
    ),
  },
  {
    key: "merchant",
    title: "Merchant",
    width: 180,
    render: (row: any) => (
      <div className="text-xs">
        <p className="font-semibold">{row.merchantName}</p>
        <p className="text-gray-500">{row.merchantPhone}</p>
      </div>
    ),
  },
  {
    key: "area",
    title: "Area",
    width: 120,
  },
  {
    key: "actions",
    title: "Actions",
    width: 160,
    render: (row: any) => (
      <div className="flex gap-2">
        <Button
          size="sm"
          className="bg-green-100 text-green-700 hover:bg-green-200"
          onClick={() => onAction?.("approve", row.parcelId)}
        >
          <Check className="w-4 h-4 mr-1" /> Approve
        </Button>
        <Button
          size="sm"
          className="bg-red-100 text-red-700 hover:bg-red-200"
          onClick={() => onAction?.("decline", row.parcelId)}
        >
          <X className="w-4 h-4 mr-1" /> Decline
        </Button>
      </div>
    ),
  },
];
