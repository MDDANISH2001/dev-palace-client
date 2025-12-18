import React from "react";
import { Button } from "@/components/ui/button";
import { FiStar } from "react-icons/fi";
import { cn } from "@/lib/utils";

type GigCardProps = {
  developerName: string;
  avatarColor: string;
  gigTitle: string;
  description: string;
  price: string;
  rating: number;
  reviewCount: number;
};

export const GigCard: React.FC<GigCardProps> = ({
  developerName,
  avatarColor,
  gigTitle,
  description,
  price,
  rating,
  reviewCount,
}) => {
  return (
    <div
      className={cn(
        "group relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg overflow-hidden",
        "transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30",
        "flex flex-col h-full"
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Developer Info */}
      <div className="relative flex items-center gap-3 mb-5">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md ring-2 ring-background group-hover:ring-primary/20 transition-all duration-300"
          style={{ backgroundColor: avatarColor }}
          aria-label={`${developerName} avatar`}
        >
          {developerName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="font-bold text-base">{developerName}</p>
          <div className="flex items-center gap-1.5 text-sm">
            <FiStar className="text-yellow-500 fill-yellow-500" size={14} />
            <span className="font-semibold text-foreground">
              {rating.toFixed(1)}
            </span>
            <span className="text-muted-foreground">
              ({reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Gig Details */}
      <div className="relative flex-1 mb-5">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {gigTitle}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Price & CTA */}
      <div className="relative flex items-center justify-between pt-5 border-t border-border/50">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            Starting at
          </p>
          <p className="font-bold text-2xl text-primary">{price}</p>
        </div>
        <Button
          size="sm"
          variant="default"
          className="shadow-md hover:shadow-lg transition-shadow"
        >
          View Gig
        </Button>
      </div>
    </div>
  );
};
