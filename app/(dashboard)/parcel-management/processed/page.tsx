import React from "react";
import ProcessedTable from "./_components/processedTable";
import CustomTabs from "@/components/reusable/CustomTabs";

export default function page() {
  const tabs = [
    {
      name: "Return to Merchant",
      value: "rtm",
      content: (
        <div>
          hi
          <ProcessedTable />
        </div>
      ),
    },
    {
      name: "Delivery Reschedule",
      value: "reschedule",
      content: <ProcessedTable />,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reverse Entry - Processed</h2>
      <CustomTabs tabs={tabs} className="text-orange-500" />
    </div>
  );
}
