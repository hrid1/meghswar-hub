import CustomTabs from "@/components/reusable/CustomTabs";
import React from "react";
import PickupRequestTable from "./_components/RequestList";
import PickupRequestTableRider from "./_components/AssignedRider";

const myTabs = [
  {
    name: "Request List",
    value: "request-list",
    content: (
      <>
        <PickupRequestTable />
      </>
    ),
  },
  {
    name: "Assigned Rider",
    value: "assigned-rider",
    content: (
      <>
        <PickupRequestTableRider />
      </>
    ),
  },
];

export default function page() {
  return (
    <div>
      <CustomTabs tabs={myTabs} defaultValue=""></CustomTabs>
    </div>
  );
}
