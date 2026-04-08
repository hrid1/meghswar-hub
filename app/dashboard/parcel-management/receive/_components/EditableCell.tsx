// components/EditableCell.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, X, Edit2 } from "lucide-react";

interface EditableCellProps {
  value: number;
  onSave: (value: number) => Promise<void>;
  type?: "number" | "text";
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  onSave,
  type = "number",
  prefix = "",
  suffix = "",
  disabled = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value.toString());
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  // Update edit value when value prop changes
  useEffect(() => {
    setEditValue(value.toString());
  }, [value]);

  const handleSave = async () => {
    let newValue: number;
    
    if (type === "number") {
      newValue = parseFloat(editValue);
      if (isNaN(newValue)) {
        setEditValue(value.toString());
        setIsEditing(false);
        return;
      }
    } else {
      newValue = parseFloat(editValue);
      if (isNaN(newValue)) {
        setEditValue(value.toString());
        setIsEditing(false);
        return;
      }
    }

    if (newValue === value) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      await onSave(newValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save:", error);
      setEditValue(value.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value.toString());
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && !isEditing && !isLoading) {
      console.log("EditableCell clicked, enabling edit mode");
      setIsEditing(true);
    }
  };

  if (disabled) {
    return (
      <div className="text-gray-400">
        {prefix}{value.toLocaleString()}{suffix}
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-1" ref={containerRef}>
        <input
          ref={inputRef}
          type="number"
          step="0.01"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-20 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400"
          disabled={isLoading}
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSave();
          }}
          disabled={isLoading}
          className="p-1 text-green-600 hover:bg-green-50 rounded"
        >
          <Check className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCancel();
          }}
          disabled={isLoading}
          className="p-1 text-red-600 hover:bg-red-50 rounded"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`group relative cursor-pointer ${
        !disabled ? "hover:bg-orange-50 rounded px-1 py-0.5 -mx-1 transition-colors" : ""
      }`}
      style={{ minHeight: "28px" }}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="text-sm">
          {prefix}{value.toLocaleString()}{suffix}
        </span>
        {!disabled && (
          <Edit2 className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </div>
  );
};