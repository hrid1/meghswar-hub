"use client";

import React, { useState, useMemo } from "react";

import { Search, Printer, ChevronDown } from "lucide-react";
import DataTable3 from "@/components/reusable/DataTable3";

export default function ParcelTable() {
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  const parcels = [
    {
      id: "#139679",
      merchant: "Booklet Design BD",
      merchantInvoice: "#INVC-1345",
      additionalNote:
        "Please handle with care. Fragile item inside. Keep upright and avoid pressure or heat exposure.",
      customer: "Farzana Rahman",
      phone: "+8801245678900",
      address: "Flat#142, Safwan Road, Block#81, Bashundhara R/A, Dhaka-1229",
      zone: "Zone 01: Dhanmondi",
      collectableAmount: 1187,
      deliveryCharge: 25,
      codCharge: 12,
      weightCharge: 50,
      weight: 0.5,
      delivery: 125,
      totalWeight: "1K",
    },
    {
      id: "#139680",
      merchant: "Fashion Hub",
      merchantInvoice: "#INVC-1346",
      additionalNote: "Handle with care",
      customer: "Mehedi Hassan",
      phone: "+8801712345678",
      address: "House#45, Road#12, Mirpur DOHS, Dhaka-1216",
      zone: "Zone 02: Mirpur",
      collectableAmount: 2450,
      deliveryCharge: 30,
      codCharge: 15,
      weightCharge: 60,
      weight: 1.2,
      delivery: 150,
      totalWeight: "2K",
    },
  ];

  /* ------------------------------- Filtering -------------------------------- */
  const filteredData = useMemo(() => {
    return parcels.filter((p) =>
      Object.values(p).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [parcels, search]);

  /* ------------------------------ Select Rows ------------------------------- */
  const toggleRow = (idx: number) => {
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === filteredData.length) setSelected([]);
    else setSelected(filteredData.map((_, i) => i));
  };

  /* ------------------------------ Summary Totals ----------------------------- */
  const summary = useMemo(() => {
    const rows = selected.map((i) => filteredData[i]);

    return {
      totalCollectable: rows.reduce((s, p) => s + p.collectableAmount, 0),
      totalCOD: rows.reduce((s, p) => s + p.codCharge, 0),
      totalDeliveryCharge: rows.reduce((s, p) => s + p.deliveryCharge, 0),
      totalWeight: rows.reduce((s, p) => s + p.weight, 0),
    };
  }, [selected, filteredData]);

  /* ------------------------------- API Calls -------------------------------- */
  const receiveParcels = async () => {
    await new Promise((res) => setTimeout(res, 800)); // mock API
    alert(`Received ${selected.length} parcels`);
  };

  /* -------------------------------- Columns -------------------------------- */
  const columns = [
    { key: "id", title: "Parcel ID", width: "120px" },
    { key: "merchant", title: "Merchant", width: "180px" },
    { key: "merchantInvoice", title: "Invoice", width: "140px" },
    {
      key: "additionalNote",
      title: "Additional Note",
      width: "220px",
      render: (row: any) => (
        <span className="text-sm text-gray-600">{row.additionalNote}</span>
      ),
    },
    {
      key: "customer",
      title: "Customer",
      width: "160px",
      render: (row: any) => (
        <div className="text-sm">
          <div className="font-semibold">{row.customer}</div>
          <div className="text-gray-600">{row.phone}</div>
          <div className="text-gray-500 text-xs mt-1">{row.address}</div>
        </div>
      ),
    },
    {
      key: "amount",
      title: "Amount",
      width: "140px",
      render: (row: any) => (
        <div>
          <div className="text-green-600 font-bold text-lg">
            ৳{row.collectableAmount.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            <div>Delivery Charge: ৳{row.deliveryCharge}</div>
            <div>COD Charge: ৳{row.codCharge}</div>
            <div>Weight Charge: ৳{row.weightCharge}</div>
          </div>
        </div>
      ),
    },
    { key: "weight", title: "Weight (kg)", width: "40px" },
    {
      key: "delivery",
      title: "Delivery",
      width: "120px",
      render: (row: any) => (
        <div className="border rounded-md w-20 px-1 py-0.5 font-medium">
          {row.delivery} <span className="ml-2">tk</span>
        </div>
      ),
    },
    {
      key: "action",
      title: "Action",
      width: "130px",
      render: () => (
        <button className="bg-orange-100 text-orange-600 px-3 py-2 rounded-lg">
          <Printer className="w-4 h-4 inline-block  " />{" "}
          <span className="text-black font-medium text-sm ml-2">Print</span>
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6 container mx-auto ">
      {/* Page Header */}
      <h1 className="text-2xl font-bold">Receive Parcel</h1>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-3 border w-full rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-orange-100 px-4 py-3 rounded-lg">
          <div className="font-bold text-orange-600 text-xl">
            {selected.length}
          </div>
          <div className="text-sm">Selected</div>
        </div>

        <div className="bg-green-600 px-4 py-3 rounded-lg text-white">
          <div className="font-bold text-xl">৳{summary.totalCollectable}</div>
          <div className="text-sm">Total Amount</div>
        </div>

        <div className="bg-pink-600 rounded-lg p-4 text-center text-white">
          <div className="text-2xl font-bold mb-1">
            ৳{summary.totalCOD.toLocaleString()}
          </div>
          <div className="text-sm font-medium">Total COD Amount</div>
        </div>

        <div className="bg-purple-600 px-4 py-3 rounded-lg text-white">
          <div className="font-bold text-xl">
            ৳{summary.totalDeliveryCharge}
          </div>
          <div className="text-sm">Delivery Charge</div>
        </div>

        <div className="bg-blue-600 px-4 py-3 rounded-lg text-white">
          <div className="font-bold text-xl">{summary.totalWeight} kg</div>
          <div className="text-sm">Weight</div>
        </div>
      </div>

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
              {selected.length} Parcel Selected
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <button
            disabled={selected.length === 0}
            onClick={receiveParcels}
            className={`px-6 py-2 rounded-lg font-medium ${
              selected.length === 0
                ? "bg-gray-300 text-gray-500"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Receive
          </button>

          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2">
            <Printer className="w-5 h-5" />
            Print / Bulk Print
          </button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable3
        columns={columns}
        data={filteredData}
        selectedRows={selected}
        onSelectRow={toggleRow}
        onSelectAll={toggleSelectAll}
      />
    </div>
  );
}
