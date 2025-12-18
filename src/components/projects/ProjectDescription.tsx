/**
 * Project Description Component
 * Displays the full project description
 */

import React from "react";
import { FileText } from "lucide-react";

interface Props {
  description: string;
}

export const ProjectDescription: React.FC<Props> = ({ description }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        Project Description
      </h2>
      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
        {description}
      </p>
    </div>
  );
};

export default ProjectDescription;
