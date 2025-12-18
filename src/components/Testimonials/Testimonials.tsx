import React from "react";
import { TestimonialCard } from "./TestimonialCard";

const testimonials = [
  {
    clientName: "Sarah Johnson",
    clientRole: "Product Manager",
    company: "TechStart Inc",
    quote:
      "The developer I hired was exceptional. The project was delivered on time with clean, maintainable code. Highly recommend!",
    avatarColor: "#6366F1",
  },
  {
    clientName: "Michael Chen",
    clientRole: "Founder",
    company: "StartupLab",
    quote:
      "Finding skilled developers was always a challenge until I discovered this platform. The quality and professionalism exceeded my expectations.",
    avatarColor: "#06b6d4",
  },
  {
    clientName: "Emily Rodriguez",
    clientRole: "CTO",
    company: "DataFlow Solutions",
    quote:
      "I've hired multiple developers here for different projects. Every experience has been smooth, and the talent pool is incredible.",
    avatarColor: "#8b5cf6",
  },
  {
    clientName: "James Wilson",
    clientRole: "Creative Director",
    company: "DesignHub",
    quote:
      "Fast, reliable, and talented developers. The platform made it easy to find the right fit for our design-to-code project.",
    avatarColor: "#10b981",
  },
  {
    clientName: "Aisha Patel",
    clientRole: "Startup Founder",
    quote:
      "As a non-technical founder, this platform gave me confidence in hiring developers. The vetting process is thorough and transparent.",
    avatarColor: "#f59e0b",
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="relative py-20 bg-linear-to-b from-background via-accent/5 to-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-xs font-semibold text-primary bg-primary/10 rounded-full">
            ⭐ Trusted by Thousands
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of satisfied clients who found their perfect
            developer match
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} index={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
