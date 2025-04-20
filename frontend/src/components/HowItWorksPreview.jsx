import React from "react";
import { FaSearch, FaClipboardCheck, FaRocket } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const HowItWorksDemo = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <FaSearch size={28} className="text-gray-600" />,
      title: "Upload Your Figma Link",
      description:
        "Paste your Figma design link into our platform for instant analysis.",
    },
    {
      icon: <FaClipboardCheck size={28} className="text-gray-600" />,
      title: "Generate Accessibility Report",
      description:
        "Let our AI scan your design and create a detailed accessibility report.",
    },
    {
      icon: <FaRocket size={28} className="text-gray-600" />,
      title: "Apply Recommendations",
      description:
        "Use our suggestions to enhance your design’s accessibility effortlessly.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
          How It Works
        </h2>

        <div className="space-y-8 max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">{step.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            onClick={() => navigate("/how-it-works")}
            className="bg-gray-600 text-white hover:bg-gray-900 py-3 px-8 text-lg font-semibold rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Explore Full Guide
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksDemo;
