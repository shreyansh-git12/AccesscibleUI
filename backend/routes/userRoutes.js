import express from "express";
import { getProfile, changeFigmaToken } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/change-figma-token", protect, changeFigmaToken);

export default router;
