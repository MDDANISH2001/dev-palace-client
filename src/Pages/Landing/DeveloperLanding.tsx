import React from "react";
import { Route, Routes } from "react-router";
import DeveloperDashboard from "../Developer/Dashboard/Dashboard.Developer";
import { NotVerified } from "@/components/NotVerified/NotVerified";

export const DeveloperLanding: React.FC = () => {
  const user = localStorage.getItem("user");
  const isVerified = user ? JSON.parse(user).isVerified : false;
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
