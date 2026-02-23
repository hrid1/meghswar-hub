"use client";

import DataTable3 from "@/components/reusable/DataTable3";
import React, { useState } from "react";
import { merchantCol } from "./MerchantCol";

export const fakeriderData = [
  {
    date: "2025-01-20",
    rider: "Rahim Uddin",
    riderImg: "https://i.pravatar.cc/150?img=32",
    riderPhone: "01812-334455",
    delivered: 42,
    rescheduled: 5,
    return: 3,
    assigned: 50,
    comission: 1250,
    successRate: "84%",
    riderPerformance: 1250,
  },
  {
    date: "2025-01-20",
    rider: "Sabbir Khan",
    riderImg: "https://i.pravatar.cc/150?img=12",
    riderPhone: "01722-889900",
    delivered: 30,
    rescheduled: 8,
    return: 2,
    assigned: 40,
    comission: 980,
    successRate: "75%",
    riderPerformance: 980,
  },
  {
    date: "2025-01-20",
    rider: "Hasan Ali",
    riderImg: "https://i.pravatar.cc/150?img=45",
    riderPhone: "01955-667788",
    delivered: 55,
    rescheduled: 4,
    return: 1,
    assigned: 60,
    comission: 1500,
    successRate: "91%",
    riderPerformance: 1500,
  },
];

export default function MerchantManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  // filtering
  const filteredParcels = merchantStatusData.filter((p) => {
    const q = searchQuery.toLowerCase();
    return p.merchant.toLowerCase().includes(q) || p.merchantPhone.includes(q);
  });

  return (
    <div className="p-6">
      {/* SEARCH BAR */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search rider..."
          className="border p-2 rounded w-60"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <DataTable3
        columns={merchantCol}
        data={filteredParcels}
        selectedRows={[]}
        onSelectRow={() => {}}
        onSelectAll={() => {}}
      />
    </div>
  );
}

export const merchantStatusData = [
  {
    mId: 111,
    merchant: "Fashion Hub",
    merchantImg: "https://i.pravatar.cc/150?img=21",
    merchantPhone: "01811-445566",
    totalParcel: 120,
    parcelDeliverd: 98,
    parcelReturned: 7,
    totalTransactions: "৳ 85,000",
    merchantAddress: "Banani, Dhaka",
    comission: "Banani, Dhaka",
  },
  {
    mId: 112,
    merchant: "Tech World",
    merchantImg: "https://i.pravatar.cc/150?img=14",
    merchantPhone: "01722-991122",
    totalParcel: 75,
    parcelDeliverd: 60,
    parcelReturned: 5,
    totalTransactions: "৳ 42,500",
    merchantAddress: "Mirpur 10, Dhaka",
    comission: "Mirpur 10, Dhaka",
  },
  {
    mId: 113,
    merchant: "Daily Essentials",
    merchantImg: "https://i.pravatar.cc/150?img=47",
    merchantPhone: "01955-334477",
    totalParcel: 200,
    parcelDeliverd: 160,
    parcelReturned: 12,
    totalTransactions: "৳ 1,20,000",
    merchantAddress: "Uttara Sector 7, Dhaka",
    comission: "Uttara Sector 7, Dhaka",
  },
];
