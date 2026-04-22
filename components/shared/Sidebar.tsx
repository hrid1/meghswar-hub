"use client";

import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  TruckIcon,
  MapPin,
  User,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useAppDispatch } from "@/redux/store/hook";
import { logOut } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

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
      { label: "All Parcel", href: "/dashboard/parcel-management/all-parcel" },
      { label: "Receive Parcel", href: "/dashboard/parcel-management/receive" },
      { label: "Assign Rider", href: "/dashboard/parcel-management/assign-rider" },
      { label: "Unprocessed", href: "/dashboard/parcel-management/unprocessed" },
      { label: "Processed", href: "/dashboard/parcel-management/processed" },
      { label: "Pickup Request", href: "/dashboard/parcel-management/pickup-request" },
      { label: "Hub Transfer", href: "/dashboard/parcel-management/hub-transfer" },
      { label: "Hub Receive", href: "/dashboard/parcel-management/hub-receive" },
      { label: "Third Party", href: "/dashboard/parcel-management/third-party" },
      { label: "Parcel Report", href: "/dashboard/parcel-management/parcel-reports" },
      { label: "Parcel History", href: "/dashboard/parcel-management/parcel-history" },
    ],
  },
  {
    icon: User,
    label: "Rider Management",
    href: "/dashboard/rider-management",
    children: [
      { label: "Rider List", href: "/dashboard/rider-management/rider-list" },
      // { label: "Rider Status", href: "/dashboard/rider-management/rider-status" },
      { label: "Rider Transfer", href: "/dashboard/rider-management/rider-transfer" },
      { label: "Create Rider", href: "/dashboard/rider-management/create-rider" },
      { label: "Performance", href: "/dashboard/rider-management/performance" },
      { label: "Verify OTP", href: "/dashboard/rider-management/verify-otp" },
    ],
  },
  {
    icon: TruckIcon,
    label: "Merchant Management",
    href: "/dashboard/merchant-management",
  },
  {
    icon: MapPin,
    label: "Financial Report",
    href: "/dashboard/financial-report",
    children: [
      { label: "Transactions", href: "/dashboard/financial-report/transaction" },
      { label: "COD Management", href: "/dashboard/financial-report/cod-manangement" },
    ],
  },
  {
    icon: MapPin,
    label: "Manage Operator",
    href: "/dashboard/manage-operators",
  },
];

interface SidebarProps {
  open: boolean;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  onClose: () => void;
}

