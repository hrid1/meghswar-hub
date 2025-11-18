"use client";

import DataTable3 from "@/components/reusable/DataTable3";
import React, { useState } from "react";
import { parcelColumns } from "./_component/parcelCol";
import { mockParcels } from "./_component/mockdata";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";

export default function ParcelReportTable() {
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
  const [filterStatus, setFilterStatus] = useState("");

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
  const filteredParcels = mockParcels
    .filter((p) => {
      const q = searchQuery.toLowerCase();
      return (
        p.id.toLowerCase().includes(q) ||
        p.customerInfo.name.toLowerCase().includes(q) ||
        p.customerInfo.phone.includes(q) ||
        p.merchant.name.toLowerCase().includes(q)
      );
    })
    .filter((p) => (filterStatus ? p.status === filterStatus : true));

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
      parcelIds = selectedRows.map((i) => filteredParcels[i].id);
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

          <select
            className="border p-2 rounded"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
            <option value="Delivery Rescheduled">Delivery Rescheduled</option>
            <option value="Customer Not Available">
              Customer Not Available
            </option>
          </select>
        </div>

        {/* 🔥 BULK UPDATE BUTTON */}
        <Button
          disabled={selectedRows.length === 0}
          className="bg-red-600/80 text-white"
          onClick={() => {
            if (selectedRows.length === 0) {
              alert("Please select at least one parcel.");
              return;
            }
            setSelectedParcel(null); // bulk mode
            setOpenModal(true);
          }}
        >
          Bulk Update Status
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
          <div className="flex flex-col gap-3 my-4">
            {/* OPTION 1 */}
            <label
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition
        ${
          selectedStatus === "Delivery Rescheduled"
            ? "border-orange-500 bg-orange-50"
            : "border-gray-300 hover:bg-gray-50"
        }
      `}
            >
              <input
                type="radio"
                name="status"
                value="Delivery Rescheduled"
                checked={selectedStatus === "Delivery Rescheduled"}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="hidden"
              />
              <span className="font-medium text-gray-700">
                Delivery Rescheduled
              </span>
            </label>

            {/* OPTION 2 */}
            <label
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition
        ${
          selectedStatus === "Customer Not Available"
            ? "border-orange-500 bg-orange-50"
            : "border-gray-300 hover:bg-gray-50"
        }
      `}
            >
              <input
                type="radio"
                name="status"
                value="Customer Not Available"
                checked={selectedStatus === "Customer Not Available"}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="hidden"
              />
              <span className="font-medium text-gray-700">
                Customer Not Available
              </span>
            </label>
          </div>

          <Button type="submit" className="bg-red-500 text-white">
            Confirm & Update
          </Button>
        </form>
      </CustomDialog>
    </div>
  );
}
