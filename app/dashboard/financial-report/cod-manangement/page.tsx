"use client";

import { useEffect, useState } from "react";
import ReturnParcelTable from "./_components/ReturnParcelTable";

type Rider = {
  id: number;
  name: string;
  license: string;
  phone: string;
  bike: string;
  photo: string;
  totalCollected: number;
  completedDelivery: number;
};

// 🚀 Fake API (replace with real one easily)
async function fetchRiders(): Promise<Rider[]> {
  return [
    {
      id: 1,
      name: "Ahmed Wasi",
      license: "DH-38439",
      phone: "+8801234567890",
      bike: "Motor Bike",
      photo: "https://i.pravatar.cc/150?img=12",
      totalCollected: 24519,
      completedDelivery: 35,
    },
    {
      id: 2,
      name: "Hrid Wasi",
      license: "DH-38449",
      phone: "+8801234567890",
      bike: "Cycle",
      photo: "https://i.pravatar.cc/150?img=14",
      totalCollected: 18000,
      completedDelivery: 22,
    },
  ];
}

export default function CODPage() {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [countAmount, setCountAmount] = useState("");

  const discrepancy =
    selectedRider && countAmount
      ? selectedRider.totalCollected - Number(countAmount)
      : 0;

  // 🎯 Fetch Riders from API
  useEffect(() => {
    async function load() {
      const data = await fetchRiders();
      setRiders(data);
      setSelectedRider(data[0]); // auto-select first rider
    }
    load();
  }, []);

  // 🎯 When dropdown changes
  const handleSelectRider = (id: number) => {
    const found = riders.find((r) => r.id === id) || null;
    setSelectedRider(found);
    setCountAmount(""); // reset input
  };

  return (
    <div className="w-full p-6 space-y-5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold">
        COD Management & Cash Collection
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Rider Selection */}
        <div className="bg-white p-5 rounded-xl shadow">
          <label className="font-medium">
            Select a Rider to Begin Cash & Parcel Collection
          </label>

          <select
            className="w-full mt-2 p-3 border rounded-lg"
            onChange={(e) => handleSelectRider(Number(e.target.value))}
          >
            {riders.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Rider Info */}
        {selectedRider && (
          <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={selectedRider.photo}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-lg">{selectedRider.name}</p>
                <p className="text-sm text-gray-500">
                  Rider's Bike Type: {selectedRider.bike}
                </p>
              </div>
            </div>

            <div className="text-right text-sm text-gray-600">
              <p>Rider's License: {selectedRider.license}</p>
              <p>Mobile: {selectedRider.phone}</p>
            </div>
          </div>
        )}
      </div>

      <section className="grid grid-cols-4 gap-5">
        <div className="grid grid-cols-1 gap-5">
          {/* Total Collected */}
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-600 font-medium">Total Collected Amount</p>
            <h2 className="text-4xl font-bold text-orange-500">
              ৳ {selectedRider?.totalCollected.toLocaleString()}
            </h2>
          </div>

          {/* Completed Delivery */}
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-600 font-medium">Completed Delivery</p>
            <h2 className="text-4xl font-bold text-green-600">
              {selectedRider?.completedDelivery}
            </h2>
          </div>

          {/* Cash Receive */}
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="font-medium text-gray-600">Receive Cash From Rider</p>
            <label className="text-sm text-gray-600">Counted Amount</label>

            <input
              type="number"
              value={countAmount}
              onChange={(e) => setCountAmount(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Enter Amount"
            />

            <p className="mt-3 text-sm text-gray-600">Discrepancy</p>
            <div className="w-full p-2 bg-gray-100 rounded-lg">
              ৳ {discrepancy}
            </div>
          </div>

          <button className="bg-orange-500 text-white w-full p-3 rounded-xl text-lg font-semibold hover:bg-orange-600">
            Confirm & Complete
          </button>
        </div>

        {/* Returned Parcel Table */}
        <div className=" col-span-3 bg-white p-6 rounded-xl shadow min-h-[300px]">
          <p className="font-semibold text-lg mb-4">
            Returned Parcels to Collect
          </p>
          
          {/* table */}
          <ReturnParcelTable/>
        </div>
      </section>
    </div>
  );
}
