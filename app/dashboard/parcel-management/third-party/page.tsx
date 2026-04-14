import CustomTabs from "@/components/reusable/CustomTabs";
import ParcelForAssignmentTable from "./_components/parcelForAssignmentTable";
import AllPacelListTable from "./_components/AllPacelListTable";

const myTabs = [
  {
    name: "All Parcel List",
    value: "all-parcel-list",
    content: (
      <>
        <AllPacelListTable />
      </>
    ),
  },
  {
    name: "Assigned Parcel List",
    value: "assigned-parcel-list",
    content: (
      <>
        <ParcelForAssignmentTable />
      </>
    ),
  },
];

export default function page() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Third Party</h1>
      <CustomTabs tabs={myTabs} defaultValue="all-parcel-list"></CustomTabs>
    </div>
  );
}
