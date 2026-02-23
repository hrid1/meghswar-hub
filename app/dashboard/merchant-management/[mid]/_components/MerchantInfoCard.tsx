import React from "react";

interface MerchantInfoProps {
  businessName: string;
  contactName: string;
  address: string;
  phone: string;
}

function MerchantInfoCard({
  businessName,
  contactName,
  address,
  phone,
}: MerchantInfoProps) {
  return (
    <div className="w-full bg-white rounded-2xl shadow p-6 flex gap-8 items-start ">
      {/* Left Side */}
      <div className="flex gap-6 items-start w-1/2">
        {/* Profile Circle */}
        <div className="w-24 h-24 bg-gray-300 rounded-full shrink-0 " />

        {/* Merchant Details */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-gray-500 text-sm">Merchant’s Business Name</p>
            <p className="text-xl font-semibold text-orange-600">
              {businessName}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Contact Person’s Name</p>
            <p className="text-base font-semibold">{contactName}</p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col gap-4 w-1/2">
        <div>
          <p className="text-gray-500 text-sm">Address</p>
          <p className="text-base font-medium leading-relaxed">{address}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Phone</p>
          <p className="text-base font-semibold">{phone}</p>
        </div>
      </div>
    </div>
  );
}

export default function MerchantInfoCards() {
  return (
    <div>
      <MerchantInfoCard
        businessName="Booklet Design BD"
        contactName="Johir Raihan"
        address="Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka – 1229"
        phone="+8801234567890"
      />
    </div>
  );
}
