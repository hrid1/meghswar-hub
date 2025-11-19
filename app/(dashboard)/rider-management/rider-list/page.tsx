"use client";

import DataTable3 from "@/components/reusable/DataTable3";
import React, { useState } from "react";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import { Ridercolumns } from "./_components/riderCols";
import { fakeRiderData } from "./_components/fakeRiders";
import EditRiderModal from "./_components/EditRiderModal";


export default function ParcelReportTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  // filtering
  const filteredParcels = fakeRiderData.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.riderId.toLowerCase().includes(q) ||
      p.rider.toLowerCase().includes(q) ||
      p.riderPhone.includes(q) ||
      p.licenseNo.toLowerCase().includes(q)
    );
  });

  // actions from table
  const handleAction = (type: string, riderId: string) => {
    setSelectedId(riderId);

    if (type === "edit") setOpenEditModal(true);
    if (type === "delete") setOpenDeleteModal(true);
  };

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
        columns={Ridercolumns(handleAction)}
        data={filteredParcels}
        selectedRows={[]}
        onSelectRow={() => {}}
        onSelectAll={() => {}}
      />

      {/* EDIT MODAL */}
      <EditRiderModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        riderId={selectedId}
      />

      {/* DELETE MODAL */}
      <CustomDialog open={openDeleteModal} setOpen={setOpenDeleteModal}>
        <div className="flex flex-col gap-4 p-2">
          <h2 className="text-lg font-semibold text-center text-red-600">
            Are you sure you want to delete?
          </h2>

          <div className="flex justify-between mt-4">
            <Button
              className="bg-gray-300 text-black"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </Button>

            <Button
              className="bg-red-600 text-white"
              onClick={() => {
                console.log("Deleted Rider:", selectedId);
                setOpenDeleteModal(false);
              }}
            >
              Confirm Delete
            </Button>
          </div>
        </div>
      </CustomDialog>
    </div>
  );
}
