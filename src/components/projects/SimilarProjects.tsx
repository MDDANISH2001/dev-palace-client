/**
 * Similar Projects Section Component
 * Displays related projects at the bottom
 */

import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/apis/types/shared.types";

interface Props {
  projects: Project[];
  currentUserId?: string | null;
}

export const SimilarProjects: React.FC<Props> = ({
  projects,
  currentUserId,
}) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Similar Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.slice(0, 6).map((proj) => (
          <ProjectCard
            key={proj._id}
            project={proj}
            currentUserId={currentUserId}
          />
        ))}
      </div>
      {projects.length > 6 && (
        <div className="text-center mt-6">
          <Link to="/client/projects">
            <Button variant="outline">View All Projects</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SimilarProjects;
