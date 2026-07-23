"use client";

import CustomPagination from "@/components/reusable/CustomPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetParcelHistoryQuery } from "@/redux/features/parcels/parcelsApi";
import { Search } from "lucide-react";
import React, { useState } from "react";
import ParcelHistoryTable from "./_components/ParcelHistoryTable";

export default function ParcelHistoryPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, isError } = useGetParcelHistoryQuery({
    page,
    limit,
    search,
    status,
  });

  const parcels = data?.data?.parcels ?? [];
  const pagination = data?.data?.pagination;

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleStatusChange = (value: string) => {
    setPage(1);
    setStatus(value);
  };

  return (
    <div className="container mx-auto p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Parcel History</h1>
        <p className="mt-1 text-sm text-gray-500">
          View parcel, customer, merchant, rider, financial and timeline
          information.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border bg-white p-4 sm:flex-row sm:items-center">
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
          onChange={(event) => handleStatusChange(event.target.value)}
          className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-[#FE5000]"
        >
          <option value="">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="IN_HUB">In Hub</option>
          <option value="IN_TRANSIT">In Transit</option>
          <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
          <option value="DELIVERED">Delivered</option>
          <option value="DELIVERY_RESCHEDULED">Delivery Rescheduled</option>
          <option value="RETURN_TO_MERCHANT">Return to Merchant</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

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
