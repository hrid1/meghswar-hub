"use client";

import { BadgeCheck, HomeIcon, Store } from "lucide-react";
import { useGetMerchantsPerformanceQuery } from "@/redux/features/merchant/merchantApi";
import type { MerchantPerformanceSummary } from "@/redux/features/merchant/merchantTypes";

const formatNumber = (value?: number | null) =>
  Number(value || 0).toLocaleString();

function getSummary(
  response: { data?: { summary?: MerchantPerformanceSummary }; summary?: MerchantPerformanceSummary } | undefined,
): MerchantPerformanceSummary | undefined {
  return response?.data?.summary ?? response?.summary;
}

export default function MerchantStats() {
  const { data, isLoading, isError } = useGetMerchantsPerformanceQuery();
  const summary = getSummary(data);
  const topMerchant = summary?.top_merchant;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-xl border border-gray-100 bg-gray-50 p-4 shadow-md"
          />
        ))}
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
        Failed to load merchant performance.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <div className="rounded-xl border border-gray-100 p-4 shadow-md">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Total Merchant</p>
          <HomeIcon />
        </div>
        <h2 className="mt-4 text-3xl font-bold text-orange-600">
          {formatNumber(summary.total_merchants)}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {formatNumber(summary.total_stores)} stores
        </p>
      </div>

      <div className="rounded-xl border border-gray-100 p-4 shadow-md">
        <div className="flex items-center justify-between w-full">
          <p className="text-lg font-bold">Top Merchant</p>
          <BadgeCheck />
        </div>
        <h3 className="mt-2 text-xl font-bold text-orange-600">
          {topMerchant?.business_name || "N/A"}
        </h3>
        <p className="font-semibold">
          Successful Parcels: {formatNumber(topMerchant?.successful_parcels)}
        </p>
        <p className="text-sm text-gray-500">
          {formatNumber(topMerchant?.successful_parcels)} /{" "}
          {formatNumber(topMerchant?.total_parcels)} parcels
        </p>
      </div>

      <div className="rounded-xl border border-gray-100 p-4 shadow-md">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Active Merchant</p>
          <Store />
        </div>
        <h2 className="mt-4 text-3xl font-bold text-green-600">
          {formatNumber(summary.active_merchants)}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {formatNumber(summary.delivered_parcels)} delivered /{" "}
          {formatNumber(summary.total_parcels)} parcels
        </p>
      </div>
    </div>
  );
}
