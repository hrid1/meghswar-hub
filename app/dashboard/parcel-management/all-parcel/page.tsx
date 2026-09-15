"use client";

import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import CustomPagination from "@/components/reusable/CustomPagination";
import { DataTable } from "@/components/reusable/DataTable";
import React, { useState } from "react";

import { useGetHubMerchantsQuery, useGetHubRidersQuery } from "@/redux/features/hubs/hubsApi";
import { useGetAllParcelsQuery } from "@/redux/features/parcels/parcelsApi";
import { PARCEL_STATUS_OPTIONS } from "@/redux/features/parcels/parcelTypes";
import { columns } from "./_components/AllParcelCol";
import EditParcelModal from "./_components/EditParcelModal";
import type { HubMerchant } from "@/redux/features/hubs/hubsTypes";

const filterSelectClassName =
  "h-12 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none [color-scheme:light] focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:bg-gray-50";

function getMerchantList(data: unknown): HubMerchant[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && Array.isArray((data as { merchants?: HubMerchant[] }).merchants)) {
    return (data as { merchants: HubMerchant[] }).merchants;
  }
  return [];
}

function getMerchantId(merchant: HubMerchant) {
  return merchant.merchant_id || merchant.id || "";
}

function getMerchantLabel(merchant: HubMerchant) {
  const name =
    merchant.merchant_name ||
    merchant.full_name ||
    merchant.business_name ||
    merchant.user?.full_name ||
    "";
  const store = merchant.store_name || merchant.store?.business_name || "";
  if (name && store && store !== name) return `${name} - ${store}`;
  return name || store || "Unnamed merchant";
}

export default function TestTablePage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [riderId, setRiderId] = useState("");
  const [status, setStatus] = useState("");

  const { data: parcels, isLoading, isError, error } = useGetAllParcelsQuery({
    page,
    limit,
    merchantId: merchantId || undefined,
    riderId: riderId || undefined,
    status: status || undefined,
    search: search.trim() || undefined,
  });
  const { data: merchantsData, isLoading: areMerchantsLoading } =
    useGetHubMerchantsQuery();
  const { data: ridersData, isLoading: areRidersLoading } = useGetHubRidersQuery();
  const parcelsData = parcels?.data?.parcels || [];
  const pagination = parcels?.data?.pagination;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<any | null>(null);

  // =============================
  // 3️⃣ Row Selection State
  // =============================
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  const merchants = getMerchantList(merchantsData?.data);
  const riders = ridersData?.data?.riders || [];

  const resetPageAnd = (update: () => void) => {
    setPage(1);
    update();
  };
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
          onChange={(value) => resetPageAnd(() => setSearch(value))}
          placeholder="Search parcels..."
        />

        <select
          value={merchantId}
          onChange={(event) =>
            resetPageAnd(() => setMerchantId(event.target.value))
          }
          disabled={areMerchantsLoading}
          className={filterSelectClassName}
        >
          <option value="">All Merchants</option>
          {merchants.map((merchant) => {
            const id = getMerchantId(merchant);
            if (!id) return null;
            return (
              <option key={id} value={id}>
                {getMerchantLabel(merchant)}
              </option>
            );
          })}
          {!areMerchantsLoading && merchants.length === 0 && (
            <option disabled>No merchants found</option>
          )}
        </select>

        <select
          value={riderId}
          onChange={(event) => resetPageAnd(() => setRiderId(event.target.value))}
          disabled={areRidersLoading}
          className={filterSelectClassName}
        >
          <option value="">All Riders</option>
          {riders.map((rider) => (
            <option key={rider.id} value={rider.id}>
              {rider.full_name}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(event) => resetPageAnd(() => setStatus(event.target.value))}
          className={filterSelectClassName}
        >
          <option value="">All Status</option>
          {PARCEL_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          Export
        </button>
      </div>

      <DataTable
        columns={columns((row) => {
          setSelectedParcel(row);
          setOpenEditModal(true);
        })}
        data={parcelsData}
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

      {pagination && (
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
          resultsLabel="parcels"
        />
      )}

      <EditParcelModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        parcel={selectedParcel}
      />
    </div>
  );
}
