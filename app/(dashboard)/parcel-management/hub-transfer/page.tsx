import CustomTabs from "@/components/reusable/CustomTabs";
import React from "react";
import AllParcelList from "./_components/AllParcelList";
import AssignParcelList from "./_components/AssignParcelList";

const myTabs = [
  {
    name: "All Parcel List",
    value: "all-parcel-list",
    content: (
      <>
        <AllParcelList />
      </>
    ),
  },
  {
    name: "Assigned Parcel List",
    value: "assigned-parcel-list",
    content: (
      <>
        <AssignParcelList />
      </>
    ),
  },
];

export default function page() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Hub Transfer</h1>
      <CustomTabs tabs={myTabs} defaultValue="all-parcel-list"></CustomTabs>
    </div>
  );
}
