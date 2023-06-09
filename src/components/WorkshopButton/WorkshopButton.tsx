import React, { ReactNode } from "react";
import clsx from "clsx";

export interface WorkshopButtonProps {
  text: string;
  variant?: "primary" | "secondary" | "danger";
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

export function WorkshopButton({
  text,
  variant = "primary",
  leadingIcon,
  trailingIcon,
  onClick,
  type = "button",
}: WorkshopButtonProps) {
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white",
    danger: "bg-red-500 hover:bg-red-700 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center gap-2 rounded py-2 px-4",
        variantClasses[variant],
      )}
      type={type}
    >
      {!!leadingIcon && <span>{leadingIcon}</span>}
      {text}
      {!!trailingIcon && <span>{trailingIcon}</span>}
    </button>
  );
}
