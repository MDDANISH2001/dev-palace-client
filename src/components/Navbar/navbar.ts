import type { UseMutationResult } from "@tanstack/react-query";
import type { NavigateFunction } from "react-router";
import { toast } from "react-toastify";

export const handleProfileClick = (
  userType: string,
  navigate: NavigateFunction
) => {
  if (userType === "client") {
    // Navigate to client profile
    navigate("/client/profile");
  } else if (userType === "developer") {
    // Navigate to developer profile
    navigate("/developer/profile");
  }
};

export const handleSettingsClick = (
  userType: string,
  navigate: NavigateFunction
) => {
  if (userType === "client") {
    // Navigate to client settings
    navigate("/client/settings");
  } else if (userType === "developer") {
    // Navigate to developer settings
    navigate("/developer/settings");
  }
};

// Handle logout
export const handleLogout = async (
  logoutMutation: UseMutationResult<void, Error, void>,
  navigate: NavigateFunction
) => {
  try {
    await logoutMutation.mutateAsync();

    // Clear user data from localStorage (already done in useLogout hook)
    localStorage.removeItem("user");

    // Show success message
    toast.success("Logged out successfully!");

    // Small delay to ensure state updates propagate
    setTimeout(() => {
      // Redirect to login page
      navigate("/login", { replace: true });
    }, 100);
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Logout failed. Please try again.");
  }
};

// Smooth scroll for anchor links
export const handleLinkClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (href.startsWith("#")) {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  setIsMobileMenuOpen(false);
};

export const landingLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Browse Developers", href: "/marketplace" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const developerLinks = [
  { label: "Dashboard", href: "/developer/dashboard" },
  { label: "My Gigs", href: "/developer/my-gigs" },
  { label: "Messages", href: "/developer/messages" },
  { label: "Earnings", href: "/developer/earnings" },
];

export const clientLinks = [
  { label: "Dashboard", href: "/client/dashboard" },
  { label: "Post Project", href: "/client/post-project" },
  { label: "Manage Devs", href: "/client/manage-devs" },
  // { label: "Messages", href: "/client/messages" },
];
