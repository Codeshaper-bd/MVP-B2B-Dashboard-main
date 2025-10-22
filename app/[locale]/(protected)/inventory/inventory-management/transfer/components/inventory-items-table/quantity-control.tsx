"use client";

import React from "react";

import InputCounter from "@/components/ui/input-counter";

interface TransferQuantityControlProps {
  productId: number;
  currentValue: number;
  maxValue: number;
  onChange: (productId: number, value: number) => void;
}

function TransferQuantityControl({
  productId,
  currentValue,
  maxValue,
  onChange,
}: TransferQuantityControlProps) {
  const handleChange = (value: number) => {
    onChange(productId, value);
  };

  return (
    <InputCounter
      label=""
      value={currentValue}
      onChange={handleChange}
      min={0}
      max={maxValue}
      step={1}
    />
  );
}

export default TransferQuantityControl;