export function Sidebar({
  open,
  collapsed,
  setCollapsed: _setCollapsed,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [flyoutHref, setFlyoutHref] = useState<string | null>(null);
  const [flyoutPos, setFlyoutPos] = useState<{ top: number; left: number } | null>(
    null,
  );
  const flyoutAnchorRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();

  /** Icon-only rail on desktop; mobile drawer keeps labels when open. */
  const railMode = collapsed && !open;

  const closeFlyout = useCallback(() => {
    setFlyoutHref(null);
    setFlyoutPos(null);
  }, []);

  useEffect(() => {
    closeFlyout();
  }, [pathname, closeFlyout]);

  useEffect(() => {
    if (!railMode) closeFlyout();
  }, [railMode, closeFlyout]);

  const updateFlyoutPos = useCallback(() => {
    const el = flyoutAnchorRef.current;
    if (!el) {
      setFlyoutPos(null);
      return;
    }
    const r = el.getBoundingClientRect();
    const gap = 8;
    const panelW = 220;
    let left = r.right + gap;
    if (left + panelW > window.innerWidth - gap) {
      left = Math.max(gap, r.left - panelW - gap);
    }
    const maxH = Math.min(window.innerHeight * 0.72, 28 * 16);
    let top = r.top;
    if (top + maxH > window.innerHeight - gap) {
      top = Math.max(gap, window.innerHeight - gap - maxH);
    }
    setFlyoutPos({ top, left });
  }, []);

  useLayoutEffect(() => {
    if (!flyoutHref) {
      setFlyoutPos(null);
      return;
    }
    updateFlyoutPos();
    window.addEventListener("scroll", updateFlyoutPos, true);
    window.addEventListener("resize", updateFlyoutPos);
    return () => {
      window.removeEventListener("scroll", updateFlyoutPos, true);
      window.removeEventListener("resize", updateFlyoutPos);
    };
  }, [flyoutHref, updateFlyoutPos]);

  useEffect(() => {
    if (!flyoutHref) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.closest("[data-sidebar-rail-popover]") ||
        t.closest("[data-sidebar-rail-trigger]")
      ) {
        return;
      }
      closeFlyout();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [flyoutHref, closeFlyout]);

  useEffect(() => {
    if (!flyoutHref) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFlyout();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flyoutHref, closeFlyout]);

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href],
    );
  };

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");

  const isChildActive = (children?: { href: string }[]) =>
    children?.some((child) => pathname.startsWith(child.href));

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/login");
  };

  const flyoutItem = flyoutHref
    ? menuItems.find((i) => i.href === flyoutHref && i.children)
    : undefined;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`
          fixed left-0 top-0 bottom-0 z-50 w-[min(280px,88vw)] bg-white border-r border-gray-100
          transition-[width,transform] duration-300 cubic-bezier(0.4, 0, 0.2, 1)
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:top-16 md:h-[calc(100vh-4rem)]
          ${collapsed ? "md:w-20" : "md:w-60"}
        `}
        aria-label="Main navigation"
      >
        <div className="flex h-full min-h-0 min-w-0 flex-col justify-between">
          <div
            className={`flex-1 min-h-0 min-w-0 overflow-y-auto py-4 space-y-0.5 ${
              railMode
                ? "px-1.5 md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden"
                : "px-2.5"
            }`}
          >
            {menuItems.map((item) => {
              const isExpanded = expandedItems.includes(item.href);
              const hasActiveChild = isChildActive(item.children);
              const active = isActive(item.href);
              const flyoutOpen = flyoutHref === item.href;

              const itemClasses = `
                relative flex items-center w-full rounded-xl transition-all duration-200 group/menu
                ${railMode ? "justify-center p-2.5 min-h-[2.75rem]" : "justify-between gap-2 px-3 py-2.5"}
                ${
                  active || hasActiveChild || flyoutOpen
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }
              `;

              return (
                <div key={item.href} className="relative mb-0.5">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        ref={item.href === flyoutHref ? flyoutAnchorRef : undefined}
                        data-sidebar-rail-trigger={railMode ? "" : undefined}
                        aria-expanded={railMode ? flyoutOpen : isExpanded}
                        aria-haspopup={railMode ? "true" : undefined}
                        aria-label={railMode ? `${item.label}, submenu` : undefined}
                        title={railMode ? item.label : undefined}
                        onClick={() => {
                          if (railMode) {
                            setFlyoutHref((h) => (h === item.href ? null : item.href));
                            return;
                          }
                          toggleExpand(item.href);
                        }}
                        className={itemClasses}
                      >
                        <div
                          className={`flex min-w-0 items-center ${railMode ? "justify-center" : "flex-1 gap-3"}`}
                        >
                          <item.icon
                            className={`${railMode ? "h-6 w-6" : "h-5 w-5"} shrink-0 transition-colors ${
                              hasActiveChild || flyoutOpen
                                ? "text-orange-600"
                                : "text-gray-400 group-hover/menu:text-gray-600"
                            }`}
                          />

                          {!railMode && (
                            <span className="flex-1 truncate text-left text-sm font-medium">
                              {item.label}
                            </span>
                          )}
                        </div>

                        {!railMode && (
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          />
                        )}
                      </button>

                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-label={railMode ? item.label : undefined}
                      title={railMode ? item.label : undefined}
                      className={itemClasses}
                    >
                      <div
                        className={`flex min-w-0 items-center ${railMode ? "justify-center" : "gap-3"}`}
                      >
                        <item.icon
                          className={`${railMode ? "h-6 w-6" : "h-5 w-5"} shrink-0 transition-colors ${
                            active
                              ? "text-orange-600"
                              : "text-gray-400 group-hover/menu:text-gray-600"
                          }`}
                        />

                        {!railMode && (
                          <span className="truncate text-sm font-medium">{item.label}</span>
                        )}
                      </div>
                    </Link>
                  )}

                  <div
                    className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${
                      !railMode && isExpanded
                        ? "max-h-[500px] opacity-100 mt-1"
                        : "max-h-0 opacity-0"
                    }
                  `}
                  >
                    {item.children && !railMode && (
                      <div className="ml-3 space-y-0.5 border-l-2 border-gray-100 py-1 pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className={`
                              block truncate rounded-lg border border-transparent px-3 py-2 text-sm transition-colors
                              ${
                                isActive(child.href)
                                  ? "bg-orange-50 font-medium text-orange-600"
                                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                              }
                            `}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={`border-t border-gray-100 p-3 ${railMode ? "flex justify-center px-2" : ""}`}
          >
            <button
              type="button"
              onClick={handleLogout}
              aria-label={railMode ? "Log out" : undefined}
              title={railMode ? "Log out" : undefined}
              className={`
               flex items-center rounded-xl text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 group/logout
               ${railMode ? "p-2.5" : "w-full gap-3 px-3 py-2.5"}
             `}
            >
              <LogOut className="h-5 w-5 shrink-0 transition-transform group-hover/logout:translate-x-0.5" />
              {!railMode && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {typeof window !== "undefined" &&
        flyoutItem?.children &&
        flyoutPos &&
        createPortal(
          <div
            data-sidebar-rail-popover=""
            style={{ top: flyoutPos.top, left: flyoutPos.left }}
            className="fixed z-[100] w-[min(220px,calc(100vw-16px))] max-h-[min(72vh,28rem)] overflow-y-auto rounded-xl border border-gray-100 bg-white py-1.5 shadow-xl shadow-gray-200/50"
          >
            <p className="border-b border-gray-100 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              {flyoutItem.label}
            </p>
            <div className="py-1">
              {flyoutItem.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => {
                    closeFlyout();
                    onClose();
                  }}
                  className={`mx-1.5 block rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive(child.href)
                      ? "bg-orange-50 font-medium text-orange-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
