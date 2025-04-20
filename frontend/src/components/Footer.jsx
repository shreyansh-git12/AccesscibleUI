import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">
            <span>&copy; 2025 Your Company Name</span>
          </div>
          <div className="flex space-x-6">
            <a href="/about" className="hover:text-gray-400">
              About
            </a>
            <a href="/contact" className="hover:text-gray-400">
              Contact
            </a>
            <a href="/privacy" className="hover:text-gray-400">
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">
          <p>Designed with ❤️ by Your Name</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
