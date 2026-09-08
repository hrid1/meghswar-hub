"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

export function CopyValueButton({
  value,
  label,
}: {
  value?: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  if (!value) return null;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    toast.success(`${label} copied`);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={() => void copyToClipboard()}
      aria-label={`Copy ${label}`}
      title={`Copy ${label}`}
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
    >
      {copied ? (
        <Check className="h-3 w-3 text-emerald-600" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
    </button>
  );
}

export function CopyableText({
  value,
  label,
  prefix,
  className,
  fallback = "—",
}: {
  value?: string;
  label: string;
  prefix?: string;
  className?: string;
  fallback?: string;
}) {
  if (!value) {
    return (
      <span className={className}>
        {prefix ? `${prefix} ${fallback}` : fallback}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 min-w-0 max-w-full ${className ?? ""}`}>
      <span className="truncate">
        {prefix ? `${prefix} ${value}` : value}
      </span>
      <CopyValueButton value={value} label={label} />
    </span>
  );
}

export function AddressHover({
  address,
  maxLength = 40,
}: {
  address?: string;
  maxLength?: number;
}) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );

  const truncated =
    address && address.length > maxLength
      ? `${address.slice(0, maxLength)}...`
      : address;
  const showTooltip = Boolean(
    address && address.length > maxLength && address !== "N/A"
  );

  const updatePosition = () => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCoords({
      top: rect.top - 4,
      left: Math.max(8, Math.min(rect.left + 8, window.innerWidth - 328)),
    });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onReposition = () => updatePosition();
    window.addEventListener("scroll", onReposition, true);
    window.addEventListener("resize", onReposition);
    return () => {
      window.removeEventListener("scroll", onReposition, true);
      window.removeEventListener("resize", onReposition);
    };
  }, [open]);

  if (!address) return null;

  return (
    <>
      <span
        ref={triggerRef}
        tabIndex={showTooltip ? 0 : undefined}
        className={`mt-0.5 block text-xs text-gray-500 outline-none break-words ${
          showTooltip ? "cursor-help" : ""
        }`}
        onMouseEnter={() => {
          if (showTooltip) setOpen(true);
        }}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => {
          if (showTooltip) setOpen(true);
        }}
        onBlur={() => setOpen(false)}
      >
        {truncated}
      </span>
      {open &&
        coords &&
        createPortal(
          <div
            role="tooltip"
            className="pointer-events-none fixed z-[9999] max-w-xs rounded bg-orange-400 px-2 py-1 text-xs whitespace-normal text-white"
            style={{ top: coords.top, left: coords.left }}
          >
            {address}
          </div>,
          document.body
        )}
    </>
  );
}

export function TextHover({
  text,
  maxLength = 40,
  className,
}: {
  text?: string;
  maxLength?: number;
  className?: string;
}) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );

  const truncated =
    text && text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  const showTooltip = Boolean(text && text.length > maxLength);

  const updatePosition = () => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCoords({
      top: rect.top - 4,
      left: Math.max(8, Math.min(rect.left + 8, window.innerWidth - 328)),
    });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onReposition = () => updatePosition();
    window.addEventListener("scroll", onReposition, true);
    window.addEventListener("resize", onReposition);
    return () => {
      window.removeEventListener("scroll", onReposition, true);
      window.removeEventListener("resize", onReposition);
    };
  }, [open]);

  if (!text) return null;

  return (
    <>
      <span
        ref={triggerRef}
        tabIndex={showTooltip ? 0 : undefined}
        className={`block text-sm text-gray-600 break-words outline-none ${
          showTooltip ? "cursor-help" : ""
        } ${className ?? ""}`}
        onMouseEnter={() => {
          if (showTooltip) setOpen(true);
        }}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => {
          if (showTooltip) setOpen(true);
        }}
        onBlur={() => setOpen(false)}
      >
        {truncated}
      </span>
      {open &&
        coords &&
        createPortal(
          <div
            role="tooltip"
            className="pointer-events-none fixed z-[9999] max-w-xs rounded bg-orange-400 px-2 py-1 text-xs whitespace-normal text-white"
            style={{ top: coords.top, left: coords.left }}
          >
            {text}
          </div>,
          document.body
        )}
    </>
  );
}

function toDate(value?: string | Date | null): Date | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateTime(date: Date) {
  return (
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    ", " +
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
}

export function ParcelAgeCell({
  createdAt,
  updatedAt,
  receivedAt,
  ageLabel,
}: {
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  receivedAt?: string | Date | null;
  ageLabel?: string | null;
}) {
  const created = toDate(createdAt);
  const updated = toDate(updatedAt);
  const received = toDate(receivedAt);

  const ageDays = created
    ? Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const dates = [
    created && { label: "Created", value: created },
    updated && { label: "Updated", value: updated },
    received && { label: "Received", value: received },
  ].filter(Boolean) as { label: string; value: Date }[];

  if (!ageLabel && ageDays === null && dates.length === 0) {
    return <span className="text-xs text-gray-400">N/A</span>;
  }

  return (
    <div className="text-sm space-y-1.5">
      {(ageLabel || ageDays !== null) && (
        <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-2.5 py-1 rounded-full">
          {ageLabel || `${ageDays} ${ageDays === 1 ? "Day" : "Days"}`}
        </span>
      )}
      {dates.map((item) => (
        <div key={item.label}>
          <div className="text-xs text-gray-500 font-medium">{item.label}:</div>
          <div className="text-xs text-gray-700">{formatDateTime(item.value)}</div>
        </div>
      ))}
    </div>
  );
}
