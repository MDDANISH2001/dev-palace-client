import React, { useState } from "react";
import { FileUpload } from "@/components/ui/FileUpload";
// import { Button } from '@/components/ui/button';

interface ProfileImageUploadProps {
  currentImage?: string;
  onImageUpload: (imageUrl: string) => Promise<void>;
  isLoading: boolean;
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  currentImage,
  onImageUpload,
  isLoading,
}) => {
  console.log("isLoading :", isLoading);
  const [, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleFilesUploaded = async (
    files: Array<{ url: string; type: string }>,
  ) => {
    if (files.length === 0) return;

    const imageFile = files[0];
    if (!imageFile.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setIsUploading(true);
    try {
      await onImageUpload(imageFile.url);
      setUploadedImageUrl(imageFile.url);
    } catch {
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const displayImage = uploadedImageUrl || currentImage;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">
        Profile Picture
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Image Preview */}
        <div className="flex flex-col items-center justify-center">
          {displayImage ? (
            <div className="relative">
              <img
                src={displayImage}
                alt="Profile"
                className="w-48 h-48 rounded-lg object-cover border-2 border-border"
              />
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Current Profile Picture
              </div>
            </div>
          ) : (
            <div className="w-48 h-48 rounded-lg bg-secondary border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl text-muted-foreground mb-2">
                  {currentImage ? "?" : "No Image"}
                </div>
                <p className="text-xs text-muted-foreground">
                  No profile picture yet
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Upload Section */}
        <div>
          <FileUpload
            onFilesUploaded={handleFilesUploaded}
            maxFiles={1}
            maxSizeMB={5}
            acceptedTypes={[
              "image/jpeg",
              "image/jpg",
              "image/png",
              "image/gif",
              "image/webp",
            ]}
          />
          <p className="text-xs text-muted-foreground mt-4">
            Recommended: Square image, at least 400x400px
          </p>
        </div>
      </div>
    </div>
  );
};
