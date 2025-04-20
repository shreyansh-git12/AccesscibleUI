import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateAccessibilitySuggestions = async (designData) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction: `
You are an expert accessibility consultant specializing in WCAG 2.2 AA and AAA compliance, ARIA practices, and design accessibility audits for visually impaired users.

Your task is to review structured JSON extracted from a Figma design file. The JSON contains:

1. componentSets[ID].description: Describes the component's role.
2. document.children[].backgroundColor: Defines background color.
3. children[].fills[], strokes[]: Contain visual fill and stroke properties.
4. style properties: font size, font family, weight, alignment.
5. absoluteBoundingBox: Position and size of elements.
6. effects[]: Visual effects like shadows.

For each of these, suggest accessibility improvements:
- Check for color contrast against WCAG AA and AAA.
- Recommend ARIA labels or semantic roles if descriptions are vague.
- Advise adjustments to font sizes, spacing, or colors.
- Suggest keyboard navigation improvements.
- Note if the field is missing or null.

Your output must be a plain JSON array of helpful suggestions, for example:

[
  "Component description should use an ARIA label for badges.",
  "Background color r:0.96, g:0.96, b:0.96 should be checked for contrast with text.",
  "Fill with blendMode 'NORMAL' should be reviewed for sufficient contrast.",
  "Stroke color r:0.5, g:0.5, b:0.5 might require higher contrast for borders.",
  "Font size 12px is too small, recommend at least 16px for readability.",
  "Bounding box width:200, height:50 should meet minimum clickable size standards (44x44 px).",
  "Drop shadow effect (radius:5) should not reduce content clarity or create halos."
]
`,
    });

    const prompt = `
Review the following Figma design JSON data and suggest accessibility improvements based on WCAG 2.2, ARIA guidelines, and usability for visually impaired users.

Data:
${JSON.stringify(designData, null, 2)}

Please return only an array of plain text suggestions in JSON format.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    console.log("Raw Response from Gemini:", text); // Log the raw response

    const cleanedText = text.replace(/```json|```/gi, "").trim();

    console.log("Cleaned Response Text:", cleanedText); // Log the cleaned text

    let suggestions = [];
    try {
      suggestions = JSON.parse(cleanedText);
      console.log("Parsed Suggestions:", suggestions); // Log parsed suggestions
    } catch (error) {
      console.error("Failed to parse Gemini response:", error);
      return {
        score: 0,
        suggestions: ["Failed to parse response, please check the raw text."],
      };
    }

    const score = Math.max(0, 100 - suggestions.length * 5); // Score based on suggestions count

    console.log("Calculated Score:", score); // Log the calculated score

    return { score, suggestions };
  } catch (error) {
    console.error("Error during accessibility suggestion generation:", error);
    return {
      score: 0,
      suggestions: [`Error: ${error.message}`],
    };
  }
};
