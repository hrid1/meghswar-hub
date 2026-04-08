"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useMemo, useState } from "react";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useGetHubIncomingParcelsQuery, useReceiveIncomingParcelsMutation } from "@/redux/features/parcels/parcelsApi";
import { toast } from "sonner";
import { receiveParcelColumns } from "./HubReceiveCol";

// Define the type based on your API response
interface Customer {
  id: string;
  customer_name: string;
  phone_number: string;
  secondary_number: string | null;
  customer_address: string;
  delivery_coverage_area_id: string;
  created_at: string;
  updated_at: string;
}

interface Store {
  id: string;
  store_code: string;
  merchant_id: string;
  business_name: string;
  business_address: string;
  phone_number: string;
  email: string;
  facebook_page: string;
  hub_id: string;
  is_default: boolean;
  status: string;
  district: string;
  thana: string;
  area: string;
  carrybee_store_id: string;
  carrybee_city_id: number;
  carrybee_zone_id: number;
  carrybee_area_id: number;
  is_carrybee_synced: boolean;
  carrybee_synced_at: string;
  auto_assign_to_carrybee: boolean;
  created_at: string;
  updated_at: string;
}

interface Hub {
  id: string;
  hub_code: string;
  branch_name: string;
  area: string;
  address: string;
  manager_user_id: string;
  created_at: string;
  updated_at: string;
}

interface IncomingParcel {
  id: string;
  customer_id: string | null;
  customer: Customer | null;
  merchant_id: string;
  store_id: string;
  store: Store;
  pickup_request_id: string | null;
  tracking_number: string;
  parcel_tx_id: string;
  merchant_order_id: string;
  delivery_area: string;
  delivery_coverage_area_id: string | null;
  customer_name: string;
  customer_phone: string;
  customer_secondary_phone: string | null;
  customer_address: string;
  product_description: string;
  product_price: string;
  product_weight: string;
  parcel_type: number;
  delivery_charge: string;
  weight_charge: string;
  cod_charge: string;
  total_charge: string;
  is_cod: boolean;
  cod_amount: string;
  is_exchange: boolean;
  receivable_amount: string;
  cod_collected_amount: string;
  return_charge: string;
  delivery_charge_applicable: boolean;
  return_charge_applicable: boolean;
  financial_status: string;
  invoice_id: string | null;
  clearance_required: boolean;
  clearance_done: boolean;
  clearance_invoice_id: string | null;
  paid_amount: string | null;
  status: string;
  payment_status: string;
  paid_to_merchant: boolean;
  paid_to_merchant_at: string | null;
  cod_cleared_at: string | null;
  delivery_type: number;
  assigned_rider_id: string | null;
  assigned_at: string | null;
  rider_accepted_at: string | null;
  out_for_delivery_at: string | null;
  reschedule_count: number;
  special_instructions: string | null;
  admin_notes: string | null;
  return_reason: string | null;
  current_hub_id: string | null;
  origin_hub_id: string;
  originHub: Hub;
  destination_hub_id: string;
  is_inter_hub_transfer: boolean;
  transferred_at: string;
  received_at_destination_hub: string | null;
  transfer_notes: string;
  delivery_provider: string;
  third_party_provider_id: string | null;
  issue_type: string | null;
  issue_description: string | null;
  issue_reported_by_id: string | null;
  issue_reported_at: string | null;
  is_issue_resolved: boolean;
  carrybee_consignment_id: string | null;
  carrybee_delivery_fee: string | null;
  carrybee_cod_fee: string | null;
  assigned_to_carrybee_at: string | null;
  recipient_carrybee_city_id: number | null;
  recipient_carrybee_zone_id: number | null;
  recipient_carrybee_area_id: number | null;
  original_parcel_id: string | null;
  is_return_parcel: boolean;
  picked_up_at: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    parcels: IncomingParcel[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}

export default function HubReceiveTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const {
    data: incomingParcels,
    isLoading: isIncomingParcelsLoading,
    isError: isIncomingParcelsError,
    error: incomingParcelsError,
  } = useGetHubIncomingParcelsQuery({ page, limit });

  console.log("incomingParcels", incomingParcels);

  // Get parcels data from response
  const parcelsData: IncomingParcel[] = incomingParcels?.data?.parcels ?? [];
  const pagination = incomingParcels?.data?.pagination;

  console.log("parcelsData", parcelsData);

  // Table selections
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  // Modal
  const [openModal, setOpenModal] = useState(false);

  // For single update
  const [selectedParcel, setSelectedParcel] = useState<IncomingParcel | null>(null);

  // Radio value
  const [selectedStatus, setSelectedStatus] = useState("");

