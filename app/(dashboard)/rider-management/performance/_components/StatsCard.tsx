import { UserIcon } from "lucide-react";
import React from "react";

export default function StatsCard() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      <StatCard />
      <StatCard />
      <StatCard />
      <StatCard />
    </section>
  );
}

const StatCard = () => {
  return (
    <div className="border border-[#E3E3E3]  rounded-xl p-5 inline-flex flex-col gap-4">
      <span className="bg-green-100 rounded-lg inline-block mr-auto p-3">
        <UserIcon />
      </span>

      <div>
        <h2 className="text-3xl font-bold">89.3%</h2>
        <p className="font-medium text-gray-400">Overall Success Rate</p>
      </div>
    </div>
  );
};
