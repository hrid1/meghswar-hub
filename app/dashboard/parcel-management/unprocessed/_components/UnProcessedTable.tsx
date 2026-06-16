"use client";

import { DataTable } from "@/components/reusable/DataTable";
import { ChevronDown } from "lucide-react";
import React, { useMemo, useState } from "react";
import { columns } from "./unProcessedCol";
import UpdateStatusModal from "../../hub-transfer/_components/UpdateStatusModal";
import {
  useGetDeliveryOutcomesQuery,
  useBulkReturnToMerchantMutation,
  useBulkRescheduleDeliveryMutation,
} from "@/redux/features/process-unprocess/processUnprocessApi";
import { toast } from "sonner";

export default function UnProcessedTable() {
  const { data: unprocessedData, isLoading: isUnprocessedLoading } =
    useGetDeliveryOutcomesQuery({ page: 1, limit: 10 });
  const unprocessedParcels = unprocessedData?.data?.parcels || [];

  const [bulkReturnToMerchant, { isLoading: isReturning }] =
    useBulkReturnToMerchantMutation();
  const [bulkRescheduleDelivery, { isLoading: isRescheduling }] =
    useBulkRescheduleDeliveryMutation();

  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const [search, setSearch] = useState("");
  const [openStatusModal, setOpenStatusModal] = useState(false);

  const parcelIds = useMemo(
    () => selectedRowIds.map(String),
    [selectedRowIds]
  );
  const isMutating = isReturning || isRescheduling;

  /* ------------------------------- Filtering -------------------------------- */
  const filteredData = useMemo(() => {
    return unprocessedParcels.filter((p: any) =>
      Object.values(p).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [unprocessedParcels, search]);

  /* ------------------------------ Select Rows ------------------------------- */
  const handleToggleRow = (rowId: string | number, row: any) => {
    setSelectedRowIds((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  const handleToggleAll = (nextSelected: (string | number)[], rows: any[]) => {
    setSelectedRowIds(nextSelected);
  };

  const handleStatusUpdate = async (type: "reschedule" | "return") => {
    setOpenStatusModal(false);
    if (parcelIds.length === 0) return;

    try {
      if (type === "reschedule") {
        await bulkRescheduleDelivery({ parcel_ids: parcelIds }).unwrap();
        toast.success(`Rescheduled ${parcelIds.length} parcel(s) for delivery`);
      } else {
        await bulkReturnToMerchant({ parcel_ids: parcelIds }).unwrap();
        toast.success(`Returned ${parcelIds.length} parcel(s) to merchant`);
      }
      setSelectedRowIds([]);
    } catch (err) {
      console.error(err);
      toast.error(
        type === "reschedule"
          ? "Failed to reschedule delivery"
          : "Failed to return to merchant"
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                Select Merchant <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="font-semibold">
              {selectedRowIds.length} Parcel Selected
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <button
            disabled={selectedRowIds.length === 0 || isMutating}
            onClick={() => setOpenStatusModal(true)}
            className={`px-6 py-2 rounded-lg font-medium ${
              selectedRowIds.length === 0 || isMutating
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {isMutating ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        isLoading={isUnprocessedLoading}
        columns={columns}
        data={filteredData}
        selectable={true}
        getRowId={(row) => row.parcel_id} // Use parcel_id from API or fallback to id
        selectedRowIds={selectedRowIds}
        onToggleRow={handleToggleRow}
        onToggleAll={handleToggleAll}
      />

      <UpdateStatusModal
        open={openStatusModal}
        setOpen={setOpenStatusModal}
        selected={selectedRowIds}
        onAction={handleStatusUpdate}
        isLoading={isMutating}
      />
    </div>
  );
}