import {
  ArrowBigLeft,
  ArrowBigRight,
  ArrowRight,
  ArrowUpRightFromSquare,
} from "lucide-react";
import React from "react";

export default function PendingActions() {
  return (
    <div className="border p-4  border-gray-200 rounded-lg w-full h-full">
      <h3 className="text-xl font-bold mb-4">Pending Actions</h3>
      <div className=" space-y-4">
        <SingleActions descriptions="Verify OTP for Parcel #139574 for Completing Delivery orem this is just test hello world , now time check out" />
        <SingleActions descriptions="Verify OTP for Parcel #139574 for Completing Delivery" />
        <SingleActions descriptions="Verify OTP for Parcel #139574 for Completing Delivery" />
        <SingleActions descriptions="Verify OTP for Parcel #139574 for Completing Delivery" />
      </div>
    </div>
  );
}

const SingleActions = ({ color, descriptions }: any) => {
  return (
    <div className="border border-red-200 bg-red-50 flex items-center justify-between p-4 rounded-2xl">
      <div className="flex  justify-between w-full">
        <p className="flex gap-2 items-center">
          <span className="w-4 h-4 bg-red-400 rounded-full block" />
          <span>{descriptions}</span>
        </p>

        <ArrowRight />
      </div>
    </div>
  );
};
