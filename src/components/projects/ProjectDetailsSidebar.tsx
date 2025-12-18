/**
 * Project Details Sidebar Component
 * Shows budget, duration, and last updated info
 */

import React from "react";
import { DollarSign, Clock, Calendar } from "lucide-react";
import type { Project } from "@/apis/types/shared.types";

interface Props {
  project: Project;
}

export const ProjectDetailsSidebar: React.FC<Props> = ({ project }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold text-foreground mb-4">Project Details</h3>
      <div className="space-y-4">
        {/* Budget */}
        {project.budget && (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <DollarSign className="w-4 h-4" />
              <span>Budget Range</span>
            </div>
            <p className="text-lg font-semibold text-foreground">
              ${project.budget.min.toLocaleString()} - $
              {project.budget.max.toLocaleString()}
            </p>
          </div>
        )}

        {/* Duration */}
        {project.durationEstimate && (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Clock className="w-4 h-4" />
              <span>Duration</span>
            </div>
            <p className="text-lg font-semibold text-foreground">
              {project.durationEstimate}
            </p>
          </div>
        )}

        {/* Last Updated */}
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Calendar className="w-4 h-4" />
            <span>Last Updated</span>
          </div>
          <p className="text-sm text-foreground">
            {new Date(project.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSidebar;
