import React from "react";
import { FaMagic, FaUniversalAccess, FaChartLine } from "react-icons/fa";

const FeatureSection = () => {
  const features = [
    {
      icon: <FaUniversalAccess size={30} className="text-gray-600" />,
      title: "Accessibility First",
      description:
        "Generate detailed accessibility reports to ensure your designs are inclusive for everyone.",
    },
    {
      icon: <FaMagic size={30} className="text-gray-600" />,
      title: "AI-Powered Insights",
      description:
        "Leverage our AI to automatically detect design issues and suggest improvements.",
    },
    {
      icon: <FaChartLine size={30} className="text-gray-600" />,
      title: "Seamless Reporting",
      description:
        "Export easy-to-read reports that help your team fix problems efficiently.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">
          Why Choose Our Platform?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
