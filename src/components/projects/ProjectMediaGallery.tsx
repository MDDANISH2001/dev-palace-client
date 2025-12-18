/**
 * Project Media Gallery Component
 * Displays project attachments and media files
 */

import React from "react";
import { Image, FileText, ExternalLink } from "lucide-react";
import { NavLink } from "react-router";

interface MediaItem {
  url: string;
  type: string;
}

interface Props {
  media: MediaItem[];
}

export const ProjectMediaGallery: React.FC<Props> = ({ media }) => {
  if (!media || media.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Image className="w-5 h-5 text-primary" />
        Attachments ({media.length})
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {media.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-video bg-muted rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors"
          >
            {item.type?.startsWith("image") ? (
              <img
                src={item.url}
                alt={`Attachment ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <FileText className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-xs text-muted-foreground text-center truncate w-full">
                  {item.type}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ProjectMediaGallery;
