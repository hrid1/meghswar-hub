"use client";

import DataTable3 from "@/components/reusable/DataTable3";
import React, { useState } from "react";

import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";


import { mockParcels } from "@/app/(dashboard)/parcel-management/third-party/_components/mockdata";
import { parcelColumns } from "@/app/(dashboard)/parcel-management/third-party/_components/parcelCol";

export default function RiderAssignParcelTable() {
  // table selections
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // modal
  const [openModal, setOpenModal] = useState(false);

  // for single update
  const [selectedParcel, setSelectedParcel] = useState<any>(null);

  // radio value
  const [selectedStatus, setSelectedStatus] = useState("");

  // search + filter state
  const [searchQuery, setSearchQuery] = useState("");

  // select a single row
  const handleSelectRow = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  // select all rows
  const handleSelectAll = () => {
    selectedRows.length === filteredParcels.length
      ? setSelectedRows([])
      : setSelectedRows(filteredParcels.map((_, i) => i));
  };
  // 🔍 SEARCH + FILTER
  const filteredParcels = mockParcels.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.parcelid.toLowerCase().includes(q) ||
      p.customerInfo.name.toLowerCase().includes(q) ||
      p.customerInfo.phone.includes(q) ||
      p.merchant.name.toLowerCase().includes(q)
    );
  });

  // SUBMIT (single + bulk)
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedStatus) return;

    let parcelIds;

    // single update
    if (selectedParcel) {
      parcelIds = [selectedParcel.id];
    } else {
      // bulk update by selected indexes
      parcelIds = selectedRows.map((i) => selectedParcel[i].id);
    }

    try {
      const res = await fetch("/api/update-parcels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parcelIds,
          status: selectedStatus,
        }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      setOpenModal(false);
      setSelectedStatus("");
      setSelectedParcel(null);
    } catch (err) {
      console.error("API error:", err);
    }
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 🔥 BULK UPDATE BUTTON */}
        <Button
          disabled={selectedRows.length === 0}
          className="bg-orange-600/80 text-white"
          onClick={() => {
            setSelectedParcel(null); // bulk mode
            setOpenModal(true);
          }}
        >
          Assign Rider
        </Button>
      </div>

      {/* TABLE */}
      <DataTable3
        columns={parcelColumns((row: any) => {
          setSelectedParcel(row); // single mode
          setOpenModal(true);
        })}
        data={filteredParcels}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        onSelectAll={handleSelectAll}
      />

      {/* MODAL */}
      <CustomDialog open={openModal} setOpen={setOpenModal}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>This si still processing...</div>

          <div className="flex ">
            <Button type="submit" className="bg-orange-500 text-white flex-1">
              Confirm
            </Button>
          </div>
        </form>
      </CustomDialog>
    </div>
  );
}



