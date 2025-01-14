"use client";
import { Minus, Plus } from "@phosphor-icons/react";
import React from "react";

import Button, { EButton } from "./Button";

interface Props {
  min?: number;
  max?: number;
  buttonClassName?: string;
  inputClassName?: string;
  value?: number;
  onValueChange?: (value: number) => void;
}

export default function QuantityInput({
  min = 0,
  max = 99999999,
  value = 0,
  inputClassName,
  buttonClassName,
  onValueChange,
}: Props) {
  return (
    <div className="flex w-fit flex-nowrap items-stretch border border-primary-100/70">
      <Button
        disabled={value === min}
        onClick={() => {
          if (onValueChange) {
            onValueChange(value - 1);
          }
        }}
        variant={EButton.ghost}
        className={`size-7 !rounded-none !p-0 text-lg font-bold lg:size-10 ${buttonClassName}`}
      >
        <Minus className="mx-auto" />
      </Button>
      <input
        size={1}
        type="number"
        className={`w-10 bg-transparent px-1 text-center outline-none lg:w-12 xl:w-16 ${inputClassName}`}
        value={value}
        onChange={(e) => {
          if (onValueChange) {
            onValueChange(parseInt(e.target.value));
          }
        }}
      />
      <Button
        disabled={value >= max}
        onClick={() => {
          if (onValueChange) {
            onValueChange(value + 1);
          }
        }}
        variant={EButton.ghost}
        className={`size-7 !rounded-none !p-0 text-lg font-bold lg:size-10 ${buttonClassName}`}
      >
        <Plus className="mx-auto" />
      </Button>
    </div>
  );
}
