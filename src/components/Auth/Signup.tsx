import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiLink,
} from "react-icons/fi";
import { cn } from "@/lib/utils";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateUrl,
  validateFields,
} from "@/utils/validation";
import { Link } from "react-router";

export type UserType = "developer" | "client";

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: UserType;
  portfolioUrl?: string;
};

type SignupProps = {
  onSubmit?: (data: SignupFormData) => void | Promise<void>;
  onSwitchToLogin?: () => void;
  isLoading?: boolean;
};

export const Signup: React.FC<SignupProps> = ({
  onSubmit,
  onSwitchToLogin,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "client",
    portfolioUrl: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupFormData, string>>
  >({});

  const validateForm = (): boolean => {
    const newErrors = validateFields<SignupFormData>({
      name: () => validateName(formData.name),
      email: () => validateEmail(formData.email),
      password: () =>
        validatePassword(formData.password, {
          minLength: 8,
          requireStrength: true,
        }),
      confirmPassword: () =>
        validateConfirmPassword(formData.password, formData.confirmPassword),
      portfolioUrl: () => {
        // Only validate if user is a developer and portfolio URL is provided
        if (formData.userType === "developer") {
          return validateUrl(formData.portfolioUrl || "", { required: false });
        }
        return { isValid: true };
      },
      userType: () => ({ isValid: true }),
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = { ...formData };
      // Remove portfolioUrl if user is not a developer or if it's empty
      if (formData.userType !== "developer" || !formData.portfolioUrl) {
        delete submitData.portfolioUrl;
      }
      await onSubmit?.(submitData);
    }
  };

  const handleChange = (field: keyof SignupFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-foreground mb-2">
            Create Account
          </h2>
          <p className="text-muted-foreground">
            Join our marketplace and get started today
          </p>
        </div>

        {/* User Type Selector */}
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-2 block">
            I want to join as a
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleChange("userType", "client")}
              className={cn(
                "px-4 py-3 rounded-lg border-2 transition-all duration-200",
                "flex flex-col items-center justify-center gap-1 font-medium text-sm",
                formData.userType === "client"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
              )}
            >
              <FiUser className="w-5 h-5" />
              <span>Client</span>
              <span className="text-xs opacity-70">Hire developers</span>
            </button>
            <button
              type="button"
              onClick={() => handleChange("userType", "developer")}
              className={cn(
                "px-4 py-3 rounded-lg border-2 transition-all duration-200",
                "flex flex-col items-center justify-center gap-1 font-medium text-sm",
                formData.userType === "developer"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
              )}
            >
              <FiCheckCircle className="w-5 h-5" />
              <span>Developer</span>
              <span className="text-xs opacity-70">Offer services</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-foreground mb-2 block"
            >
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-3 rounded-lg border bg-background text-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                  errors.name ? "border-destructive" : "border-border"
                )}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground mb-2 block"
            >
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-3 rounded-lg border bg-background text-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                  errors.email ? "border-destructive" : "border-border"
                )}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground mb-2 block"
            >
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={cn(
                  "w-full pl-10 pr-12 py-3 rounded-lg border bg-background text-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                  errors.password ? "border-destructive" : "border-border"
                )}
                placeholder="Min. 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-foreground mb-2 block"
            >
              Confirm Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                className={cn(
                  "w-full pl-10 pr-12 py-3 rounded-lg border bg-background text-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                  errors.confirmPassword
                    ? "border-destructive"
                    : "border-border"
                )}
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-destructive mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Portfolio URL (for developers only) */}
          {formData.userType === "developer" && (
            <div>
              <label
                htmlFor="portfolioUrl"
                className="text-sm font-medium text-foreground mb-2 block"
              >
                Portfolio URL{" "}
                <span className="text-muted-foreground">(Optional)</span>
              </label>
              <div className="relative">
                <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="portfolioUrl"
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => handleChange("portfolioUrl", e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-4 py-3 rounded-lg border bg-background text-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                    errors.portfolioUrl ? "border-destructive" : "border-border"
                  )}
                  placeholder="https://yourportfolio.com"
                />
              </div>
              {errors.portfolioUrl && (
                <p className="text-sm text-destructive mt-1">
                  {errors.portfolioUrl}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        {/* Terms and Privacy */}
        <p className="mt-4 text-xs text-center text-muted-foreground">
          By signing up, you agree to our{" "}
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>

        {/* Switch to Login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-primary font-medium hover:underline transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
