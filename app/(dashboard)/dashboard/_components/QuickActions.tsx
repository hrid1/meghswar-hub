import { ParkingCircle } from "lucide-react";
import React from "react";

export default function QuickActions() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-5 h-full ">
        <ActionCard
          icon={<ParkingCircle />}
          title="Assign Riders"
          color="text-blue-500 bg-blue-50"
        />
        <ActionCard
          icon={<ParkingCircle />}
          title="Assign Riders"
          color="text-green-500 bg-green-50"
        />
        <ActionCard
          icon={<ParkingCircle />}
          title="Assign Riders"
          color="text-red-500 bg-red-50"
        />
        <ActionCard
          icon={<ParkingCircle />}
          title="Assign Riders"
          color="text-yellow-500 bg-yellow-50"
        />
        <ActionCard
          icon={<ParkingCircle />}
          title="Assign Riders"
          color="text-purple-500 bg-purple-50"
        />
        <ActionCard
          icon={<ParkingCircle />}
          title="Assign Riders"
          color="text-orange-500 bg-orange-50"
        />
      </div>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  color,
}: {
  icon: any;
  title: string;
  color: string;
}) {
  //   const colorClass = getColor(color);

  console.log("colorClass", color);
  return (
    <div
      className={` border-gray-100 rounded-lg p-5 h-full border flex flex-col gap-3 items-center justify-center ${color}`}
    >
      <span className="w-7 h-7">{icon}</span>
      <p className="text-sm font-semibold text-center text-nowrap">{title}</p>
    </div>
  );
}
