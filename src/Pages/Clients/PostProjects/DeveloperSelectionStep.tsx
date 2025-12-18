/**
 * Step 4: Developer Selection (Only for Direct Projects)
 * Select developers from your chat history
 */

import React, { useState } from "react";
import { Search, User, Check } from "lucide-react";
import { useProjectFormStore } from "@/store/useProjectFormStore";
import { Button } from "@/components/ui/button";
import { useGetSelectableDevelopers } from "@/apis/hooks/useProject";
import { toast } from "react-toastify";
import type { SelectableDeveloper } from "@/apis/types/project.types";

export const DeveloperSelectionStep: React.FC = () => {
  const { formData, setFormField, nextStep, prevStep } = useProjectFormStore();
  const { data, isLoading, error } = useGetSelectableDevelopers();
  const [searchQuery, setSearchQuery] = useState("");

  const developers = data?.data || [];
  const selectedDevelopers = formData.developerId || [];

  // Filter developers based on search
  const filteredDevelopers = developers.filter(
    (dev) =>
      dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const toggleDeveloper = (devId: string) => {
    if (selectedDevelopers.includes(devId)) {
      setFormField(
        "developerId",
        selectedDevelopers.filter((id) => id !== devId)
      );
    } else {
      setFormField("developerId", [...selectedDevelopers, devId]);
    }
  };

  const handleContinue = () => {
    if (selectedDevelopers.length === 0 && developers.length !== 0) {
      toast.error("Please select at least one developer");
      return;
    }
    nextStep();
  };

  // Availability badge colors
  const getAvailabilityBadge = (
    availability: SelectableDeveloper["availability"]
  ) => {
    const colors = {
      available: "bg-green-100 text-green-700 border-green-300",
      offline: "bg-gray-100 text-gray-700 border-gray-300",
      busy: "bg-yellow-100 text-yellow-700 border-yellow-300",
    };
    return colors[availability];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Select Developers</h2>
        <p className="text-muted-foreground">
          Choose developers you've previously worked with for direct assignment
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or skills..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-ring outline-none"
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading developers...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-destructive mb-2">Failed to load developers</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && developers.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <User className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-medium mb-2">No developers found</p>
          <p className="text-sm text-muted-foreground">
            You haven't worked with any developers yet.
            <br />
            Try posting as "Public" or "Instant Match" instead.
          </p>
        </div>
      )}

      {/* Developers List */}
      {!isLoading && filteredDevelopers.length > 0 && (
        <div className="space-y-3">
          {filteredDevelopers.map((developer) => {
            const isSelected = selectedDevelopers.includes(developer.devId);

            return (
              <button
                key={developer.devId}
                type="button"
                onClick={() => toggleDeveloper(developer.devId)}
                className={`
                  w-full p-4 border-2 rounded-lg text-left transition-all
                  ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="shrink-0">
                    {developer.profileImg ? (
                      <img
                        src={developer.profileImg}
                        alt={developer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{developer.name}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${getAvailabilityBadge(
                          developer.availability
                        )}`}
                      >
                        {developer.availability}
                      </span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {developer.skills.slice(0, 5).map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-0.5 bg-secondary rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {developer.skills.length > 5 && (
                        <span className="text-xs px-2 py-0.5 text-muted-foreground">
                          +{developer.skills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="shrink-0">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* No Search Results */}
      {!isLoading &&
        searchQuery &&
        filteredDevelopers.length === 0 &&
        developers.length > 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="font-medium mb-2">No developers found</p>
            <p className="text-sm text-muted-foreground">
              Try a different search term
            </p>
          </div>
        )}

      {/* Selected Count */}
      {selectedDevelopers.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
          <p className="text-sm font-medium text-primary">
            {selectedDevelopers.length} developer
            {selectedDevelopers.length > 1 ? "s" : ""} selected
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={selectedDevelopers.length === 0 && developers.length !== 0}
        >
          {developers.length === 0 ? "Skip" : "Continue"}
        </Button>
      </div>
    </div>
  );
};
