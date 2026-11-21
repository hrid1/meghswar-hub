"use client";

import React, { useState, useMemo } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { riderTableColumns } from "./_components/RiderCol";
import {
  useGetPendingHubApprovalsQuery,
  useApproveHubBypassMutation,
  useRejectHubBypassMutation,
} from "@/redux/features/verify-otp/verifyOtpApi";
import { PendingHubVerification } from "@/redux/features/verify-otp/verifyOtpTypes";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { toast } from "sonner";

export default function VerifyOtpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  // Dialog states
  const [approveTarget, setApproveTarget] =
    useState<PendingHubVerification | null>(null);
  const [declineTarget, setDeclineTarget] =
    useState<PendingHubVerification | null>(null);
  const [rejectionReason, setRejectionReason] = useState(
    "OTP verification is still required",
  );
  const [processingId, setProcessingId] = useState<string | null>(null);

  // RTK Query API hooks
  const {
    data: pendingData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetPendingHubApprovalsQuery();

  const [approveBypass, { isLoading: isApproving }] =
    useApproveHubBypassMutation();
  const [rejectBypass, { isLoading: isRejecting }] =
    useRejectHubBypassMutation();

  const verifications: PendingHubVerification[] = pendingData?.data ?? [];

  // Filtered parcels based on search query
  const filteredVerifications = useMemo(() => {
    if (!searchQuery.trim()) return verifications;
    const q = searchQuery.toLowerCase().trim();
    return verifications.filter((item) => {
      return (
        item.parcel_id?.toLowerCase().includes(q) ||
        item.tracking_number?.toLowerCase().includes(q) ||
        item.rider_name?.toLowerCase().includes(q) ||
        item.rider_phone?.toLowerCase().includes(q) ||
        item.selected_status?.toLowerCase().includes(q) ||
        item.request_reason?.toLowerCase().includes(q)
      );
    });
  }, [verifications, searchQuery]);

  // Handle open actions
  const handleAction = (
    type: "approve" | "decline",
    row: PendingHubVerification,
  ) => {
    if (type === "approve") {
      setApproveTarget(row);
    } else {
      setRejectionReason("OTP verification is still required");
      setDeclineTarget(row);
    }
  };

  // Confirm approve mutation
  const handleConfirmApprove = async () => {
    if (!approveTarget) return;
    setProcessingId(approveTarget.verification_id);
    try {
      const res = await approveBypass(approveTarget.verification_id).unwrap();
      toast.success(
        res.message || "Bypass request approved. Delivery completed without OTP.",
      );
      setApproveTarget(null);
    } catch (err: any) {
      console.error("Approve failed:", err);
      toast.error(
        err?.data?.message ||
          err?.message ||
          "Failed to approve OTP bypass request.",
      );
    } finally {
      setProcessingId(null);
    }
  };

  // Confirm decline mutation
  const handleConfirmDecline = async () => {
    if (!declineTarget) return;

    const trimmedReason = rejectionReason.trim();
    if (trimmedReason.length < 5) {
      toast.error("Rejection reason must be at least 5 characters long");
      return;
    }
    if (trimmedReason.length > 500) {
      toast.error("Rejection reason must be under 500 characters");
      return;
    }

    setProcessingId(declineTarget.verification_id);
    try {
      const res = await rejectBypass({
        verification_id: declineTarget.verification_id,
        rejection_reason: trimmedReason,
      }).unwrap();
      toast.success(res.message || "OTP bypass request declined.");
      setDeclineTarget(null);
    } catch (err: any) {
      console.error("Decline failed:", err);
      toast.error(
        err?.data?.message ||
          err?.message ||
          "Failed to decline OTP bypass request.",
      );
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-orange-600" />
            Verify OTP Approval Requests
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and approve or decline rider OTP bypass requests for deliveries.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isLoading || isFetching}
          className="flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw
            className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
          />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Pending Requests
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {verifications.length}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Awaiting hub manager review
          </p>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total Expected
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            ৳
            {verifications
              .reduce((sum, item) => sum + (Number(item.expected_amount) || 0), 0)
              .toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-1">Across pending requests</p>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total Collected
          </p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            ৳
            {verifications
              .reduce((sum, item) => sum + (Number(item.collected_amount) || 0), 0)
              .toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Net difference: ৳
            {verifications
              .reduce((sum, item) => sum + (Number(item.difference) || 0), 0)
              .toLocaleString()}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by parcel, tracking, rider, reason..."
            className="pl-9 pr-4 py-2 border rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-xs text-gray-500">
          Showing {filteredVerifications.length} of {verifications.length} requests
        </div>
      </div>

      {/* Loading & Error States */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white border rounded-xl">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-gray-500 text-sm">
            Loading pending verification requests...
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertTriangle className="w-8 h-8 text-red-500 mb-2" />
          <p className="text-red-700 font-semibold">
            Failed to load pending verification requests
          </p>
          <p className="text-xs text-red-500 mt-1 max-w-md">
            {(error as any)?.data?.message ||
              "Please check your network connection and try again."}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="mt-4 border-red-300 text-red-700 hover:bg-red-100"
          >
            Retry
          </Button>
        </div>
      ) : filteredVerifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white border rounded-xl p-6 text-center">
          <CheckCircle2 className="w-10 h-10 text-green-500 mb-2" />
          <h3 className="text-base font-semibold text-gray-800">
            {searchQuery ? "No matching requests found" : "No Pending Requests"}
          </h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm">
            {searchQuery
              ? `No verification requests matched "${searchQuery}". Try clearing your search.`
              : "All delivery verification requests have been processed. New rider bypass requests will appear here."}
          </p>
          {searchQuery && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="mt-4"
            >
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        /* Data Table */
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <DataTable
            columns={riderTableColumns(handleAction, processingId)}
            data={filteredVerifications}
            selectable={true}
            getRowId={(row) => row.verification_id}
            selectedRowIds={selectedRowIds}
            onToggleRow={(rowId) => {
              setSelectedRowIds((prev) =>
                prev.includes(rowId)
                  ? prev.filter((id) => id !== rowId)
                  : [...prev, rowId],
              );
            }}
            onToggleAll={(nextSelected) => {
              setSelectedRowIds(nextSelected);
            }}
          />
        </div>
      )}

      {/* ────────────────── Approve Confirmation Dialog ────────────────── */}
      <CustomDialog
        open={Boolean(approveTarget)}
        setOpen={(open) => {
          if (!open) setApproveTarget(null);
        }}
      >
        {approveTarget && (
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-100 text-green-700 rounded-xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Approve OTP Bypass
                </h3>
                <p className="text-xs text-gray-500">
                  Authorize delivery completion without OTP verification
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2.5 text-xs text-gray-700 border border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-500">Parcel ID:</span>
                <span className="font-semibold text-gray-900">
                  {approveTarget.parcel_id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tracking Number:</span>
                <span className="font-mono text-gray-900">
                  {approveTarget.tracking_number}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Rider:</span>
                <span className="font-medium text-gray-900">
                  {approveTarget.rider_name || "—"} ({approveTarget.rider_phone || "—"})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="font-semibold text-green-700">
                  {approveTarget.selected_status}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-gray-200">
                <span className="text-gray-500">Amount:</span>
                <span className="font-medium">
                  Expected ৳{approveTarget.expected_amount} | Collected ৳
                  {approveTarget.collected_amount} (Diff:{" "}
                  <span
                    className={
                      approveTarget.difference === 0
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    ৳{approveTarget.difference}
                  </span>
                  )
                </span>
              </div>
              {approveTarget.request_reason && (
                <div className="pt-1 border-t border-gray-200">
                  <span className="text-gray-500 block mb-0.5">Reason:</span>
                  <span className="text-gray-800 italic">
                    "{approveTarget.request_reason}"
                  </span>
                </div>
              )}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2 text-xs text-amber-800">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Approving this bypass will complete the parcel delivery immediately.
                This action cannot be undone.
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                disabled={isApproving}
                onClick={() => setApproveTarget(null)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={isApproving}
                onClick={handleConfirmApprove}
                className="bg-green-600 hover:bg-green-700 text-white font-medium"
              >
                {isApproving ? "Approving..." : "Confirm & Approve"}
              </Button>
            </div>
          </div>
        )}
      </CustomDialog>

      {/* ────────────────── Decline / Reject Dialog ────────────────── */}
      <CustomDialog
        open={Boolean(declineTarget)}
        setOpen={(open) => {
          if (!open) setDeclineTarget(null);
        }}
      >
        {declineTarget && (
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-100 text-red-700 rounded-xl">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Decline OTP Bypass
                </h3>
                <p className="text-xs text-gray-500">
                  Reject request and enforce standard OTP verification
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3.5 space-y-1.5 text-xs text-gray-700 border border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-500">Parcel:</span>
                <span className="font-semibold text-gray-900">
                  {declineTarget.parcel_id} ({declineTarget.tracking_number})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Rider:</span>
                <span>
                  {declineTarget.rider_name} ({declineTarget.rider_phone})
                </span>
              </div>
            </div>

            {/* Rejection Reason Form */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
                <span>Rejection Reason *</span>
                <span className="text-[11px] text-gray-400 font-normal">
                  {rejectionReason.length} / 500 (min 5 chars)
                </span>
              </label>
              <Textarea
                rows={3}
                placeholder="Explain why this bypass request is declined..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="text-xs"
              />
              {rejectionReason.trim().length > 0 &&
                rejectionReason.trim().length < 5 && (
                  <p className="text-[11px] text-red-600">
                    Reason must be at least 5 characters long.
                  </p>
                )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                disabled={isRejecting}
                onClick={() => setDeclineTarget(null)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                disabled={isRejecting || rejectionReason.trim().length < 5}
                onClick={handleConfirmDecline}
                className="font-medium"
              >
                {isRejecting ? "Declining..." : "Confirm & Decline"}
              </Button>
            </div>
          </div>
        )}
      </CustomDialog>
    </div>
  );
}
