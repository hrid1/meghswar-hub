"use client";

import { useState } from "react";
import ReturnParcelTable from "./_components/ReturnParcelTable";
import {
  useGetCodManagementListQuery,
  useCollectedCODAmountMutation,
} from "@/redux/features/financial-report/FinancialReportApi";
import { useGetRidersQuery } from "@/redux/features/rider/riderApi";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const BIKE_LABEL: Record<string, string> = {
  MOTORCYCLE: "Motor Bike",
  BICYCLE: "Cycle",
  SCOOTER: "Scooter",
  CAR: "Car",
};

export default function CODPage() {
  const [selectedRider, setSelectedRider] = useState<any | null>(null);

  console.log("selectedRider", selectedRider);
  const [countAmount, setCountAmount] = useState("");

  const { data: ridersData } = useGetRidersQuery({
    isActive: true,
    page: 1,
    limit: 100,
  });
  const riders: any[] = ridersData?.data?.riders ?? [];
  console.log("riders", riders);

  const { data: codData, isLoading: codLoading } = useGetCodManagementListQuery(
    { riderId: selectedRider?.id ?? "" },
    { skip: !selectedRider?.id }
  );

  const [collectCod, { isLoading: isCollecting }] = useCollectedCODAmountMutation();

  const summary = codData?.data?.summary;
  const parcels = codData?.data?.parcels ?? [];
  const totalCollected = summary?.total_collectable_amount ?? 0;
  const completedDelivery = summary?.total_cleared_parcels ?? 0;

  const discrepancy =
    selectedRider && countAmount
      ? totalCollected - Number(countAmount)
      : 0;

  const handleSelectRider = (id: string) => {
    const found = riders.find((r) => r.id === id) ?? null;
    setSelectedRider(found);
    setCountAmount("");
  };

  const handleConfirmCollect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRider?.id) {
      toast.error("Please select a rider");
      return;
    }
    const amount = Number(countAmount);
    if (Number.isNaN(amount) || amount < 0) {
      toast.error("Enter a valid amount");
      return;
    }
    try {
      await collectCod({
        riderId: selectedRider.id,
        counted_amount: amount,
      }).unwrap();
      toast.success("COD collected successfully");
      setCountAmount("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to collect COD");
    }
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
            value={selectedRider?.id ?? ""}
            onChange={(e) => handleSelectRider(e.target.value)}
          >
            <option value="">Select rider</option>
            {riders.map((r: any) => (
              <option key={r.id} value={r.id}>
                {r.user.full_name}
              </option>
            ))}
          </select>
        </div>

        {/* Rider Info */}
        {selectedRider && (
          <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
            <div className="flex items-center gap-4">
              {selectedRider.photo ? (
                <img
                  src={selectedRider.photo}
                  alt={selectedRider?.full_name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-500">
                  {selectedRider?.user?.full_name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-lg">{selectedRider?.user?.full_name}</p>
                <p className="text-sm text-gray-500">
                  Rider&apos;s Bike Type: {BIKE_LABEL[selectedRider.bike_type] ?? selectedRider.bike_type}
                </p>
              </div>
            </div>

            <div className="text-right text-sm text-gray-600">
              <p>Rider&apos;s License: {selectedRider.license_no || "—"}</p>
              <p>Mobile: {selectedRider?.user?.phone}</p>
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
              ৳ {totalCollected.toLocaleString()}
            </h2>
          </div>

          {/* Completed Delivery */}
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-600 font-medium">Completed Delivery</p>
            <h2 className="text-4xl font-bold text-green-600">
              {completedDelivery}
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
          <ReturnParcelTable
            parcels={parcels}
            isLoading={codLoading}
          />
        </div>
      </section>
    </div>
  );
}
