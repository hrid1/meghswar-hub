import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";

export const riderStatusColumns = [
  {
    key: "riderId",
    header: "Rider Id",
    width: "15%",
    render: (row: any) => <span className="font-semibold">{row.riderId}</span>,
  },
  {
    key: "rider",
    header: "Rider",
    width: "25%",
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
    header: "Status",
    width: "15%",
  },
  {
    key: " licenseNo",
    header: "License No.",
    width: "15%",
  },

  {
    key: "riderPerformance",
    header: "Rider's Performance",
    width: "30%",
    render: (row: any) => <span>৳ {row.riderPerformance}</span>,
  },
];
