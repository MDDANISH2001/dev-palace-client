/**
 * File Upload Component
 * Drag-and-drop file uploader with 10MB limit
 * Supports images (jpg, png, gif, webp), PDFs, and documents (doc, docx)
 */

import React, { useState, useRef } from "react";
import { Upload, X, File, FileText, Image } from "lucide-react";
import { Button } from "./button";

interface UploadedFile {
  file: File;
  preview?: string;
  progress: number;
  error?: string;
}

interface FileUploadProps {
  onFilesUploaded: (urls: Array<{ url: string; type: string }>) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  className?: string;
}

const ACCEPTED_TYPES = {
  images: ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"],
  documents: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

const ALL_ACCEPTED = [...ACCEPTED_TYPES.images, ...ACCEPTED_TYPES.documents];

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesUploaded,
  maxFiles = 5,
  maxSizeMB = 10,
  acceptedTypes = ALL_ACCEPTED,
  className = "",
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  /**
   * Validate file size and type
   */
  const validateFile = (file: File): string | null => {
    if (file.size > maxSizeBytes) {
      return `File size exceeds ${maxSizeMB}MB limit`;
    }

    if (!acceptedTypes.includes(file.type)) {
      return "File type not supported";
    }

    return null;
  };

  /**
   * Create preview for image files
   */
  const createPreview = (file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        resolve(undefined);
      }
    });
  };

  /**
   * Handle file selection
   */
  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: UploadedFile[] = [];
    const filesToUpload = Array.from(fileList).slice(
      0,
      maxFiles - files.length
    );

    for (const file of filesToUpload) {
      const error = validateFile(file);
      const preview = await createPreview(file);

      newFiles.push({
        file,
        preview,
        progress: 0,
        error: error || undefined,
      });
    }

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress and call callback
    newFiles.forEach((uploadedFile, index) => {
      if (!uploadedFile.error) {
        simulateUpload(files.length + index, uploadedFile.file);
      }
    });
  };

  /**
   * Simulate file upload (replace with actual upload logic)
   */
  const simulateUpload = (index: number, file: File) => {
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFiles((prev) =>
        prev.map((f, i) => (i === index ? { ...f, progress } : f))
      );

      if (progress >= 100) {
        clearInterval(interval);
        // In real implementation, this would be the actual uploaded URL
        const mockUrl = URL.createObjectURL(file);
        onFilesUploaded([{ url: mockUrl, type: file.type }]);
      }
    }, 200);
  };

  /**
   * Remove file from list
   */
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * Drag and drop handlers
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  /**
   * File input change handler
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  /**
   * Get file icon based on type
   */
  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <Image className="w-8 h-8" />;
    if (type === "application/pdf") return <FileText className="w-8 h-8" />;
    return <File className="w-8 h-8" />;
  };

  const canAddMore = files.length < maxFiles;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop Zone */}
      {canAddMore && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors duration-200
            ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }
          `}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm font-medium mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            Images, PDFs, or Documents (Max {maxSizeMB}MB each)
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {files.length} / {maxFiles} files uploaded
          </p>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(",")}
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((uploadedFile, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 border rounded-lg bg-card"
            >
              {/* File Icon/Preview */}
              <div className="shrink-0">
                {uploadedFile.preview ? (
                  <img
                    src={uploadedFile.preview}
                    alt={uploadedFile.file.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="text-muted-foreground">
                    {getFileIcon(uploadedFile.file.type)}
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {uploadedFile.file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                </p>

                {/* Progress Bar */}
                {!uploadedFile.error && uploadedFile.progress < 100 && (
                  <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${uploadedFile.progress}%` }}
                    />
                  </div>
                )}

                {/* Error Message */}
                {uploadedFile.error && (
                  <p className="text-xs text-destructive mt-1">
                    {uploadedFile.error}
                  </p>
                )}

                {/* Success */}
                {uploadedFile.progress === 100 && !uploadedFile.error && (
                  <p className="text-xs text-green-600 mt-1">Uploaded ✓</p>
                )}
              </div>

              {/* Remove Button */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
