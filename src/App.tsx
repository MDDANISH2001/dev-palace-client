import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Landing } from "./Pages/Landing/Landing";
import { LoginPage } from "./Pages/Auth/LoginPage";
import { SignupPage } from "./Pages/Auth/SignupPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import { DeveloperLanding } from "./Pages/Landing/DeveloperLanding";
import { ClientLanding } from "./Pages/Landing/ClientLanding";
import ProjectList from "./Pages/Projects/ProjectList";
import ProjectDetails from "./Pages/Projects/ProjectDetails";
import DeveloperProfile from "./Pages/DeveloperProfile/DeveloperProfile";

function App() {
  const location = useLocation();
  const pathName = location.pathname;
  const isDeveloperRoute = pathName.startsWith("/developer");
  const isClientRoute = pathName.startsWith("/client");

  return (
    <div className="w-screen h-screen overflow-auto bg-background flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />{" "}
      <Navbar
        userRole={
          isDeveloperRoute ? "developer" : isClientRoute ? "client" : "guest"
        }
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes - Require authentication */}
          <Route
            path="/developer/*"
            element={
              <ProtectedRoute
                component={DeveloperLanding}
                allowedRoles={["developer"]}
              />
            }
          />
          <Route
            path="/client/*"
            element={
              <ProtectedRoute
                component={ClientLanding}
                allowedRoles={["client"]}
              />
            }
          />
          <Route
            path="/all-projects"
            element={
              <ProtectedRoute
                component={ProjectList}
                allowedRoles={["client", "developer"]}
              />
            }
          />
          <Route
            path="/project-details/:projectId"
            element={
              <ProtectedRoute
                component={ProjectDetails}
                allowedRoles={["client", "developer"]}
              />
            }
          />

          {/* Public Developer Profile Route */}
          <Route path="/profile/:devId" element={<DeveloperProfile />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
