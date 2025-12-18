import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
} from "react-icons/fi";
import { cn } from "@/lib/utils";
import {
  validateEmail,
  validatePassword,
  validateFields,
} from "@/utils/validation";
import { NavLink } from "react-router";

export type UserType = "developer" | "client";

export type LoginFormData = {
  email: string;
  password: string;
  userType: UserType;
  rememberMe: boolean;
};

type LoginProps = {
  onSubmit?: (data: LoginFormData) => void | Promise<void>;
  onSwitchToSignup?: () => void;
  isLoading?: boolean;
};

export const Login: React.FC<LoginProps> = ({
  onSubmit,
  onSwitchToSignup,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    userType: "client",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});

  const validateForm = (): boolean => {
    const newErrors = validateFields<LoginFormData>({
      email: () => validateEmail(formData.email),
      password: () => validatePassword(formData.password, { minLength: 6 }),
      userType: () => ({ isValid: true }),
      rememberMe: () => ({ isValid: true }),
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit?.(formData);
    }
  };

  const handleChange = (
    field: keyof LoginFormData,
    value: string | boolean
  ) => {
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
            Welcome Back
          </h2>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        {/* User Type Selector */}
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-2 block">
            I am a
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleChange("userType", "client")}
              className={cn(
                "px-4 py-3 rounded-lg border-2 transition-all duration-200",
                "flex items-center justify-center gap-2 font-medium text-sm",
                formData.userType === "client"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
              )}
            >
              <FiUser className="w-4 h-4" />
              Client
            </button>
            <button
              type="button"
              onClick={() => handleChange("userType", "developer")}
              className={cn(
                "px-4 py-3 rounded-lg border-2 transition-all duration-200",
                "flex items-center justify-center gap-2 font-medium text-sm",
                formData.userType === "developer"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
              )}
            >
              <FiCheckCircle className="w-4 h-4" />
              Developer
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Enter your password"
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

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => handleChange("rememberMe", e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
              />
              <span className="text-sm text-foreground">Remember me</span>
            </label>
            <NavLink
              to="/forgot-password"
              className="text-sm text-primary hover:underline transition-colors"
            >
              Forgot password?
            </NavLink>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Switch to Signup */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              onClick={onSwitchToSignup}
              className="text-primary font-medium hover:underline transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
