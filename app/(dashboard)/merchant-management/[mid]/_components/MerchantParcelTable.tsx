"use client";

import React from "react";
import { marcentParcelColumns } from "./MerchantParcelTableCol";
import DataTable3 from "@/components/reusable/DataTable3";

export default function MerchantParcelTable() {
  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold">All Parcel</h1>
      {/* 🔍 SEARCH + FILTER */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search parcels..."
            className="border p-2 rounded w-60"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/*  */}

      <DataTable3
        columns={marcentParcelColumns}
        data={parcelHistoryData}
        selectedRows={[]}
      
      />
    </div>
  );
}

const parcelHistoryData = [
  {
    parcleId: "PCL-20240101",
    customerInfo: {
      name: "Rahim Uddin",
      phone: "01711223344",
      address: "Bashundhara R/A, Block C, Road 12, Dhaka",
    },
    area: "Dhaka",
    status: "Delivered",
    rider: {
      name: "Rider Hasan",
      phone: "01799887766",
    },
    store: "Booklet Design BD",
    amount: 450,
    days: "2 days",
    createdAt: "2025-01-01 10:30 AM",
    updateAt: "2025-01-02 3:45 PM",
  },

  {
    parcleId: "PCL-20240102",
    customerInfo: {
      name: "Mitu Akter",
      phone: "01855443322",
      address: "Mirpur-10, Lane 5, Dhaka",
    },
    area: "Mirpur",
    status: "Return To Merchant",
    rider: {
      name: "Rider Karim",
      phone: "01677889922",
    },
    store: "Fashion Hub",
    amount: 320,
    days: "3 days",
    createdAt: "2025-01-03 9:15 AM",
    updateAt: "2025-01-05 2:20 PM",
  },

  {
    parcleId: "PCL-20240103",
    customerInfo: {
      name: "Sufian Chowdhury",
      phone: "01922334455",
      address: "Uttara Sector 7, House 14, Dhaka",
    },
    area: "Uttara",
    status: "Pending",
    rider: {
      name: "Rider Jamil",
      phone: "01566778899",
    },
    store: "Tech Store BD",
    amount: 550,
    days: "1 day",
    createdAt: "2025-01-06 11:50 AM",
    updateAt: "2025-01-06 11:55 AM",
  },
];
