"use client";

import * as React from "react";
import { forwardRef } from "react";

// Use type aliases instead of empty interfaces
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`block w-full rounded-lg border-gray-300 shadow-sm py-2 px-4 text-sm ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

type SelectItemProps = React.OptionHTMLAttributes<HTMLOptionElement>;

export const SelectItem = forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <option ref={ref} {...props}>
        {children}
      </option>
    );
  }
);
SelectItem.displayName = "SelectItem";
