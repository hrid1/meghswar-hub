"use client";
import React from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Store, 
  Bike, 
  User, 
  Phone, 
  MapPin, 
  Package, 
  MessageCircle, 
  Mail 
} from 'lucide-react';
import { useGetParcelByIdQuery } from '@/redux/features/parcels/parcelsApi';

const fakeParcelResponse = {
  "success": true,
  "data": {
    "parcel_id": "#139679",
    "tracking_number": "TRK123",
    "merchant_info": {
      "merchant_name": "Mir Abdur Chowdhury",
      "store_name": "Chowdhury Electronics",
      "phone": "+88 01712 456 678",
      "address": "Shop 15, Electronic Market, Sector 18, Uttara"
    },
    "assigned_rider": {
      "rider_name": "Toufiq Hossain",
      "vehicle_type": "Motorcycle",
      "phone": "+88 01712 456 678",
      "license_plate": "DHA - METRO - HA 45 - 2307"
    },
    "customer_info": {
      "customer_name": "Priya Ahmed",
      "phone_number": "+88 01712 456 678",
      "customer_address": "Flat 302, Sunrise Apartment, Sector 03, Uttara, Dhaka - 1205",
      "alternate_phone": "+88 01814 405 605"
    },
    "financial_summary": {
      "cod_amount": 1250,
      "delivery_charge": 80,
      "discount": 0,
      "total_payable": 1170
    },
    "parcel_details": {
      "parcel_weight": 1.2,
      "parcel_type_label": "Accessories"
    },
    "tracking_history": [
      { date: "19 Aug", time: "2:00 PM", status: "Parcel Delivered", completed: true },
      { date: "19 Aug", time: "10:00 AM", status: "Parcel In Transit For Delivery", completed: false },
      { date: "18 Aug", time: "10:00 PM", status: "Processing For Delivery", completed: false },
      { date: "18 Aug", time: "04:00 PM", status: "Parcel Reached In Delivery HUB", completed: false },
    ]
  }
};

export default function ParcelDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const parcelData = fakeParcelResponse.data;

  const { data: parcelData2 } = useGetParcelByIdQuery(id as string);

  console.log(parcelData2);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-[#2D3436]">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-sm text-gray-500 font-medium">Dashboard &gt;  Parcel Details :</h1>
          <h2 className="text-2xl font-bold mt-1">Parcel ID</h2>
          <span className="text-orange-500 text-2xl font-bold">{id}</span>
        </div>
        <button onClick={() => router.back()} className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white hover:bg-gray-50 transition">
          <ArrowLeft size={18} /> Back to List
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Merchant Info */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Store size={24} />
            </div>
            <h3 className="text-xl font-bold">Merchant Info</h3>
          </div>
          <div className="space-y-4 text-sm">
            <div><p className="text-gray-400">Merchant Name</p><p className="font-semibold text-base">{parcelData.merchant_info.merchant_name}</p></div>
            <div><p className="text-gray-400">Store Name</p><p className="font-semibold text-base">{parcelData.merchant_info.store_name}</p></div>
            <div><p className="text-gray-400">Phone</p><p className="font-semibold text-base">{parcelData.merchant_info.phone}</p></div>
            <div><p className="text-gray-400">Store Address</p><p className="font-semibold text-base leading-relaxed">{parcelData.merchant_info.address}</p></div>
          </div>
          <div className="flex gap-2 mt-8">
            <button className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <Phone size={18} /> Call Merchant
            </button>
            <button className="p-3 bg-green-500 text-white rounded-full"><MessageCircle size={20}/></button>
          </div>
        </div>

        {/* Assigned Rider */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <Bike size={24} />
            </div>
            <h3 className="text-xl font-bold">Assigned Rider</h3>
          </div>
          <div className="space-y-4 text-sm">
            <div><p className="text-gray-400">Rider Name</p><p className="font-semibold text-base">{parcelData.assigned_rider.rider_name}</p></div>
            <div><p className="text-gray-400">Vehicle Type</p><p className="font-semibold text-base">{parcelData.assigned_rider.vehicle_type}</p></div>
            <div><p className="text-gray-400">Phone</p><p className="font-semibold text-base">{parcelData.assigned_rider.phone}</p></div>
            <div><p className="text-gray-400">License Plate</p><p className="font-semibold text-base">{parcelData.assigned_rider.license_plate}</p></div>
          </div>
          <div className="flex gap-2 mt-8">
            <button className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <Phone size={18} /> Call Rider
            </button>
            <button className="p-3 bg-green-500 text-white rounded-full"><MessageCircle size={20}/></button>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <User size={24} />
            </div>
            <h3 className="text-xl font-bold">Customer Info</h3>
          </div>
          <div className="space-y-4 text-sm">
            <div><p className="text-gray-400">Customer Name</p><p className="font-semibold text-base">{parcelData.customer_info.customer_name}</p></div>
            <div><p className="text-gray-400">Phone</p><p className="font-semibold text-base">{parcelData.customer_info.phone_number}</p></div>
            <div><p className="text-gray-400">Delivery Address</p><p className="font-semibold text-base leading-relaxed">{parcelData.customer_info.customer_address}</p></div>
            <div><p className="text-gray-400">Alternate Phone</p><p className="font-semibold text-base">{parcelData.customer_info.alternate_phone}</p></div>
          </div>
          <div className="flex gap-2 mt-8">
            <button className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <Phone size={18} /> Call Customer
            </button>
            <button className="p-3 bg-green-500 text-white rounded-full"><Mail size={20}/></button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Tracking History */}
        <div className="md:col-span-2 bg-white p-8 rounded-2xl border shadow-sm">
           <h3 className="text-xl font-bold text-center mb-10">Tracking History</h3>
           <div className="space-y-6 max-w-md mx-auto">
             {parcelData.tracking_history.map((item, idx) => (
               <div key={idx} className="flex items-start gap-4">
                 <div className="text-right w-24 pt-1">
                   <p className="text-sm font-bold">{item.date}</p>
                   <p className="text-xs text-gray-400">{item.time}</p>
                 </div>
                 <div className="flex flex-col items-center">
                   <div className={`w-4 h-4 rounded-full border-2 ${item.completed ? 'bg-orange-500 border-orange-500' : 'bg-gray-300 border-gray-300'}`}></div>
                   {idx !== parcelData.tracking_history.length - 1 && <div className="w-[2px] h-12 bg-gray-200"></div>}
                 </div>
                 <p className={`text-sm pt-0.5 ${item.completed ? 'font-bold' : 'text-gray-500'}`}>{item.status}</p>
               </div>
             ))}
           </div>
        </div>

        {/* Package Info & Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                <Package size={24} />
              </div>
              <h3 className="text-xl font-bold">Package Information</h3>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold mb-4">Financial Summary</h4>
              <div className="space-y-3 text-sm border-b pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">COD Amount :</span>
                  <span className="font-bold">৳ {parcelData.financial_summary.cod_amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Charge :</span>
                  <span className="font-bold">-৳ {parcelData.financial_summary.delivery_charge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Discount :</span>
                  <span className="font-bold text-green-500">৳ {parcelData.financial_summary.discount}</span>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <span className="font-bold">Total Payable :</span>
                <span className="font-bold text-lg text-orange-500">৳ {parcelData.financial_summary.total_payable}</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Parcel Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Parcel Weight</p>
                  <p className="font-bold text-orange-500">{parcelData.parcel_details.parcel_weight} kg</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Parcel Type</p>
                  <p className="font-bold">{parcelData.parcel_details.parcel_type_label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}