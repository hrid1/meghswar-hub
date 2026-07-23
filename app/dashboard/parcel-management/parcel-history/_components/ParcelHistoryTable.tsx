"use client";

import { DataTable } from "@/components/reusable/DataTable";
import type { ParcelHistoryItem } from "@/redux/features/parcels/parcelTypes";
import { parcelHistoryColumns } from "./parcelHistoryColumn";

interface ParcelHistoryTableProps {
  data: ParcelHistoryItem[];
  isLoading?: boolean;
}

export default function ParcelHistoryTable({
  data,
  isLoading = false,
}: ParcelHistoryTableProps) {
  return (
    <DataTable
      columns={parcelHistoryColumns}
      data={data}
      isLoading={isLoading}
      getRowId={(row) => row.id}
      minWidth={1200}
      emptyMessage="No parcel history found"
    />
  );
}