"use client";

import * as React from "react";

// Use type aliases instead of empty interfaces
type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border bg-white text-gray-900 shadow-sm ${className}`}
      {...props}
    />
  );
}

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContent({ className = "", ...props }: CardContentProps) {
  return <div className={`p-6 ${className}`} {...props} />;
}
