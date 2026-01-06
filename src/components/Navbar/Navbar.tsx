import React, { useState, useEffect, memo, useCallback } from "react";
import { NavLink, useNavigate } from "react-router";
import { useTheme } from "@/components/theme/use-theme";
import { useLogout } from "@/apis";
import { NotificationBell } from "@/components/Notifications/NotificationBell";
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiLogOut,
  FiUser,
  FiSettings,
  FiFolder,
  FiMessageCircle,
} from "react-icons/fi";
import { cn } from "@/lib/utils";
import {
  clientLinks,
  developerLinks,
  handleLinkClick,
  handleLogout,
  handleProfileClick,
  handleSettingsClick,
  landingLinks,
} from "./navbar";
import { NavUserAction } from "./NavUserAction";
import type { DropdownOption } from "../ui/CustomDropdown";
import { Button } from "../ui/button";

type UserRole = "guest" | "developer" | "client";

type NavbarProps = {
  userRole?: UserRole;
  userName?: string;
};

export const Navbar: React.FC<NavbarProps> = ({
  userRole = "guest",
  userName,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // stable toggle for mobile button (avoid recreating inline handler)
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((s) => !s);
  }, []);

  // Determine which links to show based on user role
  const navLinks =
    userRole === "guest" &&
    location.pathname !== "/all-projects" &&
    location.pathname !== "/chats"
      ? landingLinks
      : userRole === "developer"
      ? developerLinks
      : clientLinks;

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const options: DropdownOption[] = [
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
  ];

  return (
    <>
      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
            : "backdrop-blur-2xl"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center shrink-0">
              <NavLink to="/" className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-bold text-base sm:text-lg">
                    D
                  </span>
                </div>
                <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
                  DevPalace
                </span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={(e) =>
                    handleLinkClick(e, link.href, setIsMobileMenuOpen)
                  }
                  className={`text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 whitespace-nowrap ${
                    link.href === location.pathname
                      ? "text-primary pointer-events-none"
                      : ""
                  }`}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right side: Theme Toggle + Auth/User */}
            <NavUserAction userRole={userRole} userName={userName} />

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Notification Bell (Mobile - Only for authenticated users) */}
              {userRole !== "guest" && (
                <NotificationBell
                  onNotificationClick={(notificationId, data) => {
                    console.log("Notification clicked:", notificationId, data);
                    setIsMobileMenuOpen(false);
                  }}
                />
              )}

              {/* Theme Toggle (Mobile) */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-200 active:scale-95"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <FiSun className="w-5 h-5 text-foreground" />
                ) : (
                  <FiMoon className="w-5 h-5 text-foreground" />
                )}
              </button>

              <button
                onClick={toggleMobileMenu}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-200 active:scale-95"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-6 h-6 text-foreground" />
                ) : (
                  <FiMenu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
              isMobileMenuOpen
                ? "max-h-[calc(100vh-3.5rem)] opacity-100"
                : "max-h-0 opacity-0"
            )}
          >
            <div className="border-t border-border bg-background/95 backdrop-blur-lg">
              <div className="py-4 space-y-1 max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.href}
                    onClick={(e) => {
                      handleLinkClick(e, link.href, setIsMobileMenuOpen);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "block px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 active:scale-[0.98]",
                      link.href === location.pathname
                        ? "text-primary bg-primary/10"
                        : "text-foreground/80 hover:text-primary hover:bg-muted/50"
                    )}
                  >
                    {link.label}
                  </NavLink>
                ))}

                {/* Mobile Auth/User Section */}
                <div className="pt-3 border-t border-border space-y-2 mt-3">
                  {userRole === "guest" &&
                  location.pathname !== "/all-projects" &&
                  location.pathname !== "/chats" ? (
                    <>
                      <NavLink
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-lg transition-colors duration-200 active:scale-[0.98]"
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-center transition-colors duration-200 active:scale-[0.98]"
                      >
                        Sign Up
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                          My Account
                        </p>
                        {userName && (
                          <p className="text-sm text-foreground mt-1 font-medium">
                            {userName}
                          </p>
                        )}
                      </div>
                      {options.map((item, index) => (
                        <Button
                          onClick={item.onClick}
                          variant={item.variant}
                          key={index}
                          disabled={logoutMutation.isPending}
                          className="cursor-pointer w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                        >
                          {/* <FiLogOut className="w-5 h-5" /> */}
                          {item.icon}
                          {logoutMutation.isPending
                            ? "Logging out..."
                            : item.label}
                        </Button>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default memo(Navbar);
