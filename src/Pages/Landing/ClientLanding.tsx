import React from "react";
import { Route, Routes } from "react-router";
import ClientDashboard from "../Clients/Dashboard/Dashboard.Client";
import { PostProjectForm } from "../Clients/PostProjects";
import { ManageDevs } from "../Clients/ManageDevs/ManageDevs";
import { NotVerified } from "@/components/NotVerified/NotVerified";
// import { ProjectDetails } from "../Projects/ProjectDetails";

export const ClientLanding: React.FC = () => {
  const isVerified = localStorage.getItem("emailVerified");

  return isVerified ? (
    <div className="w-full h-full flex flex-col overflow-auto">
      <Routes>
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/post-project" element={<PostProjectForm />} />
        <Route path="/manage-devs" element={<ManageDevs />} />
      </Routes>
    </div>
  ) : (
    <NotVerified />
  );
};
