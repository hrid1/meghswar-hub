"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";

export type UpdateStatusAction = "reschedule" | "return";

export interface UpdateStatusModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selected: (string | number)[];
  onAction: (type: UpdateStatusAction) => void | Promise<void>;
  isLoading?: boolean;
  actionType?: UpdateStatusAction;
}

export default function UpdateStatusModal({
  open,
  setOpen,
  selected,
  onAction,
  isLoading = false,
}: UpdateStatusModalProps) {
  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Parcel Status</DialogTitle>
          <DialogDescription>
            Choose how you want to update the status for{" "}
            <strong>{selected.length}</strong> parcel(s).
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Button
            type="button"
            disabled={isLoading}
            onClick={() => onAction("reschedule")}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isLoading ? "Updating..." : "Delivery Reschedule"}
          </Button>

          <Button
            type="button"
            disabled={isLoading}
            onClick={() => onAction("return")}
            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            {isLoading ? "Updating..." : "Return to Merchant"}
          </Button>
        </div>
      </DialogContent>
    </CustomDialog>
  );
}
