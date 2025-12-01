'use client';

import { Header } from '@/components/shared/Header';
import { Sidebar } from '@/components/shared/Sidebar';
import { ReactNode, useState } from 'react';


interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header
        sidebarOpen={sidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        setSidebarOpen={setSidebarOpen}
      />

      <Sidebar
        open={sidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onClose={() => setSidebarOpen(false)}
      />

      <main 
        className={`
          pt-15 px-6 pb-10
          transition-all duration-300 ease-in-out
          ${collapsed ? "md:ml-20" : "md:ml-60"}
        `}
      >
        {children}
      </main>
    </div>
  );
}