/**
 * Manage Developers Page
 * Shows connected developers and allows searching for new ones
 */

import React, { useState } from "react";
import { Users, Search as SearchIcon } from "lucide-react";
import {
  useGetConnectedDevelopers,
  useSearchDevelopers,
} from "@/apis/hooks/useDeveloper";
import DeveloperCard from "@/components/developers/DeveloperCard";
import Pagination from "@/components/projects/Pagination";
import type { SearchDevelopersParams } from "@/apis/types/shared.types";

type TabType = "connected" | "search";

export const ManageDevs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("connected");
  const [connectedPage, setConnectedPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);

  // Search filters
  const [searchQuery, setSearchQuery] = useState("");
  const [availability, setAvailability] = useState<
    "available" | "offline" | "busy" | ""
  >("");
  const [experienceLevel, setExperienceLevel] = useState<
    "junior" | "mid" | "senior" | ""
  >("");

  // Fetch connected developers
  const {
    data: connectedData,
    isLoading: connectedLoading,
    error: connectedError,
  } = useGetConnectedDevelopers({ page: connectedPage, limit: 20 });

  // Build search params
  const searchParams: SearchDevelopersParams = {
    page: searchPage,
    limit: 20,
    ...(searchQuery && { search: searchQuery }),
    ...(availability && { availability }),
    ...(experienceLevel && { experienceLevel }),
  };

  // Fetch searched developers
  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = useSearchDevelopers(searchParams);

  const connectedDevelopers = connectedData?.data?.developers || [];
  const connectedPagination = connectedData?.data?.pagination;

  const searchedDevelopers = searchData?.data?.developers || [];
  const searchPagination = searchData?.data?.pagination;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPage(1); // Reset to first page on new search
  };

  const resetFilters = () => {
    setSearchQuery("");
    setAvailability("");
    setExperienceLevel("");
    setSearchPage(1);
  };

  return (
    <div className="container bg-background mx-auto py-12 px-4 text-foreground">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Manage Developers
        </h1>
        <p className="text-muted-foreground">
          Connect with talented developers for your projects
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border">
        <button
          onClick={() => setActiveTab("connected")}
          className={`cursor-pointer px-6 py-3 font-medium transition-colors relative ${
            activeTab === "connected"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" />
          Connected Developers
          {activeTab === "connected" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("search")}
          className={`cursor-pointer px-6 py-3 font-medium transition-colors relative ${
            activeTab === "search"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <SearchIcon className="w-4 h-4 inline mr-2" />
          Search Developers
          {activeTab === "search" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>

      {/* Connected Developers Tab */}
      {activeTab === "connected" && (
        <div>
          {connectedLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-muted rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : connectedError ? (
            <div className="text-center py-12">
              <p className="text-destructive">
                Error loading connected developers
              </p>
            </div>
          ) : connectedDevelopers.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-xl">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Connected Developers
              </h3>
              <p className="text-muted-foreground mb-6">
                You haven't worked with any developers yet. Start by searching
                for developers!
              </p>
              <button
                onClick={() => setActiveTab("search")}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Search Developers
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {connectedDevelopers.map((dev) => (
                  <DeveloperCard
                    key={dev._id}
                    developer={dev}
                    showConnectedBadge={true}
                  />
                ))}
              </div>
              {connectedPagination && (
                <Pagination
                  currentPage={connectedPagination.currentPage}
                  totalPages={connectedPagination.totalPages}
                  onPageChange={setConnectedPage}
                />
              )}
            </>
          )}
        </div>
      )}

      {/* Search Developers Tab */}
      {activeTab === "search" && (
        <div>
          {/* Search and Filters */}
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Search by name, email, or skills
                </label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g., React, Node.js, john@example.com"
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Filters Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Availability Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Availability
                  </label>
                  <select
                    value={availability}
                    onChange={(e) =>
                      setAvailability(
                        e.target.value as "" | "available" | "offline" | "busy"
                      )
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">All</option>
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>

                {/* Experience Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) =>
                      setExperienceLevel(
                        e.target.value as "" | "junior" | "mid" | "senior"
                      )
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">All</option>
                    <option value="junior">Junior (0-2 years)</option>
                    <option value="mid">Mid-Level (3-5 years)</option>
                    <option value="senior">Senior (6+ years)</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <SearchIcon className="w-4 h-4 inline mr-2" />
                  Search
                </button>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-foreground"
                >
                  Reset Filters
                </button>
              </div>
            </form>
          </div>

          {/* Search Results */}
          {searchLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-muted rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : searchError ? (
            <div className="text-center py-12">
              <p className="text-destructive">Error searching developers</p>
            </div>
          ) : searchedDevelopers.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-xl">
              <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Developers Found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Found {searchPagination?.totalCount || 0} developer
                  {searchPagination?.totalCount !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchedDevelopers.map((dev) => (
                  <DeveloperCard key={dev._id} developer={dev} />
                ))}
              </div>
              {searchPagination && (
                <Pagination
                  currentPage={searchPagination.currentPage}
                  totalPages={searchPagination.totalPages}
                  onPageChange={setSearchPage}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
