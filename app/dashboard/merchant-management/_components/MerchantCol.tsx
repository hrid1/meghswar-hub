import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

export const merchantCol = [
  {
    key: "merchant",
    title: "Merchant",
    width: 200,
    render: (row: any) => (
      <div className="flex items-center space-x-2">
        <img
          src={row.merchantImg}
          className="w-8 h-8 rounded-full"
          alt="rider"
        />
        <div>
          <p className="font-semibold">{row.merchant}</p>
          <p className="text-xs text-gray-500">{row.merchantPhone}</p>
        </div>
      </div>
    ),
  },
  {
    key: "totalParcel",
    title: "Total Parcel",
    width: 120,
  },
  {
    key: "parcelDeliverd",
    title: "Parcel Deliverd",
    width: 120,
  },
  {
    key: "parcelReturned",
    title: "Parcel Returned",
    width: 120,
  },
  {
    key: "totalTransactions",
    title: "Total Transactions",
    width: 150,
    render: (row: any) => <span> {row.totalTransactions}</span>,
  },
  {
    key: "merchantAddress",
    title: "Merchant Address",
    width: 180,
    render: (row: any) => <p className="text-gray-500"> {row.comission}</p>,
  },
  {
    key: "action",
    title: "Action",
    width: 100,
    render: (row: any) => (
      <Link className="cursor-pointer" href={`/merchant-management/${row.mId}`}>
        <Button>
          <Eye />
        </Button>
      </Link>
    ),
  },
];
