"use client";

import React from "react";
import { useGetFinancialDashboardStatsQuery } from "@/redux/features/financial-report/FinancialReportApi";

export default function FinancialReport() {
  const { data: financialDashboardStats, isLoading, isError, error } = useGetFinancialDashboardStatsQuery();
  console.log("financialDashboardStats", financialDashboardStats);


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as any)?.data?.message}</div>;
  if (!financialDashboardStats) return <div>No data found</div>;

  const { available_balance, transferred_this_month, expenses_this_month, pending_transfer, lifetime_expenses, lifetime_transferred } = financialDashboardStats.data;

  return (
    <section className="grid grid-cols-6 gap-5">
      <Card number={available_balance.toString()} title="Available Balance" />
      <Card number={transferred_this_month.toString()} title="Transferred This Month" />
      <Card number={expenses_this_month.toString()} title="Expenses This Month" />
      <Card number={pending_transfer.toString()} title="Pending Transfer" />
      <Card number={lifetime_expenses.toString()} title="Lifetime Expenses" />
      <Card number={lifetime_transferred.toString()} title="Lifetime Transferred" />
    </section>
  );
}

const Card = ({ number, title }: { number: string; title: string }) => {
  return (
    <div className=" border border-gray-100 shadow rounded-2xl p-4">
      <p className="font-medium">{title}</p>
      <h2 className="text-2xl font-semibold">{number.toString()}</h2>
    </div>
  );
};
