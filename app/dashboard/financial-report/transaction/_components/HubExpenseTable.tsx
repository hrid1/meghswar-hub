"use client";

import { DataTable } from "@/components/reusable/DataTable";
import CustomPagination from "@/components/reusable/CustomPagination";
import React, { useState } from "react";
import { useGetHubExpensesQuery } from "@/redux/features/financial-report/FinancialReportApi";
import { HubExpense } from "@/redux/features/financial-report/FinancialReportType";
import { Loader2, RefreshCw, ExternalLink } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  IN_REVIEW: "bg-yellow-100 text-yellow-700",
  PENDING:   "bg-orange-100 text-orange-700",
  APPROVED:  "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  REJECTED:  "bg-red-100 text-red-700",
};

const CATEGORY_LABELS: Record<string, string> = {
  OFFICE_RENT:   "Office Rent",
  OFFICE_SUPPLY: "Office Supply",
  UTILITIES:     "Utilities",
  STATIONARY:    "Stationary",
  MAINTENANCE:   "Maintenance",
  SALARY:        "Salary",
  OTHER:         "Other",
};

const CATEGORY_COLORS: Record<string, string> = {
  OFFICE_RENT:   "bg-purple-100 text-purple-700",
  OFFICE_SUPPLY: "bg-blue-100 text-blue-700",
  UTILITIES:     "bg-cyan-100 text-cyan-700",
  STATIONARY:    "bg-indigo-100 text-indigo-700",
  MAINTENANCE:   "bg-orange-100 text-orange-700",
  SALARY:        "bg-green-100 text-green-700",
  OTHER:         "bg-gray-100 text-gray-600",
};

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) +
    ", " +
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
  );
};

const expenseColumns = [
  {
    key: "category",
    header: "Category",
    width: "15%",
    render: (row: HubExpense) => (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
          CATEGORY_COLORS[row.category] ?? "bg-gray-100 text-gray-600"
        }`}
      >
        {CATEGORY_LABELS[row.category] ?? row.category}
      </span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    width: "12%",
    render: (row: HubExpense) => (
      <span className="font-bold text-green-600">
        ৳{Number(row.amount).toLocaleString()}
      </span>
    ),
  },
  {
    key: "reason",
    header: "Reason",
    width: "25%",
    wrap: true,
    render: (row: HubExpense) => (
      <p className="text-sm text-gray-700 leading-snug">{row.reason}</p>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "12%",
    render: (row: HubExpense) => {
      const display = row.status
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (l) => l.toUpperCase());
      return (
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
            STATUS_STYLES[row.status] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {display}
        </span>
      );
    },
  },
  {
    key: "proof_file_url",
    header: "Proof",
    width: "10%",
    render: (row: HubExpense) =>
      row.proof_file_url ? (
        <a
          href={row.proof_file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-orange-600 bg-orange-50 rounded-md hover:bg-orange-100 transition-colors"
        >
          View
          <ExternalLink className="w-3 h-3" />
        </a>
      ) : (
        <span className="text-xs text-gray-400">—</span>
      ),
  },
  {
    key: "rejection_reason",
    header: "Rejection",
    width: "14%",
    wrap: true,
    render: (row: HubExpense) =>
      row.rejection_reason ? (
        <p className="text-xs text-red-500">{row.rejection_reason}</p>
      ) : (
        <span className="text-xs text-gray-400">—</span>
      ),
  },
  {
    key: "created_at",
    header: "Created At",
    width: "14%",
    render: (row: HubExpense) => (
      <div>
        <div className="text-xs text-gray-700">{fmtDate(row.created_at)}</div>
        {row.reviewed_at && (
          <div className="text-xs text-gray-400 mt-0.5">
            Reviewed: {fmtDate(row.reviewed_at)}
          </div>
        )}
      </div>
    ),
  },
];

export default function HubExpenseTable() {
  const [page, setPage] = useState(1);
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const limit = 10;

  const { data, isLoading, isError, refetch } = useGetHubExpensesQuery({
    page,
    limit,
  });

  const items = data?.data?.items ?? [];
  const meta = data?.data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const totalCount = meta?.total ?? 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Hub Expenses</h2>
          {totalCount > 0 && (
            <p className="text-sm text-gray-500 mt-0.5">
              {totalCount} expense{totalCount !== 1 ? "s" : ""} total
            </p>
          )}
        </div>
        <button
          onClick={() => refetch()}
          className="p-2 text-gray-500 hover:text-orange-500 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-7 w-7 animate-spin text-orange-500" />
          <span className="ml-2 text-gray-500 text-sm">Loading expenses…</span>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex justify-center items-center h-48 text-red-500 text-sm">
          Failed to load expenses. Please try again.
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && (
        <DataTable
          columns={expenseColumns}
          data={items}
          selectable={true}
          getRowId={(row) => row.id}
          selectedRowIds={selectedRowIds}
          onToggleRow={(rowId) =>
            setSelectedRowIds((prev) =>
              prev.includes(rowId)
                ? prev.filter((id) => id !== rowId)
                : [...prev, rowId]
            )
          }
          onToggleAll={(nextSelected) => setSelectedRowIds(nextSelected)}
          emptyMessage="No expenses recorded yet."
        />
      )}

      {/* Pagination */}
      {!isLoading && !isError && (
        <CustomPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={totalCount}
          itemsPerPage={limit}
          show={totalPages > 1}
        />
      )}
    </div>
  );
}
