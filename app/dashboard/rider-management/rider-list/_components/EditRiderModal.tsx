"use client";

import { useEffect, useMemo, useState } from "react";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  useGetRiderByIdQuery,
  useUpdateRiderMutation,
} from "@/redux/features/rider/riderApi";
import type { UpdateRiderRequest } from "@/redux/features/rider/riderType";

type EditRiderForm = {
  full_name: string;
  phone: string;
  fixed_salary: string;
  commission_per_delivery: string;
  nid_number: string;
  license_no: string;
};

const emptyForm: EditRiderForm = {
  full_name: "",
  phone: "",
  fixed_salary: "",
  commission_per_delivery: "",
  nid_number: "",
  license_no: "",
};

const toOptionalText = (value: string) => {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
};

const numbersEqual = (left: string | number | null | undefined, right: string) =>
  Number(left ?? 0) === Number(right || 0);

const textsEqual = (
  left: string | null | undefined,
  right: string,
) => (left ?? "") === right.trim();

export default function EditRiderModal({
  open,
  setOpen,
  riderId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  riderId: string | null;
}) {
  const [form, setForm] = useState<EditRiderForm>(emptyForm);
  const { data, isLoading, isError, error, refetch } = useGetRiderByIdQuery(
    riderId ?? "",
    { skip: !open || !riderId },
  );
  const [updateRider, { isLoading: isSaving }] = useUpdateRiderMutation();
  const rider = data?.data;

  useEffect(() => {
    if (!open || !rider) return;
    setForm({
      full_name: rider.user?.full_name || "",
      phone: rider.user?.phone || "",
      fixed_salary: rider.fixed_salary != null ? String(rider.fixed_salary) : "",
      commission_per_delivery:
        rider.commission_per_delivery != null
          ? String(rider.commission_per_delivery)
          : "",
      nid_number: rider.nid_number || "",
      license_no: rider.license_no || "",
    });
  }, [open, rider]);

  const changedFields = useMemo((): UpdateRiderRequest => {
    if (!rider) return {};
    const body: UpdateRiderRequest = {};

    if (!textsEqual(rider.user?.full_name, form.full_name)) {
      body.full_name = form.full_name.trim();
    }
    if (!textsEqual(rider.user?.phone, form.phone)) {
      body.phone = form.phone.trim();
    }
    if (!numbersEqual(rider.fixed_salary, form.fixed_salary)) {
      body.fixed_salary = Number(form.fixed_salary);
    }
    if (!numbersEqual(rider.commission_per_delivery, form.commission_per_delivery)) {
      body.commission_per_delivery = Number(form.commission_per_delivery);
    }
    if (!textsEqual(rider.nid_number, form.nid_number)) {
      body.nid_number = toOptionalText(form.nid_number);
    }
    if (!textsEqual(rider.license_no, form.license_no)) {
      body.license_no = toOptionalText(form.license_no);
    }

    return body;
  }, [form, rider]);

  const updateField = (key: keyof EditRiderForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!riderId) return;
    if (!form.full_name.trim()) {
      toast.error("Rider name is required");
      return;
    }
    if (!form.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    if (
      form.fixed_salary !== "" &&
      (Number.isNaN(Number(form.fixed_salary)) || Number(form.fixed_salary) < 0)
    ) {
      toast.error("Enter a valid fixed salary");
      return;
    }
    if (
      form.commission_per_delivery !== "" &&
      (Number.isNaN(Number(form.commission_per_delivery)) ||
        Number(form.commission_per_delivery) < 0)
    ) {
      toast.error("Enter a valid commission");
      return;
    }

    const body = changedFields;
    if (Object.keys(body).length === 0) {
      toast.error("No changes to save");
      return;
    }

    try {
      const response = await updateRider({ riderId, body }).unwrap();
      toast.success(response.message || "Rider updated successfully");
      setOpen(false);
    } catch (err) {
      toast.error(
        (err as { data?: { message?: string } })?.data?.message ||
          "Failed to update rider",
      );
    }
  };

  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <form className="flex flex-col gap-4 p-1" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-lg font-semibold">Edit Rider</h2>
          {rider?.rider_code && (
            <p className="text-sm text-gray-500">{rider.rider_code}</p>
          )}
        </div>

        {isLoading && (
          <p className="py-6 text-center text-sm text-gray-500">
            Loading rider...
          </p>
        )}

        {isError && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {(error as { data?: { message?: string } })?.data?.message ||
              "Failed to load rider"}
            <Button
              type="button"
              variant="outline"
              className="mt-3 w-full"
              onClick={() => refetch()}
            >
              Try again
            </Button>
          </div>
        )}

        {!isLoading && !isError && rider && (
          <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={form.full_name}
                  onChange={(event) => updateField("full_name", event.target.value)}
                  disabled={isSaving}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  disabled={isSaving}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fixed_salary">Fixed Salary</Label>
                <Input
                  id="fixed_salary"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.fixed_salary}
                  onChange={(event) =>
                    updateField("fixed_salary", event.target.value)
                  }
                  disabled={isSaving}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="commission_per_delivery">
                  Commission / Delivery
                </Label>
                <Input
                  id="commission_per_delivery"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.commission_per_delivery}
                  onChange={(event) =>
                    updateField("commission_per_delivery", event.target.value)
                  }
                  disabled={isSaving}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="nid_number">NID Number</Label>
                <Input
                  id="nid_number"
                  value={form.nid_number}
                  onChange={(event) =>
                    updateField("nid_number", event.target.value)
                  }
                  disabled={isSaving}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="license_no">License No</Label>
                <Input
                  id="license_no"
                  value={form.license_no}
                  onChange={(event) =>
                    updateField("license_no", event.target.value)
                  }
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="mt-2 flex gap-2">
              <Button
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isSaving}
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </form>
    </CustomDialog>
  );
}
