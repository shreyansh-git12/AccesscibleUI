import React, { useContext } from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksPreview from "../components/HowItWorksPreview";
import FAQSection from "../components/FAQSection";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { token } = useAuth(); // Get token from AuthContext
  const isLoggedIn = Boolean(token); // If token exists, the user is logged in

  return (
    <div className="h-full">
      {/* Hero Section */}
      <HeroSection isLoggedIn={isLoggedIn} />

      {/* Features Section */}
      <div>
        <FeaturesSection />
      </div>

      {/* How It Works Section */}
      <div className=" ">
        <HowItWorksPreview />
      </div>

      {/* FAQ Section */}
      <div className="">
        <FAQSection />
      </div>
    </div>
  );
};

export default Home;
