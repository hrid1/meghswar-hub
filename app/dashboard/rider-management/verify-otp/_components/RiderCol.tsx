import { Button } from "@/components/ui/button";
import { Check, X, Copy } from "lucide-react";
import { PendingHubVerification } from "@/redux/features/verify-otp/verifyOtpTypes";
import { toast } from "sonner";

function copyText(value: string, label: string) {
  navigator.clipboard.writeText(value);
  toast.success(`${label} copied to clipboard`);
}

export const riderTableColumns = (
  onAction?: (type: "approve" | "decline", row: PendingHubVerification) => void,
  processingId?: string | null,
) => [
  {
    key: "parcel_id",
    header: "Parcel / Tracking",
    width: "16%",
    render: (row: PendingHubVerification) => (
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-gray-900 text-sm">
          <span>{row.parcel_id}</span>
          <button
            type="button"
            onClick={() => copyText(row.parcel_id, "Parcel ID")}
            className="text-gray-400 hover:text-gray-600 p-0.5 rounded"
            title="Copy Parcel ID"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
          <span>{row.tracking_number}</span>
          <button
            type="button"
            onClick={() => copyText(row.tracking_number, "Tracking Number")}
            className="text-gray-400 hover:text-gray-600 p-0.5 rounded"
            title="Copy Tracking Number"
          >
            <Copy className="w-3 h-3" />
          </button>
        </div>
      </div>
    ),
  },

  {
    key: "rider",
    header: "Rider",
    width: "16%",
    render: (row: PendingHubVerification) => (
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold shrink-0">
          {row.rider_name?.charAt(0)?.toUpperCase() || "R"}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate">
            {row.rider_name || "Unknown Rider"}
          </p>
          <p className="text-xs text-gray-500">{row.rider_phone || "—"}</p>
        </div>
      </div>
    ),
  },

  {
    key: "selected_status",
    header: "Requested Status",
    width: "13%",
    render: (row: PendingHubVerification) => {
      const status = row.selected_status;
      let badgeClass = "bg-gray-100 text-gray-700";
      if (status === "DELIVERED") {
        badgeClass = "bg-green-100 text-green-700 border border-green-200";
      } else if (status === "PARTIAL_DELIVERY") {
        badgeClass = "bg-yellow-100 text-yellow-800 border border-yellow-200";
      } else if (status === "RETURNED" || status === "CANCELLED") {
        badgeClass = "bg-red-100 text-red-700 border border-red-200";
      } else if (status === "EXCHANGE") {
        badgeClass = "bg-blue-100 text-blue-700 border border-blue-200";
      }

      return (
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${badgeClass}`}
        >
          {status}
        </span>
      );
    },
  },

  {
    key: "amount",
    header: "Amount (৳)",
    width: "14%",
    render: (row: PendingHubVerification) => (
      <div className="text-xs space-y-0.5">
        <div className="flex justify-between text-gray-500">
          <span>Expected:</span>
          <span className="font-medium text-gray-700">৳{row.expected_amount}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Collected:</span>
          <span className="font-medium text-gray-900">৳{row.collected_amount}</span>
        </div>
        <div className="flex justify-between pt-0.5 border-t border-gray-100">
          <span>Diff:</span>
          <span
            className={`font-semibold ${
              row.difference === 0
                ? "text-green-600"
                : row.difference < 0
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {row.difference > 0 ? `+৳${row.difference}` : `৳${row.difference}`}
          </span>
        </div>
      </div>
    ),
  },

  {
    key: "reason",
    header: "Request Reason",
    width: "16%",
    render: (row: PendingHubVerification) => (
      <div className="text-xs">
        <p className="text-gray-700 line-clamp-2" title={row.request_reason || ""}>
          {row.request_reason || <span className="text-gray-400 italic">No reason provided</span>}
        </p>
        {row.requested_at && (
          <p className="text-[10px] text-gray-400 mt-1">
            {new Date(row.requested_at).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    ),
  },

  {
    key: "otp",
    header: "OTP Info",
    width: "12%",
    render: (row: PendingHubVerification) => (
      <div className="text-xs space-y-0.5">
        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
          {row.otp_sent_to}
        </span>
        <p className="font-mono text-gray-700 text-xs">{row.otp_phone}</p>
      </div>
    ),
  },

  {
    key: "actions",
    header: "Actions",
    width: "13%",
    render: (row: PendingHubVerification) => {
      const isProcessing = processingId === row.verification_id;

      return (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            disabled={isProcessing}
            className="bg-green-600 text-white hover:bg-green-700 h-8 px-2.5 text-xs font-medium"
            onClick={() => onAction?.("approve", row)}
          >
            <Check className="w-3.5 h-3.5 mr-1" />
            Approve
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={isProcessing}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-8 px-2.5 text-xs font-medium"
            onClick={() => onAction?.("decline", row)}
          >
            <X className="w-3.5 h-3.5 mr-1" />
            Decline
          </Button>
        </div>
      );
    },
  },
];
