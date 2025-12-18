/**
 * SOW Generator Component
 * Generate Statement of Work using AI based on project details
 */

import React, { useState } from "react";
import { Sparkles, FileText, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGenerateSOW } from "@/apis/hooks/useProject";
import { useProjectFormStore } from "@/store/useProjectFormStore";
import { toast } from "react-toastify";
import { Link } from "react-router";

export const SOWGenerator: React.FC = () => {
  const { formData, setFormField } = useProjectFormStore();
  const { mutateAsync: generateSOW, isPending } = useGenerateSOW();
  const [generatedSOW, setGeneratedSOW] = useState<{
    sowUrl: string;
    documentId: string;
  } | null>(null);

  const handleGenerate = async () => {
    // Validation
    if (!formData.title || !formData.description) {
      toast.error("Please complete project title and description first");
      return;
    }

    try {
      const response = await generateSOW({
        title: formData.title,
        description: formData.description,
        skillsRequired: formData.skillsRequired,
        budget: formData.budget || undefined,
        durationEstimate: formData.durationEstimate || undefined,
        projectType: formData.projectType || undefined,
      });

      setGeneratedSOW({
        sowUrl: response.data.sowUrl,
        documentId: response.data.documentId,
      });

      // Save to form data
      setFormField("sowUrl", response.data.sowUrl);

      toast.success("SOW generated successfully! ✨");
    } catch (error) {
      console.error("SOW generation error:", error);
      toast.error("Failed to generate SOW. Please try again.");
    }
  };

  return (
    <div className="border border-border rounded-lg p-6 bg-card">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h3 className="font-semibold mb-1 text-foreground">
              Generate Statement of Work with AI
            </h3>
            <p className="text-sm text-muted-foreground">
              Let AI create a professional SOW document based on your project
              details. It will include scope, deliverables, timeline, and terms.
            </p>
          </div>

          {!generatedSOW ? (
            <Button
              type="button"
              onClick={handleGenerate}
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating SOW...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate SOW
                </>
              )}
            </Button>
          ) : (
            <div className="space-y-3">
              {/* Success Message */}
              <div className="flex items-center gap-2 text-sm text-success">
                <FileText className="w-4 h-4" />
                <span className="font-medium">SOW Generated Successfully!</span>
              </div>

              {/* Preview Link */}
              <Link
                to={generatedSOW.sowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent hover:border-primary transition-colors text-foreground"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-medium">View SOW Document</span>
              </Link>

              {/* Regenerate Button */}
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGenerate}
                  disabled={isPending}
                >
                  Regenerate
                </Button>
                <p className="text-xs text-muted-foreground">
                  Not satisfied? Regenerate to get a different version
                </p>
              </div>
            </div>
          )}

          {/* Info Note */}
          <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
            <span className="font-medium text-foreground">Note:</span> The
            generated SOW is a starting point. You can edit it later from your
            project dashboard.
          </div>
        </div>
      </div>
    </div>
  );
};
