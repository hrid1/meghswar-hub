"use client";

import React, { useState, useCallback } from "react";
import { useGetRidersPerformanceQuery } from "@/redux/features/rider/riderApi";
import { RiderPerformanceParams } from "@/redux/features/rider/riderType";
import StatsCard from "./_components/StatsCard";
import PerformanceTable from "./_components/PerformanceTable";
import { Search } from "lucide-react";

type Period = "this_week" | "this_month" | "last_month" | "custom";

const PERIOD_OPTIONS: { label: string; value: Period }[] = [
  { label: "This Week", value: "this_week" },
  { label: "This Month", value: "this_month" },
  { label: "Last Month", value: "last_month" },
  { label: "Custom", value: "custom" },
];

export default function RiderPerformancePage() {
  const [period, setPeriod] = useState<Period>("custom");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryParams: RiderPerformanceParams = {
    page,
    limit,
    ...(period !== "custom" && { period }),
    ...(search.trim() && { search: search.trim() }),
    ...(period === "custom" && startDate && { startDate }),
    ...(period === "custom" && endDate && { endDate }),
  };

  const { data, isLoading } = useGetRidersPerformanceQuery(queryParams);

  const summary = data?.data;

  const handlePeriodChange = useCallback(
    (value: Period) => {
      setPeriod(value);
      setPage(1);
    },
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const pagination = summary?.pagination ?? {
    total: 0,
    page: 1,
    limit,
    totalPages: 0,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Rider Performance</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track delivery performance metrics for all active riders.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Period Tabs */}
        {/* <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          { {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handlePeriodChange(opt.value)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                period === opt.value
                  ? "bg-white shadow text-[#FE5000]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {opt.label}
            </button>
          ))} }
          
        </div> */}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search rider..."
            value={search}
            onChange={handleSearchChange}
            className="border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm w-full max-w-72 focus:outline-none focus:ring-2 focus:ring-[#FE5000]/30"
          />
        </div>

        {/* Custom date range */}
        {period === "custom" && (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FE5000]/30"
            />
            <span className="text-gray-400 text-sm">to</span>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FE5000]/30"
            />
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <StatsCard
        total_active_riders={summary?.total_active_riders ?? 0}
        overall_success_rate={summary?.overall_success_rate ?? 0}
        total_delivered={summary?.total_delivered ?? 0}
        total_assigned={summary?.total_assigned ?? 0}
        total_rescheduled={summary?.total_rescheduled ?? 0}
        total_returned={summary?.total_returned ?? 0}
      />

      {/* Table */}
      <PerformanceTable
        riders={summary?.riders ?? []}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
