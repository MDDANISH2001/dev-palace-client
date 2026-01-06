import React from "react";
import { Route, Routes } from "react-router";
import DeveloperDashboard from "../Developer/Dashboard/Dashboard.Developer";
import { NotVerified } from "@/components/NotVerified/NotVerified";

export const DeveloperLanding: React.FC = () => {
  const isVerified = localStorage.getItem("emailVerified");

  return isVerified ? (
    <div>
      <Routes>
        <Route path="/dashboard" element={<DeveloperDashboard />} />
      </Routes>
    </div>
  ) : (
    <NotVerified />
  );
};
