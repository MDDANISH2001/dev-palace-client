/**
 * Step 5: Media Upload & SOW
 * Upload project files, mockups, and statement of work
 */

import React from "react";
import { FileText, Link as LinkIcon } from "lucide-react";
import { useProjectFormStore } from "@/store/useProjectFormStore";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/FileUpload";
import { SOWGenerator } from "@/components/projects/SOWGenerator";
import type { MediaType } from "@/apis/types/project.types";

export const MediaUploadStep: React.FC = () => {
  const { formData, setFormField, addMedia, nextStep, prevStep } =
    useProjectFormStore();

  const handleFilesUploaded = (files: Array<{ url: string; type: string }>) => {
    files.forEach((file) => {
      addMedia(file as MediaType);
    });
  };

  const handleContinue = () => {
    nextStep(); // Go to review
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Additional Files (Optional)</h2>
        <p className="text-muted-foreground">
          Upload mockups, requirements documents, or any reference materials
        </p>
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <label className="text-sm font-medium">Project Files</label>
        </div>
        <FileUpload
          onFilesUploaded={handleFilesUploaded}
          maxFiles={5}
          maxSizeMB={10}
        />
        <p className="text-xs text-muted-foreground">
          💡 Supported formats: Images (JPG, PNG, GIF, WebP), PDFs, Documents
          (DOC, DOCX)
        </p>
      </div>

      {/* Statement of Work Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <label className="text-sm font-medium text-foreground">
            Statement of Work (SOW)
          </label>
          <span className="text-xs text-muted-foreground">(Optional)</span>
        </div>

        {/* SOW Generator */}
        <SOWGenerator />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-card text-muted-foreground">OR</span>
          </div>
        </div>

        {/* Manual URL Input */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-muted-foreground" />
            <label className="text-sm font-medium text-foreground">
              Provide Your Own SOW URL
            </label>
          </div>
          <input
            type="url"
            value={formData.sowUrl}
            onChange={(e) => setFormField("sowUrl", e.target.value)}
            placeholder="https://docs.google.com/document/..."
            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring outline-none bg-background text-foreground placeholder:text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground">
            If you already have a SOW document hosted elsewhere (Google Docs,
            Notion, Dropbox, etc.)
          </p>
        </div>
      </div>

      {/* Info Box */}
      <div className="border-2 border-dashed border-border rounded-lg p-4 bg-muted/30">
        <h3 className="font-semibold mb-2 text-sm text-foreground">
          Why provide files & SOW?
        </h3>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Help developers understand your vision better</li>
          <li>• Provide visual mockups or wireframes</li>
          <li>• Share technical specifications or requirements</li>
          <li>• Clear SOW reduces miscommunication</li>
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleContinue}>Continue to Final Review</Button>
      </div>
    </div>
  );
};
