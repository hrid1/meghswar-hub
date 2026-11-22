'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Menu, User, LogOut, ChevronDown } from 'lucide-react';
import { useGetCurrentUserQuery } from '@/redux/features/auth/authApi';
import { useGetMyHubQuery } from '@/redux/features/hubs/hubsApi';
import { useAppDispatch } from '@/redux/store/hook';
import { logOut } from '@/redux/features/auth/authSlice';
import { toast } from 'sonner';

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
  const dispatch = useAppDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: currentUser, isLoading } = useGetCurrentUserQuery();

  const displayName = currentUser?.full_name || "User";
  const displayRole = currentUser?.role
    ? currentUser.role.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
    : "Administrator";
  const avatarText = displayName.charAt(0).toUpperCase();

  const { data: hubData } = useGetMyHubQuery();
  const branchName = hubData?.data?.hub?.branch_name || "";

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logOut());
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

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
             <h1 className="font-bold text-lg text-gray-800 leading-none">
               {branchName ? `${branchName} Hub Panel` : "Hub Panel"}
             </h1>
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
        
        {/* User profile with dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-3 cursor-pointer p-1.5 hover:bg-gray-50 rounded-xl transition-colors focus:outline-none"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-gray-700 leading-none">
                {isLoading ? "Loading..." : displayName}
              </p>
              <p className="text-xs text-gray-500 mt-1">{displayRole}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-tr from-gray-700 to-gray-900 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform active:scale-95">
              {currentUser ? (
                <span className="text-sm font-semibold">{avatarText}</span>
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 hidden sm:block ${
                dropdownOpen ? "rotate-180 text-gray-600" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-100">
              {/* User Overview */}
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {displayName}
                </p>
                {currentUser?.email && (
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {currentUser.email}
                  </p>
                )}
                {currentUser?.phone && !currentUser?.email && (
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {currentUser.phone}
                  </p>
                )}
                <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-medium rounded-full bg-orange-50 text-orange-600 border border-orange-100">
                  {displayRole}
                </span>
              </div>

              {/* Logout Action */}
              <div className="p-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors text-left group"
                >
                  <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}