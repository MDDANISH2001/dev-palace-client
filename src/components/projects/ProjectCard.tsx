import React from "react";
import { Link } from "react-router";
import {
  Clock,
  DollarSign,
  Briefcase,
  Calendar,
  Zap,
  AlertCircle,
  CheckCircle,
  Pause,
} from "lucide-react";
import type { Project } from "@/apis/types/shared.types";
import { Badge } from "@/components/ui/badge";

interface Props {
  project: Project;
  currentUserId?: string | null;
}

const formatRelative = (iso?: string) => {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  const now = Date.now();
  const seconds = Math.floor((now - then) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
};

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
      label: "Direct",
    },
    listed: {
      className: "bg-accent/10 text-accent border-accent/20",
      label: "Listed",
    },
    instant: {
      className: "bg-success/10 text-success border-success/20",
      label: "Instant",
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
    low: { className: "bg-muted text-muted-foreground", label: "Low" },
    medium: { className: "bg-warning/10 text-warning", label: "Medium" },
    high: { className: "bg-destructive/10 text-destructive", label: "High" },
  };
  return configs[urgency as keyof typeof configs];
};

export const ProjectCard: React.FC<Props> = ({ project, currentUserId }) => {
  const isOwner = project.clientId === currentUserId;
  const statusConfig = getStatusConfig(project.status);
  const projectTypeConfig = getProjectTypeConfig(project.projectType);
  const urgencyConfig = getUrgencyConfig(project.urgencyLevel);
  const StatusIcon = statusConfig.icon;

  return (
    <Link to={`/project-details/${project._id}`}>
      <article className="group relative p-6 rounded-xl border border-border bg-card hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors mb-2 line-clamp-1">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2">
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
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 grow">
          {project.description}
        </p>

        {/* Skills */}
        {project.skillsRequired && project.skillsRequired.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.skillsRequired.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 rounded-md text-xs bg-secondary text-secondary-foreground"
              >
                {skill}
              </span>
            ))}
            {project.skillsRequired.length > 3 && (
              <span className="px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">
                +{project.skillsRequired.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer Info */}
        <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            {project.budget && (
              <div className="flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" />
                <span>
                  ${project.budget.min} - ${project.budget.max}
                </span>
              </div>
            )}
            {project.durationEstimate && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{project.durationEstimate}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatRelative(project.createdAt)}</span>
          </div>
        </div>

        {/* Owner Badge */}
        {isOwner && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] px-2 py-0.5">
              Your Project
            </Badge>
          </div>
        )}
      </article>
    </Link>
  );
};

export default ProjectCard;
