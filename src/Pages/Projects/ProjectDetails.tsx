import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useGetProjects } from "@/apis/hooks/shared-query.hook";
import { Button } from "@/components/ui/button";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectDescription from "@/components/projects/ProjectDescription";
import ProjectSkills from "@/components/projects/ProjectSkills";
import ProjectMediaGallery from "@/components/projects/ProjectMediaGallery";
import ProjectSOW from "@/components/projects/ProjectSOW";
import AssignedDevelopers from "@/components/projects/AssignedDevelopers";
import ProjectActionsSidebar from "@/components/projects/ProjectActionsSidebar";
import ProjectDetailsSidebar from "@/components/projects/ProjectDetailsSidebar";
import ProjectContactSidebar from "@/components/projects/ProjectContactSidebar";
import SimilarProjects from "@/components/projects/SimilarProjects";

export const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // Get current user from localStorage
  const currentUser = useMemo(() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }, []);

  const currentUserId = currentUser?._id;
  const userRole = currentUser?.role; // 'client' or 'developer'

  // Fetch project details
  const { data, isLoading, error } = useGetProjects({ projectId });
  console.log("data :", data);

  const project = data?.data?.projects?.[0];
  const allProjects = data?.data?.projects || [];
  const similarProjects = allProjects.filter((p) => p._id !== projectId);

  const isOwner = project?.clientId === currentUserId;
  const isAssignedDeveloper =
    project?.developerId?.includes(currentUserId) || false;

  if (isLoading) {
    return (
      <div className="bg-background">
        <div className="container mx-auto p-6 max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Project Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/projects")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto p-6">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6 text-foreground border-foreground/20 hover:bg-foreground/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            <ProjectHeader project={project} />
            <ProjectDescription description={project.description} />
            <ProjectSkills skills={project.skillsRequired || []} />
            <ProjectMediaGallery media={project.media || []} />
            <ProjectSOW sowUrl={project.sowUrl || ""} />
            <AssignedDevelopers
              developerIds={project.developerId || []}
              projectType={project.projectType}
            />
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            <ProjectActionsSidebar
              userRole={userRole}
              isOwner={isOwner}
              isAssignedDeveloper={isAssignedDeveloper}
              clientId={project.clientId}
              projectId={project._id}
              onNavigate={navigate}
            />
            <ProjectDetailsSidebar project={project} />
            <ProjectContactSidebar
              isOwner={isOwner}
              clientId={project.clientId}
              onNavigate={navigate}
            />
          </div>
        </div>

        {/* Similar Projects */}
        <SimilarProjects
          projects={similarProjects}
          currentUserId={currentUserId}
        />
      </div>
    </div>
  );
};

export default ProjectDetails;
