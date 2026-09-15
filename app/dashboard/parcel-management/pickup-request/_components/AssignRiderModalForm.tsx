"use client";

import { useEffect, useState } from "react";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import { SearchableSelect } from "@/components/reusable/SearchableSelect";
import { useGetRidersQuery } from "@/redux/features/rider/riderApi";
import { useAssignRiderMutation } from "@/redux/features/pickup-request/pickupRequestApi";
import { toast } from "sonner";

interface AssignRiderModalFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pickupIds: string[];
  onSuccess?: () => void;
}

export default function AssignRiderModalForm({
  open,
  setOpen,
  pickupIds,
  onSuccess,
}: AssignRiderModalFormProps) {
  const [riderId, setRiderId] = useState("");
  const [notes, setNotes] = useState("");
  const { data: ridersData, isLoading: areRidersLoading } = useGetRidersQuery(
    { isActive: true, page: 1, limit: 100 },
    { skip: !open },
  );
  const [assignRider, { isLoading: isAssigning }] = useAssignRiderMutation();
  const riders = ridersData?.data?.riders || [];

  useEffect(() => {
    if (!open) {
      setRiderId("");
      setNotes("");
    }
  }, [open]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!riderId) {
      toast.error("Please select a rider");
      return;
    }
    if (pickupIds.length === 0) {
      toast.error("Please select at least one pickup request");
      return;
    }

    try {
      const response = await assignRider({
        rider_id: riderId,
        pickup_ids: pickupIds,
        ...(notes.trim() ? { notes: notes.trim() } : {}),
      }).unwrap();
      toast.success(
        response.message ||
          `Assigned ${pickupIds.length} pickup request(s) to rider`,
      );
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to assign rider",
      );
    }
  };

  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold">Assign Rider</h2>
        <div className="rounded-lg bg-orange-50 p-3">
          <p className="text-sm text-gray-700">
            Assigning {pickupIds.length} pickup request
            {pickupIds.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Select Rider</label>
          <SearchableSelect
            options={riders.map((rider) => ({
              value: rider.id,
              label: rider.user?.full_name || rider.rider_code,
            }))}
            value={riderId}
            onChange={setRiderId}
            placeholder={areRidersLoading ? "Loading riders..." : "Select a rider"}
            searchable
            searchPlaceholder="Search rider by name..."
            emptyMessage="No riders found"
            selectHeight="max-h-[250px]"
            disabled={areRidersLoading || isAssigning}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Collect before 5 PM"
            disabled={isAssigning}
            className="min-h-20 rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="mt-2 flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            disabled={isAssigning}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-orange-600 text-white hover:bg-orange-700"
            disabled={isAssigning || !riderId || pickupIds.length === 0}
          >
            {isAssigning ? "Assigning..." : "Confirm Assignment"}
          </Button>
        </div>
      </form>
    </CustomDialog>
  );
}
