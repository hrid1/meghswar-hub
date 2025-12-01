'use client';

import { Bell, Menu, User } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  setSidebarOpen: (v: boolean) => void;
}

export function Header({
  sidebarOpen,
  collapsed,
  setCollapsed,
  setSidebarOpen,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-40 px-4 md:px-6 flex items-center justify-between shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => {
            if (window.innerWidth < 768) {
              setSidebarOpen(!sidebarOpen);
            } else {
              setCollapsed(!collapsed);
            }
          }}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 text-gray-600 focus:outline-none transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center shadow-md shadow-orange-200">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <div className="hidden md:block">
             <h1 className="font-bold text-lg text-gray-800 leading-none">Hub Panel</h1>
             <p className="text-[11px] text-gray-400 font-medium tracking-wide uppercase mt-1">Management System</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-5">
        <button className="p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
        
        <div className="flex items-center gap-3 cursor-pointer p-1.5 hover:bg-gray-50 rounded-xl transition-colors">
           <div className="hidden md:block text-right">
             <p className="text-sm font-semibold text-gray-700 leading-none">Meghswor</p>
             <p className="text-xs text-gray-500 mt-1">Administrator</p>
           </div>
           <div className="w-9 h-9 bg-gradient-to-tr from-gray-700 to-gray-900 rounded-lg flex items-center justify-center text-white shadow-sm">
              <User className="w-5 h-5" />
           </div>
        </div>
      </div>
    </header>
  );
}