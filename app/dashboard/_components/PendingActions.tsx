import type {
  PendingAction,
  PendingActions as PendingActionsData,
} from "@/redux/features/dashboard/dashboardTypes";
import { ArrowRight, Inbox } from "lucide-react";
import Link from "next/link";

const priorityStyles: Record<string, string> = {
  HIGH: "border-red-200 bg-red-50 text-red-700",
  MEDIUM: "border-orange-200 bg-orange-50 text-orange-700",
  LOW: "border-blue-200 bg-blue-50 text-blue-700",
};

const actionRoutes: Record<string, string> = {
  OTP_APPROVAL: "/dashboard/rider-management/verify-otp",
  RIDER_ASSIGNMENT: "/dashboard/parcel-management/assign-rider",
  RETURN_PROCESSING: "/dashboard/parcel-management/processed",
};

export default function PendingActions({
  pendingActions,
}: {
  pendingActions: PendingActionsData;
}) {
  return (
    <section className="h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Pending Actions</h3>
          <p className="mt-1 text-sm text-gray-500">
            Tasks that need your attention
          </p>
        </div>
        <span className="rounded-full bg-[#FE5000] px-3 py-1 text-sm font-semibold text-white">
          {pendingActions.counts.total}
        </span>
      </div>

      {pendingActions.actions.length === 0 ? (
        <div className="flex min-h-52 flex-col items-center justify-center text-gray-400">
          <Inbox className="mb-2 h-8 w-8" />
          <p className="text-sm">No pending actions</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pendingActions.actions.map((action, index) => (
            <SingleAction
              key={`${action.type}-${action.reference ?? index}`}
              action={action}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function SingleAction({ action }: { action: PendingAction }) {
  const href = actionRoutes[action.type.toUpperCase()] || "#";
  const style =
    priorityStyles[action.priority.toUpperCase()] ||
    "border-gray-200 bg-gray-50 text-gray-700";

  return (
    <Link
      href={href}
      className={`group flex items-center justify-between gap-3 rounded-xl border p-4 transition hover:shadow-sm ${style}`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{action.title}</p>
          {action.count > 0 && (
            <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-semibold">
              {action.count}
            </span>
          )}
        </div>
        <p className="mt-1 line-clamp-2 text-sm opacity-75">
          {action.description}
        </p>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
