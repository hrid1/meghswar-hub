"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useState } from "react";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import { parcelColumns } from "./parcelCol";
import {
  useAssignRiderMutation,
  useGetPickupRequestsQuery,
} from "@/redux/features/pickup-request/pickupRequestApi";
import { useGetRidersQuery } from "@/redux/features/rider/riderApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type RowId = string | number;

export default function PickupRequestTable() {
  const [selectedRowIds, setSelectedRowIds] = useState<RowId[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [selectedRiderId, setSelectedRiderId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetPickupRequestsQuery({
    page: 1,
    limit: 20,
  });

  const { data: ridersData } = useGetRidersQuery({
    isActive: true,
    page: 1,
    limit: 100,
  });
  const riders = ridersData?.data?.riders || [];

  console.log("riders", riders);

  const [bulkAssignRider, { isLoading: assigning }] = useAssignRiderMutation();

  const pickupRequests = data?.data.pickupRequests || [];

  const filteredParcels = pickupRequests.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.request_code.toLowerCase().includes(q) ||
      p.store_name.toLowerCase().includes(q)
    );
  });

  const handleToggleRow = (rowId: RowId) => {
    setSelectedRowIds((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId],
    );
  };

  const handleToggleAll = (nextSelected: RowId[]) => {
    setSelectedRowIds(nextSelected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRiderId) return;

    const pickupIds = selectedParcel
      ? [selectedParcel.id]
      : selectedRowIds.map(String);

    try {
      await bulkAssignRider({
        rider_id: selectedRiderId,
        pickup_ids: pickupIds,
      }).unwrap();

      toast.success("Rider assigned successfully");
      setOpenModal(false);
      setSelectedRiderId("");
      setSelectedParcel(null);
      setSelectedRowIds([]);
    } catch (error) {
      console.error("Assign failed:", error);
      toast.error("Assign failed");
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading pickup requests...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pickup Request</h1>

      {/* SEARCH + BUTTON */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search requests..."
          className="border p-2 rounded w-60"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button
          disabled={selectedRowIds.length === 0}
          className="bg-orange-600 text-white"
          onClick={() => {
            setSelectedParcel(null);
            setOpenModal(true);
          }}
        >
          Assign Rider
        </Button>
      </div>

      {/* TABLE */}
      <DataTable
        columns={parcelColumns((row: any) => {
          setSelectedParcel(row);
          setOpenModal(true);
        })}
        data={filteredParcels}
        selectable
        getRowId={(row) => row.id}
        selectedRowIds={selectedRowIds}
        onToggleRow={handleToggleRow}
        onToggleAll={handleToggleAll}
      />

      {/* MODAL */}
      <CustomDialog open={openModal} setOpen={setOpenModal}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="text-lg font-semibold">
            {selectedParcel
              ? `Assign Rider for ${selectedParcel.request_code}`
              : `Assign Rider for ${selectedRowIds.length} requests`}
          </div>

          <Select
            value={selectedRiderId}
            onValueChange={(value) => setSelectedRiderId(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Rider" />
            </SelectTrigger>

            <SelectContent>
              {riders.map((rider: any) => (
                <SelectItem key={rider.id} value={rider.id}>
                  {rider.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="submit"
            disabled={assigning || !selectedRiderId}
            className="bg-orange-500 text-white"
          >
            {assigning ? "Assigning..." : "Confirm"}
          </Button>
        </form>
      </CustomDialog>
    </div>
  );
}
