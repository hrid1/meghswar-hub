import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export const riderTableColumns = (
  onAction?: (type: string, id: string) => void
) => [
  {
    key: "parcel_id",
    header: "Parcel ID",
    width: "12%",
    render: (row: any) => (
      <span className="font-semibold">{row.parcel_id}</span>
    ),
  },

  {
    key: "tracking_number",
    header: "Tracking",
    width: "15%",
    render: (row: any) => (
      <span className="text-xs font-medium">{row.tracking_number}</span>
    ),
  },

  {
    key: "rider",
    header: "Rider",
    width: "18%",
    render: (row: any) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
          {row.rider_name?.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-sm">{row.rider_name}</p>
          <p className="text-xs text-gray-500">{row.rider_phone}</p>
        </div>
      </div>
    ),
  },

  {
    key: "selected_status",
    header: "Status",
    width: "12%",
    render: (row: any) => (
      <span
        className={`text-xs font-medium px-2 py-1 rounded-full ${
          row.selected_status === "DELIVERED"
            ? "bg-green-100 text-green-700"
            : row.selected_status === "PARTIAL_DELIVERY"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.selected_status}
      </span>
    ),
  },

  {
    key: "amount",
    header: "Amount",
    width: "12%",
    render: (row: any) => (
      <div className="text-xs">
        <p>Exp: {row.expected_amount}</p>
        <p>Coll: {row.collected_amount}</p>
        <p className={row.difference === 0 ? "text-green-600" : "text-red-600"}>
          Diff: {row.difference}
        </p>
      </div>
    ),
  },

  {
    key: "otp",
    header: "OTP Phone",
    width: "15%",
    render: (row: any) => (
      <span className="text-xs text-gray-600">{row.otp_phone}</span>
    ),
  },

  {
    key: "actions",
    header: "Actions",
    width: "15%",
    render: (row: any) => (
      <div className="flex gap-2">
        <Button
          size="sm"
          className="bg-green-100 text-green-700 hover:bg-green-200"
          onClick={() => onAction?.("approve", row.verification_id)}
        >
          <Check className="w-4 h-4 mr-1" /> Approve
        </Button>

        <Button
          size="sm"
          className="bg-red-100 text-red-700 hover:bg-red-200"
          onClick={() => onAction?.("decline", row.verification_id)}
        >
          <X className="w-4 h-4 mr-1" /> Decline
        </Button>
      </div>
    ),
  },
];