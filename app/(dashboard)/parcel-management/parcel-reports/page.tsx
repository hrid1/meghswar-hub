"use client";

import DataTable3 from "@/components/reusable/DataTable3";
import React, { useState } from "react";
import { parcelColumns } from "./_component/parcelCol";
import { mockParcels } from "./_component/mockdata";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";

export default function ParcelReportTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<any>(null);

  const [selectedStatus, setSelectedStatus] = useState(""); // NEW

  const handleSelectRow = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    selectedRows.length === mockParcels.length
      ? setSelectedRows([])
      : setSelectedRows(mockParcels.map((_, i) => i));
  };

  // 🔥 form submit — send parcelId + selectedStatus
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedStatus) {
      console.log("No status selected!");
      return;
    }

    try {
      const res = await fetch("/api/update-parcel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parcelId: selectedParcel.id,
          status: selectedStatus, // send radio value
        }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      setOpenModal(false);
      setSelectedStatus("");
    } catch (err) {
      console.error("API error:", err);
    }
  };

  return (
    <div className="p-6">
      <DataTable3
        columns={parcelColumns((row: any) => {
          setSelectedParcel(row);
          setOpenModal(true);
        })}
        data={mockParcels}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        onSelectAll={handleSelectAll}
      />

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
                className="w-4 h-4 text-orange-600 hidden"
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
                className="w-4 h-4 text-orange-600 hidden"
              />
              <span className="font-medium text-gray-700">
                Customer Not Available
              </span>
            </label>
          </div>

          <Button type="submit" className="bg-red-500">
            Confirm & Update
          </Button>
        </form>
      </CustomDialog>
    </div>
  );
}
