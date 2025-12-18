/**
 * Step 3: Project Details
 * Skills, Budget, Timeline, and Urgency
 */

import React, { useEffect } from "react";
import { Clock, DollarSign, AlertCircle } from "lucide-react";
import { useProjectFormStore } from "@/store/useProjectFormStore";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/MultiSelect";
import type { UrgencyLevel } from "@/apis/types/project.types";
import { toast } from "react-toastify";

// Common skills suggestions
const COMMON_SKILLS = [
  // Frontend
  "React",
  "Vue.js",
  "Angular",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML/CSS",
  "Tailwind CSS",
  // Backend
  "Node.js",
  "Python",
  "Django",
  "Flask",
  "FastAPI",
  "Ruby on Rails",
  "PHP",
  "Laravel",
  // Mobile
  "React Native",
  "Flutter",
  "iOS",
  "Android",
  "Swift",
  "Kotlin",
  // Database
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Firebase",
  // Cloud & DevOps
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "CI/CD",
  // Other
  "REST API",
  "GraphQL",
  "WebSocket",
  "Git",
  "Agile",
  "UI/UX Design",
];

const URGENCY_OPTIONS: Array<{
  value: UrgencyLevel;
  label: string;
  description: string;
  color: string;
}> = [
  {
    value: "low",
    label: "Flexible",
    description: "No rush, we can take our time",
    color: "text-green-600",
  },
  {
    value: "medium",
    label: "Standard",
    description: "Normal timeline, a few weeks",
    color: "text-yellow-600",
  },
  {
    value: "high",
    label: "Urgent",
    description: "Need it done ASAP",
    color: "text-red-600",
  },
];

export const DetailsStep: React.FC = () => {
  const { formData, setFormField, setFormData, nextStep, prevStep } =
    useProjectFormStore();

  // Auto-populate skills from AI suggestions
  useEffect(() => {
    if (
      formData.aiSuggestedSkills.length > 0 &&
      formData.skillsRequired.length === 0
    ) {
      setFormField("skillsRequired", formData.aiSuggestedSkills);
    }
  }, [
    formData.aiSuggestedSkills,
    formData.skillsRequired.length,
    setFormField,
  ]);

  // Auto-populate budget from AI suggestions
  useEffect(() => {
    if (formData.aiSuggestedBudget && !formData.budget) {
      setFormField("budget", formData.aiSuggestedBudget);
    }
  }, [formData.aiSuggestedBudget, formData.budget, setFormField]);

  const handleContinue = () => {
    // Validation
    if (formData.skillsRequired.length === 0) {
      toast.warning(
        "Please add at least one skill (or let us suggest based on AI analysis)"
      );
      return;
    }

    // For direct projects, skip to developer selection
    if (formData.projectType === "direct") {
      nextStep(); // Go to developer selection
    } else {
      // For listed/instant, skip developer selection (go to step 5)
      nextStep(); // Will handle routing logic in main form
    }
  };

  const handleBudgetChange = (field: "min" | "max", value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData({
      budget: {
        min: field === "min" ? numValue : formData.budget?.min || 0,
        max: field === "max" ? numValue : formData.budget?.max || 0,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Project Details</h2>
        <p className="text-muted-foreground">
          Help us understand the technical requirements and timeline
        </p>
      </div>

      {/* Skills Required */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Required Skills</label>
          {formData.aiSuggestedSkills.length > 0 && (
            <span className="text-xs text-primary">✓ AI Suggested</span>
          )}
        </div>
        <MultiSelect
          selected={formData.skillsRequired}
          suggestions={COMMON_SKILLS}
          onChange={(skills) => setFormField("skillsRequired", skills)}
          placeholder="Type to search or add custom skills..."
          allowCustom={true}
        />
        <p className="text-xs text-muted-foreground">
          💡 Tip: If you're not sure about technical terms, describe your
          project above and use AI analysis
        </p>
      </div>

      {/* Budget */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <label className="text-sm font-medium">Budget Range (Optional)</label>
          {formData.aiSuggestedBudget && (
            <span className="text-xs text-primary">✓ AI Estimated</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground">Minimum ($)</label>
            <input
              type="number"
              value={formData.budget?.min || ""}
              onChange={(e) => handleBudgetChange("min", e.target.value)}
              placeholder="e.g., 1000"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ring outline-none"
              min="0"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Maximum ($)</label>
            <input
              type="number"
              value={formData.budget?.max || ""}
              onChange={(e) => handleBudgetChange("max", e.target.value)}
              placeholder="e.g., 5000"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ring outline-none"
              min="0"
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          💡 Not sure about the budget? Leave it empty to discuss with
          developers later
        </p>
      </div>

      {/* Duration Estimate */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <label className="text-sm font-medium">
            Expected Duration (Optional)
          </label>
        </div>
        <select
          value={formData.durationEstimate}
          onChange={(e) => setFormField("durationEstimate", e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ring outline-none"
        >
          <option value="">I'm not sure</option>
          <option value="1-2 weeks">1-2 weeks</option>
          <option value="2-4 weeks">2-4 weeks (1 month)</option>
          <option value="1-2 months">1-2 months</option>
          <option value="2-3 months">2-3 months</option>
          <option value="3-6 months">3-6 months</option>
          <option value="6+ months">6+ months (Long-term)</option>
        </select>
      </div>

      {/* Urgency Level */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-muted-foreground" />
          <label className="text-sm font-medium">
            How urgent is this project?
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {URGENCY_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormField("urgencyLevel", option.value)}
              className={`
                p-4 border-2 rounded-lg text-left transition-all
                ${
                  formData.urgencyLevel === option.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }
              `}
            >
              <div className={`font-semibold mb-1 ${option.color}`}>
                {option.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {option.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  );
};
