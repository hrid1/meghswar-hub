import CustomTabs from "@/components/reusable/CustomTabs";
import React from "react";
import PickupRequestTable from "./_components/RequestList";
import PickupRequestTableRider from "./_components/AssignedRider";
import ConfirmPickupRequest from "./_components/ConfirmPickupRequest";

const myTabs = [
  {
    name: "Request List",
    value: "request-list",
    content: <PickupRequestTable />,
  },
  {
    name: "Assigned Rider",
    value: "assigned-rider",
    content: <PickupRequestTableRider />,
  },
  {
    name: "Pickup Done",
    value: "pickup-done",
    content: <ConfirmPickupRequest />,
  },
];

export default function Page() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Pickup Request</h1>
      <CustomTabs tabs={myTabs} defaultValue="request-list" />
    </div>
  );
}
