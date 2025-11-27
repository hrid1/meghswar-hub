"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CustomDialog from "@/components/reusable/CustomDialog";

export default function UpdateStatusModal({
  open,
  setOpen,
  selected,
  onAction,
}: any) {
  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Parcel Status</DialogTitle>
          <DialogDescription>
            Choose how you want to update the status for{" "}
            <strong>{selected.length}</strong> parcels.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => onAction("reschedule")}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Delivery Reschedule
          </button>

          <button
            onClick={() => onAction("return")}
            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Return to Merchant
          </button>
        </div>
      </DialogContent>
    </CustomDialog>
  );
}
