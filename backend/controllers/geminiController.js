import { extractDesignData } from "../utils/figmaExtractor.js";
import { generateAccessibilitySuggestions } from "../services/geminiService.js";

export const generateAccessibilityController = async (req, res) => {
  try {
    // Log the incoming request body
    console.log("Received Figma data:", req.body);

    // Extract design data
    const figmaData = req.body;
    const extractedData = extractDesignData(figmaData);
    console.log("Extracted Data from Figma:", extractedData);

    // Log the design data being passed to Gemini
    console.log("Sending extracted data to Gemini API:", extractedData);

    // Call the Gemini API to generate accessibility suggestions
    const { score, suggestions } = await generateAccessibilitySuggestions(
      extractedData
    );

    // Log the score and suggestions from Gemini API
    console.log("Gemini API response - Score:", score);
    console.log("Gemini API response - Suggestions:", suggestions);

    // Send the response back to the client
    res.status(200).json({
      message: "Accessibility suggestions generated successfully.",
      score,
      suggestions,
    });
  } catch (error) {
    // Log the error message if there's any failure
    console.error("Error generating accessibility suggestions:", error);
    res.status(500).json({
      message: "Failed to generate accessibility suggestions.",
      error: error.message,
    });
  }
};
