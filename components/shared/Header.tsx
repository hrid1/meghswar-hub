"use client";

import { Bell, Menu, User, X } from "lucide-react";

export default function Header({
  sidebarOpen,
  onMenuClick,
}: {
  sidebarOpen: boolean;
  onMenuClick: () => void;
}) {
  console.log("SI", sidebarOpen);
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
       
       <div className="flex items-center justify-between">
         <div className="flex items-center space-x-3  w-64">
          {/* hamburger for mobile */}
          <button onClick={onMenuClick} className="cursor-pointer md:hidden">
            {sidebarOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="md:hidden  rounded-lg hover:bg-gray-100 text-black" />
            )}
          </button>
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-xl font-bold text-gray-800">Meghswor</span>
        </div>

        <div className="ml-2">
          <h2 className="w-[115px] h-[33px] font-poppins not-italic font-bold text-[22px] leading-[33px] text-[#000000]">Hub Panel</h2>
          <p className="w-[289px] h-[27px]  font-poppins not-italic font-normal text-[18px] leading-[27px] text-[#B4B4B4]">Parcel Management Dashboard</p>
        </div>


       </div>

        {/* Right Section - Notifications & User */}
        <div className="flex items-center space-x-4 ">
          {/* Notification Bell */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
