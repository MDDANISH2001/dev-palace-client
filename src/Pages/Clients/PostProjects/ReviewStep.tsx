/**
 * Step 6: Review & Submit
 * Final review before posting the project
 */

import React from "react";
import {
  CheckCircle2,
  Edit2,
  DollarSign,
  Clock,
  AlertCircle,
  FileText,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { useProjectFormStore } from "@/store/useProjectFormStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

const PROJECT_TYPE_ICONS = {
  direct: <Target className="w-4 h-4" />,
  listed: <Users className="w-4 h-4" />,
  instant: <Zap className="w-4 h-4" />,
};

const PROJECT_TYPE_LABELS = {
  direct: "Direct Assignment",
  listed: "Public Listing",
  instant: "Instant Match",
};

export const ReviewStep: React.FC = () => {
  const { formData, setCurrentStep, prevStep, nextStep } =
    useProjectFormStore();

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Review Your Project</h2>
        <p className="text-muted-foreground">
          Make sure everything looks good before posting
        </p>
      </div>

      {/* Project Type */}
      <div className="bg-card border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            {formData.projectType && PROJECT_TYPE_ICONS[formData.projectType]}
            Project Type
          </h3>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(1)}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm">
          {formData.projectType && PROJECT_TYPE_LABELS[formData.projectType]}
        </p>
      </div>

      {/* Basic Info */}
      <div className="bg-card border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Basic Information</h3>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(2)}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-xs text-muted-foreground">Title</p>
            <p className="text-sm font-medium">{formData.title}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Description</p>
            <p className="text-sm line-clamp-3">{formData.description}</p>
          </div>
          {formData.location && (
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-sm">{formData.location}</p>
            </div>
          )}
        </div>
      </div>

      {/* Project Details */}
      <div className="bg-card border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Project Details</h3>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(3)}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-3">
          {/* Skills */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              Required Skills
            </p>
            <div className="flex flex-wrap gap-1">
              {formData.skillsRequired.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Budget */}
          {formData.budget && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Budget Range</p>
                <p className="text-sm font-medium">
                  ${formData.budget.min.toLocaleString()} - $
                  {formData.budget.max.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {/* Duration */}
          {formData.durationEstimate && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-sm font-medium">
                  {formData.durationEstimate}
                </p>
              </div>
            </div>
          )}

          {/* Urgency */}
          {formData.urgencyLevel && (
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Urgency</p>
                <p className="text-sm font-medium capitalize">
                  {formData.urgencyLevel}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Developers (for direct projects) */}
      {formData.projectType === "direct" && formData.developerId.length > 0 && (
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Selected Developers</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(4)}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm">
            {formData.developerId.length} developer(s) selected
          </p>
        </div>
      )}

      {/* Media & Files */}
      {(formData.media.length > 0 || formData.sowUrl) && (
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Files & Documents</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(5)}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {formData.media.length > 0 && (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm">
                  {formData.media.length} file(s) uploaded
                </p>
              </div>
            )}
            {formData.sowUrl && (
              <div>
                <p className="text-xs text-muted-foreground">SOW Document</p>
                <Link
                  to={formData.sowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View document →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Important Notice */}
      <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4">
        <h3 className="font-semibold mb-2 text-sm">Before you submit:</h3>
        <ul className="text-xs space-y-1 text-muted-foreground">
          <li>✓ All information is accurate and complete</li>
          <li>✓ Your budget range is realistic for the scope</li>
          <li>✓ Skills and requirements are clearly defined</li>
          <li>✓ You're ready to communicate with developers</li>
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button type="button" onClick={nextStep} size="lg">
          Continue to Final Review
        </Button>
      </div>
    </div>
  );
};
