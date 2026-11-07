"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useState } from "react";
import { columns } from "./DeliveryResheduleCol";
import { useGetRescheduledDeliveriesQuery } from "@/redux/features/process-unprocess/processUnprocessApi";
import type { RescheduledParcel } from "@/redux/features/process-unprocess/processUnprocessType";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import { SearchableSelect } from "@/components/reusable/SearchableSelect";
import { useGetRidersQuery } from "@/redux/features/rider/riderApi";
import { useAssignRiderToParcelsMutation } from "@/redux/features/parcels/parcelsApi";
import { getAssignRiderErrorMessage } from "@/redux/features/parcels/parcelTypes";
import { useGetHubMerchantsQuery } from "@/redux/features/hubs/hubsApi";
import type { HubMerchant } from "@/redux/features/hubs/hubsTypes";
import CustomPagination from "@/components/reusable/CustomPagination";
import { toast } from "sonner";
import { Search, Printer } from "lucide-react";
import PrintShippingLabelDialog from "@/components/parcels/PrintShippingLabelDialog";

function getMerchantList(data: unknown): HubMerchant[] {
  if (Array.isArray(data)) return data;
  if (
    data &&
    typeof data === "object" &&
    Array.isArray((data as { merchants?: HubMerchant[] }).merchants)
  ) {
    return (data as { merchants: HubMerchant[] }).merchants;
  }
  return [];
}

export default function DeliveryRescheduleTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openPrintModal, setOpenPrintModal] = useState(false);
  const [selectedRiderId, setSelectedRiderId] = useState("");

  const {
    data: rescheduledData,
    isLoading,
    refetch,
  } = useGetRescheduledDeliveriesQuery({
    page,
    limit,
    search: search || undefined,
    merchantId: merchantId || undefined,
  });

  const { data: merchantsData, isLoading: isMerchantsLoading } =
    useGetHubMerchantsQuery();
  const merchants = getMerchantList(merchantsData?.data);

  const { data: ridersData } = useGetRidersQuery({
    isActive: true,
    page: 1,
    limit: 100,
  });

  const [assignRiderToParcels, { isLoading: isAssigning }] =
    useAssignRiderToParcelsMutation();

  const rescheduledParcels: RescheduledParcel[] =
    rescheduledData?.data?.parcels || [];
  const pagination = rescheduledData?.data?.pagination;
  const allRiders = ridersData?.data?.riders ?? [];

  const handleToggleRow = (rowId: string | number) => {
    setSelectedRowIds((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  const handleToggleAll = (nextSelected: (string | number)[]) => {
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
      toast.error(getAssignRiderErrorMessage(error));
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters and Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search parcels..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Merchant Filter */}
          <select
            value={merchantId}
            onChange={(e) => {
              setMerchantId(e.target.value);
              setPage(1);
            }}
            disabled={isMerchantsLoading}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Merchants</option>
            {merchants.map((m) => {
              const id = m.merchant_id || m.id;
              const name =
                m.merchant_name ||
                m.full_name ||
                m.business_name ||
                m.user?.full_name ||
                "Unknown";
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>

          <div className="text-sm font-medium text-gray-600">
            {selectedRowIds.length} Parcel{selectedRowIds.length === 1 ? "" : "s"} Selected
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selectedRowIds.length > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenPrintModal(true)}
              className="border-gray-300 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer text-sm"
            >
              <Printer className="w-4 h-4" />
              Print Labels ({selectedRowIds.length})
            </Button>
          )}

          <Button
            disabled={selectedRowIds.length === 0}
            className="bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Assign Rider {selectedRowIds.length > 0 && `(${selectedRowIds.length})`}
          </Button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={rescheduledParcels}
        selectable={true}
        getRowId={(row) => String(row.id || row.parcel_id || "")}
        selectedRowIds={selectedRowIds}
        onToggleRow={handleToggleRow}
        onToggleAll={handleToggleAll}
        emptyMessage="No rescheduled deliveries found"
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <CustomPagination
          page={page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
          totalItems={pagination.total}
          itemsPerPage={limit}
          onItemsPerPageChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
          showItemsPerPage={true}
        />
      )}

      {/* Assign Rider Dialog */}
      <CustomDialog open={openModal} setOpen={setOpenModal}>
        <form className="flex flex-col gap-4" onSubmit={handleAssignRider}>
          <h2 className="text-xl font-semibold mb-2">Assign Rider to Rescheduled Parcels</h2>

          <div className="bg-orange-50 p-3 rounded-lg mb-2">
            <p className="text-sm text-gray-700">
              Assigning {selectedRowIds.length} parcel
              {selectedRowIds.length > 1 ? "s" : ""} to rider for redelivery
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Select Rider
            </label>
            <SearchableSelect
              options={allRiders.map((rider: any) => ({
                value: rider.id,
                label: rider.user?.full_name || rider.full_name || "Rider",
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

      <PrintShippingLabelDialog
        open={openPrintModal}
        setOpen={setOpenPrintModal}
        parcelIds={selectedRowIds.map(String)}
      />
    </div>
  );
}
