"use client";

import { DataTable } from "@/components/reusable/DataTable";
import { ChevronDown } from "lucide-react";
import React, { useMemo, useState } from "react";
import { columns } from "./returnToMerchantCol";
import { useGetReturnToMerchantQuery } from "@/redux/features/process-unprocess/processUnprocessApi";
import type { ReturnParcel } from "@/redux/features/process-unprocess/processUnprocessType";

export default function ReturnToMerchantTable() {
  const { data: returnToMerchantData, isLoading: isReturnToMerchantLoading } =
    useGetReturnToMerchantQuery({ page: 1, limit: 10 });

  const returnToMerchantParcels: ReturnParcel[] =
    returnToMerchantData?.data?.parcels ?? [];

  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
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

  const handleAssignRider = () => {
    // TODO: open assign-rider flow (e.g. navigate to /parcel-management/assign-rider with selected IDs, or open modal)
    if (selectedRowIds.length === 0) return;
    console.log("Assign rider for parcel IDs:", selectedRowIds);
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

        <button
          type="button"
          disabled={selectedRowIds.length === 0}
          onClick={handleAssignRider}
          className={`px-6 py-2 rounded-lg font-medium ${
            selectedRowIds.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          Assign Rider
        </button>
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
    </div>
  );
}