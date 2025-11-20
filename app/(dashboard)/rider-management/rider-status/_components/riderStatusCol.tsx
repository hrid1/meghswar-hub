import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";

export const riderStatusColumns = [
  {
    key: "riderId",
    title: "Rider Id",
    width: 120,
    render: (row: any) => <span className="font-semibold">{row.riderId}</span>,
  },
  {
    key: "rider",
    title: "Rider",
    width: 200,
    render: (row: any) => (
      <div className="flex items-center space-x-2">
        <img src={row.riderImg} className="w-8 h-8 rounded-full" alt="rider" />
        <div>
          <p className="font-semibold">{row.rider}</p>
          <p className="text-xs text-gray-500">{row.riderPhone}</p>
        </div>
      </div>
    ),
  },
  {
    key: "status",
    title: "Status",
    width: 120,
  },
  {
    key: " licenseNo",
    title: "License No.",
    width: 120,
  },

  {
    key: "riderPerformance",
    title: "Rider's Performance",
    width: 140,
    render: (row: any) => <span>৳ {row.riderPerformance}</span>,
  },
];
