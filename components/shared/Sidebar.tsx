"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  TruckIcon,
  ArrowLeftRight,
  UserCheck,
  MapPin,
  FileText,
  BarChart3,
  History,
  BoxIcon,
  ChevronDown,
  X,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Package,
    label: "Parcel Management",
    href: "/parcel-management",
    children: [
      { label: "Receive Parcel", href: "/parcel-management/receive" },
      { label: "Assign Rider", href: "/parcel-management/assign" },
      { label: "Reverse Entry", href: "/parcel-management/reverse" },
      { label: "Pickup Request", href: "/parcel-management/pickup-request" },
      { label: "HUB Transfer", href: "/parcel-management/hub-transfer" },
      { label: "HUB Receive", href: "/parcel-management/hub-receive" },
      { label: "Third Party", href: "/parcel-management/thrid-party" },
      { label: "Parcel Reports", href: "/parcel-management/parcel-reports" },
      { label: "All Parcel", href: "/parcel-management/all-parcel" },
    ],
  },
  {
    icon: MapPin,
    label: "Pickup Request",
    href: "/pickup-request",
  },
  {
    icon: TruckIcon,
    label: "Hub Transfer",
    href: "/hub-transfer",
  },
  {
    icon: UserCheck,
    label: "Hub Receive",
    href: "/hub-receive",
  },
  {
    icon: ArrowLeftRight,
    label: "Third Party",
    href: "/third-party",
  },
  {
    icon: FileText,
    label: "Parcel Reports",
    href: "/reports",
  },
  {
    icon: BarChart3,
    label: "Parcel History",
    href: "/history",
  },
  {
    icon: BoxIcon,
    label: "All Parcel",
    href: "/all-parcel",
  },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isChildActive = (children?: { href: string }[]) =>
    children?.some((child) => pathname === child.href);

  return (
    <>
      {
        // overlay for mobile
        open && (
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )
      }
      <aside
        className={`fixed left-0 top-18 h-[calc(100vh-4rem)] w-72 bg-white border-r border-gray-200 overflow-y-auto z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <nav className="p-2 space-y-1">
        
      
          {/* menu items */}
          {menuItems.map((item) => {
            const isExpanded = expandedItems.includes(item.href);
            const hasActiveChild = isChildActive(item.children);

            return (
              <div key={item.href} className="">
                {/* Main Menu Item */}
                {item.children ? (
                  <button
                    onClick={() => toggleExpand(item.href)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors border border-gray-300  ${
                      hasActiveChild
                        ? "bg-orange-50 text-orange-600 "
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors border border-gray-300  ${
                      isActive(item.href)
                        ? "bg-orange-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )}

                {/* Submenu Items */}
                {item.children && isExpanded && (
                  <div className="ml-8 mt-1 space-y-1 ">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-4 py-2 text-sm rounded-lg transition-colors border border-gray-300 ${
                          isActive(child.href)
                            ? "bg-orange-100 text-orange-600 font-medium"
                            : "text-gray-600 hover:text-orange-600 hover:bg-gray-50"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
