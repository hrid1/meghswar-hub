"use client";

import { DataTable } from "@/components/reusable/DataTable";
import CustomPagination from "@/components/reusable/CustomPagination";
import { RiderPerformanceItem } from "@/redux/features/rider/riderType";
import React, { useState } from "react";
import { riderPerformanceColumns } from "./riderPerformanceCol";

interface PerformanceTableProps {
  riders: RiderPerformanceItem[];
  isLoading: boolean;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

export default function PerformanceTable({
  riders,
  isLoading,
  pagination,
  onPageChange,
}: PerformanceTableProps) {
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  return (
    <div>
      <DataTable
        columns={riderPerformanceColumns}
        data={riders}
        isLoading={isLoading}
        selectable={true}
        getRowId={(row) => (row as RiderPerformanceItem).rider_id}
        selectedRowIds={selectedRowIds}
        onToggleRow={(rowId) => {
          setSelectedRowIds((prev) =>
            prev.includes(rowId)
              ? prev.filter((id) => id !== rowId)
              : [...prev, rowId]
          );
        }}
        onToggleAll={(nextSelected) => setSelectedRowIds(nextSelected)}
        emptyMessage="No rider performance data found."
      />

      <CustomPagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={onPageChange}
        totalItems={pagination.total}
        itemsPerPage={pagination.limit}
        show={pagination.totalPages > 0}
      />
    </div>
  );
}
