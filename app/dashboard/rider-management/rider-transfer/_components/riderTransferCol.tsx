import { Eye } from "lucide-react";
import Link from "next/link";
import { RiderTransferRider } from "@/redux/features/rider/riderType";

const getRiderId = (row: RiderTransferRider) =>
  row.id || (row as any).rider_id || (row as any).riderId;

export const riderTransferColumns = [
  {
    key: "rider_code",
    header: "Rider Id",
    width: "15%",
    render: (row: RiderTransferRider) => (
      <span className="font-semibold">{row.rider_code || row.id}</span>
    ),
  },
  {
    key: "full_name",
    header: "Rider",
    width: "25%",
    render: (row: RiderTransferRider) => (
      <div className="flex items-center space-x-2">
        {row.photo ? (
          <img src={row.photo} className="w-8 h-8 rounded-full" alt="rider" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-semibold">
            {row.full_name?.charAt(0) || "R"}
          </div>
        )}
        <div>
          <p className="font-semibold">{row.full_name}</p>
          <p className="text-xs text-gray-500">{row.phone}</p>
        </div>
      </div>
    ),
  },
  {
    key: "rider_status",
    header: "Status",
    width: "15%",
    render: (row: RiderTransferRider) => row.rider_status,
  },
  {
    key: "license_no",
    header: "License No.",
    width: "15%",
    render: (row: RiderTransferRider) => row.license_no || "-",
  },
  {
    key: "assigned_parcels_count",
    header: "Total Parcel",
    width: "15%",
    render: (row: RiderTransferRider) => row.assigned_parcels_count,
  },
  {
    key: "actions",
    header: "Actions",
    width: "15%",
    render: (row: RiderTransferRider) => {
      const riderId = getRiderId(row);

      if (!riderId) {
        return <Eye className="h-5 w-5 text-gray-300" />;
      }

      return (
        <Link href={`/dashboard/rider-management/rider-transfer/${riderId}`}>
          <Eye className="h-5 w-5" />
        </Link>
      );
    },
  },
];
