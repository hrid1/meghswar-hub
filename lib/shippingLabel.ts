import { store } from "@/redux/store";
import { toast } from "sonner";

export type LabelLayout = "THERMAL" | "A4";

function getAuthToken(explicitToken?: string): string {
  if (explicitToken) return explicitToken;
  try {
    const token = store.getState().auth.access_token;
    if (token) return token;
  } catch (err) {
    console.error("Failed to read auth token from store", err);
  }
  return "";
}

function triggerBlobDownload(blob: Blob, defaultFilename: string, contentDisposition?: string | null) {
  let filename = defaultFilename;
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i);
    if (filenameMatch && filenameMatch[1]) {
      filename = filenameMatch[1].replace(/['"]/g, "").trim();
    }
  }

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  window.setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 1500);
}

export async function downloadSingleShippingLabel({
  parcelId,
  layout = "THERMAL",
  token,
}: {
  parcelId: string;
  layout?: LabelLayout;
  token?: string;
}): Promise<void> {
  const authToken = getAuthToken(token);
  if (!authToken) {
    toast.error("Authentication required to print label");
    return;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const url = `${baseUrl}/parcels/${encodeURIComponent(parcelId)}/label?layout=${layout}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    let errorMsg = "Failed to download shipping label";
    try {
      const errJson = await response.json();
      if (errJson?.message) {
        errorMsg = Array.isArray(errJson.message)
          ? errJson.message.join(", ")
          : errJson.message;
      }
    } catch {
      // ignore json parse error
    }
    throw new Error(errorMsg);
  }

  const blob = await response.blob();
  const contentDisposition = response.headers.get("content-disposition");
  triggerBlobDownload(blob, `meghswar-label-${parcelId}.pdf`, contentDisposition);
}

export async function downloadBulkShippingLabels({
  parcelIds,
  layout = "A4",
  token,
}: {
  parcelIds: string[];
  layout?: LabelLayout;
  token?: string;
}): Promise<void> {
  if (!parcelIds.length) {
    toast.error("Please select at least one parcel to print");
    return;
  }

  if (parcelIds.length > 100) {
    toast.error("Maximum 100 parcel labels can be printed at once");
    return;
  }

  const authToken = getAuthToken(token);
  if (!authToken) {
    toast.error("Authentication required to print labels");
    return;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const url = `${baseUrl}/parcels/labels`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parcel_ids: parcelIds,
      layout,
    }),
  });

  if (!response.ok) {
    let errorMsg = "Failed to download bulk shipping labels";
    try {
      const errJson = await response.json();
      if (errJson?.message) {
        errorMsg = Array.isArray(errJson.message)
          ? errJson.message.join(", ")
          : errJson.message;
      }
    } catch {
      // ignore json parse error
    }
    throw new Error(errorMsg);
  }

  const blob = await response.blob();
  const contentDisposition = response.headers.get("content-disposition");
  const dateStr = new Date().toISOString().split("T")[0];
  triggerBlobDownload(
    blob,
    `meghswar-shipping-labels-${dateStr}.pdf`,
    contentDisposition
  );
}

