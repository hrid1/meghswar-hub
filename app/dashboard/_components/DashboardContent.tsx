"use client";
import StatsCard from "./StatsCard";
import SummaryForToday from "./SummaryForToday";
import QuickActions from "./QuickActions";
import ParcelFlow from "./ParcelFlow";
import PendingActions from "./PendingActions";
import RiderStatus from "./RiderStatus";
import {
  useGetDashboardOverviewStatsQuery,
  useGetDashboardParcelFlowQuery,
} from "@/redux/features/dashboard/dashboardApi";
import { Loader2, RefreshCw } from "lucide-react";
import OnGoingDelivery from "./OnGoingDelivery";

export default function DashboardContent() {
  const {
    data: dashboardOverviewData,
    isLoading,
    isError,
    refetch,
  } = useGetDashboardOverviewStatsQuery();

  const {
    data: parcelFlowResponse,
    isLoading: isParcelFlowLoading,
    isError: isParcelFlowError,
  } = useGetDashboardParcelFlowQuery();

  const dashboard = dashboardOverviewData?.data;

  if (isLoading) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center">
        <div className="text-center text-gray-500">
          <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-[#FE5000]" />
          <p className="text-sm">Loading dashboard overview…</p>
        </div>
      </div>
    );
  }

  if (isError || !dashboard) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
          <p className="font-semibold text-red-700">
            Could not load the dashboard
          </p>
          <p className="mt-1 text-sm text-red-600">
            Check your connection and try again.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mx-auto mt-4 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-5">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hub Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Operational overview for {dashboard.date_context.date}
          </p>
        </div>
        <p className="text-xs text-gray-400">
          Last updated{" "}
          {new Date(dashboard.generated_at).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <StatsCard topCards={dashboard.top_cards} />

      <div className="">
          <SummaryForToday summary={dashboard.summary_for_todays_parcel} />
        </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
       
        <div className="md:col-span-2">
          <QuickActions />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <ParcelFlow
            flow={parcelFlowResponse?.data}
            isLoading={isParcelFlowLoading}
            isError={isParcelFlowError}
          />
        </div>
        <div>
          <PendingActions pendingActions={dashboard.pending_actions} />
        </div>
        <div></div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <RiderStatus />
        <OnGoingDelivery />
      </div>
    </div>
  );
}
