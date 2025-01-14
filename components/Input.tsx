/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  errorMessage?: string;
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef(
  ({ containerClassName, errorMessage, ...props }: Props, ref) => (
    <div>
      <div
        className={`flex items-center rounded-md border text-sm duration-300 ${
          errorMessage
            ? "border-red-500"
            : "border-gray-200 focus-within:border-primary-100"
        } ${containerClassName}`}
      >
        <input
          ref={ref as any}
          type="text"
          className={`flex-1 px-4 py-2 ${props.className}`}
          {...props}
        />
      </div>
      <p className="mt-1 text-xs font-medium text-red-500">{errorMessage}</p>
    </div>
  )
);

export default Input;
