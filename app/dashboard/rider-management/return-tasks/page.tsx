"use client";

import React, { useState } from "react";
import {
  useGetRiderReturnTasksQuery,
  useCompleteRiderReturnTaskMutation,
} from "@/redux/features/rider/riderApi";
import type {
  RiderReturnMerchantGroup,
  RiderReturnTab,
} from "@/redux/features/rider/riderType";
import {
  Store,
  Phone,
  MapPin,
  Package,
  CheckCircle2,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/reusable/CustomDialog";
import { toast } from "sonner";
import { CopyValueButton } from "@/lib/table.utils";

export default function RiderReturnTasksPage() {
  const [tab, setTab] = useState<RiderReturnTab>("pending");
  const [search, setSearch] = useState("");
  const [expandedMerchantIds, setExpandedMerchantIds] = useState<string[]>([]);
  const [confirmMerchant, setConfirmMerchant] =
    useState<RiderReturnMerchantGroup | null>(null);

  const {
    data: returnTasksData,
    isLoading,
    refetch,
  } = useGetRiderReturnTasksQuery({
    tab: tab === "all" ? "pending" : tab,
  });

  const [completeReturnTask, { isLoading: isCompleting }] =
    useCompleteRiderReturnTaskMutation();

  const merchantGroups: RiderReturnMerchantGroup[] =
    returnTasksData?.data ?? [];

  const toggleExpand = (id: string) => {
    setExpandedMerchantIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const handleComplete = async () => {
    if (!confirmMerchant) return;

    try {
      await completeReturnTask({
        merchantId: confirmMerchant.merchant_id || confirmMerchant.id,
      }).unwrap();
      toast.success(
        `Parcels successfully returned to ${confirmMerchant.name}`
      );
      setConfirmMerchant(null);
      refetch();
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.message || "Failed to complete return to merchant"
      );
    }
  };

  const filteredGroups = merchantGroups
    .map((group) => {
      if (!search.trim()) return group;
      const q = search.toLowerCase();
      const matchMerchant =
        group.name?.toLowerCase().includes(q) ||
        group.phone?.toLowerCase().includes(q) ||
        group.address?.toLowerCase().includes(q);

      const filteredParcels = group.parcels?.filter((p) =>
        [
          p.parcel_id,
          p.return_parcel_id,
          p.customer_name,
          p.customer_phone,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );

      if (matchMerchant) return group;
      if (filteredParcels && filteredParcels.length > 0) {
        return {
          ...group,
          parcels: filteredParcels,
        };
      }
      return null;
    })
    .filter(Boolean) as RiderReturnMerchantGroup[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Rider Return Tasks
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Deliver return parcels back to assigned merchants
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setTab("pending");
              setSearch("");
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === "pending"
                ? "bg-white text-orange-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Pending Returns
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("completed");
              setSearch("");
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === "completed"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by merchant, parcel ID, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm w-full bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
        </div>
      ) : filteredGroups.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-gray-700">
            No {tab} return tasks found
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {tab === "pending"
              ? "No assigned return tasks currently pending delivery."
              : "No return tasks completed for today yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filteredGroups.map((merchant) => {
            const isExpanded = expandedMerchantIds.includes(
              merchant.merchant_id || merchant.id
            );
            return (
              <div
                key={merchant.merchant_id || merchant.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Merchant info */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
                      {merchant.image ? (
                        <img
                          src={merchant.image}
                          alt={merchant.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <Store className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-gray-900">
                          {merchant.name}
                        </h3>
                        <span className="bg-orange-100 text-orange-700 font-semibold px-2.5 py-0.5 rounded-full text-xs">
                          {merchant.number_of_parcels || merchant.parcels?.length || 0} Parcel
                          {(merchant.number_of_parcels || merchant.parcels?.length || 0) > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-600 mt-1.5">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          {merchant.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {merchant.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <button
                      type="button"
                      onClick={() =>
                        toggleExpand(merchant.merchant_id || merchant.id)
                      }
                      className="px-3.5 py-2 text-xs font-semibold border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
                    >
                      {isExpanded ? (
                        <>
                          Hide Parcels <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          View Parcels <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    {tab === "pending" && (
                      <Button
                        type="button"
                        onClick={() => setConfirmMerchant(merchant)}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Complete Return
                      </Button>
                    )}
                  </div>
                </div>

                {/* Expanded Parcels List */}
                {isExpanded && merchant.parcels && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Assigned Return Parcels ({merchant.parcels.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {merchant.parcels.map((parcel) => (
                        <div
                          key={parcel.id}
                          className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/70 space-y-1.5 text-xs"
                        >
                          <div className="flex items-center justify-between font-semibold">
                            <span className="text-purple-700 flex items-center gap-1">
                              RID: {parcel.return_parcel_id}
                              <CopyValueButton
                                value={parcel.return_parcel_id}
                                label="Return ID"
                              />
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                parcel.status === "RETURN_TO_MERCHANT"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {parcel.status}
                            </span>
                          </div>

                          <div className="text-gray-500 flex items-center gap-1">
                            <span>PID: {parcel.parcel_id}</span>
                            <CopyValueButton
                              value={parcel.parcel_id}
                              label="Original ID"
                            />
                          </div>

                          <div className="pt-1 border-t border-gray-200/60 text-gray-700">
                            <p className="font-medium text-gray-900">
                              {parcel.customer_name}
                            </p>
                            <p className="text-gray-500">{parcel.customer_phone}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Dialog for Complete Return */}
      <CustomDialog
        open={Boolean(confirmMerchant)}
        setOpen={(open) => !open && setConfirmMerchant(null)}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-100 text-green-700 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Complete Return To Merchant
              </h2>
              <p className="text-xs text-gray-500">
                Confirm all return parcels handed over to merchant
              </p>
            </div>
          </div>

          {confirmMerchant && (
            <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm text-gray-700 border border-gray-100">
              <p>
                <strong>Merchant:</strong> {confirmMerchant.name}
              </p>
              <p>
                <strong>Address:</strong> {confirmMerchant.address}
              </p>
              <p>
                <strong>Total Parcels:</strong>{" "}
                <span className="font-bold text-orange-600">
                  {confirmMerchant.number_of_parcels ||
                    confirmMerchant.parcels?.length ||
                    0}
                </span>
              </p>
            </div>
          )}

          <p className="text-xs text-gray-500">
            This action will mark all pending return parcels for this merchant as{" "}
            <span className="font-semibold text-green-600">RETURN_TO_MERCHANT</span>.
            This cannot be undone.
          </p>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={isCompleting}
              onClick={() => setConfirmMerchant(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={isCompleting}
              onClick={handleComplete}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              {isCompleting ? "Completing..." : "Confirm Return Complete"}
            </Button>
          </div>
        </div>
      </CustomDialog>
    </div>
  );
}
