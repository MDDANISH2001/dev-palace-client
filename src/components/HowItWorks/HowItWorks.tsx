import React from "react";
import StepCard from "./StepCard";
import { FiCode, FiLink, FiCheckSquare, FiStar } from "react-icons/fi";

const steps = [
  {
    title: "Post or browse projects",
    description:
      "Create a listing or explore developer gigs matched to your needs.",
    icon: <FiCode size={18} />,
  },
  {
    title: "Connect instantly",
    description: "Chat and interview verified developers in real-time.",
    icon: <FiLink size={18} />,
  },
  {
    title: "Hire & track",
    description: "Manage milestones, payments, and progress from one place.",
    icon: <FiCheckSquare size={18} />,
  },
  {
    title: "Complete & review",
    description: "Approve deliverables, release funds, and leave a review.",
    icon: <FiStar size={18} />,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted/20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-xs font-semibold text-accent bg-accent/10 rounded-full">
            🚀 Simple Process
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold">
            Get Started in 4 Simple Steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From posting a project to completing the work — we make hiring
            developers simple and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <StepCard
              key={s.title}
              index={i}
              title={s.title}
              description={s.description}
              icon={s.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
