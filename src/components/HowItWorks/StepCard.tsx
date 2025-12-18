import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  index?: number;
};

export const StepCard: React.FC<Props> = ({
  title,
  description,
  icon,
  index = 0,
}) => {
  return (
    <div
      className={cn(
        "relative p-8 rounded-2xl border bg-card/80 backdrop-blur-sm border-border shadow-lg group",
        "transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30",
        "animate-fade-in-up overflow-hidden"
      )}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Step number badge */}
      <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
        {index + 1}
      </div>
      
      <div className="relative flex flex-col gap-4">
        <div className="w-14 h-14 rounded-xl bg-linear-to-br from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
