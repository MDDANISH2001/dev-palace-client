/**
 * Project Form Submission Hook
 * Handles project creation, navigation, and state cleanup
 */

import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useCreateProject } from "@/apis/hooks/useProject";
import { useProjectFormStore } from "@/store/useProjectFormStore";
import { toast } from "react-toastify";
import type { CreateProjectRequest } from "@/apis/types/project.types";

export const useProjectFormSubmit = () => {
  const navigate = useNavigate();
  const { mutateAsync: createProject, isPending } = useCreateProject();
  const { formData, resetForm } = useProjectFormStore();

  const handleSubmit = useCallback(async () => {
    // Get user from localStorage
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      toast.error("Please log in to post a project");
      navigate("/login");
      return;
    }

    const user = JSON.parse(userStr);
    const clientId = user._id || user.id;

    if (!clientId) {
      toast.error("User ID not found. Please log in again.");
      navigate("/login");
      return;
    }

    // Validate required fields
    if (!formData.projectType) {
      toast.error("Please select a project type");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Please enter a project title");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please enter a project description");
      return;
    }

    if (formData.skillsRequired.length === 0) {
      toast.error("Please add at least one required skill");
      return;
    }

    // For direct projects, validate developer selection
    if (
      formData.projectType === "direct" &&
      formData.developerId.length === 0
    ) {
      toast.error("Please select at least one developer");
      return;
    }

    try {
      // Prepare project data
      const projectData: CreateProjectRequest = {
        title: formData.title,
        description: formData.description,
        projectType: formData.projectType,
        skillsRequired:
          formData.skillsRequired.length > 0
            ? formData.skillsRequired
            : undefined,
        budget: formData.budget || undefined,
        durationEstimate: formData.durationEstimate || undefined,
        urgencyLevel: formData.urgencyLevel || undefined,
        status: "pending",
        sowUrl: formData.sowUrl || undefined,
        developerId:
          formData.developerId.length > 0 ? formData.developerId : undefined,
        media: formData.media.length > 0 ? formData.media : undefined,
      };

      // Submit the project
      const response = await createProject(projectData);

      // Show success message
      toast.success("Project posted successfully! 🎉");

      // Clear the persisted form data
      resetForm();

      // Navigate to project details page
      navigate(`/client/project-details/${response.data._id}`);
    } catch (error) {
      console.error("Project submission error:", error);
      // Error toast is already handled by the mutation hook
      toast.error("Failed to post project. Please try again.");
    }
  }, [formData, createProject, resetForm, navigate]);

  return {
    handleSubmit,
    isSubmitting: isPending,
  };
};
