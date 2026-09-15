"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Store,
  Bike,
  User,
  Phone,
  Package,
  MessageCircle,
  Mail,
  Pencil,
} from "lucide-react";
import { useGetParcelByIdQuery } from "@/redux/features/parcels/parcelsApi";
import { txt } from "@/lib/utils";
import EditParcelModal from "../_components/EditParcelModal";

const money = (value?: number | null) =>
  `৳ ${(Number(value) || 0).toLocaleString()}`;

const formatStatus = (status?: string | null) => {
  if (!status) return "N/A";
  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const display = (value?: string | number | null, fallback = "N/A") =>
  txt(value, fallback) || fallback;

export default function ParcelDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [openEditModal, setOpenEditModal] = useState(false);
  const { data, isLoading, isError, error } = useGetParcelByIdQuery(id, {
    skip: !id,
  });

  const parcel = data?.data;
  const merchant = parcel?.merchant_info;
  const rider = parcel?.assigned_rider;
  const customer = parcel?.customer_info;
  const finance = parcel?.financial_summary;
  const details = parcel?.parcel_details;
  const pack = parcel?.package_information;
  const status = parcel?.live_status_controls?.current_status;

  const riderName =
    display(rider?.rider_name) !== "N/A"
      ? display(rider?.rider_name)
      : display(rider?.full_name) !== "N/A"
        ? display(rider?.full_name)
        : display(rider?.user?.full_name);
  const riderPhone = display(rider?.phone) !== "N/A"
    ? display(rider?.phone)
    : display(rider?.user?.phone);
  const customerPhone =
    display(customer?.phone_number) !== "N/A"
      ? display(customer?.phone_number)
      : display(customer?.phone);
  const customerSecondary =
    display(customer?.secondary_number, "") ||
    display(customer?.secondary_phone, "");
  const customerAddress =
    display(customer?.customer_address) !== "N/A"
      ? display(customer?.customer_address)
      : display(customer?.address);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-r-transparent" />
          <p className="mt-2 text-gray-600">Loading parcel details...</p>
        </div>
      </div>
    );
  }

  if (isError || !parcel) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-6">
        <p className="text-red-500">
          {(error as { data?: { message?: string } })?.data?.message ||
            "Failed to load parcel details"}
        </p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 hover:bg-gray-50"
        >
          <ArrowLeft size={18} /> Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-[#2D3436]">
      <div className="mx-auto mb-8 flex max-w-7xl items-center justify-between">
        <div>
          <h1 className="text-sm font-medium text-gray-500">
            Dashboard &gt; Parcel Details
          </h1>
          <h2 className="mt-1 text-2xl font-bold">
            {display(parcel.tracking_number, display(parcel.parcel_id))}
          </h2>
          <p className="text-sm text-gray-500">
            Parcel ID: {display(parcel.parcel_id)}
          </p>
          <span className="mt-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
            {formatStatus(status)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenEditModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          >
            <Pencil size={16} /> Edit Parcel
          </button>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 transition hover:bg-gray-50"
          >
            <ArrowLeft size={18} /> Back to List
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
        <div className="relative rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Store size={24} />
            </div>
            <h3 className="text-xl font-bold">Merchant Info</h3>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-400">Merchant Name</p>
              <p className="text-base font-semibold">
                {display(merchant?.merchant_name)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Store Name</p>
              <p className="text-base font-semibold">
                {display(merchant?.store_name)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Phone</p>
              <p className="text-base font-semibold">{display(merchant?.phone)}</p>
            </div>
            <div>
              <p className="text-gray-400">Store Address</p>
              <p className="text-base leading-relaxed font-semibold">
                {display(merchant?.address)}
              </p>
            </div>
          </div>
          <div className="mt-8 flex gap-2">
            <a
              href={merchant?.phone ? `tel:${merchant.phone}` : undefined}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 py-3 font-bold text-white"
            >
              <Phone size={18} /> Call Merchant
            </a>
            <button className="rounded-full bg-green-500 p-3 text-white">
              <MessageCircle size={20} />
            </button>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
              <Bike size={24} />
            </div>
            <h3 className="text-xl font-bold">Assigned Rider</h3>
          </div>
          {rider ? (
            <>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-400">Rider Name</p>
                  <p className="text-base font-semibold">{riderName}</p>
                </div>
                <div>
                  <p className="text-gray-400">Rider Code</p>
                  <p className="text-base font-semibold">
                    {display(rider.rider_code)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Vehicle Type</p>
                  <p className="text-base font-semibold">
                    {formatStatus(rider.bike_type)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Phone</p>
                  <p className="text-base font-semibold">{riderPhone}</p>
                </div>
                <div>
                  <p className="text-gray-400">License No</p>
                  <p className="text-base font-semibold">
                    {display(rider.license_no)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className="text-base font-semibold">
                    {display(rider.rider_status)}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex gap-2">
                <a
                  href={riderPhone !== "N/A" ? `tel:${riderPhone}` : undefined}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 py-3 font-bold text-white"
                >
                  <Phone size={18} /> Call Rider
                </a>
                <button className="rounded-full bg-green-500 p-3 text-white">
                  <MessageCircle size={20} />
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-400">Not assigned</p>
          )}
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <User size={24} />
            </div>
            <h3 className="text-xl font-bold">Customer Info</h3>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-400">Customer Name</p>
              <p className="text-base font-semibold">
                {display(customer?.customer_name)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Phone</p>
              <p className="text-base font-semibold">{customerPhone}</p>
            </div>
            <div>
              <p className="text-gray-400">Delivery Address</p>
              <p className="text-base leading-relaxed font-semibold">
                {customerAddress}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Alternate Phone</p>
              <p className="text-base font-semibold">
                {customerSecondary || "N/A"}
              </p>
            </div>
          </div>
          <div className="mt-8 flex gap-2">
            <a
              href={customerPhone !== "N/A" ? `tel:${customerPhone}` : undefined}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 py-3 font-bold text-white"
            >
              <Phone size={18} /> Call Customer
            </a>
            <button className="rounded-full bg-green-500 p-3 text-white">
              <Mail size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-8 shadow-sm md:col-span-2">
          <h3 className="mb-6 text-xl font-bold">Live Status & Package</h3>
          <div className="mb-6">
            <p className="text-sm text-gray-500">Current Status</p>
            <span className="mt-1 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
              {formatStatus(status)}
            </span>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-400">Product Description</p>
              <p className="text-base font-semibold">
                {display(pack?.product_description)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Special Instructions</p>
              <p className="text-base font-semibold">
                {display(pack?.special_instructions)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Admin Notes</p>
              <p className="text-base font-semibold">
                {display(pack?.admin_notes)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                <Package size={24} />
              </div>
              <h3 className="text-xl font-bold">Package Information</h3>
            </div>

            <div className="mb-6">
              <h4 className="mb-4 font-bold">Financial Summary</h4>
              <div className="space-y-3 border-b pb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">COD Amount :</span>
                  <span className="font-bold">{money(finance?.cod_amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Charge :</span>
                  <span className="font-bold">
                    {money(finance?.delivery_charge)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Weight Charge :</span>
                  <span className="font-bold">
                    {money(finance?.weight_charge)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">COD Charge :</span>
                  <span className="font-bold">{money(finance?.cod_charge)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Discount :</span>
                  <span className="font-bold text-green-500">
                    {money(finance?.discount)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <span className="font-bold">Total Payable :</span>
                <span className="text-lg font-bold text-orange-500">
                  {money(finance?.total_payable)}
                </span>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-bold">Parcel Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-1 text-xs text-gray-400">Parcel Weight</p>
                  <p className="font-bold text-orange-500">
                    {display(details?.parcel_weight)} kg
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-400">Parcel Type</p>
                  <p className="font-bold">
                    {display(details?.parcel_type_label)}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-400">Delivery Type</p>
                  <p className="font-bold">
                    {display(details?.delivery_type_label)}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-400">Payment</p>
                  <p className="font-bold">
                    {details?.is_cod ? "COD" : "Prepaid"}
                    {details?.is_exchange ? " · Exchange" : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditParcelModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        parcel={{ ...parcel, id: parcel.parcel_id }}
      />
    </div>
  );
}
