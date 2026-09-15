"use client";

import { useEffect, useState } from "react";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { txt } from "@/lib/utils";
import { useUpdateParcelMutation } from "@/redux/features/parcels/parcelsApi";
import type { UpdateParcelRequest } from "@/redux/features/parcels/parcelTypes";

export type EditParcelForm = {
  customer_name: string;
  customer_phone: string;
  customer_secondary_phone: string;
  customer_address: string;
  delivery_coverage_area_id: string;
  product_description: string;
  product_price: string;
  product_weight: string;
  special_instructions: string;
};

const emptyForm: EditParcelForm = {
  customer_name: "",
  customer_phone: "",
  customer_secondary_phone: "",
  customer_address: "",
  delivery_coverage_area_id: "",
  product_description: "",
  product_price: "",
  product_weight: "",
  special_instructions: "",
};

const areaObjectLabel = (value: unknown) => {
  if (!value || typeof value !== "object") return "";
  const area = value as {
    area?: string;
    zone?: string;
    city?: string;
    division?: string;
  };
  return [area.area, area.zone, area.city, area.division]
    .map((part) => txt(part))
    .filter(Boolean)
    .join(", ");
};

export function getParcelEditForm(parcel: any): EditParcelForm {
  const customer = parcel?.customer || parcel?.customer_info || {};
  const pack = parcel?.package_information || {};
  const finance = parcel?.financial_summary || {};
  const details = parcel?.parcel_details || {};
  const coverage =
    parcel?.delivery_coverage_area &&
    typeof parcel.delivery_coverage_area === "object"
      ? parcel.delivery_coverage_area
      : parcel?.delivery_area && typeof parcel.delivery_area === "object"
        ? parcel.delivery_area
        : null;

  return {
    customer_name:
      txt(parcel?.customer_name) || txt(customer.customer_name),
    customer_phone:
      txt(parcel?.customer_phone) ||
      txt(customer.phone_number) ||
      txt(customer.phone),
    customer_secondary_phone:
      txt(parcel?.customer_secondary_phone) ||
      txt(customer.secondary_number) ||
      txt(customer.secondary_phone),
    customer_address:
      txt(parcel?.customer_address) ||
      txt(customer.customer_address) ||
      txt(customer.address),
    delivery_coverage_area_id:
      txt(parcel?.delivery_coverage_area_id) ||
      txt(coverage?.id) ||
      txt(customer.delivery_coverage_area_id),
    product_description:
      txt(parcel?.product_description) || txt(pack.product_description),
    product_price: txt(
      parcel?.product_price ?? finance.cod_amount ?? parcel?.cod_amount,
    ),
    product_weight: txt(
      parcel?.product_weight ?? details.parcel_weight,
    ),
    special_instructions:
      txt(parcel?.special_instructions) || txt(pack.special_instructions),
  };
}

export function getParcelEditId(parcel: any) {
  return txt(parcel?.id) || txt(parcel?.parcel_id);
}

export function getParcelCoverageLabel(parcel: any) {
  return (
    areaObjectLabel(parcel?.delivery_coverage_area) ||
    areaObjectLabel(parcel?.delivery_area) ||
    (typeof parcel?.delivery_area === "string" ? parcel.delivery_area : "")
  );
}

