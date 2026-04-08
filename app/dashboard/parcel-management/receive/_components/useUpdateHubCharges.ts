// hooks/useUpdateParcelCharges.ts
"use client";

import { useUpdateHubChargesMutation } from "@/redux/features/parcels/parcelsApi";
import { toast } from "sonner";

export const useUpdateParcelCharges = () => {
  const [updateHubCharges, { isLoading }] = useUpdateHubChargesMutation();

  const updateCharges = async (
    id: string,
    charges: { delivery_charge?: number; weight_charge?: number }
  ) => {
    try {
      const response = await updateHubCharges({
        id,
        charges,
      }).unwrap();

      if (response.success) {
        toast.success(response.message || "Charges updated successfully");
        return response.data;
      } else {
        throw new Error("Update failed");
      }
    } catch (error: any) {
      const errorMessage = error.data?.message || "Failed to update charges";
      toast.error(errorMessage);
      throw error;
    }
  };

  return { updateCharges, isUpdating: isLoading };
};