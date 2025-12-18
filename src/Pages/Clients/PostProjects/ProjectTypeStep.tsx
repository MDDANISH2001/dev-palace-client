/**
 * Step 1: Project Type Selection
 * Client-friendly project type selection with clear descriptions
 */

import React from "react";
import { Target, Users, Zap } from "lucide-react";
import { useProjectFormStore } from "@/store/useProjectFormStore";
import { Button } from "@/components/ui/button";
import type { ProjectType } from "@/apis/types/project.types";

interface ProjectTypeOption {
  type: ProjectType;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  recommended: string;
}

const projectTypeOptions: ProjectTypeOption[] = [
  {
    type: "listed",
    icon: <Users className="w-8 h-8" />,
    title: "Post Publicly",
    description:
      "List your project publicly and receive proposals from developers",
    features: [
      "Receive multiple proposals",
      "Compare developer profiles",
      "Negotiate terms and budget",
      "Best for: Complex projects, flexible timeline",
    ],
    recommended: "Most Popular",
  },
  {
    type: "instant",
    icon: <Zap className="w-8 h-8" />,
    title: "Instant Match",
    description: "Get matched with available developers immediately",
    features: [
      "AI-powered matching",
      "Start within 24 hours",
      "Pre-vetted developers",
      "Best for: Urgent projects, quick turnaround",
    ],
    recommended: "Fastest",
  },
  {
    type: "direct",
    icon: <Target className="w-8 h-8" />,
    title: "Hire Directly",
    description: "Assign project to a specific developer you've worked with",
    features: [
      "Choose from your contacts",
      "Skip the bidding process",
      "Immediate assignment",
      "Best for: Trusted developers, ongoing work",
    ],
    recommended: "",
  },
];

export const ProjectTypeStep: React.FC = () => {
  const { formData, setFormField, nextStep } = useProjectFormStore();

  const handleSelect = (type: ProjectType) => {
    setFormField("projectType", type);
  };

  const handleContinue = () => {
    if (formData.projectType) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          How would you like to proceed?
        </h2>
        <p className="text-muted-foreground">
          Choose the best approach for your project needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projectTypeOptions.map((option) => (
          <button
            key={option.type}
            type="button"
            onClick={() => handleSelect(option.type)}
            className={`
              relative p-6 border-2 rounded-lg text-left transition-all
              hover:border-primary hover:shadow-lg
              ${
                formData.projectType === option.type
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border"
              }
            `}
          >
            {/* Recommended Badge */}
            {option.recommended && (
              <div className="absolute top-3 right-3">
                <span className="text-xs font-semibold px-2 py-1 bg-primary text-primary-foreground rounded-full">
                  {option.recommended}
                </span>
              </div>
            )}

            {/* Icon */}
            <div
              className={`
              mb-4 text-primary
              ${formData.projectType === option.type ? "scale-110" : ""}
              transition-transform
            `}
            >
              {option.icon}
            </div>

            {/* Title & Description */}
            <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {option.description}
            </p>

            {/* Features */}
            <ul className="space-y-2">
              {option.features.map((feature, index) => (
                <li key={index} className="text-xs flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Selection Indicator */}
            {formData.projectType === option.type && (
              <div className="mt-4 text-center">
                <span className="text-sm font-medium text-primary">
                  Selected ✓
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={!formData.projectType}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
