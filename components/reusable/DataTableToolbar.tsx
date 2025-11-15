"use client";

import React from "react";
import { Search, Printer, DownloadCloud, Check } from "lucide-react";
import {
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Badge,
} from "@/components/ui"; // your shadcn barrel export

type DataTableToolbarProps = {
  globalFilter: string;
  onGlobalFilterChange: (v: string) => void;
  merchants?: string[];
  zones?: string[];
  merchantFilter?: string;
  zoneFilter?: string;
  onMerchantFilterChange?: (v: string) => void;
  onZoneFilterChange?: (v: string) => void;

  // actions
  selectedCount?: number;
  totalAmount?: number;
  totalDelivery?: number;
  totalWeight?: number;

  onPrint?: () => void;
  onReceive?: () => void;
  onImport?: () => void;
};

export default function DataTableToolbar({
  globalFilter,
  onGlobalFilterChange,
  merchants = [],
  zones = [],
  merchantFilter = "",
  zoneFilter = "",
  onMerchantFilterChange,
  onZoneFilterChange,
  selectedCount = 0,
  totalAmount = 0,
  totalDelivery = 0,
  totalWeight = 0,
  onPrint,
  onReceive,
  onImport,
}: DataTableToolbarProps) {
  return (
    <div className="w-full bg-white rounded-md border border-gray-200 p-3 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
      {/* Left: filters */}
      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center w-full md:w-auto">
        <div className="flex items-center gap-2">
          <Input
            value={globalFilter}
            onChange={(e: any) => onGlobalFilterChange(e.target.value)}
            placeholder="Search by Parcel ID, Customer, Phone..."
            className="min-w-[220px]"
            // prepend icon
          />
          <Search className="w-4 h-4 ml-[-36px] text-orange-500 pointer-events-none" />
        </div>

        <Select
          onValueChange={(v) => onMerchantFilterChange?.(v)}
          defaultValue={merchantFilter ?? ""}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Merchant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All merchants</SelectItem>
            {merchants.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(v) => onZoneFilterChange?.(v)}
          defaultValue={zoneFilter ?? ""}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Zone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All zones</SelectItem>
            {zones.map((z) => (
              <SelectItem key={z} value={z}>
                {z}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Right: summary + actions */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        <div className="hidden sm:flex items-center gap-3">
          <div className="text-center">
            <div className="text-orange-600 font-semibold">{selectedCount}</div>
            <div className="text-xs text-muted-foreground">Selected</div>
          </div>
          <div className="text-center">
            <div className="text-green-600 font-semibold">৳{totalAmount}</div>
            <div className="text-xs text-muted-foreground">Collectable</div>
          </div>
          <div className="text-center">
            <div className="text-gray-700 font-medium">৳{totalDelivery}</div>
            <div className="text-xs text-muted-foreground">Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-gray-700 font-medium">{totalWeight} kg</div>
            <div className="text-xs text-muted-foreground">Weight</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Receive button (primary orange outline style) */}
          <Button
            onClick={onReceive}
            className="border border-orange-500 text-orange-600 hover:bg-orange-50"
            variant="ghost"
            size="sm"
          >
            <Check className="w-4 h-4 mr-2 text-orange-600" />
            Receive
          </Button>

          {/* Import button (if needed) */}
          {onImport && (
            <Button onClick={onImport} variant="outline" size="sm">
              <DownloadCloud className="w-4 h-4 mr-2" />
              Import
            </Button>
          )}

          {/* Print / Bulk Print */}
          <Button
            onClick={onPrint}
            className="bg-orange-500 text-white hover:bg-orange-600"
            size="sm"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}
