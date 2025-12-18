/**
 * Assigned Developers Component
 * Shows developers assigned to direct projects with timeline
 */

import React from "react";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  developerIds: string[];
  projectType: string;
}

export const AssignedDevelopers: React.FC<Props> = ({
  developerIds,
  projectType,
}) => {
  if (projectType !== "direct" || !developerIds || developerIds.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        Assigned Developers
      </h2>
      <div className="space-y-3">
        {developerIds.map((devId, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-lg">
              {devId.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Developer {idx + 1}</p>
              <p className="text-sm text-muted-foreground">ID: {devId}</p>
            </div>
            <Badge className="bg-accent/10 text-accent border-accent/20">
              Active
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedDevelopers;
