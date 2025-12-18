import React from "react";
import { Button } from "@/components/ui/button";
import { GigCard } from "./GigCard";
import { NavLink } from "react-router";

const sampleGigs = [
  {
    developerName: "Alex Chen",
    avatarColor: "#6366F1",
    gigTitle: "Build a responsive React web application",
    description:
      "I'll create a modern, mobile-friendly React app with clean code and pixel-perfect design.",
    price: "$500",
    rating: 4.9,
    reviewCount: 127,
  },
  {
    developerName: "Maria Garcia",
    avatarColor: "#06b6d4",
    gigTitle: "Full-stack Node.js and MongoDB API development",
    description:
      "Expert in building scalable RESTful APIs with authentication and database integration.",
    price: "$750",
    rating: 5.0,
    reviewCount: 89,
  },
  {
    developerName: "Jordan Lee",
    avatarColor: "#8b5cf6",
    gigTitle: "Mobile app development with React Native",
    description:
      "Cross-platform iOS and Android apps with native performance and smooth UX.",
    price: "$1,200",
    rating: 4.8,
    reviewCount: 64,
  },
  {
    developerName: "Priya Sharma",
    avatarColor: "#10b981",
    gigTitle: "Python automation scripts and data processing",
    description:
      "Automate repetitive tasks, web scraping, data analysis with clean Python code.",
    price: "$300",
    rating: 4.9,
    reviewCount: 153,
  },
  {
    developerName: "David Kim",
    avatarColor: "#f59e0b",
    gigTitle: "WordPress custom theme and plugin development",
    description:
      "Build custom WordPress solutions tailored to your business needs with SEO optimization.",
    price: "$600",
    rating: 4.7,
    reviewCount: 98,
  },
  {
    developerName: "Sophie Martin",
    avatarColor: "#ec4899",
    gigTitle: "UI/UX design and Figma to code conversion",
    description:
      "Transform your designs into pixel-perfect, responsive HTML/CSS/React components.",
    price: "$450",
    rating: 5.0,
    reviewCount: 112,
  },
];

export const PopularGigs: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-xs font-semibold text-primary bg-primary/10 rounded-full">
              💼 Top Talent
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold">
              Browse Popular Gigs
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Hire top-rated developers ready to start your project today.
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="shadow-sm hover:shadow-md transition-shadow"
            asChild
          >
            <NavLink to="/marketplace">See All Gigs →</NavLink>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleGigs.map((gig, index) => (
            <GigCard key={index} {...gig} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularGigs;
