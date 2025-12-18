import React from "react";
import { Link, useNavigate } from "react-router";
import {
  Briefcase,
  DollarSign,
  MapPin,
  MessageCircle,
  Star,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Developer } from "@/apis/types/shared.types";

interface Props {
  developer: Developer;
  showConnectedBadge?: boolean;
}

const getAvailabilityConfig = (availability?: string) => {
  const configs = {
    available: {
      className: "bg-success/10 text-success border-success/20",
      label: "Available",
    },
    busy: {
      className: "bg-warning/10 text-warning border-warning/20",
      label: "Busy",
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

export const DeveloperCard: React.FC<Props> = ({
  developer,
  showConnectedBadge = false,
}) => {
  const navigate = useNavigate();
  const availabilityConfig = getAvailabilityConfig(developer.availability);
  const avgRating = calculateAverageRating(developer.reviews);

  const handleMessageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/chat/${developer._id}`);
  };

  return (
    <Link to={`/profile/${developer._id}`}>
      <article className="group relative p-6 rounded-xl border border-border bg-card hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            {developer.profileImg ? (
              <img
                src={developer.profileImg}
                alt={developer.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-border"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border-2 border-border">
                <User className="w-8 h-8 text-primary" />
              </div>
            )}
            {/* Availability dot */}
            <div
              className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card ${
                developer.availability === "available"
                  ? "bg-success"
                  : developer.availability === "busy"
                  ? "bg-warning"
                  : "bg-muted"
              }`}
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors mb-1 truncate">
              {developer.name}
            </h3>
            {developer.company && (
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                <Briefcase className="w-3.5 h-3.5" />
                {developer.company}
              </p>
            )}
            <div className="flex flex-wrap gap-2 items-center">
              <Badge className={availabilityConfig.className}>
                {availabilityConfig.label}
              </Badge>
              {showConnectedBadge && (
                <Badge className="bg-accent/10 text-accent border-accent/20">
                  Previously Worked
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        {developer.skills && developer.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {developer.skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 rounded-md text-xs bg-secondary text-secondary-foreground"
              >
                {skill}
              </span>
            ))}
            {developer.skills.length > 4 && (
              <span className="px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">
                +{developer.skills.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 grow">
          {developer.experience !== undefined && (
            <div className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{developer.experience} yrs</span>
            </div>
          )}
          {developer.hourlyRate !== undefined && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" />
              <span>${developer.hourlyRate}/hr</span>
            </div>
          )}
          {developer.reviews && developer.reviews.length > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-warning text-warning" />
              <span>
                {avgRating} ({developer.reviews.length})
              </span>
            </div>
          )}
        </div>

        {/* Location */}
        {developer.address && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{developer.address}</span>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={handleMessageClick}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="sm"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Message
        </Button>
      </article>
    </Link>
  );
};

export default DeveloperCard;
