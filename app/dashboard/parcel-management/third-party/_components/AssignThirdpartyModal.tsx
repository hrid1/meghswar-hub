"use client";

import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import type { Parcel, ThirdPartyProvider } from "@/redux/features/parcels/parcelTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssignParcelToThirdPartyProviderMutation, useBulkTransferParcelsMutation, useGetThirdPartyProvidersQuery } from "@/redux/features/parcels/parcelsApi";
import { toast } from "sonner";

export interface AssignHubModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedParcel: Parcel | null;
  selectedRowIds: (string | number)[];
  onSuccess?: () => void;
}

export default function AssignThirdpartyModal({
  open,
  setOpen,
  selectedParcel,
  selectedRowIds,
  onSuccess,
}: AssignHubModalProps) {
    const [selectedThirdPartyProviderId, setSelectedThirdPartyProviderId] = useState("");
  const [notes, setNotes] = useState("");

  const { data: thirdPartyProvidersData } = useGetThirdPartyProvidersQuery();
  const allThirdPartyProviders: ThirdPartyProvider[] = thirdPartyProvidersData?.data?.providers ?? [];
  const [assignParcelToThirdPartyProvider, { isLoading: isAssigning }] =
    useAssignParcelToThirdPartyProviderMutation();

  const parcelIds =
    selectedParcel != null
      ? [selectedParcel.id]
      : selectedRowIds.map((id) => String(id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedThirdPartyProviderId.trim()) {
      toast.error("Please select a hub");
      return;
    }
    if (parcelIds.length === 0) {
      toast.error("No parcels selected");
      return;
    }
    try {
      await assignParcelToThirdPartyProvider({
        parcel_ids: parcelIds,
        third_party_provider_id: selectedThirdPartyProviderId,
        notes: notes,
      }).unwrap();
      toast.success(
        `Assigned ${parcelIds.length} parcel(s) to third party provider successfully`
      );
      setSelectedThirdPartyProviderId("");
      setNotes("");
      setOpen(false);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign parcels to third party provider");
    }
  };

  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold">Assign To Third Party Provider</h2>
        <p className="text-sm text-gray-600">
          {selectedParcel
            ? `Transfer 1 parcel: ${selectedParcel.parcel_tx_id}`
            : `Transfer ${selectedRowIds.length} parcel(s) to third party provider`}
        </p>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Select Third Party Provider</label>
          <Select
            value={selectedThirdPartyProviderId}
            onValueChange={setSelectedThirdPartyProviderId}
            disabled={isAssigning}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a third party provider" />
            </SelectTrigger>
            <SelectContent>
              {allThirdPartyProviders.map((thirdPartyProvider) => (
                <SelectItem key={thirdPartyProvider.id} value={thirdPartyProvider.id}>
                  {thirdPartyProvider.provider_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Transfer notes (optional)</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes"
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="flex gap-2 mt-2">
          <Button
            type="submit"
            disabled={!selectedThirdPartyProviderId || isAssigning}
            className="bg-orange-500 text-white flex-1 hover:bg-orange-600"
          >
            {isAssigning ? "Assigning..." : "Confirm"}
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
