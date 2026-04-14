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

  const merchants = [
    { id: 1, name: "Merchant 1" },
    { id: 2, name: "Merchant 2" },
    { id: 3, name: "Merchant 3" },
  ];

  const riders = [
    { id: 1, name: "Rider 1" },
    { id: 2, name: "Rider 2" },
    { id: 3, name: "Rider 3" },
  ];
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
        <p className="text-red-500">
          Error loading parcels: {(error as any)?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <h1 className="text-2xl font-bold">All Parcel</h1>

      {/* Search and Filters */}
      <div className="grid grid-cols-7 gap-4">
        <CustomSearchInput
          className="col-span-2 w-[90%]"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          placeholder="Search parcels..."
        />

        <select className="border p-2 rounded-md -ml-5">
          <option value="">All Merchants </option>
          {merchants.map((merchant: any) => (
            <option key={merchant.id} value={merchant.id}>
              {merchant.name}
            </option>
          ))}
        </select>

        <select className="border p-2 rounded-md ml-5">
          <option value="">All Riders</option>
          {riders.map((rider: any) => (
            <option key={rider.id} value={rider.id}>
              {rider.name}
            </option>
          ))}
        </select>

        <select className="border p-2 rounded-md ml-5 ">
          <option value="">All Status</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
          <option value="Delivery Rescheduled">Delivery Rescheduled</option>
          <option value="Customer Not Available">Customer Not Available</option>
        </select>

        
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
            prev.includes(rowId)
              ? prev.filter((id) => id !== rowId)
              : [...prev, rowId],
          );
        }}
        onToggleAll={(nextSelected) => {
          setSelectedRowIds(nextSelected);
        }}
      />
    </div>
  );
}
