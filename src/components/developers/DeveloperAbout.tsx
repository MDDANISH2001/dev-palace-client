/**
 * Developer About Component
 * Shows address and other basic info
 */

import React from "react";
import { MapPin, User } from "lucide-react";
import type { Developer } from "@/apis/types/shared.types";

interface Props {
  developer: Developer;
}

const DeveloperAbout: React.FC<Props> = ({ developer }) => {
  if (!developer.address) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-primary" />
        About
      </h2>
      <div className="space-y-3">
        {developer.address && (
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Location</p>
              <p className="text-muted-foreground">{developer.address}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperAbout;
