import React from "react";
import { Button } from "@/components/ui/button";
import CTAIllustration from "./CTAIllustration";
import { FiArrowRight, FiZap } from "react-icons/fi";

export const CTASection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-accent/10 to-primary/10" />

      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden">
          {/* Inner gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 sm:p-12 lg:p-16">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                <FiZap className="w-4 h-4" />
                <span>Start Building Today</span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                  Start Hiring{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                    Top Developers
                  </span>{" "}
                  Today
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Join thousands of companies finding skilled developers for
                  their projects in minutes. Quality talent, verified profiles,
                  seamless hiring.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="group shadow-lg hover:shadow-2xl transition-all duration-300 text-base"
                >
                  Get Started Free
                  <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="shadow-md hover:shadow-lg transition-all duration-300 text-base"
                >
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <p className="text-3xl font-bold text-foreground">10K+</p>
                  <p className="text-sm text-muted-foreground">
                    Active Developers
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">50K+</p>
                  <p className="text-sm text-muted-foreground">
                    Projects Completed
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">4.9/5</p>
                  <p className="text-sm text-muted-foreground">
                    Average Rating
                  </p>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />

                {/* Illustration container */}
                <div className="relative bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/30 shadow-xl">
                  <CTAIllustration className="w-full h-auto" />
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
                  ⚡ Fast Hiring
                </div>
                <div
                  className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  ✓ Verified Talent
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
