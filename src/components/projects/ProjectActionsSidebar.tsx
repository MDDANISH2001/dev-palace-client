/**
 * Project Actions Sidebar Component
 * Action buttons based on user role (client/developer)
 */

import React from "react";
import {
  CheckCircle,
  XCircle,
  MessageCircle,
  Bookmark,
  Send,
  Flag,
  Users,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  userRole?: string;
  isOwner: boolean;
  isAssignedDeveloper: boolean;
  clientId: string;
  projectId: string;
  onNavigate: (path: string) => void;
}

export const ProjectActionsSidebar: React.FC<Props> = ({
  userRole,
  isOwner,
  isAssignedDeveloper,
  clientId,
  projectId,
  onNavigate,
}) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-6">
      <h3 className="font-semibold text-foreground mb-4">Actions</h3>
      <div className="space-y-3">
        {/* Developer Actions */}
        {userRole === "developer" && !isOwner && (
          <>
            {isAssignedDeveloper ? (
              <>
                <Button className="w-full bg-success hover:bg-success/90 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept Project
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-destructive text-destructive hover:bg-destructive/10"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onNavigate(`/chat/${clientId}`)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Negotiate
                </Button>
              </>
            ) : (
              <>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4 mr-2" />
                  Apply to Project
                </Button>
                <Button variant="outline" className="w-full">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save Project
                </Button>
              </>
            )}
          </>
        )}

        {/* Client Actions */}
        {isOwner && (
          <>
            <Button className="w-full bg-primary hover:bg-primary/90">
              <Users className="w-4 h-4 mr-2" />
              View Applicants
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onNavigate(`/projects/${projectId}/edit`)}
            >
              <FileText className="w-4 h-4 mr-2" />
              Edit Project
            </Button>
          </>
        )}

        {/* Common Actions */}
        <Button
          variant="outline"
          className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
        >
          <Flag className="w-4 h-4 mr-2" />
          Report Issue
        </Button>
      </div>
    </div>
  );
};

export default ProjectActionsSidebar;
