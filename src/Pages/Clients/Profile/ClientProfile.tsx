import React, { useState } from 'react';
import { useClientProfile } from '@/apis/hooks/clientHooks/clients.hook';
import { useClientProfileStore } from '@/store/clientStore/clientProfile';
import type { IClient } from '@/types/clientTypes/clientAuth.types';
import { ProfileBasicInfo } from './ProfileBasicInfo';
import { ProfileImageUpload } from './ProfileImageUpload';
import { DevelopersHiredSection } from './DevelopersHiredSection';
import { ProjectsPostedSection } from './ProjectsPostedSection';
import { ReviewsSection } from './ReviewsSection';

export const ClientProfile: React.FC = () => {
  const { data, isLoading, isError } = useClientProfile();
  const [isSaving, setIsSaving] = useState(false);
  const { setClientProfile } = useClientProfileStore();

  const clientData = data?.data || null;

  const handleProfileUpdate = async (updatedProfile: Partial<IClient>) => {
    setIsSaving(true);
    try {
      if (clientData) {
        const updated = { ...clientData, ...updatedProfile };
        setClientProfile({ client: updated });
      }
    } catch (error) {
      throw new Error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (imageUrl: string) => {
    setIsSaving(true);
    try {
      if (clientData) {
        const updated = { ...clientData, profileImg: imageUrl };
        setClientProfile({ client: updated });
      }
    } catch (error) {
      throw new Error('Failed to upload image');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (isError || !clientData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load profile</p>
          <p className="text-muted-foreground">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-6">
            <img
              src={clientData.profileImg || '/default-avatar.png'}
              alt={clientData.name}
              className="w-24 h-24 rounded-lg object-cover border-4 border-primary/20"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-foreground">
                  {clientData.name}
                </h1>
                {clientData.isVerified && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mt-2">{clientData.email}</p>
              {clientData.company && (
                <p className="text-sm text-muted-foreground mt-1">
                  {clientData.company}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Profile Image Upload */}
          <ProfileImageUpload
            currentImage={clientData.profileImg}
            onImageUpload={handleImageUpload}
            isLoading={isSaving}
          />

          {/* Basic Information */}
          <ProfileBasicInfo
            profile={clientData}
            onSave={handleProfileUpdate}
            isLoading={isSaving}
          />

          {/* Reviews Section */}
          <ReviewsSection reviews={clientData.reviews} />

          {/* Two Column Layout for Developers and Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DevelopersHiredSection developers={clientData.developersHired} />
            <ProjectsPostedSection projects={clientData.projectsPosted} />
          </div>
        </div>
      </div>
    </div>
  );
};
