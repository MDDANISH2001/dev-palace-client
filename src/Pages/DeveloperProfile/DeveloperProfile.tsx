/**
 * Developer Profile Page
 * Public profile page for developers
 */

import React from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useGetDeveloperProfile } from "@/apis/hooks/useDeveloper";
import { Button } from "@/components/ui/button";

// Profile Components
import DeveloperProfileHeader from "@/components/developers/DeveloperProfileHeader";
import DeveloperAbout from "@/components/developers/DeveloperAbout";
import DeveloperSkills from "@/components/developers/DeveloperSkills";
import DeveloperPortfolio from "@/components/developers/DeveloperPortfolio";
import DeveloperReviews from "@/components/developers/DeveloperReviews";
import DeveloperContact from "@/components/developers/DeveloperContact";

export const DeveloperProfile: React.FC = () => {
  const { devId } = useParams<{ devId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetDeveloperProfile(devId || "");

  const developer = data?.data?.developer;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !developer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Developer Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            The developer profile you're looking for doesn't exist or has been
            removed.
          </p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Back Button */}
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <DeveloperProfileHeader developer={developer} />
            <DeveloperAbout developer={developer} />
            <DeveloperSkills skills={developer.skills || []} />
            <DeveloperPortfolio developer={developer} />
            <DeveloperReviews reviews={developer.reviews || []} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <DeveloperContact developer={developer} onNavigate={navigate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;
