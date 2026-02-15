"use client";

import { DataTable } from "@/components/reusable/DataTable";
import React, { useEffect, useState } from "react";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import { Ridercolumns } from "./_components/riderCols";
import EditRiderModal from "./_components/EditRiderModal";
import { useGetRidersQuery } from "@/redux/features/rider/riderApi";
import CustomPagination from "@/components/reusable/CustomPagination";
import { getReadUrl } from "@/lib/upload";

export default function ParcelReportTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const { data, isLoading } = useGetRidersQuery({
    isActive: true,
    page,
    limit,
  });
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
        rider: rider.full_name,
        riderImg,
        riderPhone: rider.phone,
        vehicleType: rider.bike_type === "MOTORCYCLE" ? "Bike" : rider.bike_type,
        licenseNo: "N/A",
        nid: "N/A",
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
    if (type === "delete") setOpenDeleteModal(true);
  };

  return (
    <div className="p-6">
      {/* LOADING STATE */}
      {isLoading && <div className="text-center py-8">Loading riders...</div>}

      {/* TABLE */}
      {!isLoading && (
        <DataTable
          columns={Ridercolumns(handleAction)}
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

      {/* DELETE MODAL */}
      <CustomDialog open={openDeleteModal} setOpen={setOpenDeleteModal}>
        <div className="flex flex-col gap-4 p-2">
          <h2 className="text-lg font-semibold text-center text-red-600">
            Are you sure you want to delete?
          </h2>

          <div className="flex justify-between mt-4">
            <Button
              className="bg-gray-300 text-black"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </Button>

            <Button
              className="bg-red-600 text-white"
              onClick={() => {
                console.log("Deleted Rider:", selectedId);
                setOpenDeleteModal(false);
              }}
            >
              Confirm Delete
            </Button>
          </div>
        </div>
      </CustomDialog>
    </div>
  );
}
