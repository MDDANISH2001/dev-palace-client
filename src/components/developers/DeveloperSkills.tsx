/**
 * Developer Skills Component
 * Displays developer's skills as badges
 */

import React from "react";
import { Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  skills: string[];
}

const DeveloperSkills: React.FC<Props> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Code className="w-5 h-5 text-primary" />
        Skills & Expertise
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <Badge
            key={idx}
            className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default DeveloperSkills;
