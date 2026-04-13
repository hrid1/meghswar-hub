"use client";

import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { DataTable } from "@/components/reusable/DataTable";
import React, { useState } from "react";


import { useGetAllParcelsQuery } from "@/redux/features/parcels/parcelsApi";
import { columns } from "./_components/AllParcelCol";
export default function TestTablePage() {
  const { data: parcels, isLoading, isError, error } = useGetAllParcelsQuery();
  const parcelsData = parcels?.data?.parcels || [];
  console.log("parcelsData", parcelsData);
  const [search, setSearch] = useState("");



  // =============================
  // 3️⃣ Row Selection State
  // =============================
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  // Filter data based on search
  const filteredData = parcelsData.filter((item: any) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      item.parcel_tx_id?.toLowerCase().includes(searchLower) ||
      item.tracking_number?.toLowerCase().includes(searchLower) ||
      item.customer_name?.toLowerCase().includes(searchLower) ||
      item.customer_phone?.toLowerCase().includes(searchLower) ||
      item.store_name?.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading parcels...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading parcels: {(error as any)?.message || "Unknown error"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <h1 className="text-2xl font-bold">All Parcel</h1>

      {/* Search and Filters */}
      <div className="grid grid-cols-7 gap-5">
        <CustomSearchInput
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          placeholder="Search parcels..."
        />
        <CustomSearchInput
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          placeholder="Search parcels..."
        />
        <CustomSearchInput
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          placeholder="Search parcels..."
        />
        <CustomSearchInput
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          placeholder="Search parcels..."
        />
        <CustomSearchInput
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          placeholder="Search parcels..."
        />
        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
          Select
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          Export
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        selectable={true}
        getRowId={(row) => row.id}
        selectedRowIds={selectedRowIds}
        onToggleRow={(rowId) => {
          setSelectedRowIds((prev) =>
            prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
          );
        }}
        onToggleAll={(nextSelected) => {
          setSelectedRowIds(nextSelected);
        }}
      />
    </div>
  );
}