/**
 * Post Project Form - Main Component
 * Smart multi-step form for project creation
 */

import React from "react";
import { useProjectFormStore } from "@/store/useProjectFormStore";

// Step Components
import { ProjectTypeStep } from "./ProjectTypeStep";
import { DescriptionStep } from "./DescriptionStep";
import { DetailsStep } from "./DetailsStep";
import { DeveloperSelectionStep } from "./DeveloperSelectionStep";
import { MediaUploadStep } from "./MediaUploadStep";
import { FinalSubmitStep } from "./FinalSubmitStep";
import { Link } from "react-router";

export const PostProjectForm: React.FC = () => {
  const { currentStep, formData } = useProjectFormStore();

  // Determine which step to show based on project type
  const getStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <ProjectTypeStep />;
      case 2:
        return <DescriptionStep />;
      case 3:
        return <DetailsStep />;
      case 4:
        return <DeveloperSelectionStep />;
      case 5:
        return <MediaUploadStep />;
      case 6:
        return <FinalSubmitStep />;
      default:
        return <ProjectTypeStep />;
    }
  };

  // Handle form submission - prevent default but don't do anything
  // Submission is handled in FinalSubmitStep
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Calculate total steps based on project type
  const getTotalSteps = () => {
    return formData.projectType === "direct" ? 6 : 5; // Direct has 6 steps, others have 5
  };

  // Get display step number (accounting for skipped steps)
  const getDisplayStep = () => {
    if (formData.projectType !== "direct" && currentStep > 3) {
      return currentStep - 1; // Adjust for skipped developer selection
    }
    return currentStep;
  };

  const totalSteps = getTotalSteps();
  const displayStep = getDisplayStep();
  const progressPercentage = (displayStep / totalSteps) * 100;

  return (
    <div className="container bg-background mx-auto py-12 px-4 text-foreground">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-lg font-semibold">Post a New Project</h1>
          <span className="text-sm text-muted-foreground">
            Step {displayStep} of {totalSteps}
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="bg-card border rounded-xl shadow-lg p-8"
      >
        {getStepComponent()}
      </form>

      {/* Help Text */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          Need help? Check out our{" "}
          <Link to="/help" className="text-primary hover:underline">
            guide to posting projects
          </Link>
        </p>
      </div>
    </div>
  );
};
