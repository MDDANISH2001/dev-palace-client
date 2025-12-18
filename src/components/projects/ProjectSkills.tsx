/**
 * Project Skills Component
 * Displays required skills as badges
 */

import React from "react";
import { Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  skills: string[];
}

export const ProjectSkills: React.FC<Props> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-primary" />
        Required Skills
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <Badge
            key={idx}
            className="bg-primary/10 text-primary border-primary/20 px-3 py-1.5"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ProjectSkills;
