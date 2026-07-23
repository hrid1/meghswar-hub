import {
  Bike,
  ClipboardCheck,
  History,
  PackagePlus,
  Replace,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function QuickActions() {
  const actions = [
    {
      icon: <Bike />,
      title: "Assign Riders",
      href: "/dashboard/parcel-management/assign-rider",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: <PackagePlus />,
      title: "Receive Parcels",
      href: "/dashboard/parcel-management/receive",
      color: "text-green-600 bg-green-50",
    },
    {
      icon: <ClipboardCheck />,
      title: "Verify OTP",
      href: "/dashboard/rider-management/verify-otp",
      color: "text-violet-600 bg-violet-50",
    },
    {
      icon: <Replace />,
      title: "Hub Transfer",
      href: "/dashboard/parcel-management/hub-transfer",
      color: "text-orange-600 bg-orange-50",
    },
    {
      icon: <WalletCards />,
      title: "COD Collection",
      href: "/dashboard/financial-report/cod-manangement",
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      icon: <History />,
      title: "Parcel History",
      href: "/dashboard/parcel-management/parcel-history",
      color: "text-red-600 bg-red-50",
    },
  ];

  return (
    <section className="h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-xl font-bold text-gray-900">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {actions.map((action) => (
          <ActionCard key={action.href} {...action} />
        ))}
      </div>
    </section>
  );
}

function ActionCard({
  icon,
  title,
  color,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={`flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border border-transparent p-4 transition hover:-translate-y-0.5 hover:border-current hover:shadow-sm ${color}`}
    >
      <span className="[&_svg]:h-6 [&_svg]:w-6">{icon}</span>
      <p className="text-center text-sm font-semibold">{title}</p>
    </Link>
  );
}
