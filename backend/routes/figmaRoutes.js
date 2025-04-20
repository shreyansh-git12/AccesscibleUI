import express from "express";
import { fetchFigmaData } from "../controllers/figmaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/process", protect, fetchFigmaData);
export default router;
