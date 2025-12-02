import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";

export const Ridercolumns = (onAction?: (type: string, row: any) => void) => [
  {
    key: "riderId",
    title: "Rider Idd",
    width: 120,
    render: (row: any) => <span className="font-semibold ">{row.riderId}</span>,
  },
  {
    key: "rider",
    title: "Rider",
    width: 200,
    render: (row: any) => (
      <div className="flex items-center space-x-2 w-40 py-2">
        <img src={row.riderImg} className="w-8 h-8 rounded-full" alt="rider" />
        <div>
          <p className="font-semibold">{row.rider}</p>
          <p className="text-xs text-gray-500 text-nowrap">{row.riderPhone}</p>
        </div>
      </div>
    ),
  },
  {
    key: "vehicleType",
    title: "Vehicle Type",
    width: 140,
    render: (row: any) => <div className="ml-2">{row.vehicleType}</div>,
  },
  {
    key: "licenseNo",
    title: "License No.",
    width: 120,
    render: (row: any) => <div className="ml-2">{row.licenseNo}</div>,
  },
  { key: "nid", title: "NID", width: 160 },
  {
    key: "deliveryCompleted",
    title: "Delivery Completed",
    width: 120,
    render: (row: any) => (
      <div className="text-center">{row.deliveryCompleted}</div>
    ),
  },
  {
    key: "deliveryReturn",
    title: "Delivery Return",
    width: 120,
    render: (row: any) => (
      <div className="text-center">{row.deliveryReturn}</div>
    ),
  },
  {
    key: "totalCash",
    title: "Total Cash Collected",
    width: 140,
    render: (row: any) => <p className="text-center">৳ {row.totalCash}</p>,
  },

  // -------------------- ACTION COLUMN --------------------
  {
    key: "action",
    title: "Action",
    width: 100,
    render: (row: any) => (
      <div className="flex gap-2 items-center justify-center">
        <Link href={`rider-list/${row.riderId}`}>
          <Button size="sm" className="bg-green-100">
            <Eye className="w-5 h-5 text-green-600" />
          </Button>
        </Link>

        <Button
          size="sm"
          className="bg-blue-500 text-white"
          onClick={() => onAction?.("edit", row.riderId)}
        >
          <Edit className="w-5 h-5" />
        </Button>

        <Button
          size="sm"
          className="bg-red-500"
          onClick={() => onAction?.("delete", row.riderId)}
        >
          <Trash2 className="w-5 h-5 text-white" />
        </Button>
      </div>
    ),
  },
];
