"use client";

import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { DataTable } from "@/components/reusable/DataTable";
import React, { useState } from "react";
import { useGetAllParcelsQuery } from "@/redux/features/parcels/parcelsApi";

export default function TestTablePage() {
  const { data: parcels, isLoading, isError, error } = useGetAllParcelsQuery();
  const parcelsData = parcels?.data?.parcels || [];
  console.log("parcelsData", parcelsData);
  const [search, setSearch] = useState("");

  // =============================
  // 1️⃣ Columns Configuration
  // =============================
  const columns = [
    // 1. Parcel ID
    {
      key: "parcelId",
      header: "ID",
      width: "6%",
      render: (row: any) => (
        <div className="flex flex-col items-start w-24">
          <span className="text-sm">PID:{row.parcel_tx_id || row.parcelId}</span>
          <span className="text-sm font">MID:{row.merchant_order_id || row.marchantId}</span>
        </div>
      ),
    },

    // 2. Customer Info
    {
      key: "customer",
      header: "Customer Info",
      width: "16%",
      wrap: true,
      render: (row: any) => {
        const address = row.customer_address || row.address || "";
        const shortAddress =
          address.length > 40 ? address.slice(0, 40) + "..." : address;
        const tooltipAddress =
          address.length > 80 ? address.slice(0, 80) + "..." : address;

        return (
          <div className="text-sm w-40">
            <div className="font-semibold text-gray-900">{row.customer_name || row.customer}</div>
            <div className="text-gray-600 text-xs mt-0.5">{row.customer_phone || row.phone}</div>

            {/* Address with hover tooltip */}
            <div className="relative group mt-1">
              <div className="text-gray-500 text-xs cursor-default pr-6">
                {shortAddress}
              </div>
              {address.length > 40 && (
                <div className="absolute left-0 bottom-full mb-1 z-30 hidden group-hover:block">
                  <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg whitespace-nowrap max-w-xs">
                    {tooltipAddress}
                    {address.length > 80 && "..."}
                  </div>
                  {/* Tail */}
                  <div className="w-3 h-3 bg-gray-800 rotate-45 absolute left-4 -bottom-1.5"></div>
                </div>
              )}
            </div>
          </div>
        );
      },
    },

    // 3. Merchant/Store
    {
      key: "store",
      header: "Store",
      width: "22%",
      render: (row: any) => (
        <div className="flex items-center space-x-3">
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{row.store_name || row.merchant}</p>
            <p className="text-xs text-gray-500 truncate">{row.merchant_order_id || "N/A"}</p>
          </div>
        </div>
      ),
    },

    // 4. Area
    {
      key: "area",
      header: "Area",
      width: "11%",
      render: (row: any) => {
        const area = row.delivery_area?.area || row.area || "";
        const zone = row.delivery_area?.zone || "";
        return (
          <div className="text-sm">
            <div>{area}</div>
            <div className="text-xs text-gray-500">{zone}</div>
          </div>
        );
      },
    },

    // 5. Rider
    {
      key: "rider",
      header: "Rider",
      width: "20%",
      render: (row: any) => (
        <div className="flex items-center space-x-3">
          <img
            src={row.riderImg || "https://i.pravatar.cc/50?img=1"}
            alt={row.rider || "Rider"}
            className="w-9 h-9 rounded-full object-cover shrink-0 border"
            onError={(e) =>
              (e.currentTarget.src = "https://i.pravatar.cc/50?img=1")
            }
          />
          <div>
            <p className="font-medium text-sm">{row.rider || "Not Assigned"}</p>
            <p className="text-xs text-gray-500">{row.riderPhone || "-"}</p>
          </div>
        </div>
      ),
    },

    // 6. Status
    {
      key: "status",
      header: "Status",
      width: "13%",
      render: (row: any) => {
        const status = row.status || "PENDING";
        const styles: Record<string, string> = {
          "PENDING": "bg-orange-100 text-orange-700",
          "IN_PROGRESS": "bg-green-100 text-green-700",
          "PARTIAL_DELIVERY": "bg-purple-100 text-purple-700",
          "DELIVERED": "bg-blue-100 text-blue-700",
          "RETURNED": "bg-red-100 text-red-700",
          "CANCELLED": "bg-gray-100 text-gray-700",
        };

        const displayStatus = status.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (l: any) => l.toUpperCase());

        return (
          <span
            className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap ${
              styles[status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {displayStatus}
          </span>
        );
      },
    },

    // 7. Amount
    {
      key: "amount",
      header: "Amount",
      width: "11%",
      render: (row: any) => {
        const totalCharge = parseFloat(row.total_charge || row.amount || 0);
        const codAmount = parseFloat(row.cod_amount || 0);
        const displayAmount = row.is_cod ? codAmount : totalCharge;

      
        const deliveryCharge = parseFloat(row.delivery_charge || 0);
        const weightCharge = parseFloat(row.weight_charge || 0);
        const codCharge = parseFloat(row.cod_charge || 0);
        // const totalCharge = parseFloat(row.total_charge || 0);
        
        return (
          <div className="font-semibold text-gray-900">
            ৳ {displayAmount.toLocaleString()}
            {row.is_cod && (
              <div className="text-xs text-gray-500">
                COD: ৳ {codAmount.toLocaleString()}
              </div>
            )}
          </div>
        );
      },
    },
    
    // 8. Attempt
    {
      key: "attempt",
      header: "Attempt",
      width: "6%",
      render: (row: any) => (
        <div className="text-center font-semibold text-gray-900">
          {row.attempt || 0}
        </div>
      ),
    },

    // 9. Delivery Time / Created At
    {
      key: "deliveryTime",
      header: "Created",
      width: "13%",
      render: (row: any) => {
        const createdAt = row.created_at ? new Date(row.created_at) : null;
        const formattedDate = createdAt ? createdAt.toLocaleDateString() : "N/A";
        const formattedTime = createdAt ? createdAt.toLocaleTimeString() : "";
        
        return (
          <div className="text-right">
            <div className="font-semibold text-sm">{row.deliveryTime || formattedDate}</div>
            <div className="text-xs text-gray-500">{formattedTime}</div>
          </div>
        );
      },
    },
  ];

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