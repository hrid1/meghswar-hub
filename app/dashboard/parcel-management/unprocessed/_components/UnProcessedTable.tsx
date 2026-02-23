"use client";

import { DataTable } from "@/components/reusable/DataTable";
import { ChevronDown, Printer } from "lucide-react";
import React, { useMemo, useState } from "react";
import { columns } from "./unProcessedCol";
import UpdateStatusModal from "../../hub-transfer/_components/UpdateStatusModal";

export default function UnProcessedTable() {
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
            Update Status
          </button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={filteredData}
        selectable={true}
        getRowId={(row) => row.id}
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

const mockData = [
  {
    id: "PX-1001",
    additionalNote: "Customer not available",
    destination: "Banani, Dhaka",
    zone: "Dhaka North",
    merchant: {
      name: "FashionHub",
      phone: "01711-223344",
    },
    area: "Banani DOHS",
    status: "Delivered",
    collectableAmount: 1250,
    deliveryCharge: 60,
    codCharge: 25,
    weightCharge: 20,
    attempt: 1,
    age: "2 days",
  },

  {
    id: "PX-1002",
    additionalNote: "Address mismatch",
    destination: "Mirpur 10, Dhaka",
    zone: "Dhaka West",
    merchant: {
      name: "TechLine",
      phone: "01822-556677",
    },
    area: "Mirpur DOHS",
    status: "Returned",
    collectableAmount: 2990,
    deliveryCharge: 80,
    codCharge: 30,
    weightCharge: 25,
    attempt: 2,
    age: "5 days",
  },

  {
    id: "PX-1003",
    additionalNote: "Receiver requested delay",
    destination: "Uttara Sector 11",
    zone: "Dhaka North",
    merchant: {
      name: "GadgetStore",
      phone: "01933-778899",
    },
    area: "Uttara Sector 11",
    status: "Delivered",
    collectableAmount: 4500,
    deliveryCharge: 100,
    codCharge: 45,
    weightCharge: 30,
    attempt: 1,
    age: "1 day",
  },
];
