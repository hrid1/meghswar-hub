"use client";

import { DataTable } from "@/components/reusable/DataTable";
import { useMemo, useState } from "react";
import { returnParcelColumns } from "./ReturnParcelCol";
import type { Parcel } from "@/redux/features/financial-report/FinancialReportType";

export interface ReturnParcelRow {
  parcelId: string;
  reason: string;
  status: string;
  collectableAmount: number;
  collectedAmount: number;
}

function mapParcelToRow(p: Parcel): ReturnParcelRow {
  return {
    parcelId: p.parcel_tx_id || p.parcel_id,
    reason: p.reason ?? "—",
    status: p.status,
    collectableAmount: p.cod_breakdown?.cod_amount ?? 0,
    collectedAmount: p.cod_breakdown?.cod_collected_amount ?? 0,
  };
}

interface ReturnParcelTableProps {
  parcels: Parcel[];
  isLoading?: boolean;
}

export default function ReturnParcelTable({ parcels, isLoading }: ReturnParcelTableProps) {
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  const rows = useMemo(() => parcels.map(mapParcelToRow), [parcels]);

  if (isLoading) {
    return (
      <div className="py-8 text-center text-gray-500">
        Loading returned parcels...
      </div>
    );
  }

  return (
    <div>
      <DataTable
        columns={returnParcelColumns}
        data={rows}
        selectable={true}
        getRowId={(row) => row.parcelId}
        selectedRowIds={selectedRowIds}
        onToggleRow={(rowId) => {
          setSelectedRowIds((prev) =>
            prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
          );
        }}
        onToggleAll={(nextSelected) => {
          setSelectedRowIds(nextSelected);
        }}
        emptyMessage="No returned parcels for this rider"
      />
    </div>
  );
}
