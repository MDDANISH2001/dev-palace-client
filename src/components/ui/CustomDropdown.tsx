/**
 * Custom Dropdown Menu Component
 * A reusable wrapper around Shadcn's DropdownMenu that accepts options as props
 * This makes it easy to create dropdowns without repeating code
 */

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface DropdownOption {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "destructive"; // For styling (e.g., red logout button)
  separator?: boolean; // Add separator after this item
}

export interface CustomDropdownProps {
  trigger: React.ReactNode; // The button/element that opens the dropdown
  label?: string; // Optional label at the top (e.g., "My Account")
  options: DropdownOption[]; // Array of menu options
  align?: "start" | "center" | "end"; // Dropdown alignment
  width?: string; // Custom width class (e.g., "w-56")
  className?: string; // Additional classes for the trigger
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  trigger,
  label,
  options,
  align = "end",
  width = "w-56",
  className,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={`${width} border-border`}>
        {label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <DropdownMenuItem
              onClick={option.onClick}
              disabled={option.disabled}
              className={
                option.variant === "destructive"
                  ? "text-destructive focus:text-destructive"
                  : ""
              }
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              {option.label}
            </DropdownMenuItem>
            {option.separator && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
