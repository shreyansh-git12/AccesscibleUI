import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FiActivity,
  FiLayers,
  FiCode,
  FiEye,
  FiGrid,
  FiFeather,
  FiCheckSquare,
} from "react-icons/fi";

const HowItWorks = () => {
  return (
    <div className="min-h-[90vh] px-6 py-12 bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">How It Works</h1>
        <p className="text-gray-600 text-lg">
          Our Figma Accessibility Converter scans your designs and generates a
          detailed accessibility report based on core design data. This helps
          developers understand potential accessibility gaps and adapt their
          designs effectively.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mt-12 grid gap-8 md:grid-cols-2">
        {/* Process Steps */}
        <Card className="shadow-md">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Data Extraction Steps
            </h2>

            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <FiLayers className="text-2xl text-gray-700" />
                <p>
                  <strong>Description:</strong> Extracts component-level
                  descriptions to understand design intent.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <FiFeather className="text-2xl text-gray-700" />
                <p>
                  <strong>Background Color:</strong> Captures background shades
                  for contrast checks.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <FiGrid className="text-2xl text-gray-700" />
                <p>
                  <strong>Fills:</strong> Logs fill colors, blend modes, and
                  opacity for visual layering analysis.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <FiCode className="text-2xl text-gray-700" />
                <p>
                  <strong>Strokes:</strong> Reviews outline properties for
                  visibility and separation.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <FiEye className="text-2xl text-gray-700" />
                <p>
                  <strong>Style:</strong> Extracts typography info like font
                  family, size, weight, and alignment for legibility validation.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <FiActivity className="text-2xl text-gray-700" />
                <p>
                  <strong>Absolute Bounding Box:</strong> Measures component
                  positioning and size for spatial consistency.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <FiCheckSquare className="text-2xl text-gray-700" />
                <p>
                  <strong>Effects:</strong> Detects shadows, blurs, and other
                  visual cues for depth and emphasis.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Principles */}
        <Card className="shadow-md">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              7 Principles of Accessible Design
            </h2>
            <ul className="space-y-3 list-disc pl-5 text-gray-700">
              <li>
                <strong>Perceivable:</strong> Information must be presentable to
                users in ways they can perceive.
              </li>
              <li>
                <strong>Operable:</strong> User interface components must be
                usable via keyboard and assistive tools.
              </li>
              <li>
                <strong>Understandable:</strong> Information and operation of
                the UI must be clear and predictable.
              </li>
              <li>
                <strong>Robust:</strong> Content must be robust enough to be
                interpreted by a wide variety of user agents, including
                assistive technologies.
              </li>
              <li>
                <strong>Contrast:</strong> Ensuring text and elements have
                sufficient contrast for easy reading.
              </li>
              <li>
                <strong>Scalability:</strong> Designs should adapt to different
                screen sizes and zoom levels without breaking layout.
              </li>
              <li>
                <strong>Error Prevention:</strong> Designs should prevent
                mistakes and provide clear recovery instructions when errors
                occur.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HowItWorks;
