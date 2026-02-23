import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import type { IProjectsPosted } from '@/types/clientTypes/clientAuth.types';

interface ProjectsPostedSectionProps {
  projects: IProjectsPosted[] | undefined;
}

export const ProjectsPostedSection: React.FC<ProjectsPostedSectionProps> = ({
  projects,
}) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Projects Posted
        </h2>
        <p className="text-muted-foreground text-center py-8">
          No projects posted yet
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">
        Projects Posted ({projects.length})
      </h2>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border border-border rounded-lg p-4 hover:bg-secondary/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-base">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.projectType}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Budget</p>
                <p className="font-medium text-foreground">{project.budget}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Urgency</p>
                <p className="font-medium text-foreground">
                  {project.urgencyLevel}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Skills</p>
                <p className="font-medium text-foreground text-xs">
                  {project.skillsRequired}
                </p>
              </div>
              {project.createdAt && (
                <div>
                  <p className="text-muted-foreground mb-1">Posted</p>
                  <p className="font-medium text-foreground text-xs">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={() => navigate(`/project-details/${project.title}`)}
              variant="outline"
              size="sm"
              className="w-full"
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
