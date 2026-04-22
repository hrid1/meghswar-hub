"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { merchantParcelColumns } from "./MerchantParcelTableCol";
import { Search } from "lucide-react";

const FAKE_PARCELS = [
  {
    parcelId: "139679",
    parcel_tx_id: "139679",
    customer_name: "Farzana Rahman",
    customer_phone: "+880123456789",
    customer_address: "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    area: "Area 01: Dhanmondi",
    status: "DELIVERED",
    rider: "Ahmed Wasi",
    riderPhone: "+8801234567890",
    riderImg: "https://i.pravatar.cc/50?img=11",
    store_name: "Fulkoli Book Store",
    total_charge: 1187,
    delivery_charge: 125,
    cod_charge: 12,
    weight_charge: 50,
    discount: 0,
    created_at: "2025-03-20T08:35:00.000Z",
    updated_at: "2025-03-20T08:35:00.000Z",
    received_at: "2025-03-20T08:35:00.000Z",
  },
  {
    parcelId: "139680",
    parcel_tx_id: "139680",
    customer_name: "Farzana Rahman",
    customer_phone: "+880123456789",
    customer_address: "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    area: "Area 01: Dhanmondi",
    status: "PARTIAL_DELIVERY",
    rider: "Ahmed Wasi",
    riderPhone: "+8801234567890",
    riderImg: "https://i.pravatar.cc/50?img=11",
    store_name: "Fulkoli Book Store",
    total_charge: 1187,
    delivery_charge: 125,
    cod_charge: 12,
    weight_charge: 50,
    discount: 0,
    created_at: "2025-03-20T08:35:00.000Z",
    updated_at: "2025-03-20T08:35:00.000Z",
    received_at: "2025-03-20T08:35:00.000Z",
  },
  {
    parcelId: "139681",
    parcel_tx_id: "139681",
    customer_name: "Farzana Rahman",
    customer_phone: "+880123456789",
    customer_address: "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    area: "Area 01: Dhanmondi",
    status: "RETURNED",
    rider: "Ahmed Wasi",
    riderPhone: "+8801234567890",
    riderImg: "https://i.pravatar.cc/50?img=11",
    store_name: "Fulkoli Book Store",
    total_charge: 1187,
    delivery_charge: 125,
    cod_charge: 12,
    weight_charge: 50,
    discount: 0,
    created_at: "2025-03-20T08:35:00.000Z",
    updated_at: "2025-03-20T08:35:00.000Z",
    received_at: "2025-03-20T08:35:00.000Z",
  },
];

export default function MerchantParcelTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  const filtered = FAKE_PARCELS.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.parcel_tx_id.toLowerCase().includes(q) ||
      p.customer_name.toLowerCase().includes(q) ||
      p.store_name.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold">Merchant Parcels</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search parcels..."
            className="border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#FE5000]/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        columns={merchantParcelColumns}
        data={filtered}
        selectable={true}
        getRowId={(row) => row.parcel_tx_id || row.parcelId}
        selectedRowIds={selectedRowIds}
        onToggleRow={(rowId) =>
          setSelectedRowIds((prev) =>
            prev.includes(rowId)
              ? prev.filter((id) => id !== rowId)
              : [...prev, rowId]
          )
        }
        onToggleAll={(nextSelected) => setSelectedRowIds(nextSelected)}
        emptyMessage="No parcels found for this merchant."
      />
    </div>
  );
}
