import { cn } from "@/lib/utils";
import React from "react";

interface ViewProps {
  className: string;
  children: React.ReactNode;
  props: React.HTMLAttributes<HTMLDivElement>;
}
export const View: React.FC<ViewProps> = ({ className, children, props }) => {
  return (
    <div className={cn("w-7xl h-full", className)} {...props}>
      {children}
    </div>
  );
};
