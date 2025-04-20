import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import figmaRoutes from "./routes/figmaRoutes.js";
import geminiRoute from "./routes/geminiRoute.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import designRoutes from "./routes/designRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.FIGMA_ACCESS_TOKEN;

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/figma", figmaRoutes);
app.use("/api/gemini", geminiRoute);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/designs", designRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
