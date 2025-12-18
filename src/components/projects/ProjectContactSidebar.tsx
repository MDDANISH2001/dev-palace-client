/**
 * Project Contact Sidebar Component
 * Message client button (only for non-owners)
 */

import React from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  isOwner: boolean;
  clientId: string;
  onNavigate: (path: string) => void;
}

export const ProjectContactSidebar: React.FC<Props> = ({
  isOwner,
  clientId,
  onNavigate,
}) => {
  if (isOwner) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold text-foreground mb-4">Need Help?</h3>
      <Button
        variant="outline"
        className="w-full text-foreground border-foreground/20"
        onClick={() => onNavigate(`/chat/${clientId}`)}
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Message Client
      </Button>
    </div>
  );
};

export default ProjectContactSidebar;
