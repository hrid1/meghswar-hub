"use client";

import { DataTable } from "@/components/reusable/DataTable";
import { ChevronDown } from "lucide-react";
import React, { useMemo, useState } from "react";
import { columns } from "./returnToMerchantCol";
import { useGetReturnToMerchantQuery } from "@/redux/features/process-unprocess/processUnprocessApi";
import type { ReturnParcel } from "@/redux/features/process-unprocess/processUnprocessType";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import { SearchableSelect } from "@/components/reusable/SearchableSelect";
import { useGetRidersQuery } from "@/redux/features/rider/riderApi";
import { useAssignRiderToParcelsMutation } from "@/redux/features/parcels/parcelsApi";
import { toast } from "sonner";

export default function ReturnToMerchantTable() {
  const {
    data: returnToMerchantData,
    isLoading: isReturnToMerchantLoading,
    refetch,
  } = useGetReturnToMerchantQuery({ page: 1, limit: 10 });
  const { data: ridersData } = useGetRidersQuery({
    isActive: true,
    page: 1,
    limit: 100,
  });
  const [assignRiderToParcels, { isLoading: isAssigning }] =
    useAssignRiderToParcelsMutation();

  const returnToMerchantParcels: ReturnParcel[] =
    returnToMerchantData?.data?.parcels ?? [];
  const allRiders = ridersData?.data?.riders ?? [];

  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRiderId, setSelectedRiderId] = useState("");
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!returnToMerchantParcels.length) return [];
    const q = search.toLowerCase();
    return returnToMerchantParcels.filter((p: ReturnParcel) =>
      [
        p.parcel_tx_id,
        p.tracking_number,
        p.reason,
        p.destination,
        p.zone,
        p.store?.name,
        p.store?.phone,
        p.return_parcel?.parcel_tx_id,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [returnToMerchantParcels, search]);

  const handleToggleRow = (rowId: string | number, _row: ReturnParcel) => {
    setSelectedRowIds((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  const handleToggleAll = (nextSelected: (string | number)[], _rows: ReturnParcel[]) => {
    setSelectedRowIds(nextSelected);
  };

  const handleAssignRider = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRiderId) {
      toast.error("Please select a rider");
      return;
    }

    const parcelIds = selectedRowIds.map(String);
    if (parcelIds.length === 0) {
      toast.error("Please select at least one parcel");
      return;
    }

    try {
      await assignRiderToParcels({
        rider_id: selectedRiderId,
        parcel_ids: parcelIds,
      }).unwrap();

      toast.success(`Successfully assigned ${parcelIds.length} parcel(s)`);
      setOpenModal(false);
      setSelectedRiderId("");
      setSelectedRowIds([]);
      refetch();
    } catch (error) {
      console.error("Assign rider failed:", error);
      toast.error("Failed to assign rider. Please try again.");
    }
  };

  if (isReturnToMerchantLoading) {
    return (
      <div className="flex justify-center p-8 text-gray-500">
        Loading return-to-merchant parcels...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
            >
              Select Merchant <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="font-semibold">
            {selectedRowIds.length} Parcel Selected
          </div>
        </div>

        <Button
          disabled={selectedRowIds.length === 0}
          className="bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Assign Rider{" "}
          {selectedRowIds.length > 0 && `(${selectedRowIds.length})`}
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        selectable
        getRowId={(row) => row.parcel_id}
        selectedRowIds={selectedRowIds}
        onToggleRow={handleToggleRow}
        onToggleAll={handleToggleAll}
        emptyMessage="No return-to-merchant parcels found"
      />

      <CustomDialog open={openModal} setOpen={setOpenModal}>
        <form className="flex flex-col gap-4" onSubmit={handleAssignRider}>
          <h2 className="text-xl font-semibold mb-2">Assign Rider</h2>

          <div className="bg-orange-50 p-3 rounded-lg mb-2">
            <p className="text-sm text-gray-700">
              Assigning {selectedRowIds.length} parcel
              {selectedRowIds.length > 1 ? "s" : ""} to rider
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Select Rider
            </label>
            <SearchableSelect
              options={allRiders.map((rider: any) => ({
                value: rider.id,
                label: rider.user?.full_name,
              }))}
              value={selectedRiderId}
              onChange={setSelectedRiderId}
              placeholder="Select a rider"
              searchable
              searchPlaceholder="Search rider by name..."
              emptyMessage="No riders found"
              selectHeight="max-h-[250px]"
              required
            />
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                setOpenModal(false);
                setSelectedRiderId("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white flex-1"
              disabled={isAssigning || !selectedRiderId}
            >
              {isAssigning ? "Assigning..." : "Confirm Assignment"}
            </Button>
          </div>
        </form>
      </CustomDialog>
    </div>
  );
}
