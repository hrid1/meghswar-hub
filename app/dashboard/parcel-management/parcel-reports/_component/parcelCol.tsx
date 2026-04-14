"use client";

import { txt } from "@/lib/utils";
import { PhoneCall } from "lucide-react";

export const parcelColumns = (onClickUpdate?: (row: any) => void) => [
  // 1. Parcel ID + Tracking
  {
    key: "id",
    header: "ID",
    width: "13%",
    wrap: true,
    render: (row: any) => (
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium truncate">
          {txt(row.tracking_number) || txt(row.id) || "—"}
        </span>
        <span className="text-xs text-gray-400 truncate">
          {txt(row.id)?.slice(0, 12)}…
        </span>
      </div>
    ),
  },

  // 2. Customer
  {
    key: "customer",
    header: "Customer",
    width: "17%",
    wrap: true,
    render: (row: any) => {
      const name = txt(row.customer?.name) || "N/A";
      const phone = txt(row.customer?.phone) || "—";
      const address = txt(row.customer?.address) || "";
      const short = address.length > 40 ? address.slice(0, 40) + "..." : address;

      return (
        <div className="text-sm min-w-0">
          <div className="font-semibold text-gray-900 truncate">{name}</div>
          <div className="text-xs text-gray-600 mt-0.5">{phone}</div>
          <div className="relative group mt-0.5">
            <div className="text-xs text-gray-400 break-words cursor-default">
              {short || "No address"}
            </div>
            {address.length > 40 && (
              <div className="absolute left-0 bottom-full mb-1 z-30 hidden group-hover:block">
                <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg max-w-xs whitespace-normal">
                  {address}
                </div>
                <div className="w-3 h-3 bg-gray-800 rotate-45 absolute left-4 -bottom-1.5" />
              </div>
            )}
          </div>
        </div>
      );
    },
  },

  // 3. Store / Merchant
  {
    key: "merchant",
    header: "Store",
    width: "14%",
    render: (row: any) => {
      const name = txt(row.merchant?.name) || "N/A";
      const company = txt(row.merchant?.company) || "";
      const phone = txt(row.merchant?.phone) || "—";

      return (
        <div className="text-sm min-w-0">
          <div className="font-semibold text-gray-900 truncate">{name}</div>
          {company && (
            <div className="text-xs text-gray-500 truncate">{company}</div>
          )}
          <div className="text-xs text-gray-400">{phone}</div>
        </div>
      );
    },
  },

  // 4. Zone
  // {
  //   key: "zone",
  //   header: "Zone",
  //   width: "8%",
  //   render: (row: any) => (
  //     <span className="text-xs font-medium text-gray-700">
  //       {txt(row.zone) || "—"}
  //     </span>
  //   ),
  // },

  // 5. Reported By (Rider)
  {
    key: "reported_by",
    header: "Reported By",
    width: "13%",
    render: (row: any) => {
      const name = txt(row.reported_by?.name) || "N/A";
      const photo = txt(row.reported_by?.photo) || "";

      return (
        <div className="flex items-center gap-2">
          {photo ? (
            <img
              src={photo}
              alt={name}
              className="w-8 h-8 rounded-full object-cover border shrink-0"
              onError={(e) =>
                ((e.currentTarget as HTMLImageElement).src =
                  "https://i.pravatar.cc/50?img=3")
              }
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold shrink-0">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-xs font-medium text-gray-700 truncate">
            {name}
          </span>
        </div>
      );
    },
  },

  // 6. Report Type
  {
    key: "report_type",
    header: "Issue Type",
    width: "12%",
    render: (row: any) => {
      const type = txt(row.report?.type) || "N/A";

      const styles: Record<string, string> = {
        INCORRECT_PHONE: "bg-yellow-100 text-yellow-700",
        WRONG_ADDRESS: "bg-orange-100 text-orange-700",
        NOT_AVAILABLE: "bg-red-100 text-red-700",
        DAMAGED: "bg-purple-100 text-purple-700",
        FRAUD: "bg-red-100 text-red-700",
      };

      const display = type.replace(/_/g, " ").toLowerCase()
        .replace(/\b\w/g, (l: string) => l.toUpperCase());

      return (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
            styles[type] || "bg-gray-100 text-gray-600"
          }`}
        >
          {display}
        </span>
      );
    },
  },

  // 7. Reason + Reported At
  {
    key: "reason",
    header: "Reason",
    width: "15%",
    wrap: true,
    render: (row: any) => {
      const reason = txt(row.report?.reason) || "—";
      const reportedAt = row.report?.reported_at
        ? new Date(row.report.reported_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }) +
          ", " +
          new Date(row.report.reported_at).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : null;

      return (
        <div>
          <p className="text-xs text-gray-700 break-words">{reason}</p>
          {reportedAt && (
            <p className="text-[10px] text-gray-400 mt-1">{reportedAt}</p>
          )}
        </div>
      );
    },
  },

  // 8. Action
  {
    key: "action",
    header: "Action",
    width: "8%",
    render: (row: any) => (
      <div className="flex flex-col items-center gap-1.5">
        <a
          href={`tel:${row.customer?.phone}`}
          className="p-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors"
          title={`Call ${row.customer?.phone}`}
        >
          <PhoneCall className="w-4 h-4" />
        </a>
        {onClickUpdate && (
          <button
            onClick={() => onClickUpdate(row)}
            className="px-2 py-1 text-xs bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors whitespace-nowrap"
          >
            Update
          </button>
        )}
      </div>
    ),
  },
];
