import React from "react";
import PricingSection from "./pricing-section";
import Hero from "./Hero";
import FeatureSection from "./FeatureSection";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <FeatureSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
