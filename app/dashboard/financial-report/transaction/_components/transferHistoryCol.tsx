"use client";

import { ExternalLink, FileText } from "lucide-react";

export const transferHistoryColumns = [
  // 1. Transfer Date
  {
    key: "transfer_date",
    header: "Transfer Date",
    width: "14%",
    render: (row: any) => {
      const date = row.transfer_date ? new Date(row.transfer_date) : null;
      if (!date) return <span className="text-gray-400 text-xs">—</span>;

      const formatted = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      const time = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return (
        <div>
          <div className="text-sm font-medium text-gray-800">{formatted}</div>
          <div className="text-xs text-gray-400">{time}</div>
        </div>
      );
    },
  },

  // 2. Bank / Account
  {
    key: "bank",
    header: "Bank / Account",
    width: "20%",
    render: (row: any) => (
      <div className="text-sm min-w-0">
        <div className="font-semibold text-gray-900 truncate">
          {row.admin_account_name || "—"}
        </div>
        <div className="text-xs text-gray-500 truncate">
          Holder: {row.admin_account_holder_name || "—"}
        </div>
        <div className="text-xs text-gray-400 font-mono truncate">
          Acc: {row.admin_account_number || "—"}
        </div>
        {row.transaction_reference_id && (
          <div className="text-xs text-orange-500 truncate mt-0.5">
            Ref: {row.transaction_reference_id}
          </div>
        )}
      </div>
    ),
  },

  // 3. Amount
  {
    key: "amount",
    header: "Amount",
    width: "12%",
    render: (row: any) => {
      const amount = parseFloat(row.transferred_amount || 0);
      return (
        <div>
          <div className="text-base font-bold text-green-600">
            ৳ {amount.toLocaleString()}
          </div>
        </div>
      );
    },
  },

  // 4. Status
  {
    key: "status",
    header: "Status",
    width: "11%",
    render: (row: any) => {
      const status = row.status || "N/A";

      const styles: Record<string, string> = {
        IN_REVIEW: "bg-yellow-100 text-yellow-700",
        PENDING:   "bg-orange-100 text-orange-700",
        APPROVED:  "bg-blue-100 text-blue-700",
        COMPLETED: "bg-green-100 text-green-700",
        REJECTED:  "bg-red-100 text-red-700",
      };

      const display = status
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (l: string) => l.toUpperCase());

      return (
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
            styles[status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {display}
        </span>
      );
    },
  },

  // 5. Proof
  {
    key: "proof",
    header: "Proof",
    width: "10%",
    render: (row: any) =>
      row.proof_file_url ? (
        <a
          href={row.proof_file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-orange-600 bg-orange-50 rounded-md hover:bg-orange-100 transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          View
          <ExternalLink className="w-3 h-3" />
        </a>
      ) : (
        <span className="text-xs text-gray-400">No proof</span>
      ),
  },

  // 6. Note / Admin Notes
  {
    key: "notes",
    header: "Note",
    width: "20%",
    wrap: true,
    render: (row: any) => {
      const note = row.notes || "";
      const adminNote = row.admin_notes || "";
      const rejection = row.rejection_reason || "";

      return (
        <div className="text-xs space-y-1">
          {note && (
            <p className="text-gray-700">{note}</p>
          )}
          {adminNote && (
            <p className="text-blue-600">
              <span className="font-medium">Admin: </span>{adminNote}
            </p>
          )}
          {rejection && (
            <p className="text-red-500">
              <span className="font-medium">Rejected: </span>{rejection}
            </p>
          )}
          {!note && !adminNote && !rejection && (
            <span className="text-gray-400">—</span>
          )}
        </div>
      );
    },
  },

  // 7. Reviewed At
  {
    key: "reviewed_at",
    header: "Reviewed",
    width: "13%",
    render: (row: any) => {
      if (!row.reviewed_at) {
        return <span className="text-xs text-gray-400">Pending review</span>;
      }
      const d = new Date(row.reviewed_at);
      return (
        <div>
          <div className="text-xs text-gray-700">
            {d.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
          <div className="text-xs text-gray-400">
            {d.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
        </div>
      );
    },
  },
];
