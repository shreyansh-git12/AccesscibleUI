import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile." });
  }
};

export const changeFigmaToken = async (req, res) => {
  const { figmaToken } = req.body;

  if (!figmaToken) {
    return res.status(400).json({ message: "Figma token is required." });
  }

  try {
    req.user.figmaToken = figmaToken;
    await req.user.save();
    res.status(200).json({
      message: "Figma token updated successfully.",
      figmaToken: req.user.figmaToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating figma token." });
  }
};
