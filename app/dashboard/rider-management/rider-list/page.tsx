"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useEffect, useState } from "react";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import { Ridercolumns } from "./_components/riderCols";
import EditRiderModal from "./_components/EditRiderModal";
import {
  useDeactivateRiderMutation,
  useGetRidersQuery,
} from "@/redux/features/rider/riderApi";
import CustomPagination from "@/components/reusable/CustomPagination";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { getReadUrl } from "@/lib/upload";
import { toast } from "sonner";

export default function ParcelReportTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetRidersQuery({
    isActive: true,
    page,
    limit,
    ...(search.trim() ? { search: search.trim() } : {}),
  });
  const [deactivateRider, { isLoading: isDeactivating }] =
    useDeactivateRiderMutation();
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeactivateModal, setOpenDeactivateModal] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  // Transform API data to match table structure
  useEffect(() => {
    const ridersList = data?.data?.riders || [];
    const keys = ridersList
      .map((rider: any) => rider.photo)
      .filter((key: string) => key && !key.startsWith("http"));

    let cancelled = false;

    const loadUrls = async () => {
      const entries = await Promise.all(
        keys.map(async (key: string) => {
          try {
            const url = await getReadUrl(key);
            return [key, url] as const;
          } catch {
            return [key, ""] as const;
          }
        })
      );

      if (cancelled) return;

      const next: Record<string, string> = {};
      entries.forEach(([key, url]) => {
        if (url) next[key] = url;
      });
      setPhotoUrls(next);
    };

    if (keys.length === 0) {
      setPhotoUrls({});
      return;
    }

    loadUrls();

    return () => {
      cancelled = true;
    };
  }, [data]);

  const riders =
    data?.data?.riders?.map((rider: any) => {
      const photoValue = rider.photo;
      const riderImg =
        photoValue && photoValue.startsWith("http")
          ? photoValue
          : photoUrls[photoValue] || "https://i.pravatar.cc/150?img=default";

      return {
        riderId: rider.id,
        rider_code: rider.rider_code || "N/A",
        rider: rider.user.full_name || "N/A",
        riderImg,
        riderPhone: rider.user?.phone || "N/A",
        vehicleType:  rider.bike_type || "N/A",
        licenseNo: rider.license_no || "N/A",
        nid: rider.nid_number || "N/A",
        deliveryCompleted: 0,
        deliveryReturn: 0,
        totalCash: 0,
      };
    }) || [];

  // Get pagination info from API response
  const paginationData = data?.data?.pagination || {
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  };

  // actions from table
  const handleAction = (type: string, riderId: string) => {
    setSelectedId(riderId);

    if (type === "edit") setOpenEditModal(true);
    if (type === "deactivate") setOpenDeactivateModal(true);
  };

  const selectedRider = riders.find((rider: { riderId: string }) => rider.riderId === selectedId);

  const handleDeactivate = async () => {
    if (!selectedId) return;
    try {
      const response = await deactivateRider(selectedId).unwrap();
      toast.success(response.message || "Rider deactivated successfully");
      setOpenDeactivateModal(false);
      setSelectedId(null);
    } catch (error) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to deactivate rider",
      );
    }
  };

  return (
    <div className="p-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold">All Rider List</h2>
        <CustomSearchInput
          className="w-full max-w-md sm:w-80"
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Search rider by name, phone or ID..."
        />
      </div>
      {/* LOADING STATE */}
      {isLoading && <div className="text-center py-8">Loading riders...</div>}

      {/* TABLE */}
      {!isLoading && (
        <DataTable
          columns={Ridercolumns(handleAction)}
          // cellPaddingX="px-1"
          data={riders}
          selectable={true}
          getRowId={(row) => row.riderId}
          selectedRowIds={selectedRowIds}
          onToggleRow={(rowId) => {
            setSelectedRowIds((prev) =>
              prev.includes(rowId)
                ? prev.filter((id) => id !== rowId)
                : [...prev, rowId],
            );
          }}
          onToggleAll={(nextSelected) => {
            setSelectedRowIds(nextSelected);
          }}
        />
      )}

      <CustomPagination
        page={paginationData.page}
        totalPages={paginationData.totalPages}
        onPageChange={setPage}
        totalItems={paginationData.total}
        itemsPerPage={paginationData.limit}
        show={paginationData.totalPages > 0}
      />

      {/* EDIT MODAL */}
      <EditRiderModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        riderId={selectedId}
      />

      {/* DEACTIVATE MODAL */}
      <CustomDialog open={openDeactivateModal} setOpen={setOpenDeactivateModal}>
        <div className="flex flex-col gap-4 p-2">
          <h2 className="text-lg font-semibold text-center text-red-600">
            Deactivate rider?
          </h2>
          <p className="text-center text-sm text-gray-600">
            {selectedRider?.rider ? (
              <>
                <span className="font-medium">{selectedRider.rider}</span> will
                be deactivated and removed from the active list. Rider history
                will be kept.
              </>
            ) : (
              "This rider will be deactivated. History will be kept."
            )}
          </p>

          <div className="flex justify-between mt-4">
            <Button
              className="bg-gray-300 text-black"
              disabled={isDeactivating}
              onClick={() => setOpenDeactivateModal(false)}
            >
              Cancel
            </Button>

            <Button
              className="bg-red-600 text-white"
              disabled={isDeactivating}
              onClick={handleDeactivate}
            >
              {isDeactivating ? "Deactivating..." : "Confirm Deactivate"}
            </Button>
          </div>
        </div>
      </CustomDialog>
    </div>
  );
}
