"use client";

import CustomPagination from "@/components/reusable/CustomPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetParcelHistoryQuery } from "@/redux/features/parcels/parcelsApi";
import { PARCEL_HISTORY_STATUS_OPTIONS } from "@/redux/features/parcels/parcelTypes";
import { Search } from "lucide-react";
import React, { useState } from "react";
import ParcelHistoryTable from "./_components/ParcelHistoryTable";

export default function ParcelHistoryPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading, isError } = useGetParcelHistoryQuery({
    page,
    limit,
    search,
    status,
    startDate,
    endDate,
  });

  const parcels = data?.data?.parcels ?? [];
  const pagination = data?.data?.pagination;

  const resetPageAnd = (update: () => void) => {
    setPage(1);
    update();
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    resetPageAnd(() => setSearch(searchInput.trim()));
  };

  return (
    <div className="container mx-auto p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Parcel History</h1>
        <p className="mt-1 text-sm text-gray-500">
          Hub-confirmed completed parcels only.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border bg-white p-4 lg:flex-row lg:items-center">
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-lg items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search parcel, tracking, customer..."
              className="h-10 pl-9 focus-visible:border-[#FE5000] focus-visible:ring-0"
            />
          </div>
          <Button
            type="submit"
            className="h-10 bg-[#FE5000] text-white hover:bg-[#e64800]"
          >
            Search
          </Button>
        </form>

        <select
          value={status}
          onChange={(event) =>
            resetPageAnd(() => setStatus(event.target.value))
          }
          className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none [color-scheme:light] focus:border-[#FE5000]"
        >
          <option value="">All history statuses</option>
          {PARCEL_HISTORY_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Input
          type="date"
          value={startDate}
          onChange={(event) =>
            resetPageAnd(() => setStartDate(event.target.value))
          }
          className="h-10 w-full max-w-[160px] [color-scheme:light] focus-visible:border-[#FE5000] focus-visible:ring-0"
        />
        <Input
          type="date"
          value={endDate}
          min={startDate || undefined}
          onChange={(event) =>
            resetPageAnd(() => setEndDate(event.target.value))
          }
          className="h-10 w-full max-w-[160px] [color-scheme:light] focus-visible:border-[#FE5000] focus-visible:ring-0"
        />

        <span className="ml-auto whitespace-nowrap text-sm text-gray-500">
          Total: {pagination?.total ?? 0}
        </span>
      </div>

      {isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
          Failed to load parcel history. Please try again.
        </div>
      ) : (
        <ParcelHistoryTable data={parcels} isLoading={isLoading} />
      )}

      {pagination && pagination.totalPages > 0 && (
        <CustomPagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
          totalItems={pagination.total}
          itemsPerPage={pagination.limit}
          onItemsPerPageChange={(nextLimit) => {
            setLimit(nextLimit);
            setPage(1);
          }}
          itemsPerPageOptions={[10, 20, 50, 100]}
          show
          showItemsPerPage
          showingLabel="Showing"
          resultsLabel="parcels"
        />
      )}
    </div>
  );
}
