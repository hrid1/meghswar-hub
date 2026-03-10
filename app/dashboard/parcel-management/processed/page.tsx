import React from "react";

import CustomTabs from "@/components/reusable/CustomTabs";
import ReturnToMerchantTable from "./_components/returnToMerchantTable";
import DeliveryResheduleTable from "./_components/DeliveryResheduleTable";

export default function page() {
  const tabs = [
    {
      name: "Return to Merchant",
      value: "rtm",
      content: (
        <div>
          <ReturnToMerchantTable />
        </div>
      ),
    },
    {
      name: "Delivery Reschedule",
      value: "reschedule",
      content: <DeliveryResheduleTable />,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reverse Entry - Processed</h2>
      <CustomTabs tabs={tabs} className="text-orange-500" />
    </div>
  );
}
