"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Phone } from "lucide-react";
import Link from "next/link";

// Define TypeScript interface for data
interface Delivery {
  parcelId: string;
  rider: string;
  vehicle: string;
  destination: string;
  status: string;
  statusColor: "green" | "purple" | "orange";
}

// Sample data
const data: Delivery[] = [
  {
    parcelId: "#139679",
    rider: "Ahmed Wasi",
    vehicle: "Motorbike",
    destination:
      "Southeast Bank, Bashundhara Branch, Plot#142, Safwan Road, Block#B,...",
    status: "In Progress",
    statusColor: "green",
  },
  {
    parcelId: "#139680",
    rider: "Ahmed Wasi",
    vehicle: "Motorbike",
    destination:
      "Southeast Bank, Bashundhara Branch, Plot#142, Safwan Road, Block#B,...",
    status: "Partial Delivery",
    statusColor: "green",
  },
  {
    parcelId: "#139681",
    rider: "Ahmed Wasi",
    vehicle: "Motorbike",
    destination:
      "Southeast Bank, Bashundhara Branch, Plot#142, Safwan Road, Block#B,...",
    status: "Exchange",
    statusColor: "purple",
  },
  {
    parcelId: "#139682",
    rider: "Ahmed Wasi",
    vehicle: "Motorbike",
    destination:
      "Southeast Bank, Bashundhara Branch, Plot#142, Safwan Road, Block#B,...",
    status: "Delivery Rescheduled",
    statusColor: "orange",
  },
  {
    parcelId: "#139682",
    rider: "Ahmed Wasi",
    vehicle: "Motorbike",
    destination:
      "Southeast Bank, Bashundhara Branch, Plot#142, Safwan Road, Block#B,...",
    status: "Delivery Rescheduled",
    statusColor: "orange",
  },
  {
    parcelId: "#139682",
    rider: "Ahmed Wasi",
    vehicle: "Motorbike",
    destination:
      "Southeast Bank, Bashundhara Branch, Plot#142, Safwan Road, Block#B,...",
    status: "Delivery Rescheduled",
    statusColor: "orange",
  },
];

// Column definitions
const columns: ColumnDef<Delivery>[] = [
  {
    accessorKey: "parcelId",
    header: "Parcel ID",
  },
  {
    id: "rider",
    header: "Rider",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700">
          {row.original.rider
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>
        <div>
          <div className="font-medium text-sm">{row.original.rider}</div>
          <div className="text-xs text-gray-500">{row.original.vehicle}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ getValue }) => (
      <div className="max-w-xs text-wrap text-sm text-gray-700">
        {getValue<string>()}
      </div>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status, statusColor } = row.original;
      const colorClasses = {
        green: "bg-green-100 text-green-800",
        purple: "bg-purple-100 text-purple-800",
        orange: "bg-orange-100 text-orange-800",
      };

      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[statusColor]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex items-center gap-2">
        <Link href={`/dashboard/${1234}`}>
          <button
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
            aria-label="View"
          >
            <Eye size={18} />
          </button>
        </Link>
        <button
          className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center text-green-600"
          aria-label="Call"
        >
          <Phone size={18} />
        </button>
      </div>
    ),
  },
];

export default function OnGoingDelivery() {
  const [tableData] = useState(data);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-lg border bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Ongoing Deliveries Status</h2>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-gray-500 text-xs font-medium uppercase"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
