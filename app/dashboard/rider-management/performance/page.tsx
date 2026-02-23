import React from "react";
import StatsCard from "./_components/StatsCard";
import PerformanceTable from "./_components/PerformanceTable";

export default function page() {
  return (
    <div>
      <h1 className="text-3xl font-bold my-6">
        This is rider performance page
      </h1>

      <div>
        <StatsCard />
      </div>

      <div>
        <PerformanceTable/>
      </div>
    </div>
  );
}



