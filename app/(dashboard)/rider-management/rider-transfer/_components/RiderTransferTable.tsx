"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useState } from "react";
import { riderTransferColumns } from "./riderTransferCol";
import CustomPagination from "@/components/reusable/CustomPagination";

export const riderTransferData = [
  {
    riderId: "RID-1001",
    rider: "Hasan Ali",
    riderPhone: "01711223344",
    riderImg: "https://i.pravatar.cc/100?img=11",
    status: "Active",
    licenseNo: "DL-784521",
    totalParcel: 128,
  },

  {
    riderId: "RID-1002",
    rider: "Karim Ahmed",
    riderPhone: "01855667788",
    riderImg: "https://i.pravatar.cc/100?img=12",
    status: "On Leave",
    licenseNo: "DL-562341",
    totalParcel: 92,
  },

  {
    riderId: "RID-1003",
    rider: "Jamal Uddin",
    riderPhone: "01999887766",
    riderImg: "https://i.pravatar.cc/100?img=13",
    status: "Inactive",
    licenseNo: "DL-901234",
    totalParcel: 54,
  },
];

export default function RiderTransferTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // filtering
  const filteredParcels = riderTransferData.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.riderId.toLowerCase().includes(q) ||
      p.rider.toLowerCase().includes(q) ||
      p.riderPhone.includes(q) ||
      p.licenseNo.toLowerCase().includes(q)
    );
  });

  // pagination
  const totalPages = Math.ceil(filteredParcels.length / limit);
  const paginatedData = filteredParcels.slice(
    (page - 1) * limit,
    page * limit
  );

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
      <DataTable
        columns={riderTransferColumns}
        data={paginatedData}
        selectable={true}
        getRowId={(row) => row.riderId}
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

      <CustomPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        totalItems={filteredParcels.length}
        itemsPerPage={limit}
        show
        showItemsPerPage={false}
        showingLabel="Showing"
        resultsLabel="Results"
      />
    </div>
  );
}
