"use client";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        {/* Header - Full Width */}
        <div className="">
          <Header
            sidebarOpen={sidebarOpen}
            onMenuClick={() => setSidebarOpen((prev) => !prev)}
          />
        </div>

        {/* Sidebar & Main Content */}
        <div className="flex mt-16">
          <div className="mt-14">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 p-8 md:ml-70 transition-all duration-300 border border-red-700">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
