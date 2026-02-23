import React from "react";
import StatsCard from "./StatsCard";
import SummaryForToday from "./SummaryForToday";
import QuickActions from "./QuickActions";
import ParcelFlow from "./ParcelFlow";
import PendingActions from "./PendingActions";
import RiderStatus from "./RiderStatus";
import OnGoingDelivery from "./OnGoingDelivery";

export default function DashboardContent() {
  return (
    <div className="mt-5 space-y-6">
      <StatsCard />
      <div className="flex gap-4">
        <div className="w-full md:w-[60%] border border-gray-200 rounded-2xl p-4">
          <SummaryForToday />
        </div>
        <div className="w-full md:w-[40%] border border-gray-200 rounded-2xl p-4">
          <QuickActions />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <ParcelFlow />
        </div>
        <div className="flex-1">
          <PendingActions />
        </div>
      </div>

      {/* rider status and onging deliveres */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/3">
          <RiderStatus />
        </div>

        <div className="flex-1">
          <OnGoingDelivery />
        </div>
      </div>
    </div>
  );
}
