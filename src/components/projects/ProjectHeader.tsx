/**
 * Project Header Component
 * Displays project title, badges, and metadata
 */

import React from "react";
import {
  Calendar,
  Briefcase,
  Clock,
  Zap,
  CheckCircle,
  Pause,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/apis/types/shared.types";

interface Props {
  project: Project;
}

const getStatusConfig = (status: string) => {
  const configs = {
    pending: {
      icon: Clock,
      className: "bg-warning/10 text-warning border-warning/20",
      label: "Pending",
    },
    "in-progress": {
      icon: Zap,
      className: "bg-accent/10 text-accent border-accent/20",
      label: "In Progress",
    },
    completed: {
      icon: CheckCircle,
      className: "bg-success/10 text-success border-success/20",
      label: "Completed",
    },
    "on-hold": {
      icon: Pause,
      className: "bg-muted text-muted-foreground border-border",
      label: "On Hold",
    },
  };
  return (
    configs[status as keyof typeof configs] || {
      icon: AlertCircle,
      className: "bg-muted text-muted-foreground border-border",
      label: status,
    }
  );
};

const getProjectTypeConfig = (type: string) => {
  const configs = {
    direct: {
      className: "bg-primary/10 text-primary border-primary/20",
      label: "Direct Assignment",
    },
    listed: {
      className: "bg-accent/10 text-accent border-accent/20",
      label: "Listed Project",
    },
    instant: {
      className: "bg-success/10 text-success border-success/20",
      label: "Instant Hire",
    },
  };
  return (
    configs[type as keyof typeof configs] || {
      className: "bg-muted text-muted-foreground border-border",
      label: type,
    }
  );
};

const getUrgencyConfig = (urgency?: string) => {
  if (!urgency) return null;
  const configs = {
    low: {
      className: "bg-muted/50 text-muted-foreground",
      label: "Low Priority",
    },
    medium: {
      className: "bg-warning/10 text-warning",
      label: "Medium Priority",
    },
    high: {
      className: "bg-destructive/10 text-destructive",
      label: "High Priority",
    },
  };
  return configs[urgency as keyof typeof configs];
};

export const ProjectHeader: React.FC<Props> = ({ project }) => {
  const statusConfig = getStatusConfig(project.status);
  const projectTypeConfig = getProjectTypeConfig(project.projectType);
  const urgencyConfig = getUrgencyConfig(project.urgencyLevel);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge className={projectTypeConfig.className}>
          <Briefcase className="w-3 h-3 mr-1" />
          {projectTypeConfig.label}
        </Badge>
        <Badge className={statusConfig.className}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {statusConfig.label}
        </Badge>
        {urgencyConfig && (
          <Badge className={urgencyConfig.className}>
            <Zap className="w-3 h-3 mr-1" />
            {urgencyConfig.label}
          </Badge>
        )}
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-4">
        {project.title}
      </h1>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>Posted {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
