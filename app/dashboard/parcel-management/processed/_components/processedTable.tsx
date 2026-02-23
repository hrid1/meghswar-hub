"use client";

import { DataTable } from "@/components/reusable/DataTable";
import { ChevronDown, Printer } from "lucide-react";
import React, { useMemo, useState } from "react";

import { columns, mockData } from "./processedCol";
import UpdateStatusModal from "../../hub-transfer/_components/UpdateStatusModal";

export default function ProcessedTable() {
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const [search, setSearch] = useState("");
  const [openStatusModal, setOpenStatusModal] = useState(false);

  /* ------------------------------- Filtering -------------------------------- */
  const filteredData = useMemo(() => {
    return mockData.filter((p) =>
      Object.values(p).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [mockData, search]);

  /* ------------------------------ Select Rows ------------------------------- */
  const handleToggleRow = (rowId: string | number, row: any) => {
    setSelectedRowIds((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  const handleToggleAll = (nextSelected: (string | number)[], rows: any[]) => {
    setSelectedRowIds(nextSelected);
  };

  /* ------------------------------- API Calls -------------------------------- */
  const receiveParcels = async () => {
    await new Promise((res) => setTimeout(res, 800)); // mock API
    alert(`Received ${selectedRowIds.length} parcels`);
  };

  //  ------ handle status update
  const handleStatusUpdate = async (type: "reschedule" | "return") => {
    setOpenStatusModal(false);

    await new Promise((res) => setTimeout(res, 500)); // mock API

    if (type === "reschedule") {
      alert(`Rescheduled ${selectedRowIds.length} parcels`);
    } else {
      alert(`Returned ${selectedRowIds.length} parcels to merchant`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                Select Merchant <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="font-semibold">
              {selectedRowIds.length} Parcel Selected
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <button
            disabled={selectedRowIds.length === 0}
            onClick={() => setOpenStatusModal(true)}
            className={`px-6 py-2 rounded-lg font-medium ${
              selectedRowIds.length === 0
                ? "bg-gray-300 text-gray-500"
                : "bg-orange-500 text-white hover:bg-orange-00"
            }`}
          >
            Assign Rider
          </button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={filteredData}
        selectable={true}
        getRowId={(row, index) => row.pid || index}
        selectedRowIds={selectedRowIds}
        onToggleRow={handleToggleRow}
        onToggleAll={handleToggleAll}
      />

      <UpdateStatusModal
        open={openStatusModal}
        setOpen={setOpenStatusModal}
        selected={selectedRowIds}
        onAction={handleStatusUpdate}
      />
    </div>
  );
}
