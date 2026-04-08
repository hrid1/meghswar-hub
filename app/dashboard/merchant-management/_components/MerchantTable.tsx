"use client";

import DataTable3 from "@/components/reusable/DataTable3";
import React, { useState } from "react";
import { merchantCol } from "./MerchantCol";
  import { useGetAssignedMerchantsListQuery } from "@/redux/features/merchant/merchantApi";
  import { Merchant } from "@/redux/features/merchant/merchantTypes";

export default function MerchantManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch merchants data from API
  const { data: merchantsData, isLoading, error } = useGetAssignedMerchantsListQuery();

  // Transform API data to match the table format
  const transformedMerchants = React.useMemo(() => {
    if (!merchantsData?.data) return [];
    
    return merchantsData.data.map((merchant: Merchant) => ({
      mId: merchant.id,
      merchant: merchant.full_name,
      merchantImg: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`, // Generate random avatar or use a default
      merchantPhone: merchant.phone,
      totalParcel: 0, // You might need to fetch this from another endpoint
      parcelDeliverd: 0,
      parcelReturned: 0,
      totalTransactions: "৳ 0",
      merchantAddress: `${merchant.thana}, ${merchant.district}`,
      comission: merchant.status, // Or map to appropriate field
    }));
  }, [merchantsData]);

  // Filtering
  const filteredParcels = transformedMerchants.filter((p: any | Merchant) => {
    const q = searchQuery.toLowerCase();
    return p.merchant.toLowerCase().includes(q) || p.merchantPhone.includes(q);
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading merchants...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500 text-center">Error loading merchants. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* SEARCH BAR */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search merchant..."
          className="border p-2 rounded w-60"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="text-sm text-gray-600">
          Total Merchants: {transformedMerchants.length}
        </div>
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