import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-3xl w-full shadow-md rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            About AccessibleUI
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            AccessibleUI is designed to empower designers and developers to
            bridge the gap between beautiful Figma designs and accessible web
            applications.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our Figma Accessibility Converter scans your design files and
            generates actionable suggestions and semantic code tips to help
            ensure your projects are compliant, user-friendly, and inclusive for
            visually challenged users.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We believe accessibility is not an afterthought, but an essential
            part of modern design and development. AccessibleUI helps make the
            web a fair space for everyone.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
