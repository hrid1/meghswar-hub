import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



/** Only lets strings/numbers through — never renders a nested API object. */
export function txt(value: unknown, fallback = ""): string {
  if (value == null) return fallback;
  if (typeof value === "string") return value || fallback;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return fallback;
}