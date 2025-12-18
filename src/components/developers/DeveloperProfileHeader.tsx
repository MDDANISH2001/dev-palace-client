/**
 * Developer Profile Header Component
 * Shows name, avatar, availability, and key stats
 */

import React from "react";
import { User, Briefcase, Star, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Developer } from "@/apis/types/shared.types";

interface Props {
  developer: Developer;
}

const getAvailabilityConfig = (availability?: string) => {
  const configs = {
    available: {
      className: "bg-success/10 text-success border-success/20",
      label: "Available for Work",
    },
    busy: {
      className: "bg-warning/10 text-warning border-warning/20",
      label: "Currently Busy",
    },
    offline: {
      className: "bg-muted text-muted-foreground border-border",
      label: "Offline",
    },
  };
  return (
    configs[availability as keyof typeof configs] || {
      className: "bg-muted text-muted-foreground border-border",
      label: "Unknown",
    }
  );
};

const calculateAverageRating = (reviews?: Array<{ rating: number }>) => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};

const DeveloperProfileHeader: React.FC<Props> = ({ developer }) => {
  const availabilityConfig = getAvailabilityConfig(developer.availability);
  const avgRating = calculateAverageRating(developer.reviews);

  return (
    <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar */}
        <div className="relative shrink-0">
          {developer.profileImg ? (
            <img
              src={developer.profileImg}
              alt={developer.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-border"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center border-4 border-border">
              <User className="w-16 h-16 text-primary" />
            </div>
          )}
          {/* Availability indicator */}
          <div
            className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-card ${
              developer.availability === "available"
                ? "bg-success"
                : developer.availability === "busy"
                ? "bg-warning"
                : "bg-muted"
            }`}
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {developer.name}
          </h1>

          {developer.company && (
            <p className="text-lg text-muted-foreground flex items-center gap-2 mb-3">
              <Briefcase className="w-5 h-5" />
              {developer.company}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={availabilityConfig.className}>
              {availabilityConfig.label}
            </Badge>
            {developer.experience !== undefined && (
              <Badge className="bg-accent/10 text-accent border-accent/20">
                <Briefcase className="w-3 h-3 mr-1" />
                {developer.experience} years experience
              </Badge>
            )}
            {developer.reviews && developer.reviews.length > 0 && (
              <Badge className="bg-warning/10 text-warning border-warning/20">
                <Star className="w-3 h-3 mr-1 fill-warning" />
                {avgRating} ({developer.reviews.length} reviews)
              </Badge>
            )}
            {developer.projectsCompleted &&
              developer.projectsCompleted.length > 0 && (
                <Badge className="bg-success/10 text-success border-success/20">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {developer.projectsCompleted.length} projects completed
                </Badge>
              )}
          </div>

          {developer.email && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Email:</span> {developer.email}
            </p>
          )}
          {developer.phone && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Phone:</span> {developer.phone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfileHeader;
