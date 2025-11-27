import { HomeIcon } from "lucide-react";
import React from "react";
import MerchantStats from "./_components/MerchantStats";
import MerchantManagement from "./_components/MerchantTable";

export default function page() {
  return (
    <div>
      <div className="my-4">
        <h1 className="text-3xl font-bold ">Merchant Management</h1>
        <p className="text-gray-500">History</p>
      </div>

      <div className="max-w-[1520px] mx-auto">
        <MerchantStats />
      </div>

      <div>
        <MerchantManagement />
      </div>
    </div>
  );
}
