import React from "react";
import MerchantInfoCards from "./_components/MerchantInfoCard";
import StatsGrids from "./_components/StatsGrid";
import ParcelFlowChart from "./_components/ParcelFlowChart";
import MerchantParcelTable from "./_components/MerchantParcelTable";

export default function page() {
  return (
    <div className="container mx-auto space-y-6 mt-8">
      <MerchantInfoCards />
      <StatsGrids />
      <ParcelFlowChart />
      <MerchantParcelTable />
    </div>
  );
}
