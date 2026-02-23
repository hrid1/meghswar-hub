import { Badge, BadgeCheck, HomeIcon } from "lucide-react";

export default function MerchantStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* First card */}
      <div className="border border-gray-100 rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Total Merchant</p>
          <HomeIcon />
        </div>
        <h2 className="text-3xl font-bold mt-4 text-orange-600">320</h2>
      </div>
      {/* Second card */}
      <div className="border border-gray-100 rounded-xl p-4 shadow-md">
        <div className="">
          <div>
            <div className="flex items-center justify-between w-full ">
              <p className="text-lg font-bold">Top Merchant</p>
              <BadgeCheck />
            </div>
            <h3 className="text-xl font-bold text-orange-600">
              Booklet Design BD
            </h3>
            <p className="font-semibold">Successful Parcels: 746</p>
          </div>
        </div>
      </div>

      {/* Third Card */}
      <div className="border border-gray-100 rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Total Merchant</p>
          <HomeIcon />
        </div>
     <h2 className="text-3xl font-bold mt-4 text-green-600">320</h2>
      </div>
    </div>
  );
}
