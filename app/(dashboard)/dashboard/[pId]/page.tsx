"use client";

import { Button } from "@/components/ui/button";
import { Bike, House, Phone, User } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className=" container mx-auto">
      <div className="flex items-center  gap-5">
        <h3>Dashboard</h3>
        <span>{">"}</span>
        <h3>Dashboard</h3>
      </div>

      {/* parcel datails */}
      <div className="my-3">
        <h3 className="info-title">Parcel Id</h3>
      </div>

      {/* info cards row-1*/}
      <div className="grid  grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <InfoCard
          title="Merchant Info"
          icon={<House />}
          name="Mir Abdur Chowdhury"
          store="Chowdhury Electronics"
          phone="+88 01712 456 678"
          address="Shop 15, Electronic Market, Sector 18, Uttora"
        />
        <InfoCard
          title="Assigned Rider"
          icon={<Bike />}
          name="Mir Abdur Chowdhury"
          store="Chowdhury Electronics"
          phone="+88 01712 456 678"
          address="Shop 15, Electronic Market, Sector 18, Uttora"
        />
        <InfoCard
          title="Customer Info"
          icon={<User />}
          name="Mir Abdur Chowdhury"
          store="Chowdhury Electronics"
          phone="+88 01712 456 678"
          address="Shop 15, Electronic Market, Sector 18, Uttora"
        />
      </div>

      {/* info cards row-2 */}
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-8">
        {/* card-1 */}
        <div className="border shadow p-5 rounded-2xl space-y-8">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 border rounded-full flex items-center justify-center">
              <User />
            </span>
            <h3 className="info-title">Live Status & Controls</h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Current Status</p>
            <p className="bg-blue-100 inline px-4 rounded-2xl text-xs">
              In Transit
            </p>
          </div>

          <p>Managerial Actions</p>

          <div className=" space-y-3">
            <Button className="w-full bg-orange-500 text-white h-10">
              Update Status Manually
            </Button>
            <Button className="w-full bg-white text-black border h-10">
              Reassign Rider
            </Button>
            <Button className="w-full bg-white border-[1px] border-red-600  text-red-700">
              Cancel Delivery
            </Button>
          </div>
        </div>
        {/* card-2 */}
        {/* <InfoCard
          title="HUB Details"
          icon={<House />}
          name="Mir Abdur Chowdhury"
          store="Chowdhury Electronics"
          phone="+88 01712 456 678"
          address="Shop 15, Electronic Market, Sector 18, Uttora"
        /> */}
        {/* card-3 */}
        <div className="border shadow p-5 rounded-2xl">
          <h3 className="info-title">Package Infomration</h3>
          <div className="">
            <h4 className="mb-2 text-lg font-semibold mt-4">
              Financial Summary
            </h4>
            <div className="items-center border-b pb-4 space-y-2">
              <div className="flex  justify-between">
                <p className="text-gray-600 ">
                  COD Amount <span className="ml-5">:</span>
                </p>
                <p className=" font-medium">1250</p>
              </div>
              <div className="flex  justify-between">
                <p className="text-gray-600">
                  Delivery Charge <span className="ml-5">:</span>
                </p>
                <p className=" font-medium">80</p>
              </div>
              <div className="flex  justify-between">
                <p className="text-gray-600">
                  Weight Charge <span className="ml-5">:</span>
                </p>
                <p className=" font-medium">80</p>
              </div>
              <div className="flex  justify-between">
                <p className="text-gray-600">
                  Discount <span className="ml-5">:</span>
                </p>
                <p className=" font-medium text-green-500">
                  <span>৳ 0</span>
                </p>
              </div>
            </div>
            <div className="flex  justify-between">
              <p className="text-gray-900 font-bold">
                Total Payable <span className="ml-5">:</span>
              </p>
              <p className=" font-medium ">
                <span>৳ 1128</span>
              </p>
            </div>
          </div>

          <div className=" mt-4">
            <h3 className="text-xl font-bold mb-2">Parcel Details</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-gray-600">Parcel Weight</p>
                <p className="text-xl text-orange-600 font-bold">2.5 kg</p>
              </div>
              <div>
                <p className="text-gray-600">Parcel Type</p>
                <p className="text-gray-900 text-xl font-semibold">
                  Accessoris
                </p>
              </div>
              <div>
                <p className="text-gray-600">Delivery Type</p>
                <p className="text-gray-900 text-xl font-semibold">
                  Express
                </p>
              </div>
          
            </div>
            {/* <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600">Parcel Weight</p>
                <p className="text-xl text-orange-600 font-bold">2.5 kg</p>
              </div>
              <div>
                <p className="text-gray-600">Parcel Type</p>
                <p className="text-gray-900 text-xl font-semibold">
                  Accessoris
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">Assigned HUB</p>
                <p className="font-medium">Dhanmondi HUB</p>
              </div>
              <div>
                <p className="text-xl font-semibold">HUB Manager</p>
                <p className="">+01734 234131</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoCard = ({ icon, title, name, store, phone, address }: any) => {
  return (
    <div className="border shadow p-5 rounded-2xl space-y-8">
      {/* icons and title */}
      <div className="flex items-center gap-4">
        <span className="w-12 h-12 border rounded-full flex items-center justify-center">
          {icon}
        </span>
        <h3 className="info-title">{title}</h3>
      </div>
      {/* info */}
      <div className=" space-y-2">
        <div>
          <p className="text-sm text-gray-500">Merchant Name</p>
          <h4 className="text-[19px] font-medium"> {name}</h4>
        </div>
        <div>
          <p className="text-sm text-gray-500">Store Name</p>
          <h4 className="text-[19px] font-medium"> {store}</h4>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <h4 className="text-[19px] font-medium"> {phone}</h4>
        </div>
        <div>
          <p className="text-sm text-gray-500">Address</p>
          <h4 className="text-[19px] text-lg"> {address}</h4>
        </div>
      </div>
      {/* card action */}
      <div className="flex gap-2">
        <Button className="flex-1 bg-[#3DCC30]">Call Merchant</Button>
        <Button className="bg-[#3DCC30] text-white">
          <Phone />
        </Button>
      </div>
    </div>
  );
};
