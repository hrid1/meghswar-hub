"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useState } from "react";

import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";

import { parcelColumns, parcelColumns1 } from "./parcelCol";
import { mockParcels1 } from "./mockdata";


export default function PickupRequestTableRider() {
  // table selections
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  // modal
  const [openModal, setOpenModal] = useState(false);

  // for single update
  const [selectedParcel, setSelectedParcel] = useState<any>(null);

  // radio value
  const [selectedStatus, setSelectedStatus] = useState("");

  // search + filter state
  const [searchQuery, setSearchQuery] = useState("");

  // toggle a single row by ID
  const handleToggleRow = (rowId: string | number, row: any) => {
    setSelectedRowIds((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };
  
  // toggle all rows
  const handleToggleAll = (nextSelected: (string | number)[], rows: any[]) => {
    setSelectedRowIds(nextSelected);
  };
  // 🔍 SEARCH + FILTER
  const filteredParcels = mockParcels1.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.parcelid.toLowerCase().includes(q) ||
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
      parcelIds = [selectedParcel.parcelid];
    } else {
      // bulk update by selected IDs
      parcelIds = selectedRowIds;
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
    <div className="p-6">
      <h1 className="text-2xl font-bold">Pickup Request</h1>
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
          disabled={selectedRowIds.length === 0}
          className="bg-orange-600/80 text-white"
          onClick={() => {
            setSelectedParcel(null); // bulk mode
            setOpenModal(true);
          }}
        >
          Assign Third Party
        </Button>
      </div>

      {/* TABLE */}
      <DataTable
        columns={parcelColumns1((row: any) => {
          setSelectedParcel(row); // single mode
          setOpenModal(true);
        })}
        data={filteredParcels}
        selectable={true}
        getRowId={(row) => row.parcelid}
        selectedRowIds={selectedRowIds}
        onToggleRow={handleToggleRow}
        onToggleAll={handleToggleAll}
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
