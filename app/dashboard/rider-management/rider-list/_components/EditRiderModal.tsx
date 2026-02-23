"use client";

import { useEffect, useState } from "react";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";

export default function EditRiderModal({
  open,
  setOpen,
  riderId,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  riderId: string | null;
}) {
  const [form, setForm] = useState<any>(null);

  // fetch rider info by id
  useEffect(() => {
    if (!riderId) return;

    const fetchRider = async () => {
      try {
        const res = await fetch(`/api/riders/${riderId}`);
        if (!res.ok) {
          console.error("Fetch rider error: status", res.status);
          setForm(null);
          return;
        }
        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.error("Fetch rider error:", err);
      }
    };

    fetchRider();
  }, [riderId]);

  if (!form) return null;

  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Updated Data:", form);
          setOpen(false);
        }}
      >
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Rider Name"
          value={form?.rider || ""}
          onChange={(e) => setForm({ ...form, rider: e.target.value })}
        />

        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Phone Number"
          value={form?.riderPhone || ""}
          onChange={(e) => setForm({ ...form, riderPhone: e.target.value })}
        />

        <input
          type="text"
          className="border p-2 rounded"
          placeholder="License No"
          value={form?.licenseNo || ""}
          onChange={(e) => setForm({ ...form, licenseNo: e.target.value })}
        />

        <Button type="submit" className="bg-blue-600 text-white">
          Save Changes
        </Button>
      </form>
    </CustomDialog>
  );
}
