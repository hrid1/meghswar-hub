"use client";

import { useGetMerchantOverviewQuery } from "@/redux/features/merchant/merchantApi";
import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import MerchantInfoCards from "./_components/MerchantInfoCard";
import StatsGrids from "./_components/StatsGrid";
import ParcelFlowChart from "./_components/ParcelFlowChart";
import { Loader2 } from "lucide-react";
import MerchantParcelTable from "./_components/MerchantParcelTable";
import type { MerchantOverviewRangeMode } from "@/redux/features/merchant/merchantTypes";

function currentYearMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default function MerchantDetailPage() {
  const { mid } = useParams();
  const merchantId =
    typeof mid === "string" ? mid : Array.isArray(mid) ? mid[0] : "";

  const [mode, setMode] = useState<MerchantOverviewRangeMode>("last7d");
  const [month, setMonth] = useState(currentYearMonth);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const queryArgs = useMemo(() => {
    if (!merchantId) return { id: "" };

    if (mode === "month") {
      return { id: merchantId, range: "month", month };
    }

    if (mode === "custom" && startDate && endDate) {
      return { id: merchantId, start_date: startDate, end_date: endDate };
    }

    return { id: merchantId, range: "last7d" };
  }, [merchantId, mode, month, startDate, endDate]);

  const {
    data: merchantResponse,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetMerchantOverviewQuery(queryArgs, {
    skip: !merchantId,
  });

  const overview = merchantResponse?.data;

  if (!merchantId) {
    return (
      <div className="container mx-auto mt-8 text-gray-600">
        Invalid merchant id.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto mt-8 flex items-center gap-2 text-gray-600">
        <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
        Loading merchant overview…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto mt-8 text-red-600">
        Failed to load merchant: {String(error)}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 space-y-6">
      <MerchantInfoCards merchant={overview?.merchant ?? null} />
      <StatsGrids overview={overview ?? null} />
      <ParcelFlowChart
        graph={overview?.graph}
        totals={overview?.parcel_flow_totals}
        rangeLabel={overview?.range}
        mode={mode}
        month={month}
        startDate={startDate}
        endDate={endDate}
        isFetching={isFetching}
        onModeChange={setMode}
        onMonthChange={setMonth}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <MerchantParcelTable />
    </div>
  );
}
