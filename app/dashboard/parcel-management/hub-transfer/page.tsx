import CustomTabs from "@/components/reusable/CustomTabs";
import AllParcelList from "./_components/AllParcelListTable";
import AssignParcelTable from "./_components/AssignParcelTable";


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

      <h1>This is still processing...</h1>
        <AssignParcelTable />
      </>
    ),
  },
];

export default function page() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Hub Transfer</h1>
      <CustomTabs tabs={myTabs} defaultValue="all-parcel-list"></CustomTabs>
    </div>
  );
}
