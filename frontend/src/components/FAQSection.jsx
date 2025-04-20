import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

const FAQSection = () => {
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      question: "What is this platform all about?",
      answer:
        "Our platform leverages AI to analyze your Figma designs and generate accessibility reports to ensure your designs are inclusive and usable for everyone.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply sign up, then paste your Figma design link into our platform. We’ll generate a detailed accessibility report for you to act upon.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, your design data is never shared outside our platform. We ensure your privacy by using secure encryption methods.",
    },
    {
      question: "Can I apply recommendations directly?",
      answer:
        "Currently, you’ll receive recommendations in a detailed report format, which you can manually apply to your Figma design to improve accessibility.",
    },
    {
      question: "Do I need a Figma account?",
      answer:
        "Yes, you will need a Figma account to generate the design link. You can use the free version of Figma for this.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          <Accordion
            type="single"
            collapsible
            value={expanded}
            onValueChange={setExpanded}
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold text-gray-900 bg-gray-200 rounded-lg py-4 px-6 shadow-md hover:bg-gray-300 transition-all duration-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
