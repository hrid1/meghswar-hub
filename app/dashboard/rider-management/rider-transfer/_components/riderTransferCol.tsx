import { Eye } from "lucide-react";
import Link from "next/link";

export const riderTransferColumns = [
  {
    key: "riderId",
    header: "Rider Id",
    width: "15%",
    render: (row: any) => <span className="font-semibold">{row.riderId}</span>,
  },
  {
    key: "rider",
    header: "Rider",
    width: "25%",
    render: (row: any) => (
      <div className="flex items-center space-x-2">
        <img src={row.riderImg} className="w-8 h-8 rounded-full" alt="rider" />
        <div>
          <p className="font-semibold">{row.rider}</p>
          <p className="text-xs text-gray-500">{row.riderPhone}</p>
        </div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "15%",
  },
  {
    key: "licenseNo",
    header: "License No.",
    width: "15%",
  },
  {
    key: "totalParcel",
    header: "Total Parcel",
    width: "15%",
  },
  {
    key: "actions",
    header: "Actions",
    width: "15%",
    render: (row: any) => (
      <Link href={`/rider-management/rider-transfer/${row.riderId}`}>
        <Eye />
      </Link>
    ),
  },
];
