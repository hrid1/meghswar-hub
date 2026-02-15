// ParcelHistoryTable.tsx
"use client";

import { useMemo, useState } from "react";



import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Columns, Search } from "lucide-react";
import { DataTable } from "@/components/reusable/DataTable";
import { mockParcelsHistory, Parcel } from "./mockData";
import { parcelHistoryColumns } from "./columns";

export default function ParcelHistoryTable() {
  const [globalFilter, setGlobalFilter] = useState("");

  // -------------------------------------------------
  // Client-side filtering (by Parcel ID – add more fields if you want)
  // -------------------------------------------------
  const filteredData = useMemo(() => {
    if (!globalFilter) return mockParcelsHistory;
    const lower = globalFilter.toLowerCase();
    return mockParcelsHistory.filter((p) =>
      p.id.toLowerCase().includes(lower)
    );
  }, [globalFilter]);

  // optional: log selected rows
  const handleSelection = (rows: Parcel[]) => {
    console.log("Selected parcels →", rows);
  };

  return (
    <div className="p-6 space-y-4 ">
      {/* ----------- SEARCH BAR ----------- */}
      <div className="flex items-center gap-2 max-w-md">
        <Input
          placeholder="Search by Parcel ID..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="flex-1"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            /* you could trigger a server-side search here */
          }}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* ----------- TABLE ----------- */}
      <DataTable
        columns={parcelHistoryColumns}
        data={filteredData}
        selectable={false}
      />
    </div>
  );
}