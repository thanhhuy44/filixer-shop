"use client";
import { useClickAway } from "@uidotdev/usehooks";
import * as React from "react";
import { useState } from "react";

interface Props {
  value?: OptionValue;
  options?: Option[];
  className?: string;
  placeholder?: string;
  error?: boolean;
  optionsClassName?: string;
  disable?: boolean;
  onValueChange?: (value: OptionValue) => void;
}

interface Option {
  label: string;
  value: OptionValue;
  className?: string;
}

type OptionValue = string | number;

function Select({
  value,
  options = [],
  error = false,
  className,
  placeholder = "",
  optionsClassName = "",
  disable = false,
  onValueChange,
}: Props) {
  const [currValue, setCurrValue] = useState<OptionValue | undefined>(value);
  const [open, setOpen] = useState(false);
  const ref = useClickAway(() => setOpen(false));

  React.useEffect(() => {
    setCurrValue(value);
  }, [value]);

  return (
    <div ref={ref as React.LegacyRef<HTMLDivElement>} className="relative">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`flex cursor-pointer select-none items-center rounded-md border px-4 py-2 text-sm duration-300 ${
          error
            ? "border-red-500"
            : `border-gray-200 ${open && "border-primary-100"}`
        } ${className}`}
      >
        <p>{currValue || <span className="opacity-50">{placeholder}</span>}</p>
      </div>
      {!disable ? (
        <div
          className={`absolute inset-x-0 top-full z-10 mt-2 max-h-[250px] origin-top overflow-hidden overflow-y-auto rounded-md border bg-white py-2 duration-150 ${
            open ? "scale-y-100" : "scale-y-0"
          } ${optionsClassName}`}
        >
          {options.length
            ? options.map((option, index) => {
                const isActive = option.value === currValue;
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setCurrValue(option.value);
                      if (onValueChange) {
                        onValueChange(option.value);
                      }
                      setOpen(false);
                    }}
                    className={`cursor-pointer px-3 py-1 hover:bg-primary-100/10 ${
                      isActive && "bg-primary-100/30"
                    } ${option?.className}`}
                  >
                    {option.label}
                  </div>
                );
              })
            : null}
        </div>
      ) : null}
    </div>
  );
}

export default Select;
