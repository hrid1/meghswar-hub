"use client";

import { DataTable } from "@/components/reusable/DataTable";
import CustomDialog from "@/components/reusable/CustomDialog";
import CustomPagination from "@/components/reusable/CustomPagination";
import { SearchableSelect } from "@/components/reusable/SearchableSelect";
import { Button } from "@/components/ui/button";
import {
  useGetAvailableRidersForTransferQuery,
  useGetRiderParcelsForTransferQuery,
  useTransferParcelsMutation,
} from "@/redux/features/rider/riderApi";
import { RiderTransferParcel } from "@/redux/features/rider/riderType";
import { Repeat2, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";

interface RiderAssignParcelTableProps {
  riderId: string;
}

const parcelColumns = (onTransfer: (row: RiderTransferParcel) => void) => [
  {
    key: "parcel_tx_id",
    header: "Parcel ID",
    width: "16%",
    render: (row: RiderTransferParcel) => (
      <div>
        <p className="font-semibold">{row.parcel_tx_id}</p>
        <p className="text-xs text-gray-500">{row.tracking_number}</p>
      </div>
    ),
  },
  {
    key: "customer",
    header: "Customer",
    width: "22%",
    render: (row: RiderTransferParcel) => (
      <div>
        <p className="font-medium">{row.customer_info?.name}</p>
        <p className="text-xs text-gray-500">{row.customer_info?.phone}</p>
      </div>
    ),
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "18%",
    render: (row: RiderTransferParcel) => row.merchant?.name || "-",
  },
  {
    key: "area",
    header: "Area",
    width: "18%",
    render: (row: RiderTransferParcel) =>
      row.delivery_area?.area || row.area || "-",
  },
  {
    key: "status",
    header: "Status",
    width: "14%",
  },
  {
    key: "actions",
    header: "Action",
    width: "12%",
    render: (row: RiderTransferParcel) => (
      <Button
        type="button"
        size="sm"
        className="bg-orange-600 hover:bg-orange-700 text-white"
        onClick={() => onTransfer(row)}
      >
        <Repeat2 className="h-4 w-4 mr-1" />
        Transfer
      </Button>
    ),
  },
];

export default function RiderAssignParcelTable({
  riderId,
}: RiderAssignParcelTableProps) {
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedParcel, setSelectedParcel] =
    useState<RiderTransferParcel | null>(null);
  const [selectedRiderId, setSelectedRiderId] = useState("");
  const [transferNotes, setTransferNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetRiderParcelsForTransferQuery(
    {
      riderId,
      page,
      limit,
    },
    { skip: !riderId },
  );
  const { data: availableRidersData, isLoading: isRidersLoading } =
    useGetAvailableRidersForTransferQuery(
      {
        exclude_rider_ids: [riderId],
      },
      { skip: !riderId },
    );
  const [transferParcels, { isLoading: isTransferring }] =
    useTransferParcelsMutation();

  const rider = data?.data?.rider;
  const parcels = data?.data?.parcels || [];
  const pagination = data?.data?.pagination;
  const availableRiders = availableRidersData?.data?.riders || [];

  const filteredParcels = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return parcels.filter((parcel) => {
      return (
        parcel.parcel_tx_id?.toLowerCase().includes(q) ||
        parcel.tracking_number?.toLowerCase().includes(q) ||
        parcel.customer_info?.name?.toLowerCase().includes(q) ||
        parcel.customer_info?.phone?.includes(q) ||
        parcel.merchant?.name?.toLowerCase().includes(q) ||
        parcel.delivery_area?.area?.toLowerCase().includes(q)
      );
    });
  }, [parcels, searchQuery]);

  const selectedParcels = useMemo(
    () => filteredParcels.filter((parcel) => selectedRowIds.includes(parcel.id)),
    [filteredParcels, selectedRowIds],
  );

  const closeModal = () => {
    setOpenModal(false);
    setSelectedRiderId("");
    setTransferNotes("");
    setSelectedParcel(null);
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRiderId) {
      toast.error("Please select a rider");
      return;
    }

    const parcelIds = selectedParcel
      ? [selectedParcel.id]
      : selectedParcels.map((parcel) => parcel.id);

    if (parcelIds.length === 0) {
      toast.error("Please select parcel");
      return;
    }

    try {
      const res = await transferParcels({
        target_rider_id: selectedRiderId,
        parcel_ids: parcelIds.map(String),
        notes: transferNotes.trim() || undefined,
      }).unwrap();

      const transferred = res?.data?.summary?.transferred ?? parcelIds.length;
      toast.success(`Successfully transferred ${transferred} parcel(s)`);
      closeModal();
      setSelectedRowIds([]);
    } catch (err) {
      console.error("Transfer parcel error:", err);
      toast.error("Failed to transfer parcel. Please try again.");
    }
  };

  return (
    <div className="p-6 container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Rider Parcels</h1>
        {rider && (
          <p className="text-sm text-gray-500">
            {rider.full_name} - {rider.phone}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search parcels..."
            className="pl-10 pr-4 py-2 border w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          {selectedRowIds.length > 0 && (
            <span className="text-sm text-gray-600">
              {selectedRowIds.length} parcel
              {selectedRowIds.length > 1 ? "s" : ""} selected
            </span>
          )}
          <Button
            disabled={selectedRowIds.length === 0}
            className="bg-orange-600 hover:bg-orange-700 text-white"
            onClick={() => {
              setSelectedParcel(null);
              setOpenModal(true);
            }}
          >
            Transfer {selectedRowIds.length > 0 && `(${selectedRowIds.length})`}
          </Button>
        </div>
      </div>

      <DataTable
        columns={parcelColumns((row) => {
          setSelectedParcel(row);
          setOpenModal(true);
        })}
        data={filteredParcels}
        selectable={true}
        getRowId={(row) => row.id}
        selectedRowIds={selectedRowIds}
        onToggleRow={(rowId) => {
          setSelectedRowIds((prev) =>
            prev.includes(rowId)
              ? prev.filter((id) => id !== rowId)
              : [...prev, rowId],
          );
        }}
        onToggleAll={(nextSelected) => setSelectedRowIds(nextSelected)}
        isLoading={isLoading}
        emptyMessage="No parcels found"
      />

      <CustomPagination
        page={page}
        totalPages={pagination?.totalPages ?? 1}
        onPageChange={setPage}
        totalItems={pagination?.total ?? filteredParcels.length}
        itemsPerPage={limit}
        show
        showItemsPerPage={false}
        showingLabel="Showing"
        resultsLabel="Results"
      />

      <CustomDialog open={openModal} setOpen={setOpenModal}>
        <form className="flex flex-col gap-4" onSubmit={handleTransfer}>
          <h2 className="text-xl font-semibold">Transfer Parcel</h2>

          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700">
              {selectedParcel
                ? `Transferring 1 parcel: ${selectedParcel.parcel_tx_id}`
                : `Transferring ${selectedRowIds.length} parcel(s)`}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Available Rider
            </label>
            <SearchableSelect
              options={availableRiders.map((rider) => ({
                value: rider.id,
                label: `${rider.full_name} (${rider.phone})`,
              }))}
              value={selectedRiderId}
              onChange={setSelectedRiderId}
              placeholder={
                isRidersLoading ? "Loading riders..." : "Select a rider"
              }
              searchable
              searchPlaceholder="Search rider by name..."
              emptyMessage="No available riders found"
              selectHeight="max-h-[250px]"
              disabled={isRidersLoading}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Notes (optional)
            </label>
            <textarea
              value={transferNotes}
              onChange={(e) => setTransferNotes(e.target.value)}
              placeholder="e.g. Rider going on leave, transferring remaining parcels"
              rows={3}
              className="border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white flex-1"
              disabled={isTransferring || !selectedRiderId}
            >
              {isTransferring ? "Transferring..." : "Confirm Transfer"}
            </Button>
          </div>
        </form>
      </CustomDialog>
    </div>
  );
}
