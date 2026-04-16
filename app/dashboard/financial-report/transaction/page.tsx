import React from "react";
import FinancialReport from "./_components/FinancialReport";
import TransferHistoryTable from "./_components/TransferHistoryTable";
import TransferForm from "./_components/TransferForm";
import CustomTabs from "@/components/reusable/CustomTabs";
import HubExpenseTable from "./_components/HubExpenseTable";
import HubExpenseForm from "./_components/HubExpenseForm";

export default function page() {
  const myTabs = [
    {
      name: "Transfer History",
      value: "transfer-history",
      content: (
        <div className="flex gap-6 ">
          <div className="w-[70%]">
            <TransferHistoryTable />
          </div>
          <div className="w-[30%]">
            <TransferForm />
          </div>
        </div>
      ),
    },
    {
      name: "Hub Expense",
      value: "hub-expense",
      content: (
        <div className="flex gap-6 ">
          <div className="w-[70%]">
            <HubExpenseTable />
          </div>
          <div className="w-[30%]">
            <HubExpenseForm />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 mt-4">

      <FinancialReport />
      <CustomTabs tabs={myTabs} defaultValue="transfer-history"></CustomTabs>
    </div>
  );
}
