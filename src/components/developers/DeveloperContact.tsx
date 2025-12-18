/**
 * Developer Contact Sidebar Component
 * Shows hourly rate and contact button
 */

import React from "react";
import { DollarSign, MessageCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Developer } from "@/apis/types/shared.types";
import { Link } from "react-router";

interface Props {
  developer: Developer;
  onNavigate: (path: string) => void;
}

const DeveloperContact: React.FC<Props> = ({ developer, onNavigate }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-6">
      <h3 className="font-semibold text-foreground mb-4">Contact</h3>

      {/* Hourly Rate */}
      {developer.hourlyRate !== undefined && (
        <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <DollarSign className="w-4 h-4" />
            <span>Hourly Rate</span>
          </div>
          <p className="text-2xl font-bold text-primary">
            ${developer.hourlyRate}
            <span className="text-sm font-normal text-muted-foreground">
              /hr
            </span>
          </p>
        </div>
      )}

      {/* Contact Info */}
      <div className="space-y-3 mb-6">
        {developer.email && (
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <Link
              to={`mailto:${developer.email}`}
              className="text-primary hover:underline truncate"
            >
              {developer.email}
            </Link>
          </div>
        )}
        {developer.phone && (
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <Link
              to={`tel:${developer.phone}`}
              className="text-primary hover:underline"
            >
              {developer.phone}
            </Link>
          </div>
        )}
      </div>

      {/* Message Button */}
      <Button
        onClick={() => onNavigate(`/chat/${developer._id}`)}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Send Message
      </Button>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-3">Quick Stats</h4>
        <div className="space-y-2 text-sm">
          {developer.projectsCompleted && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Projects Completed</span>
              <span className="font-medium text-foreground">
                {developer.projectsCompleted.length}
              </span>
            </div>
          )}
          {developer.reviews && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Reviews</span>
              <span className="font-medium text-foreground">
                {developer.reviews.length}
              </span>
            </div>
          )}
          {developer.experience !== undefined && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Experience</span>
              <span className="font-medium text-foreground">
                {developer.experience} years
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeveloperContact;
