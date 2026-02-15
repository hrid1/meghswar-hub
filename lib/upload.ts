import { getCookie } from "@/redux/features/auth/authSlice";


const extractValue = (data: any, keys: string[]) => {
  for (const key of keys) {
    if (data?.[key]) return data[key];
    if (data?.data?.[key]) return data.data[key];
  }
  return null;
};

const getAuthHeaders = (): HeadersInit => {
  const token = getCookie("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getReadUrl = async (fileKey: string, apiBaseUrl?: string) => {
  const baseUrl = apiBaseUrl || process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("Missing NEXT_PUBLIC_API_URL");

  const res = await fetch(
    `${baseUrl}/upload/read-url?fileKey=${encodeURIComponent(fileKey)}`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to get read URL");
  }

  const data = await res.json();
  const readUrl = extractValue(data, ["readUrl", "url"]);
  if (!readUrl) throw new Error("Read URL missing from response");
  return readUrl as string;
};

export const uploadFileToAws = async (
  file: File,
  module: string,
  apiBaseUrl?: string
) => {
  const baseUrl = apiBaseUrl || process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("Missing NEXT_PUBLIC_API_URL");

  const signedResponse = await fetch(`${baseUrl}/upload/signed-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({
      fileName: file.name,
      fileType: file.type || "application/octet-stream",
      module,
    }),
  });

  if (!signedResponse.ok) {
    throw new Error("Failed to get signed URL");
  }

  const signedData = await signedResponse.json();
  const signedUrl = extractValue(signedData, ["signedUrl", "url"]);
  let fileKey = extractValue(signedData, ["fileKey", "key"]);
  const extraHeaders = extractValue(signedData, ["headers"]);

  if (!signedUrl) throw new Error("Signed URL missing from response");

  if (!fileKey) {
    const parsed = new URL(signedUrl);
    fileKey = parsed.pathname.replace(/^\/+/, "");
  }

  const putHeaders: Record<string, string> = {
    "Content-Type": file.type || "application/octet-stream",
  };

  if (extraHeaders && typeof extraHeaders === "object") {
    Object.entries(extraHeaders).forEach(([key, value]) => {
      putHeaders[key] = String(value);
    });
  }

  const uploadResponse = await fetch(signedUrl, {
    method: "PUT",
    headers: putHeaders,
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error("File upload failed");
  }

  return { fileKey: fileKey as string };
};
