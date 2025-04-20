import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FiMail, FiUser, FiLinkedin } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4">
      <Card className="max-w-lg w-full shadow-md rounded-2xl bg-white">
        <CardContent className="p-8 text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Let’s Connect!</h1>
          <p className="text-gray-700">
            Hi, I’m Shreyans H Chaurasia — a passionate frontend developer who
            loves building intuitive and accessible web experiences. Special
            thanks to Anukrati Pandey for creative collaboration and
            contributions.
          </p>

          <div className="text-left space-y-4 pt-4">
            <div className="flex items-center gap-3 text-lg text-gray-800">
              <FiUser className="text-xl text-gray-600" />
              <span>Shreyans H Chaurasia</span>
            </div>

            <div className="flex items-center gap-3 text-lg text-gray-800">
              <FiUser className="text-xl text-gray-600" />
              <span>Anukrati Pandey</span>
            </div>

            <div className="flex items-center gap-3 text-lg text-gray-800">
              <FiMail className="text-xl text-gray-600" />
              <a
                href="mailto:shreyans@example.com"
                className="hover:text-gray-900 transition-colors"
              >
                shreyans@example.com
              </a>
            </div>

            <div className="flex items-center gap-3 text-lg text-gray-800">
              <FiLinkedin className="text-xl text-gray-600" />
              <a
                href="https://linkedin.com/in/shreyans"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                linkedin.com/in/shreyans
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
