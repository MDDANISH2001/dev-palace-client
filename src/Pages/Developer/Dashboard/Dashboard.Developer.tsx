import React from "react";
import {
  FiCode,
  FiDollarSign,
  FiMessageSquare,
  FiTrendingUp,
} from "react-icons/fi";

export const DeveloperDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Here's what's happening with your gigs today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FiCode className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Gigs</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <FiTrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">48</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FiDollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold text-foreground">$24,500</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <FiMessageSquare className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Messages</p>
                <p className="text-2xl font-bold text-foreground">7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
              <FiCode className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Dashboard Coming Soon
            </h2>
            <p className="text-muted-foreground mb-6">
              Your full developer dashboard with gig management, earnings
              analytics, and client messages will be available here.
            </p>
            <div className="inline-flex gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full">
                <FiCode className="h-4 w-4" />
                Gig Management
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent rounded-full">
                <FiDollarSign className="h-4 w-4" />
                Earnings
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full">
                <FiMessageSquare className="h-4 w-4" />
                Messages
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
