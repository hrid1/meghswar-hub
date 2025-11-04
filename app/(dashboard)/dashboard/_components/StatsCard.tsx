import { Bike, CircleCheck, TriangleAlert, Truck } from "lucide-react";
import React from "react";

// Define color mapping
const statusColors: any = {
  orange: "bg-[#FFE9DA] text-[#FF6B35]",
  blue: "bg-[#E8F4FD] text-[#1890FF]",
  green: "bg-[#E6F4EE] text-[#52C41A]",
  red: "bg-[#FFEBEE] text-[#FF4D4F]",
  gray: "bg-[#F5F5F5] text-[#8C8C8C]",
};

export default function StatsCard() {
  return (
    <div>
      <section className=" grid grid-cols-4 gap-6">
        <ParcelCard
          number={30}
          subText="+7 in last 3 hours"
          title="Parcels to Process"
          icon={<TriangleAlert />}
          colorScheme="orange"
        />
        <ParcelCard
          number={14}
          subText="+7 in last 30 hours"
          title="Riders Active"
          icon={<Bike />}
          colorScheme="green"
        />
        <ParcelCard
          number={30}
          subText="+7 in last 3 hours"
          title="Parcels to Process"
          icon={<Truck />}
          colorScheme="blue"
        />
        <ParcelCard
          number={30}
          subText="+7 in last 3 hours"
          title="Parcels to Process"
          icon={<CircleCheck />}
          colorScheme="red"
        />
      </section>
    </div>
  );
}

const ParcelCard = ({
  number = 24,
  subText = "+3 in last hour",
  title = "Parcels to Process",
  icon,
  colorScheme,
}: {
  number: string | number;
  subText: string;
  title: string;
  icon: React.ReactNode;
  colorScheme: string;
}) => {
  const colorClass = statusColors[colorScheme] || statusColors.gray;

  return (
    <div className=" bg-white border border-gray-300 rounded-[19px] p-4 flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex items-start justify-between">
        {/* Left group */}
        <div className="flex justify-between items-center gap-4 w-full">
          {/* Number box */}
          <div
            className={`w-[59px] h-[50px]  rounded-[10px] flex items-center justify-center ${
              colorClass.split(" ")[0]
            }`}
          >
            <span className={`font-poppins font-bold text-[26px] leading-[39px] ${colorClass.split(" ")[1]}`}>
              {icon}
            </span>
          </div>

          {/* Subtext */}
          <div className="flex flex-col">
            <p className="text-2xl font-bold text-right"> {number}</p>
            <span className="font-normal text-[14px] leading-[21px] text-gray-400">
              {subText}
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className="font-semibold text-[18px] leading-[27px] text-black mt-4">
        {title}
      </h2>
    </div>
  );
};
