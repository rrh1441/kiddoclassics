import React from "react";
import { cn } from "@/lib/utils";

interface SelectContentProps {
  children: React.ReactNode;
}

export const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
  return <div className={cn("rounded-lg shadow-md bg-white")}>{children}</div>;
};

interface SelectItemProps {
  children: React.ReactNode;
  value: string;
}

export const SelectItem: React.FC<SelectItemProps> = ({ children, value }) => {
  return (
    <option value={value} className="px-4 py-2 text-sm text-gray-700">
      {children}
    </option>
  );
};
