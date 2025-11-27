"use client";

import DataTable3 from "@/components/reusable/DataTable3";
import { returnParcelColumns } from "./ReturnParcelCol";




export default function ReturnParcelTable() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Transfer History</h2>
      <DataTable3
        columns={returnParcelColumns}
        data={riderStatusData}
        selectedRows={[]}
        onSelectRow={() => {}}
        onSelectAll={() => {}}
      />
    </div>
  );
}

export const riderStatusData = [
  {
    parcelId: "PX-10234",
    date: "2025-02-12",
    reason: "Customer unavailable",
    status: "Pending",
    collectableAmount: 550,
    collectedAmount: 0,
    successRate: "0%",
  },
  {
    parcelId: "PX-20456",
    date: "2025-02-13",
    reason: "Delivered successfully",
    status: "Delivered",
    collectableAmount: 750,
    collectedAmount: 750,
    successRate: "100%",
  },
  {
    parcelId: "PX-30987",
    date: "2025-02-14",
    reason: "Address mismatch",
    status: "Returned",
    collectableAmount: 620,
    collectedAmount: 0,
    successRate: "0%",
  },
];
