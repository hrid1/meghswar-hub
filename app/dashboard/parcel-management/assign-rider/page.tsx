"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useState, useMemo } from "react";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react";
import { parcelColumns } from "./_components/parcelCol";
import { useGetParcelsForAssignmentQuery, useAssignRiderToParcelsMutation } from "@/redux/features/parcels/parcelsApi";
import { useGetRidersQuery } from "@/redux/features/rider/riderApi";
import { SearchableSelect } from "@/components/reusable/SearchableSelect";
import { toast } from "sonner";

export default function ThirdPartyTable() {
  const { data, isLoading } = useGetParcelsForAssignmentQuery({ page: 1, limit: 20 });
  const [assignRiderToParcels, { isLoading: isAssigning }] = useAssignRiderToParcelsMutation();
  const {data: ridersData} = useGetRidersQuery({ isActive: true, page: 1, limit: 100 });
  const allRiders = ridersData?.data?.riders || [];
  const availableRiders = allRiders.filter((rider: any) => rider.is_active);
  console.log("availableRiders", availableRiders);
  
  const parcels = data?.data?.parcels || []; 
  console.log("parcels", parcels);

  // table selections
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  // modal
  const [openModal, setOpenModal] = useState(false);

  // for single update
  const [selectedParcel, setSelectedParcel] = useState<any>(null);

  // rider selection
  const [selectedRiderId, setSelectedRiderId] = useState("");
  const [riders, setRiders] = useState<any[]>([]); // You'll fetch this from API

  // search + filter state
  const [searchQuery, setSearchQuery] = useState("");

  // toggle a single row by ID
  const handleToggleRow = (rowId: string | number, row: any) => {
    setSelectedRowIds((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };
  
  // toggle all rows
  const handleToggleAll = (nextSelected: (string | number)[], rows: any[]) => {
    setSelectedRowIds(nextSelected);
  };

  // 🔍 SEARCH + FILTER
  const filteredParcels = useMemo(() => {
    return parcels.filter((p: any) => {
      const q = searchQuery.toLowerCase();
      return (
        p.parcel_tx_id?.toLowerCase().includes(q) ||
        p.tracking_number?.toLowerCase().includes(q) ||
        p.customer_name?.toLowerCase().includes(q) ||
        p.customer_phone?.includes(q) ||
        p.store?.business_name?.toLowerCase().includes(q) ||
        p.delivery_area?.area?.toLowerCase().includes(q)
      );
    });
  }, [parcels, searchQuery]);

  // Get selected parcels data
  const selectedParcels = useMemo(() => {
    return filteredParcels.filter((p: any) => selectedRowIds.includes(p.id));
  }, [filteredParcels, selectedRowIds]);

  // SUBMIT (single + bulk)
  const handleAssignRider = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRiderId) {
      toast.error("Please select a rider");
      return;
    }

    let parcelIds: string[];

    // single update
    if (selectedParcel) {
      parcelIds = [selectedParcel.id];
    } else {
      // bulk update by selected IDs
      parcelIds = selectedParcels.map((p: any) => p.id);
    }

    try {
      await assignRiderToParcels({
        rider_id: selectedRiderId,
        parcel_ids: parcelIds
      }).unwrap();

      toast.success(`Successfully assigned ${parcelIds.length} parcel(s) to rider`);
      setOpenModal(false);
      setSelectedRiderId("");
      setSelectedParcel(null);
      setSelectedRowIds([]); // Clear selection after successful assignment
    } catch (err) {
      console.error("API error:", err);
      toast.error("Failed to assign rider. Please try again.");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 container mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading parcels...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Parcels for Assignment</h1>
      
      {/* 🔍 SEARCH + FILTER */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by ID, customer, merchant, area..."
            className="pl-10 pr-4 py-2 border w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Selection info and bulk action */}
        <div className="flex items-center gap-4">
          {selectedRowIds.length > 0 && (
            <span className="text-sm text-gray-600">
              {selectedRowIds.length} parcel{selectedRowIds.length > 1 ? 's' : ''} selected
            </span>
          )}
          
          <Button
            disabled={selectedRowIds.length === 0}
            className="bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
            onClick={() => {
              setSelectedParcel(null); // bulk mode
              setOpenModal(true);
              // Fetch riders list here if needed
            }}
          >
            Assign Rider {selectedRowIds.length > 0 && `(${selectedRowIds.length})`}
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <DataTable
        columns={parcelColumns((row: any) => {
          setSelectedParcel(row); // single mode
          setOpenModal(true);
          // Fetch riders list here if needed
        })}
        data={filteredParcels}
        selectable={true}
        getRowId={(row) => row.id}
        selectedRowIds={selectedRowIds}
        onToggleRow={handleToggleRow}
        onToggleAll={handleToggleAll}
      />

      {/* Results count */}
      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredParcels.length} of {parcels.length} parcels
      </div>

      {/* MODAL - Assign Rider */}
      <CustomDialog open={openModal} setOpen={setOpenModal}>
        <form className="flex flex-col gap-4 " onSubmit={handleAssignRider}>
          <h2 className="text-xl font-semibold mb-2">Assign Rider</h2>
          
          <div className="bg-orange-50 p-3 rounded-lg mb-2">
            <p className="text-sm text-gray-700">
              {selectedParcel 
                ? `Assigning 1 parcel: ${selectedParcel.parcel_tx_id || selectedParcel.tracking_number}`
                : `Assigning ${selectedRowIds.length} parcels to rider`
              }
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Select Rider</label>
           {/* Reusable searchable select with conditional search */}
        <div className="w-full ">
          <SearchableSelect
            options={availableRiders.map((rider: any) => ({
              value: rider.id,
              label: rider.full_name,
            }))}
            value={selectedRiderId}
            onChange={setSelectedRiderId}
            placeholder="Select a rider"
            searchable={true}
            searchPlaceholder="Search rider by name..."
            emptyMessage="No riders found"
            selectHeight="max-h-[250px]"
            required={true}
          />
          </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                setOpenModal(false);
                setSelectedRiderId("");
                setSelectedParcel(null);
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