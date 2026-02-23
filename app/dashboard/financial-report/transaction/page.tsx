import React from "react";
import FinancialReport from "./_components/FinancialReport";
import TransferHistoryTable from "./_components/TransferHistoryTable";
import TransferForm from "./_components/TransferForm";

export default function page() {
  return (
    <div>
      Transaction
      <FinancialReport />
      <div className="flex gap-6 mt-8">
        <div className="w-[70%]">
          <TransferHistoryTable />
        </div>
        <div className="w-[30%]">
          <TransferForm/>
        </div>
      </div>
    </div>
  );
}
