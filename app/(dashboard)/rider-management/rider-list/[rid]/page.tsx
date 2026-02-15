"use client";

import React, { useEffect, useState } from "react";
import { Package, RotateCcw, Wallet } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useGetRiderByIdQuery } from "@/redux/features/rider/riderApi";
import { getReadUrl } from "@/lib/upload";


export default function RiderDetailsPage() {
  const params = useParams();
  const router = useRouter();

  // ⚠️ Change to params.id if your folder is [id]
  const riderID = params.rid as string;

  const { data, isLoading, isError } = useGetRiderByIdQuery(riderID);
  const rider = data?.data ;

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  // 🔥 Fetch signed read URL when rider.photo exists
  useEffect(() => {
    const loadImage = async () => {
      if (!rider?.photo) return;

      try {
        setImageLoading(true);
        const url = await getReadUrl(rider.photo);
        setImageUrl(url);
      } catch (error) {
        console.error("Failed to load image:", error);
      } finally {
        setImageLoading(false);
      }
    };

    loadImage();
  }, [rider?.photo]);

  if (isLoading) {
    return <div className="p-6">Loading rider...</div>;
  }

  if (isError || !rider) {
    return <div className="p-6 text-red-500">No Rider Found</div>;
  }

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
          <button
            onClick={() => router.back()}
            className="hover:bg-gray-100 rounded-md px-4 py-2 border"
          >
            <span className="font-semibold">Go Back</span>
          </button>
        </div>

        <div className="p-6">
          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            {imageLoading ? (
              <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse" />
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt={rider.full_name}
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}
          </div>

          {/* Rider Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              ["Rider's Name", rider.full_name],
              ["Rider's Mobile No.", rider.phone],
              ["Guardian Mobile No.", rider.guardian_mobile_no],
              ["NID Number", rider.nid_number],
              ["Vehicle Type", rider.bike_type],
              ["License No.", rider.license_no],
              ["Present Address", rider.present_address],
              ["Permanent Address", rider.permanent_address],
              ["Email", rider.email],
              ["Hub Branch", rider.hub?.branch_name],
              [
                "Created At",
                new Date(rider.created_at).toLocaleString(),
              ],
            ].map(([label, value], idx) => (
              <div key={idx}>
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                <p className="font-medium text-gray-800">{value || "-"}</p>
              </div>
            ))}
          </div>

          {/* Salary Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <Wallet className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-orange-600">
                ৳ {Number(rider.fixed_salary).toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">Fixed Salary</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Wallet className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-blue-600">
                ৳ {Number(rider.commission_per_delivery).toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">
                Commission Per Delivery
              </p>
            </div>
          </div>

          {/* Placeholder Stats (Until backend provides real fields) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-green-600">0</p>
              <p className="text-sm text-green-700">Delivery Completed</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <RotateCcw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-purple-600">0</p>
              <p className="text-sm text-purple-700">Delivery Returned</p>
            </div>
          </div>

          {/* Documents Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Documents
            </h2>

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Rider's NID Documents
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {placeholderBox("NID Front Side")}
                {placeholderBox("NID Back Side")}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                Driving License Documents
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {placeholderBox("License Front Side")}
                {placeholderBox("License Back Side")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