  // Search + filter state
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered parcels based on search
  const filteredParcels = useMemo(() => {
    if (!parcelsData.length) return [];
    if (!searchQuery.trim()) return parcelsData;
    
    const q = searchQuery.toLowerCase();
    return parcelsData.filter(
      (p) =>
        p.parcel_tx_id?.toLowerCase().includes(q) ||
        p.tracking_number?.toLowerCase().includes(q) ||
        p.customer_name?.toLowerCase().includes(q) ||
        p.customer_phone?.toLowerCase().includes(q) ||
        p.store?.business_name?.toLowerCase().includes(q) ||
        p.product_description?.toLowerCase().includes(q) ||
        p.originHub?.branch_name?.toLowerCase().includes(q)
    );
  }, [parcelsData, searchQuery]);

  // Toggle a single row by ID
  const handleToggleRow = (rowId: string | number, row: any) => {
    setSelectedRowIds((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  // Toggle all rows
  const handleToggleAll = (nextSelected: (string | number)[], rows: any[]) => {
    setSelectedRowIds(nextSelected);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle limit change
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing items per page
  };

  const [receiveIncomingParcels, { isLoading: isReceiving }] =
    useReceiveIncomingParcelsMutation();

  const handleReceiveTransfers = async () => {
    if (selectedRowIds.length === 0) {
      toast.error("Please select parcels to receive");
      return;
    }
    const parcelIds = selectedRowIds.map((id) => String(id));
    try {
      await receiveIncomingParcels(parcelIds).unwrap();
      toast.success(`Received ${parcelIds.length} parcel(s) successfully`);
      setSelectedRowIds([]);
    } catch (err) {
      console.error("Receive error:", err);
      toast.error("Failed to receive parcels. Please try again.");
    }
  };

  // SUBMIT (single + bulk)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStatus) return;

    const parcelIds: string[] = selectedParcel 
      ? [selectedParcel.id] 
      : selectedRowIds.map((id) => String(id));

    try {
      // Replace with your actual API endpoint
      const res = await fetch("/api/receive-parcels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parcelIds,
          status: selectedStatus,
        }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      setOpenModal(false);
      setSelectedStatus("");
      setSelectedParcel(null);
      setSelectedRowIds([]); // Clear selections after successful update
    } catch (err) {
      console.error("API error:", err);
    }
  };

  // Loading state
  if (isIncomingParcelsLoading) {
    return (
      <span className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        <span className="ml-2 text-gray-600">Loading incoming parcels...</span>
      </span>
    );
  }

  // Error state
  if (isIncomingParcelsError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Error loading parcels: {String(incomingParcelsError)}
      </div>
    );
  } 

  return (
    <div className="p-6 container mx-auto">
      {/* 🔍 SEARCH + FILTER */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by ID, customer, phone, store..."
            className="border p-2 rounded w-80 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Show total count */}
          <span className="text-sm text-gray-600">
            Total: {pagination?.total ?? 0} parcels
          </span>

          {/* Show selected count */}
          {selectedRowIds.length > 0 && (
            <span className="text-sm font-semibold text-orange-600">
              {selectedRowIds.length} selected
            </span>
          )}
        </div>

        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={handleReceiveTransfers}
          disabled={selectedRowIds.length === 0 || isReceiving}
        >
          {isReceiving ? "Receiving..." : `Receive Transfers (${selectedRowIds.length}) `}
        </Button>
      </div>

      {/* TABLE */}
      <DataTable
        columns={receiveParcelColumns((row: IncomingParcel) => {
          setSelectedParcel(row); // single mode
          setOpenModal(true);
        })}
        data={parcelsData}
        selectable={true}
        getRowId={(row) => row.id}
        selectedRowIds={selectedRowIds}
        onToggleRow={handleToggleRow}
        onToggleAll={handleToggleAll}
        emptyMessage="No incoming parcels found"
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 0 && (
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select
              value={limit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="px-3 py-1 bg-orange-500 text-white rounded-md">
              {page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* MODAL */}
      <CustomDialog open={openModal} setOpen={setOpenModal}>
        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold">
            {selectedParcel
              ? "Receive Parcel - Single"
              : "Receive Parcels - Bulk"}
          </h2>

          <div className="text-sm text-gray-600">
            {selectedParcel ? (
              <p>
                Parcel: {selectedParcel.parcel_tx_id} - {selectedParcel.customer_name}
              </p>
            ) : (
              <p>Selected {selectedRowIds.length} parcels for receiving</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Select Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Choose status...</option>
              <option value="RECEIVED_AT_HUB">Received at Hub</option>
              <option value="PROCESSING">Processing</option>
              <option value="READY_FOR_DELIVERY">Ready for Delivery</option>
            </select>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              type="submit"
              className="bg-orange-500 text-white flex-1 hover:bg-orange-600"
            >
              Confirm
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CustomDialog>
    </div>
  );
}