/**
 * Step 7: Final Submit
 * Complete project preview with final submission
 */

import React from "react";
import {
  CheckCircle2,
  Rocket,
  DollarSign,
  Clock,
  AlertCircle,
  FileText,
  Target,
  Users,
  Zap,
  Image as ImageIcon,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useProjectFormStore } from "@/store/useProjectFormStore";
import { useProjectFormSubmit } from "@/hooks/useProjectFormSubmit";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

const PROJECT_TYPE_CONFIG = {
  direct: {
    icon: <Target className="w-5 h-5" />,
    label: "Direct Assignment",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  listed: {
    icon: <Users className="w-5 h-5" />,
    label: "Public Listing",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  instant: {
    icon: <Zap className="w-5 h-5" />,
    label: "Instant Match",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
};

export const FinalSubmitStep: React.FC = () => {
  const { formData, prevStep } = useProjectFormStore();
  const { handleSubmit, isSubmitting } = useProjectFormSubmit();

  const projectTypeConfig = formData.projectType
    ? PROJECT_TYPE_CONFIG[formData.projectType]
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Rocket className="w-8 h-8 text-success" />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-foreground">
          Ready to Launch!
        </h2>
        <p className="text-muted-foreground">
          Review your complete project details before posting
        </p>
      </div>

      {/* Complete Project Preview Card */}
      <div className="border-2 border-border rounded-xl bg-card shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="bg-muted/30 border-b border-border p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2 text-foreground">
                {formData.title}
              </h1>
              {projectTypeConfig && (
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${projectTypeConfig.bgColor}`}
                >
                  <span className={projectTypeConfig.color}>
                    {projectTypeConfig.icon}
                  </span>
                  <span
                    className={`text-sm font-medium ${projectTypeConfig.color}`}
                  >
                    {projectTypeConfig.label}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Project Description
            </h3>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {formData.description}
            </p>
          </div>

          {/* Skills */}
          {formData.skillsRequired.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {formData.skillsRequired.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Project Details Grid */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Project Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Budget */}
              {formData.budget && (
                <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-background">
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-success" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Budget Range
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      ${formData.budget.min.toLocaleString()} - $
                      {formData.budget.max.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {/* Duration */}
              {formData.durationEstimate && (
                <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-background">
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Expected Duration
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {formData.durationEstimate}
                    </p>
                  </div>
                </div>
              )}

              {/* Urgency */}
              {formData.urgencyLevel && (
                <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-background">
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-warning" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Urgency Level
                    </p>
                    <p className="text-lg font-semibold text-foreground capitalize">
                      {formData.urgencyLevel}
                    </p>
                  </div>
                </div>
              )}

              {/* Location */}
              {formData.location && (
                <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-background">
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Location
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {formData.location}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Developers (for direct projects) */}
          {formData.projectType === "direct" &&
            formData.developerId.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Assigned Developers
                </h3>
                <div className="flex items-center gap-2 p-4 border border-border rounded-lg bg-background">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground font-medium">
                    {formData.developerId.length} developer
                    {formData.developerId.length > 1 ? "s" : ""} selected
                  </span>
                </div>
              </div>
            )}

          {/* Files & Documents */}
          {(formData.media.length > 0 || formData.sowUrl) && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Attachments & Documents
              </h3>
              <div className="space-y-2">
                {/* Media Files */}
                {formData.media.length > 0 && (
                  <div className="flex items-center gap-3 p-4 border border-border rounded-lg bg-background">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <span className="text-foreground">
                      {formData.media.length} file
                      {formData.media.length > 1 ? "s" : ""} attached
                    </span>
                  </div>
                )}

                {/* SOW Document */}
                {formData.sowUrl && (
                  <Link
                    to={formData.sowUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 p-4 border border-border rounded-lg bg-background hover:bg-accent/5 hover:border-primary transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">
                        Statement of Work (SOW)
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Final Confirmation */}
      <div className="border-2 border-primary/20 rounded-lg p-6 bg-primary/5">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">
              Ready to post your project?
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ All information has been reviewed</li>
              <li>✓ Project details are accurate and complete</li>
              <li>
                ✓ You agree to our{" "}
                <Link
                  to="/terms"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  Terms of Service
                </Link>
              </li>
              <li>✓ You're ready to start receiving proposals</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep} size="lg">
          Back to Edit
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          size="lg"
          className="min-w-[200px]"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
              Posting...
            </>
          ) : (
            <>
              <Rocket className="w-4 h-4 mr-2" />
              Post Project
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
