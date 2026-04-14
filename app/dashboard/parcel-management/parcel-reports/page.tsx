"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useState } from "react";
import { parcelColumns } from "./_component/parcelCol";
import { useGetParcelReportsQuery } from "@/redux/features/parcels/parcelsApi";
import { Search, RefreshCw, Loader2 } from "lucide-react";
import { useEffect, useState as useStateInner } from "react";

function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useStateInner<T>(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const ISSUE_TYPES = [
  { value: "", label: "All Issue Types" },
  { value: "INCORRECT_PHONE", label: "Incorrect Phone" },
  { value: "WRONG_ADDRESS", label: "Wrong Address" },
  { value: "NOT_AVAILABLE", label: "Not Available" },
  { value: "DAMAGED", label: "Damaged" },
  { value: "FRAUD", label: "Fraud" },
];

export default function ParcelReportTable() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [searchInput, setSearchInput] = useState("");
  const [issueType, setIssueType] = useState("");

  const debouncedSearch = useDebounce(searchInput, 400);

  const { data: parcelReports, isLoading, isError, refetch } =
    useGetParcelReportsQuery({
      page,
      limit,
      search: debouncedSearch || undefined,
      issue_type: issueType || undefined,
    });

  const reportsData = parcelReports?.data || [];
  const pagination = parcelReports?.pagination;

  const totalPages = pagination?.totalPages ?? 1;
  const totalCount = pagination?.total ?? 0;

  // table selections
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<any>(null);

  const handleToggleRow = (rowId: string | number) => {
    setSelectedRowIds((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  const handleToggleAll = (nextSelected: (string | number)[]) => {
    setSelectedRowIds(nextSelected);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const handleIssueTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIssueType(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Parcel Reports</h1>
        <button
          onClick={() => refetch()}
          className="p-2 text-gray-500 hover:text-orange-500 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by tracking number, customer..."
            className="pl-9 pr-4 py-2 border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-orange-200 text-sm"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>

        {/* Issue Type Filter */}
        <select
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
          value={issueType}
          onChange={handleIssueTypeChange}
        >
          {ISSUE_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        {/* Result count */}
        <span className="text-sm text-gray-500 ml-auto">
          {totalCount > 0 && `${totalCount} report${totalCount !== 1 ? "s" : ""} found`}
        </span>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          <span className="ml-2 text-gray-500">Loading reports...</span>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex justify-center items-center h-48 text-red-500">
          Failed to load parcel reports. Please try again.
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && (
        <DataTable
          columns={parcelColumns((row: any) => {
            setSelectedParcel(row);
          })}
          data={reportsData}
          selectable={true}
          getRowId={(row) => row.id}
          selectedRowIds={selectedRowIds}
          onToggleRow={handleToggleRow}
          onToggleAll={handleToggleAll}
        />
      )}

      {/* Empty state */}
      {!isLoading && !isError && reportsData.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          No reports found{searchInput || issueType ? " for the current filters" : ""}.
        </div>
      )}

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
