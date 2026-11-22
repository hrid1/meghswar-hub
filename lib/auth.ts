export type JwtPayload = {
  role?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
};

export function decodeJwt(token: string | null | undefined): JwtPayload | null {
  if (!token) return null;

  try {
    const encoded = token.split(".")[1];
    if (!encoded) return null;

    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));

    return parsed && typeof parsed === "object" ? (parsed as JwtPayload) : null;
  } catch {
    return null;
  }
}

export function isHubManagerToken(token: string | null | undefined): boolean {
  const payload = decodeJwt(token);
  if (!payload || payload.role !== "HUB_MANAGER") return false;
  if (typeof payload.exp === "number" && payload.exp * 1000 <= Date.now()) return false;
  return true;
}
