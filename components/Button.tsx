import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import React, { ButtonHTMLAttributes, HTMLProps } from "react";

export enum EButton {
  primary = "primary",
  outline = "outline",
  ghost = "ghost",
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: EButton;
  isLoading?: boolean;
}

export default function Button({
  variant = EButton.primary,
  children,
  className,
  disabled,
  isLoading,
  ...props
}: Props) {
  const primaryClass: HTMLProps<HTMLElement>["className"] =
    "bg-primary-100 text-white";
  const outlineClass = "text-primary-100 border border-primary-100";
  const ghostClass = "bg-gray-100 text-primary-100";

  const renderVariantClass = (variant: EButton) => {
    switch (variant) {
      case EButton.primary:
        return primaryClass;
      case EButton.outline:
        return outlineClass;

      case EButton.ghost:
        return ghostClass;

      default:
        return primaryClass;
    }
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${renderVariantClass(variant)} rounded px-8 py-2 disabled:opacity-25 ${isLoading ? "opacity-35" : ""} ${className || ""}`}
      {...props}
    >
      {isLoading ? (
        <CircleNotch size={23} className="mx-auto animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
