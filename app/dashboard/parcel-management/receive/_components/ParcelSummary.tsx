"use client";

import React from "react";

interface SummaryProps {
  selectedCount: number;
  totalCollectable: number;
  totalCOD: number;
  totalDeliveryCharge: number;
  totalWeight: number;
}

export default function ParcelSummary({
  selectedCount,
  totalCollectable,
  totalCOD,
  totalDeliveryCharge,
  totalWeight,
}: SummaryProps) {
  const cards = [
    {
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
      value: selectedCount,
      label: "Selected",
      prefix: "",
    },
    {
      bgColor: "bg-green-600",
      textColor: "text-white",
      value: totalCollectable,
      label: "Total Amount",
      prefix: "৳",
    },
    {
      bgColor: "bg-pink-600",
      textColor: "text-white",
      value: totalCOD,
      label: "Total COD Amount",
      prefix: "৳",
    },
    {
      bgColor: "bg-purple-600",
      textColor: "text-white",
      value: totalDeliveryCharge,
      label: "Delivery Charge",
      prefix: "৳",
    },
    {
      bgColor: "bg-blue-600",
      textColor: "text-white",
      value: totalWeight,
      label: "Weight",
      suffix: "kg",
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className={`${card.bgColor} px-4 py-3 rounded-lg ${card.textColor}`}>
          <div className="font-bold text-xl">
            {card.prefix}
            {typeof card.value === "number" ? card.value.toLocaleString() : card.value}
            {card.suffix}
          </div>
          <div className="text-sm">{card.label}</div>
        </div>
      ))}
    </div>
  );
}