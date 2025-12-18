import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { toast } from "react-toastify";
import { Signup } from "../../components/Auth/Signup";
import { AuthIllustration } from "../../components/Auth/AuthIllustration";
import { useClientRegister, useDeveloperRegister } from "../../apis";
import type { SignupFormData } from "../../components/Auth/Signup";

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const clientRegisterMutation = useClientRegister();
  const developerRegisterMutation = useDeveloperRegister();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.userType === "developer") {
        navigate("/developer/dashboard");
      } else if (parsedUser.userType === "client") {
        navigate("/client/dashboard");
      }
    }
  }, [navigate]);

  const handleSignup = async (data: SignupFormData) => {
    try {
      let response;

      if (data.userType === "client") {
        response = await clientRegisterMutation.mutateAsync({
          name: data.name,
          email: data.email,
          password: data.password,
          userType: "client",
        });
      } else {
        response = await developerRegisterMutation.mutateAsync({
          name: data.name,
          email: data.email,
          password: data.password,
          userType: "developer",
          portfolioUrl: data.portfolioUrl,
        });
      }

      // Show success message
      toast.success(response.message || "Account created successfully!");

      // Navigate to appropriate dashboard
      if (data.userType === "developer") {
        navigate("/developer/dashboard");
      } else {
        navigate("/client/dashboard");
      }
    } catch (error) {
      // Error handling is done in the mutation hooks
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
    }
  };

  const isLoading =
    clientRegisterMutation.isPending || developerRegisterMutation.isPending;

  const handleSwitchToLogin = () => {
    navigate("/login");
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Illustration - Hidden on mobile, shown on desktop */}
          <motion.div
            className="hidden lg:block lg:w-1/2 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Decorative blur orbs */}
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-pulse" />
              <div
                className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />

              {/* Illustration */}
              <div className="relative z-10">
                <AuthIllustration className="w-full h-auto" />
              </div>

              {/* Decorative text */}
              <div className="mt-8 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Join Dev Palace
                </h2>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  Start your journey as a developer or find the perfect talent
                  for your next project.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Signup Form */}
          <motion.div
            className="w-full lg:w-1/2 max-w-md mx-auto lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <Signup
              onSubmit={handleSignup}
              onSwitchToLogin={handleSwitchToLogin}
              isLoading={isLoading}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupPage;
