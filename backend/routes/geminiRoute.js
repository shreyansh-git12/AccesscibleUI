import express from "express";

import { generateAccessibilityController } from "../controllers/geminiController.js";

const router = express.Router();

router.post("/generate-ai", generateAccessibilityController);

export default router;
