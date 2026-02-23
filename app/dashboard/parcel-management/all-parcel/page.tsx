"use client";

import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { DataTable } from "@/components/reusable/DataTable";
import { Search } from "lucide-react";
import React, { useState } from "react";

export default function TestTablePage() {
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
        <div className="flex flex-col items-start w-24 ">
          <span className="text-sm ">PID:{row.parcelId}</span>
          <span className="text-sm font">MID:{row.marchantId}</span>
        </div>
      ),
    },

    // 2. Customer Info (most important & longest content)
    {
      key: "customer",
      header: "Customer Info",
      width: "16%",
      wrap: true,
      render: (row: any) => {
        const address = row.address || "";
        const shortAddress =
          address.length > 40 ? address.slice(0, 40) + "..." : address;
        const tooltipAddress =
          address.length > 80 ? address.slice(0, 80) + "..." : address;

        return (
          <div className="text-sm w-40">
            <div className="font-semibold text-gray-900">{row.customer}</div>
            <div className="text-gray-600 text-xs mt-0.5">{row.phone}</div>

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

    // 3. Merchant
    {
      key: "merchant",
      header: "Merchant",
      width: "22%",
      render: (row: any) => (
        <div className="flex items-center space-x-3 ">
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{row.merchant}</p>
            <p className="text-xs text-gray-500 truncate">12345678</p>
          </div>
        </div>
      ),
    },

    // 4. Area
    {
      key: "area",
      header: "Area",
      width: "11%",
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
            alt={row.rider}
            className="w-9 h-9 rounded-full object-cover shrink-0 border"
            onError={(e) =>
              (e.currentTarget.src = "https://i.pravatar.cc/50?img=1")
            }
          />
          <div>
            <p className="font-medium text-sm">{row.rider}</p>
            <p className="text-xs text-gray-500">{row.riderPhone}</p>
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
        const status = row.status;
        const styles: Record<string, string> = {
          "In Progress": "bg-green-100 text-green-700",
          "Partial Delivery": "bg-purple-100 text-purple-700",
          Pending: "bg-orange-100 text-orange-700",
          Delivered: "bg-blue-100 text-blue-700",
          Returned: "bg-red-100 text-red-700",
        };

        return (
          <span
            className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap ${
              styles[status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },

    // 7. Amount (CRITICAL FIX!)
    {
      key: "amount",
      header: "Amount",
      width: "11%",
      render: (row: any) => (
        <div className="font-semibold text-gray-900">
          ৳ {row.amount?.toLocaleString() || row.amountDetails?.amount || 0}
        </div>
      ),
    },
    // 7. Attempt (CRITICAL FIX!)
    {
      key: "attempt",
      header: "Attempt",
      width: "6%",
      render: (row: any) => (
        <div className="text-center font-semibold text-gray-900">
           {row.attempt?.toLocaleString() || row.attempt || 0}
        </div>
      ),
    },

    // 8. Delivery Time
    {
      key: "deliveryTime",
      header: "Delivery",
      width: "13%",
      render: (row: any) => (
        <div className="text-right">
          <div className="font-semibold text-sm">{row.deliveryTime}</div>
          <div className="text-xs text-gray-500">{row.createdAt}</div>
        </div>
      ),
    },
  ];

  // =============================
  // 2️⃣ Fake Data
  // =============================
  const fakeData = [
    {
      id: 1,
      parcelId: "#12345",
      marchantId: "MRC-9988",
      customer: "Farzana Rahman",
      phone: "+880123456789",
      address:
        "Plot#12, Sarwar Road, Block-B, Bashundhara Residential Area, Dhaka",
      merchant: "Booklet Design BD",
      merchantInvoice: "#INVC-1345",
      area: "Dhanmondi",
      rider: "Ahmad Wasi",
      attempt: "2",
      riderPhone: "+880124567890",
      riderImg: "https://i.pravatar.cc/50?img=3",
      status: "In Progress",
      amount: 1187,
      deliveryTime: "2 Days",
      createdAt: "20 Nov 2025, 12:56 PM",
    },
    {
      id: 2,
      parcelId: "#12345",
      marchantId: "MRC-9988",
      customer: "Farzana Rahman",
      phone: "+880123456789",
      address:
        "Plot#12, Sarwar Road, Block-B, Bashundhara Residential Area, Dhaka",
      merchant: "Booklet Design BD",
      merchantInvoice: "#INVC-2367",
      area: "Dhanmondi",
      rider: "Ahmad Wasi",
      attempt: "1",
      riderPhone: "+880124567890",
      riderImg: "https://i.pravatar.cc/50?img=5",
      status: "Partial Delivery",
      amountDetails: {
        amount: 1187,
        deliveryCharge: 30,
        codCharge: 15,
        weightCharge: 60,
      },
      deliveryTime: "2 Days",
      createdAt: "20 Nov 2025, 12:52 PM",
    },
  ];

  // =============================
  // 3️⃣ Row Selection State
  // =============================
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  return (
    <div className=" space-y-4">
      {/* Page Header */}
      <h1 className="text-2xl font-bold">All Parcel</h1>

      {/* Search */}

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
      <button >
        Select
      </button>

        <button>Export</button>
      </div>
      <DataTable
        columns={columns}
        data={fakeData}
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
