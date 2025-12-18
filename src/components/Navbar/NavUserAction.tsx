import React, { memo, useCallback, useMemo } from "react";
import { useTheme } from "../theme/use-theme";
import {
  FiFolder,
  FiLogOut,
  FiMessageCircle,
  FiMoon,
  FiSettings,
  FiSun,
  FiUser,
} from "react-icons/fi";
import { NotificationBell } from "../Notifications/NotificationBell";
import { Button } from "../ui/button";
import { CustomDropdown } from "../ui/CustomDropdown";
import type { DropdownOption } from "../ui/CustomDropdown";
import {
  handleLogout,
  handleProfileClick,
  handleSettingsClick,
} from "./navbar";
import { NavLink, useNavigate } from "react-router";
import { useLogout } from "@/apis";

interface NavUserActionProps {
  userRole: string;
  userName?: string;
}
const NavUserActionComponent: React.FC<NavUserActionProps> = ({
  userRole,
  userName,
}) => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  // Toggle theme (stable reference)
  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  // Memoize menu options so the array reference is stable across renders
  const options: DropdownOption[] = useMemo(
    () => [
      {
        label: "Profile",
        icon: <FiUser className="w-4 h-4" />,
        onClick: () => handleProfileClick(userRole, navigate),
      },
      {
        label: "Projects",
        icon: <FiFolder className="w-4 h-4" />,
        onClick: () => navigate("/all-projects"),
      },
      {
        label: "Chats",
        icon: <FiMessageCircle className="w-4 h-4" />,
        onClick: () => navigate("/chats"),
      },
      {
        label: "Settings",
        icon: <FiSettings className="w-4 h-4" />,
        onClick: () => handleSettingsClick(userRole, navigate),
      },
      {
        label: logoutMutation.isPending ? "Logging out..." : "Logout",
        icon: <FiLogOut className="w-4 h-4" />,
        onClick: () => handleLogout(logoutMutation, navigate),
        disabled: logoutMutation.isPending,
        variant: "destructive",
        separator: true,
      },
    ],
    [userRole, navigate, logoutMutation]
  );

  return (
    <div className="hidden lg:flex items-center gap-3">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-200"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <FiSun className="w-5 h-5 text-foreground" />
        ) : (
          <FiMoon className="w-5 h-5 text-foreground" />
        )}
      </button>

      {/* Notification Bell (Only for authenticated users) */}
      {(userRole !== "guest" ||
        location.pathname === "/all-projects" ||
        location.pathname === "/chats") && (
        <NotificationBell
          onNotificationClick={(notificationId, data) => {
            console.log("Notification clicked:", notificationId, data);
            // You can handle navigation here based on notification type
            // For example: navigate to project details, message, etc.
          }}
        />
      )}

      {/* Auth Buttons (Guest) or User Menu (Logged In) */}
      {userRole === "guest" &&
      location.pathname !== "/all-projects" &&
      location.pathname !== "/chats" ? (
        <>
          <Button variant="ghost" size="sm" asChild>
            <NavLink className={"text-foreground"} to="/login">Login</NavLink>
          </Button>
          <Button size="sm" asChild>
            <NavLink className={"text-foreground"} to="/signup">Sign Up</NavLink>
          </Button>
        </>
      ) : (
        <CustomDropdown
          trigger={
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-muted-foreground h-9"
            >
              <FiUser className="w-4 h-4" />
              <span className="text-sm font-medium">{userName || "User"}</span>
            </Button>
          }
          label="My Account"
          align="end"
          width="w-56"
          options={options}
        />
      )}
    </div>
  );
};

export const NavUserAction = memo(NavUserActionComponent);
