import React from "react";
import { Button } from "@/components/ui/button";
import HeroIllustration from "./HeroIllustration";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export const Hero: React.FC = () => {
  return (
    <section className="w-full bg-linear-to-b from-transparent to-transparent pt-24 pb-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
              aria-label="Hire skilled developers instantly"
            >
              Hire skilled developers
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-cyan-400">
                instantly.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl">
              Browse, connect, and hire verified developers for your projects —
              vetted talent ready to start fast and deliver quality work.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="shadow-lg" size="lg">
                Get Started
              </Button>

              <Button variant="ghost" size="lg" asChild>
                <Link to="#how-it-works">How it works</Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div
              className={cn(
                "w-full max-w-2xl rounded-2xl p-4 bg-linear-to-br from-white/60 to-white/30 dark:from-black/40 dark:to-black/30 shadow-2xl"
              )}
            >
              <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-xl animate-fade-in">
                <HeroIllustration className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
