/**
 * Project SOW Component
 * Displays Statement of Work document link
 */

import React from "react";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Link } from "react-router";

interface Props {
  sowUrl: string;
}

export const ProjectSOW: React.FC<Props> = ({ sowUrl }) => {
  if (!sowUrl) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        Statement of Work
      </h2>
      <Link
        to={sowUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors group"
      >
        <Download className="w-5 h-5 text-primary" />
        <div className="flex-1">
          <p className="font-medium text-foreground">View SOW Document</p>
          <p className="text-xs text-muted-foreground">
            Click to open in new tab
          </p>
        </div>
        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </Link>
    </div>
  );
};

export default ProjectSOW;
