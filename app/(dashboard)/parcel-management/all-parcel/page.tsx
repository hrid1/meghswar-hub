"use client";

import DataTable3 from "@/components/reusable/DataTable3";
import { Search } from "lucide-react";
import React, { useState } from "react";

export default function TestTablePage() {
  // =============================
  // 1️⃣ Columns Configuration
  // =============================
  const columns = [
    {
      key: "parcelId",
      title: "Parcel Id",
      width: 60,
      render: (row: any) => (
        <span className="font-semibold">{row.parcelId}</span>
      ),
    },
    {
      key: "customer",
      title: "Customer",
      width: 220,
      render: (row: any) => (
        <div className="flex flex-col">
          <span className="font-semibold">{row.customer}</span>
          <span className="text-sm text-gray-500">{row.phone}</span>
          <span className="text-xs text-gray-400">{row.address}</span>
        </div>
      ),
    },
    {
      key: "merchant",
      title: "Merchant",
      width: 200,
      render: (row: any) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0" />
          <div>
            <p className="font-semibold">{row.merchant}</p>
            <p className="text-xs text-gray-500">{row.merchantInvoice}</p>
          </div>
        </div>
      ),
    },
    {
      key: "area",
      title: "Area",
      width: 120,
    },
    {
      key: "rider",
      title: "Rider",
      width: 220,
      render: (row: any) => (
        <div className="flex items-center space-x-2">
          <img
            src={row.riderImg}
            className="w-8 h-8 rounded-full"
            alt="rider"
          />
          <div>
            <p className="font-semibold text-sm text-nowrap">{row.rider}</p>
            <p className="text-xs text-gray-500">{row.riderPhone}</p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      width: 100,
      render: (row: any) => (
        <span
          className={`px-2 py-1 text-xs rounded-full text-nowrap ${
            row.status === "In Progress"
              ? "bg-green-100 text-green-600"
              : row.status === "Partial Delivery"
              ? "bg-purple-100 text-purple-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "amount",
      title: "Amount",
      width: 20,
      render: (row: any) => <span>৳ {row.amount}</span>,
    },
    {
      key: "deliveryTime",
      title: "Delivery",
      width: 120,
      render: (row: any) => (
        <div className="text-right">
          <span className="block font-semibold">{row.deliveryTime}</span>
          <span className="text-xs text-gray-500">{row.createdAt}</span>
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
      customer: "Farzana Rahman",
      phone: "+880123456789",
      address:
        "Plot#12, Sarwar Road, Block-B, Bashundhara Residential Area, Dhaka",
      merchant: "Booklet Design BD",
      merchantInvoice: "#INVC-1345",
      area: "Dhanmondi",
      rider: "Ahmad Wasi",
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
      customer: "Farzana Rahman",
      phone: "+880123456789",
      address:
        "Plot#12, Sarwar Road, Block-B, Bashundhara Residential Area, Dhaka",
      merchant: "Booklet Design BD",
      merchantInvoice: "#INVC-2367",
      area: "Dhanmondi",
      rider: "Ahmad Wasi",
      riderPhone: "+880124567890",
      riderImg: "https://i.pravatar.cc/50?img=5",
      status: "Partial Delivery",
      amount: 1187,
      deliveryTime: "2 Days",
      createdAt: "20 Nov 2025, 12:52 PM",
    },
  ];

  // =============================
  // 3️⃣ Row Selection State
  // =============================
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectRow = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === fakeData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(fakeData.map((_, i) => i));
    }
  };

  return (
    <div className="p-6 space-y-6 container mx-auto ">
      {/* Page Header */}
      <h1 className="text-2xl font-bold">All Parcel</h1>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-3 border w-full rounded-lg"
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataTable3
        columns={columns}
        data={fakeData}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        onSelectAll={handleSelectAll}
        rowKey="id"
      />
    </div>
  );
}
