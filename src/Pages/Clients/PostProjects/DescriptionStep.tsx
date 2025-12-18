/**
 * Step 2: Project Description
 * With AI-powered skills analysis and budget estimation
 */

import React, { useState } from "react";
import { Sparkles, MapPin, Loader2 } from "lucide-react";
import { useProjectFormStore } from "@/store/useProjectFormStore";
import { Button } from "@/components/ui/button";
import { useAnalyzeSkills, useEstimateBudget } from "@/apis/hooks/useProject";
import { useLocationDetector } from "@/hooks/useLocationDetector";
import { toast } from "react-toastify";

export const DescriptionStep: React.FC = () => {
  const { formData, setFormField, setFormData, nextStep, prevStep } =
    useProjectFormStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { mutateAsync: analyzeSkills } = useAnalyzeSkills();
  const { mutateAsync: estimateBudget } = useEstimateBudget();
  const {
    location,
    isLoading: isDetectingLocation,
    detectLocation,
  } = useLocationDetector();

  const handleAnalyze = async () => {
    if (!formData.description.trim()) {
      toast.error("Please enter a project description first");
      return;
    }

    setIsAnalyzing(true);

    try {
      // Run both analyses in parallel
      const [skillsResult, budgetResult] = await Promise.allSettled([
        analyzeSkills({ description: formData.description }),
        estimateBudget({
          description: formData.description,
          location: location?.country || formData.location,
          projectType: formData.projectType || undefined,
        }),
      ]);

      // Handle skills analysis result
      if (skillsResult.status === "fulfilled") {
        setFormData({
          aiSuggestedSkills: skillsResult.value.data.skills,
        });
        toast.success(
          `Found ${skillsResult.value.data.skills.length} relevant skills!`
        );
      } else {
        console.error("Skills analysis failed:", skillsResult.reason);
        toast.warning("Could not analyze skills. You can add them manually.");
      }

      // Handle budget estimation result
      if (budgetResult.status === "fulfilled") {
        setFormData({
          aiSuggestedBudget: budgetResult.value.data.budget,
        });
        toast.success("Budget estimated based on your location!");
      } else {
        console.error("Budget estimation failed:", budgetResult.reason);
        toast.warning("Could not estimate budget. You can set it manually.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDetectLocation = async () => {
    try {
      await detectLocation();
      toast.success("Location detected!");
    } catch {
      toast.error("Failed to detect location");
    }
  };

  const handleContinue = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a project title");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Please enter a project description");
      return;
    }
    nextStep();
  };

  const minDescriptionLength = 50;
  const descriptionProgress = Math.min(
    (formData.description.length / minDescriptionLength) * 100,
    100
  );
  const isDescriptionComplete =
    formData.description.length >= minDescriptionLength;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Tell us about your project</h2>
        <p className="text-muted-foreground">
          The more details you provide, the better we can match you with the
          right developer
        </p>
      </div>

      {/* Project Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Project Title <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormField("title", e.target.value)}
          placeholder="e.g., Build a mobile app for food delivery"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ring outline-none"
          maxLength={100}
        />
        <p className="text-xs text-muted-foreground text-right">
          {formData.title.length}/100
        </p>
      </div>

      {/* Project Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Project Description <span className="text-destructive">*</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormField("description", e.target.value)}
          placeholder="Describe your project in detail. What do you want to build? What features do you need? Who are your users? What's your vision?"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring outline-none min-h-[200px] resize-y"
          maxLength={2000}
        />

        {/* Description Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {isDescriptionComplete
                ? "Good description! ✓"
                : `Add ${
                    minDescriptionLength - formData.description.length
                  } more characters for better AI analysis`}
            </span>
            <span>{formData.description.length}/2000</span>
          </div>
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isDescriptionComplete ? "bg-green-500" : "bg-primary"
              }`}
              style={{ width: `${descriptionProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Location Detection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Location (for budget estimation)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={location?.country || formData.location}
            onChange={(e) => setFormField("location", e.target.value)}
            placeholder="Enter your location"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ring outline-none"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleDetectLocation}
            disabled={isDetectingLocation}
          >
            {isDetectingLocation ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MapPin className="w-4 h-4" />
            )}
            Detect
          </Button>
        </div>
        {location && (
          <p className="text-xs text-muted-foreground">
            Detected: {location.city ? `${location.city}, ` : ""}
            {location.country}
          </p>
        )}
      </div>

      {/* AI Analysis Button */}
      <div className="border-2 border-dashed rounded-lg p-6 bg-primary/5">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">AI-Powered Analysis</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Our AI will analyze your description to suggest required skills
              and estimate budget based on your location.
            </p>
            <Button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing || !isDescriptionComplete}
              variant="default"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze Project
                </>
              )}
            </Button>
          </div>
        </div>

        {/* AI Suggestions Preview */}
        {(formData.aiSuggestedSkills.length > 0 ||
          formData.aiSuggestedBudget) && (
          <div className="mt-4 pt-4 border-t space-y-2">
            {formData.aiSuggestedSkills.length > 0 && (
              <div>
                <p className="text-xs font-medium mb-2">Suggested Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {formData.aiSuggestedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {formData.aiSuggestedBudget && (
              <div>
                <p className="text-xs font-medium">Estimated Budget:</p>
                <p className="text-sm">
                  ${formData.aiSuggestedBudget.min.toLocaleString()} - $
                  {formData.aiSuggestedBudget.max.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        )}
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
