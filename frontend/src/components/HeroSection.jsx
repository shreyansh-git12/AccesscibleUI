import React from "react";
import { Button } from "../components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };
  const handleButtonClick2 = () => {
    if (token) {
      navigate("/submit");
    } else {
      navigate("/signup");
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 bg-gray-50 text-gray-800">
      {/* Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
          Transform Your Figma Designs into Accessible Masterpieces
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
          Our AI-driven platform provides you with in-depth accessibility
          reports to make your designs more inclusive.
        </p>
        <Button
          onClick={handleButtonClick}
          variant="filled"
          className="bg-gray-600 text-white  hover:bg-gray-900 hover:text-white py-3 px-8 text-lg font-semibold rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
        >
          {token ? "Go to Dashboard" : "Get Started"}{" "}
          <FaArrowRight className="ml-2 transition-transform duration-300 transform group-hover:translate-x-1" />
        </Button>
        <Button
          className=" bg-white  text-grey-600 hover:bg-gray-900 border border-gray-400 hover:text-white py-3 px-8 text-lg font-semibold rounded-full shadow-md transition-all duration-300 transform hover:scale-105 ml-5"
          onClick={handleButtonClick2}
        >
          Get Report Now !!
        </Button>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src="/accessibility-hero.svg"
          alt="Figma Accessibility Illustration"
          className="w-full max-w-md rounded-lg"
        />
      </div>
    </section>
  );
};

export default HeroSection;
