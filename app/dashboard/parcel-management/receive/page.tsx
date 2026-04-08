// app/(dashboard)/receive-parcels/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { Search, Printer, ChevronDown, RefreshCw } from "lucide-react";
import { DataTable } from "@/components/reusable/DataTable";
import { 
  useGetReceivedParcelsQuery, 
  useReceiveParcelsMutation 
} from "@/redux/features/parcels/parcelsApi";
import ParcelSummary from "./_components/ParcelSummary";
import { getParcelColumns } from "./_components/ParcelColumns";

import { toast } from "sonner";
import { useUpdateParcelCharges } from "./_components/useUpdateHubCharges";

// Define proper types for the parcel data
interface DeliveryArea {
  id: string;
  area: string;
  zone: string;
  city: string;
  division: string;
}

interface Parcel {
  id: string;
  parcel_tx_id: string;
  tracking_number: string;
  merchant_order_id: string;
  store_name: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  delivery_area: DeliveryArea;
  delivery_charge: string;
  weight_charge: string;
  cod_charge: string;
  total_charge: string;
  is_cod: boolean;
  cod_amount: string;
  status: string;
  special_instructions: string;
  created_at: string;
}

interface TransformedParcel {
  id: string;
  originalId: string;
  merchant: string;
  merchantInvoice: string;
  additionalNote: string;
  customer: string;
  phone: string;
  address: string;
  zone: string;
  collectableAmount: number;
  deliveryCharge: number;
  codCharge: number;
  weightCharge: number;
  weight: number;
  delivery: number;
  totalWeight: string;
  deliveryArea: string;
  is_cod: boolean;
  status: string;
  tracking_number: string;
}

export default function ParcelTable() {
  const { data: receivedParcels, isLoading, error, refetch } = useGetReceivedParcelsQuery(null);
  const [receiveParcels, { isLoading: isReceiving }] = useReceiveParcelsMutation();
  const { updateCharges, isUpdating } = useUpdateParcelCharges();

  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const [search, setSearch] = useState("");
  const [updatingCellId, setUpdatingCellId] = useState<string | null>(null);

  // Extract parcels data from API response
  const parcelsData = receivedParcels?.data?.parcels || [];

  // Transform API data to match the expected format for the table
  const transformedParcels = useMemo((): TransformedParcel[] => {
    return parcelsData.map((parcel: Parcel) => ({
      id: parcel.parcel_tx_id,
      originalId: parcel.id,
      merchant: parcel.store_name,
      merchantInvoice: parcel.merchant_order_id,
      additionalNote: parcel.special_instructions || "No instructions",
      customer: parcel.customer_name,
      phone: parcel.customer_phone,
      address: parcel.customer_address,
      zone: `${parcel.delivery_area.zone}, ${parcel.delivery_area.area}`,
      collectableAmount: parseFloat(parcel.cod_amount) || 0,
      deliveryCharge: parseFloat(parcel.delivery_charge) || 0,
      codCharge: parseFloat(parcel.cod_charge) || 0,
      weightCharge: parseFloat(parcel.weight_charge) || 0,
      weight: parseFloat(parcel.weight_charge) / 40 || 0.5, // Calculate weight from charge
      delivery: parseFloat(parcel.total_charge) || 0,
      totalWeight: "1K",
      deliveryArea: `${parcel.delivery_area.area}, ${parcel.delivery_area.zone}`,
      is_cod: parcel.is_cod,
      status: parcel.status,
      tracking_number: parcel.tracking_number,
    }));
  }, [parcelsData]);

  // Handle updating charges
  const handleUpdateCharges = async (id: string, charges: { delivery_charge?: number; weight_charge?: number }) => {
    try {
      await updateCharges(id, charges);
      // Refetch the data to get updated values
      await refetch();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  /* ------------------------------- Filtering -------------------------------- */
  const filteredData = useMemo(() => {
    return transformedParcels.filter((p) =>
      Object.values(p).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [transformedParcels, search]);

  /* ------------------------------ Select Rows ------------------------------- */
  const handleToggleRow = (rowId: string | number) => {
    setSelectedRowIds((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  const handleToggleAll = (nextSelected: (string | number)[]) => {
    setSelectedRowIds(nextSelected);
  };

  /* ------------------------------ Summary Totals ----------------------------- */
  const summary = useMemo(() => {
    const rows = filteredData.filter((row) => selectedRowIds.includes(row.id));

    return {
      totalCollectable: rows.reduce((s, p) => s + p.collectableAmount, 0),
      totalCOD: rows.reduce((s, p) => s + p.codCharge, 0),
      totalDeliveryCharge: rows.reduce((s, p) => s + p.deliveryCharge, 0),
      totalWeight: rows.reduce((s, p) => s + p.weight, 0),
    };
  }, [selectedRowIds, filteredData]);

  /* ------------------------------- API Calls -------------------------------- */
  const handleReceiveParcels = async () => {
    if (selectedRowIds.length === 0) return;

    try {
      // Get the original UUIDs of selected parcels
      const selectedOriginalIds = filteredData
        .filter(row => selectedRowIds.includes(row.id))
        .map(row => row.originalId);
      
      console.log("Receiving parcels with IDs:", selectedOriginalIds);
      
      // Call the mutation with the array of IDs
      const response = await receiveParcels(selectedOriginalIds).unwrap();
      
      console.log("Receive response:", response);
      toast.success(`Successfully received ${selectedRowIds.length} parcels`);
      setSelectedRowIds([]); // Clear selection after successful receive
      
      // Refetch to update the data
      await refetch();

    } catch (error) {
      console.error("Failed to receive parcels:", error);
      toast.error("Failed to receive parcels. Please try again.");
    }
  };

  // Loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading parcels...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error loading parcels. Please try again.</div>
      </div>
    );
  }

  // Get columns with update handler
  const columns = getParcelColumns(handleUpdateCharges);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Receive Parcels</h1>
        <button
          onClick={() => refetch()}
          className="p-2 text-gray-500 hover:text-orange-500 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by ID, merchant, customer, address..."
          className="pl-10 pr-4 py-3 border w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Summary Cards */}
      <ParcelSummary
        selectedCount={selectedRowIds.length}
        totalCollectable={summary.totalCollectable}
        totalCOD={summary.totalCOD}
        totalDeliveryCharge={summary.totalDeliveryCharge}
        totalWeight={summary.totalWeight}
      />

      {/* Action Buttons */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
              Select Merchant <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="font-semibold text-gray-700">
            {selectedRowIds.length} Parcel{selectedRowIds.length !== 1 ? 's' : ''} Selected
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <button
            disabled={selectedRowIds.length === 0 || isReceiving}
            onClick={handleReceiveParcels}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedRowIds.length === 0 || isReceiving
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isReceiving ? "Receiving..." : `Receive (${selectedRowIds.length})`}
          </button>

          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
            <Printer className="w-5 h-5" />
            Print / Bulk Print
          </button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={filteredData}
        selectable={true}
        getRowId={(row) => row.id}
        selectedRowIds={selectedRowIds}
        onToggleRow={handleToggleRow}
        onToggleAll={handleToggleAll}
      />

      {/* Results count */}
      <div className="text-sm text-gray-500">
        Showing {filteredData.length} of {transformedParcels.length} parcels
      </div>
    </div>
  );
}