import axios from "axios";
import User from "../models/User.js"; // Adjust the import path as necessary

export const fetchFigmaData = async (req, res) => {
  try {
    const { figmaUrl } = req.body;

    if (!figmaUrl) {
      return res.status(400).json({ error: "figmaUrl is required" });
    }

    let fileKey = null;

    if (figmaUrl.includes("/file/")) {
      fileKey = figmaUrl.split("/file/")[1]?.split("/")[0];
    } else if (figmaUrl.includes("/design/")) {
      fileKey = figmaUrl.split("/design/")[1]?.split("/")[0];
    }

    if (!fileKey) {
      return res.status(400).json({
        error: "Invalid Figma URL. Ensure it includes '/file/' or '/design/'",
      });
    }

    // Retrieve the user from the database based on the user ID stored in the JWT token
    const user = await User.findById(req.user.id); // Assuming req.user.id contains the user ID from the JWT
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const figmaToken = user.figmaToken; // The Figma token stored in the user document
    if (!figmaToken) {
      return res
        .status(400)
        .json({ error: "Figma token not found for this user" });
    }

    // Request Figma data using the user's token
    const response = await axios.get(
      `https://api.figma.com/v1/files/${fileKey}`,
      {
        headers: {
          "X-Figma-Token": figmaToken, // Use the user's Figma token
        },
      }
    );

    console.log("Figma Data Response:", response.data);

    res.json(response.data); // Return the Figma data in the response
  } catch (error) {
    console.error("Error fetching Figma data:", error.message);

    if (error.response) {
      console.error("Figma API error:", error.response.data);
      return res.status(error.response.status).json({
        error: "Figma API request failed",
        details: error.response.data,
      });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to fetch Figma data", details: error.message });
    }
  }
};
