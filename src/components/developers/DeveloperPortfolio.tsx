/**
 * Developer Portfolio Component
 * Shows portfolio, GitHub, LinkedIn, and media
 */

import React from "react";
import { ExternalLink, FileText } from "lucide-react";
import type { Developer } from "@/apis/types/shared.types";
import { Link } from "react-router";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface Props {
  developer: Developer;
}

const DeveloperPortfolio: React.FC<Props> = ({ developer }) => {
  const hasLinks =
    developer.portfolioUrl || developer.githubUrl || developer.linkedinUrl;
  const hasMedia = developer.media && developer.media.length > 0;

  if (!hasLinks && !hasMedia) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <ExternalLink className="w-5 h-5 text-primary" />
        Portfolio & Links
      </h2>

      {/* External Links */}
      {hasLinks && (
        <div className="space-y-3 mb-6">
          {developer.portfolioUrl && (
            <Link
              to={developer.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-foreground">Portfolio Website</p>
                <p className="text-xs text-muted-foreground truncate">
                  {developer.portfolioUrl}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          )}

          {developer.githubUrl && (
            <Link
              to={developer.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors group"
            >
              <FaGithub className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-foreground">GitHub Profile</p>
                <p className="text-xs text-muted-foreground truncate">
                  {developer.githubUrl}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          )}

          {developer.linkedinUrl && (
            <Link
              to={developer.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors group"
            >
              <FaLinkedin className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-foreground">LinkedIn Profile</p>
                <p className="text-xs text-muted-foreground truncate">
                  {developer.linkedinUrl}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          )}
        </div>
      )}

      {/* Media Gallery */}
      {hasMedia && (
        <div>
          <h3 className="font-medium text-foreground mb-3">Work Samples</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {developer.media?.map((item, idx) => (
              <Link
                key={idx}
                to={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-video bg-muted rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors"
              >
                {item.type.startsWith("image") ? (
                  <img
                    src={item.url}
                    alt={`Work sample ${idx + 1}`}
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
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperPortfolio;
