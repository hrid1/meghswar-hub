"use client";

import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import type { Parcel } from "@/redux/features/parcels/parcelTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetHubsListQuery } from "@/redux/features/hubs/hubsApi";
import { useBulkTransferParcelsMutation } from "@/redux/features/parcels/parcelsApi";
import type { Hub } from "@/redux/features/hubs/hubsTypes";
import { toast } from "sonner";

export interface AssignHubModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedParcel: Parcel | null;
  selectedRowIds: (string | number)[];
  onSuccess?: () => void;
}

export default function AssignHubModal({
  open,
  setOpen,
  selectedParcel,
  selectedRowIds,
  onSuccess,
}: AssignHubModalProps) {
  const [selectedHubId, setSelectedHubId] = useState("");
  const [transferNotes, setTransferNotes] = useState("");

  const { data: hubsData } = useGetHubsListQuery();
  const allHubs: Hub[] = hubsData?.data ?? [];
  const [bulkTransfer, { isLoading: isTransferring }] =
    useBulkTransferParcelsMutation();

  const parcelIds =
    selectedParcel != null
      ? [selectedParcel.id]
      : selectedRowIds.map((id) => String(id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHubId.trim()) {
      toast.error("Please select a hub");
      return;
    }
    if (parcelIds.length === 0) {
      toast.error("No parcels selected");
      return;
    }
    try {
      await bulkTransfer({
        parcel_ids: parcelIds,
        destination_hub_id: selectedHubId,
        transfer_notes: transferNotes,
      }).unwrap();
      toast.success(
        `Transferred ${parcelIds.length} parcel(s) to hub successfully`
      );
      setSelectedHubId("");
      setTransferNotes("");
      setOpen(false);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to transfer parcels to hub");
    }
  };

  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold">Assign To Hub</h2>
        <p className="text-sm text-gray-600">
          {selectedParcel
            ? `Transfer 1 parcel: ${selectedParcel.parcel_tx_id}`
            : `Transfer ${selectedRowIds.length} parcel(s) to hub`}
        </p>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Select Hub</label>
          <Select
            value={selectedHubId}
            onValueChange={setSelectedHubId}
            disabled={isTransferring}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a hub" />
            </SelectTrigger>
            <SelectContent>
              {allHubs.map((hub) => (
                <SelectItem key={hub.id} value={hub.id}>
                  {hub.branch_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Transfer notes (optional)</label>
          <input
            type="text"
            value={transferNotes}
            onChange={(e) => setTransferNotes(e.target.value)}
            placeholder="Notes"
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="flex gap-2 mt-2">
          <Button
            type="submit"
            disabled={!selectedHubId || isTransferring}
            className="bg-orange-500 text-white flex-1 hover:bg-orange-600"
          >
            {isTransferring ? "Transferring..." : "Confirm"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </CustomDialog>
  );
}
