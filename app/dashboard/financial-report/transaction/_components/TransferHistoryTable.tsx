"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useState } from "react";
import { transferHistoryColumns } from "./transferHistoryCol";
import { useGetTransferHistoryQuery } from "@/redux/features/financial-report/FinancialReportApi";
import { Loader2, RefreshCw } from "lucide-react";

const fakeData = [
  {
    "id": "fceeb52c-fd78-4fcf-a5a8-a2143001908a",
    "hub_manager_id": "34f0679c-079f-4e8e-a9a8-4b94ca2517a5",
    "hub_id": "8f8c6c8a-e8b4-4c37-88d0-249b09c69758",
    "transferred_amount": 50000,
    "admin_account_id": "8f9c9639-6cd0-4318-9edf-73b05742e40a",
    "admin_account_name": "Admin Main Account",
    "admin_account_number": "1234567890",
    "admin_account_holder_name": "Company Admin",
    "transaction_reference_id": "TXN-200001",
    "proof_file_url": "https://cdn.example.com/transfer-proof.jpg",
    "status": "IN_REVIEW",
    "reviewed_by": null,
    "reviewed_at": null,
    "admin_notes": null,
    "rejection_reason": null,
    "notes": "weekly transfer",
    "transfer_date": "2026-04-13T09:00:00.000Z",
    "created_at": "2026-04-13T09:00:00.000Z",
    "updated_at": "2026-04-13T09:00:00.000Z"
  }
]

export default function TransferHistoryTable() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  const { data: transferHistory, isLoading, isError, refetch } =
    useGetTransferHistoryQuery({ page, limit });

  const items = transferHistory?.data?.items || [];
  const meta = transferHistory?.data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const totalCount = meta?.total ?? 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Transfer History</h2>
          {totalCount > 0 && (
            <p className="text-sm text-gray-500 mt-0.5">
              {totalCount} transfer{totalCount !== 1 ? "s" : ""} total
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
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          <span className="ml-2 text-gray-500">Loading transfers...</span>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex justify-center items-center h-48 text-red-500 text-sm">
          Failed to load transfer history. Please try again.
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && (
        <DataTable
          columns={transferHistoryColumns}
          data={items || []}
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
        />
      )}

      {/* Empty */}
      {/* {!isLoading && !isError && items.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          No transfer history found.
        </div>
      )} */}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
