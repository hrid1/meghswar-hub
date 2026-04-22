"use client";

import { useGetMerchantOverviewQuery } from "@/redux/features/merchant/merchantApi";
import React from "react";
import { useParams } from "next/navigation";
import MerchantInfoCards from "./_components/MerchantInfoCard";
import StatsGrids from "./_components/StatsGrid";
import ParcelFlowChart from "./_components/ParcelFlowChart";
import { Loader2 } from "lucide-react";
import MerchantParcelTable from "./_components/MerchantParcelTable";

export default function MerchantDetailPage() {
  const { mid } = useParams();
  const merchantId = typeof mid === "string" ? mid : Array.isArray(mid) ? mid[0] : "";

  const { data: merchantResponse, isLoading, isError, error } =
    useGetMerchantOverviewQuery(
      { id: merchantId },
      { skip: !merchantId }
    );

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
    <div className="container mx-auto space-y-6 mt-8">
      <MerchantInfoCards merchant={overview?.merchant ?? null} />
      <StatsGrids overview={overview ?? null} />
      <ParcelFlowChart
        graph={overview?.graph}
        rangeLabel={overview?.range}
      />

      <MerchantParcelTable />
    </div>
  );
}
