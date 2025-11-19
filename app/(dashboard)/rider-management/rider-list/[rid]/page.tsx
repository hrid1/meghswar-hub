"use client"

import React from "react";
import { X, Package, RotateCcw, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RiderDetailsPage() {

  const router = useRouter();

  const riderData = {
    name: "Ahmed Wasi",
    phone: "+8801234567890",
    guardianPhone: "+8801234567890",
    nid: "DH-38439",
    vehicleType: "Motor Bike",
    vehicleNumber: "88721345",
    presentAddress: "72/5 Bashundhara Avenue, Dhaka",
    permanentAddress: "72/5 Bashundhara Avenue, Dhaka",
    email: "wasi@email.com",
    deliveryCompleted: 125,
    deliveryReturned: 25,
    salary: 1250,
    commission: 1250,
    totalCashCollected: 1250,
  };

  const placeholderBox = (text: string) => (
    <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center">
      <p className="text-gray-500">{text}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-xl font-semibold text-gray-800">
            View Rider Details
          </h1>
          <button onClick={() => router.back()} className="p-1 hover:bg-gray-100 rounded-md px-4 border ">
            <span className="text-lg font-semibold"> Go Back</span>
          </button>
        </div>

        <div className="p-6">
          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
              alt="Rider"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          {/* Rider Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              ["Rider's Name", riderData.name],
              ["Rider's Mobile No.", riderData.phone],
              ["Rider's Guardian No.", riderData.guardianPhone],
              ["Rider's NID Number", riderData.nid],
              ["Rider's Vehicle Type", riderData.vehicleType],
              ["Rider's Vehicle Number", riderData.vehicleNumber],
              ["Rider's Present Address", riderData.presentAddress],
              ["Rider's Permanent Address", riderData.permanentAddress],
              ["Rider's Email", riderData.email],
            ].map(([label, value], idx) => (
              <div key={idx}>
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                <p className="font-medium text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-green-600">
                {riderData.deliveryCompleted}
              </p>
              <p className="text-sm text-green-700">Delivery Completed</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <RotateCcw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-purple-600">
                {riderData.deliveryReturned}
              </p>
              <p className="text-sm text-purple-700">Delivery Returned</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <Wallet className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-orange-600">
                ৳ {riderData.salary.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600 mb-2">Salary</p>
              <p className="text-lg font-bold text-orange-600">
                ৳ {riderData.commission.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">Commission</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Wallet className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-blue-600">
                ৳ {riderData.totalCashCollected.toLocaleString()}
              </p>
              <p className="text-sm text-blue-700">Total Cash Collected</p>
            </div>
          </div>

          {/* Documents Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Documents
            </h2>

            {/* NID */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Rider's NID Documents
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {placeholderBox("NID Front Side")}
                {placeholderBox("NID Back Side")}
              </div>
            </div>

            {/* Driving License */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Driving License Documents
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {placeholderBox("Driving License Front Side")}
                {placeholderBox("Driving License Back Side")}
              </div>
            </div>

            {/* Payment MFS */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                Payment MFS Documents
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {placeholderBox("MFS Document Front")}
                {placeholderBox("MFS Document Back")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
