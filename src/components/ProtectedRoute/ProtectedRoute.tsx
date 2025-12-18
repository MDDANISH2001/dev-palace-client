import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { useVerifyAuth } from "@/apis";
import { useSocketAuth } from "@/socket/hooks/useSocketContext";

interface ProtectedRouteProps<P = Record<string, unknown>> {
  component: React.ComponentType<P>;
  allowedRoles?: ("client" | "developer")[]; // Optional role-based access
  // allow any extra props that will be forwarded to the wrapped component
  [key: string]: unknown;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  allowedRoles,
  ...props
}) => {
  const location = useLocation();
  const { data, isLoading: loadingAuth, isError } = useVerifyAuth();
  const { connectSockets, disconnectSockets } = useSocketAuth();

  useEffect(() => {
    // Sync user data to localStorage when authenticated (for UI purposes only)
    if (data?.data?.isAuthenticated && data.data.user) {
      localStorage.setItem("user", JSON.stringify(data.data.user));
      // Connect sockets when user is authenticated
      connectSockets();
    } else {
      // Clear stale user data if not authenticated
      localStorage.removeItem("user");
      // Disconnect sockets when not authenticated
      disconnectSockets();
    }
  }, [data, connectSockets, disconnectSockets]);

  // Show loading spinner while checking authentication
  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated or error occurred
  if (isError || !data?.data?.isAuthenticated) {
    // Clear any stale data
    localStorage.removeItem("user");
    disconnectSockets();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const user = data.data.user;

  // Check role-based access if allowedRoles is specified
  if (allowedRoles && allowedRoles.length > 0 && user) {
    if (!allowedRoles.includes(user.userType)) {
      // User is authenticated but doesn't have the required role
      // Redirect to their appropriate dashboard
      const redirectPath =
        user.userType === "developer"
          ? "/developer/dashboard"
          : "/client/dashboard";

      return <Navigate to={redirectPath} replace />;
    }
  }

  // User is authenticated (and has correct role if specified)
  // Forward props to the wrapped component
  return <Component {...(props as Record<string, unknown>)} />;
};
