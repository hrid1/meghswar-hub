"use client";

import React, { useState, useMemo } from "react";

import { Search, Printer, ChevronDown, Copy } from "lucide-react";
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
      deliveryArea: "Dhaka, Uttara , Dia bari",
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
      deliveryArea: "Dhaka, Mirpur , Pallabi",
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
    {
      key: "id",
      title: "ID",
      width: "130px",
      render: (row: any) => (
        <p className="">
          <p className="text-nowrap flex items-center">
            PID:{row.id}{" "}
            <span>
              <Copy className="w-3 ml-1" />
            </span>
          </p>
          <p className="text-nowrap flex items-center">
            MID:{row.merchantInvoice}
            <span>
              <Copy className="w-3 ml-1" />
            </span>
          </p>
        </p>
      ),
    },
    {
      key: "merchant",
      title: "Merchant",
      width: "150px",
      render: (row: any) => <p className="text-nowrap">{row.merchant}</p>,
    },

    {
      key: "additionalNote",
      title: "Additional Note",
      width: "160px",
      wrap: true,
      render: (row: any) => {
        const note = row.additionalNote || "";
        const shortNote = note.length > 50 ? note.slice(0, 50) + "..." : note;

        return (
          <div className="relative group">
            <p className="text-sm text-gray-600 break-words border cursor-help">
              {shortNote}
            </p>

            {/* Tooltip */}
            <div className="absolute z-20 hidden max-w-full rounded bg-orange-400 text-white px-2 py-1 text-xs  group-hover:block -top-1 left-0 ml-2 ">
              {note}
            </div>
          </div>
        );
      },
    },
    {
      key: "customer",
      title: "Customer Info",
      width: "200px",
      wrap: true,
      render: (row: any) => {
        const address: string = row.address || "";

        // what you show in the cell
        const shortAddress =
          address.length > 30 ? address.slice(0, 30) + "..." : address;

        // what you show in the tooltip
        const tooltipAddress =
          address.length > 100 ? address.slice(0, 100) + "..." : address;

        return (
          <div className="text-sm break-words border">
            <div className="font-semibold">{row.customer}</div>
            <div className="text-gray-600">{row.phone}</div>

            {/* Address with custom tooltip */}
            <div className="relative group mt-1">
              {/* CELL: sliced manually */}
              <div className="text-gray-500 text-xs cursor-pointer">
                {shortAddress}
              </div>

              {/* TOOLTIP: also sliced manually, single line */}
              <div className="absolute left-0 bottom-full mt-1 z-20 hidden group-hover:flex">
                <div className="rounded-md bg-orange-400 px-2 py-1 text-[11px] leading-snug text-white shadow-lg whitespace-nowrap">
                  {tooltipAddress}
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
    { key: "deliveryArea", title: "Delivery Area", width: "120px" },
    {
      key: "amount",
      title: "Amount",
      width: "120px",
      render: (row: any) => (
        <div className="break-words w-30">
          <div className="text-green-600 font-bold text-lg ">
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
    {
      key: "weight",
      title: "Weight",
      width: "70px",
      render: (row: any) => (
        <div className=" w-12 pl-2">{row.weight}</div>
      ),
    },
    {
      key: "delivery",
      title: "Delivery",
      width: "80px",
      render: (row: any) => (
        <div className="rounded-md w-fit px-2 py-1 font-medium">
          {row.delivery} <span className="ml-[2px]">tk</span>
        </div>
      ),
    },
    {
      key: "action",
      title: "Action",
      width: "80px",
      render: () => (
        <button className="bg-orange-100 text-orange-600 px-3 py-2 rounded-md">
          <Printer className="w-3 h-3 inline-block" />{" "}
          <span className="text-black font-medium text-sm ">Print</span>
        </button>
      ),
    },
  ];

  return (
    <div className="">
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
