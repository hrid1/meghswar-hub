"use client";

import React, { useState } from "react";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import {
  downloadSingleShippingLabel,
  downloadBulkShippingLabels,
  LabelLayout,
} from "@/lib/shippingLabel";
import { toast } from "sonner";
import { Printer, FileText, CheckCircle2 } from "lucide-react";

interface PrintShippingLabelDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  parcelIds: string[];
  singleParcelTxId?: string;
}

export default function PrintShippingLabelDialog({
  open,
  setOpen,
  parcelIds,
  singleParcelTxId,
}: PrintShippingLabelDialogProps) {
  const [layout, setLayout] = useState<LabelLayout>("THERMAL");
  const [isDownloading, setIsDownloading] = useState(false);

  const isBulk = parcelIds.length > 1;

  const handlePrint = async () => {
    if (parcelIds.length === 0) return;

    setIsDownloading(true);
    try {
      if (isBulk) {
        await downloadBulkShippingLabels({ parcelIds, layout });
        toast.success(`Downloaded ${parcelIds.length} shipping labels (${layout})`);
      } else {
        await downloadSingleShippingLabel({ parcelId: parcelIds[0], layout });
        toast.success(`Downloaded shipping label (${layout})`);
      }
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to generate shipping labels");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-100 text-orange-600 rounded-lg">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Print Shipping Label{isBulk ? "s" : ""}
            </h2>
            <p className="text-xs text-gray-500">
              {isBulk
                ? `Generate PDF labels for ${parcelIds.length} selected parcels`
                : `Generate PDF label for ${singleParcelTxId || parcelIds[0]}`}
            </p>
          </div>
        </div>

        {/* Layout Selection */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            Select Label Layout
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setLayout("THERMAL")}
              className={`flex flex-col items-start p-3.5 border rounded-xl transition-all text-left relative ${
                layout === "THERMAL"
                  ? "border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-semibold text-sm text-gray-900">
                  Thermal (POS)
                </span>
                {layout === "THERMAL" && (
                  <CheckCircle2 className="w-4 h-4 text-orange-600" />
                )}
              </div>
              <span className="text-xs text-gray-500">
                100 x 150 mm roll label standard
              </span>
            </button>

            <button
              type="button"
              onClick={() => setLayout("A4")}
              className={`flex flex-col items-start p-3.5 border rounded-xl transition-all text-left relative ${
                layout === "A4"
                  ? "border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-semibold text-sm text-gray-900">
                  Standard A4
                </span>
                {layout === "A4" && (
                  <CheckCircle2 className="w-4 h-4 text-orange-600" />
                )}
              </div>
              <span className="text-xs text-gray-500">
                Half-page (2 labels per sheet)
              </span>
            </button>
          </div>
        </div>

        {/* Summary note */}
        <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 flex items-start gap-2">
          <FileText className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
          <span>
            {isBulk
              ? "All labels are collated into a single multi-page PDF document in identical order."
              : "Includes dynamic Code 128 barcode, Meghswar tracking QR code, and customer info."}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            disabled={isDownloading}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isDownloading || parcelIds.length === 0}
            onClick={handlePrint}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
          >
            {isDownloading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Generating PDF...
              </span>
            ) : (
              `Download PDF Label${isBulk ? "s" : ""}`
            )}
          </Button>
        </div>
      </div>
    </CustomDialog>
  );
}

