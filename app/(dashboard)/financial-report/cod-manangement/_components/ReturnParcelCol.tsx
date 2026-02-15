import { FileIcon } from "lucide-react";

export const returnParcelColumns = [
  {
    key: "parcelId",
    header: "Parcel Id",
    width: "18%",
    render: (row: any) => <span className="font-semibold">{row.parcelId}</span>,
  },
  {
    key: "reason",
    header: "Reason",
    width: "25%",
  },
  {
    key: "status",
    header: "status",
    width: "18%",
    render: (row: any) => (
      <span className="font-semibold text-orange-500 flex items-center justify-center ">
        <span>{row.status}</span>
      </span>
    ),
  },
  {
    key: "collectableAmount",
    header: "Collectable Amount",
    width: "20%",
    render: (row: any) => (
      <span className="text-green-500 font-medium px-2 py-1 rounded-2xl">
        ৳{row.collectableAmount}
      </span>
    ),
  },
  {
    key: "collectedAmount",
    header: "Collected Amount",
    width: "19%",
    render: (row: any) => (
      <span className="text-green-500 font-medium px-2 py-1 rounded-2xl">
        ৳{row.collectedAmount}
      </span>
    ),
  },
];