export default function EditParcelModal({
  open,
  setOpen,
  parcel,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  parcel: any | null;
}) {
  const [form, setForm] = useState<EditParcelForm>(emptyForm);
  const [updateParcel, { isLoading }] = useUpdateParcelMutation();
  const parcelId = getParcelEditId(parcel);
  const coverageLabel = getParcelCoverageLabel(parcel);
  const tracking =
    txt(parcel?.tracking_number) || txt(parcel?.parcel_tx_id) || parcelId;

  useEffect(() => {
    if (!open || !parcel) return;
    setForm(getParcelEditForm(parcel));
  }, [open, parcel]);

  const updateField = (key: keyof EditParcelForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parcelId) {
      toast.error("Parcel id is missing");
      return;
    }
    if (!form.customer_name.trim()) {
      toast.error("Customer name is required");
      return;
    }
    if (!form.customer_phone.trim()) {
      toast.error("Customer phone is required");
      return;
    }
    if (!form.customer_address.trim()) {
      toast.error("Customer address is required");
      return;
    }

    const productPrice = Number(form.product_price);
    const productWeight = Number(form.product_weight);
    if (Number.isNaN(productPrice) || productPrice < 0) {
      toast.error("Enter a valid product price");
      return;
    }
    if (Number.isNaN(productWeight) || productWeight < 0) {
      toast.error("Enter a valid product weight");
      return;
    }

    const body: UpdateParcelRequest = {
      customer_name: form.customer_name.trim(),
      customer_phone: form.customer_phone.trim(),
      customer_secondary_phone: form.customer_secondary_phone.trim() || null,
      customer_address: form.customer_address.trim(),
      product_description: form.product_description.trim(),
      product_price: productPrice,
      product_weight: productWeight,
      special_instructions: form.special_instructions.trim() || null,
    };

    if (form.delivery_coverage_area_id.trim()) {
      body.delivery_coverage_area_id = form.delivery_coverage_area_id.trim();
    }

    try {
      const response = await updateParcel({ id: parcelId, body }).unwrap();
      toast.success(response.message || "Parcel updated successfully");
      setOpen(false);
    } catch (error) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to update parcel",
      );
    }
  };

  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <form className="flex flex-col gap-4 p-1" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-lg font-semibold">Edit Parcel</h2>
          {tracking && (
            <p className="text-sm text-gray-500">{tracking}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="customer_name">Customer Name</Label>
            <Input
              id="customer_name"
              value={form.customer_name}
              onChange={(e) => updateField("customer_name", e.target.value)}
              placeholder="Customer name"
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="customer_phone">Phone</Label>
            <Input
              id="customer_phone"
              value={form.customer_phone}
              onChange={(e) => updateField("customer_phone", e.target.value)}
              placeholder="01700000000"
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="customer_secondary_phone">Secondary Phone</Label>
            <Input
              id="customer_secondary_phone"
              value={form.customer_secondary_phone}
              onChange={(e) =>
                updateField("customer_secondary_phone", e.target.value)
              }
              placeholder="01800000000"
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="delivery_coverage_area_id">Coverage Area ID</Label>
            <Input
              id="delivery_coverage_area_id"
              value={form.delivery_coverage_area_id}
              onChange={(e) =>
                updateField("delivery_coverage_area_id", e.target.value)
              }
              placeholder="Coverage area UUID"
              disabled={isLoading}
            />
            {coverageLabel && (
              <p className="text-xs text-gray-500">{coverageLabel}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="product_price">Product Price</Label>
            <Input
              id="product_price"
              type="number"
              min="0"
              step="0.01"
              value={form.product_price}
              onChange={(e) => updateField("product_price", e.target.value)}
              placeholder="1200"
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="product_weight">Product Weight (kg)</Label>
            <Input
              id="product_weight"
              type="number"
              min="0"
              step="0.01"
              value={form.product_weight}
              onChange={(e) => updateField("product_weight", e.target.value)}
              placeholder="1.5"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="customer_address">Delivery Address</Label>
          <Textarea
            id="customer_address"
            value={form.customer_address}
            onChange={(e) => updateField("customer_address", e.target.value)}
            placeholder="House 10, Road 4, Mirpur, Dhaka"
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="product_description">Product Description</Label>
          <Input
            id="product_description"
            value={form.product_description}
            onChange={(e) => updateField("product_description", e.target.value)}
            placeholder="One clothing parcel"
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="special_instructions">Special Instructions</Label>
          <Textarea
            id="special_instructions"
            value={form.special_instructions}
            onChange={(e) =>
              updateField("special_instructions", e.target.value)
            }
            placeholder="Call before delivery"
            disabled={isLoading}
          />
        </div>

        <div className="mt-2 flex gap-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-orange-500 text-white hover:bg-orange-600"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => setOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </CustomDialog>
  );
}
