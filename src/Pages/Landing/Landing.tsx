import React, { useEffect } from "react";
import Hero from "@/components/Hero/Hero";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import PopularGigs from "@/components/PopularGigs/PopularGigs";
import Testimonials from "@/components/Testimonials/Testimonials";
import CTASection from "@/components/CTASection/CTASection";
import Footer from "@/components/Footer/Footer";
import { useNavigate } from "react-router";

export const Landing: React.FC = () => {
  const navigate = useNavigate();

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
  return (
    <>
      <main>
        <Hero />
        <HowItWorks />
        <PopularGigs />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};
