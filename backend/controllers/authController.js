import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const register = async (req, res) => {
  const { name, email, password, figmaToken } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password, figmaToken });
    await user.save();

    const token = generateToken(user._id);
    res
      .status(201)
      .json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          figmaToken: user.figmaToken,
        },
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res
      .status(200)
      .json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          figmaToken: user.figmaToken,
        },
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
