import { FileIcon } from "lucide-react";

export const returnParcelColumns = [
  {
    key: "parcelId",
    title: "Parcel Id",
    width: 120,
    render: (row: any) => <span className="font-semibold">{row.date}</span>,
  },
  {
    key: "reason",
    title: "Reason",
    width: 200,
  },
  {
    key: "status",
    title: "status",
    width: 150,
    render: (row: any) => (
      <span className="font-semibold text-orange-500 flex items-center justify-center ">
        <span>{row.status}</span>
      </span>
    ),
  },
  {
    key: "collectableAmount",
    title: "Collectable Amount",
    width: 140,
    render: (row: any) => (
      <span className="text-green-500 font-medium px-2 py-1 rounded-2xl">
        {row.successRate}
      </span>
    ),
  },
  {
    key: "collectedAmount",
    title: "Collected Amount",
    width: 140,
    render: (row: any) => (
      <span className="text-green-500 font-medium px-2 py-1 rounded-2xl">
        {" "}
        {row.successRate}
      </span>
    ),
  },
];
