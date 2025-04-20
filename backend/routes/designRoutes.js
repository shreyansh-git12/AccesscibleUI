import express from "express";
import {
  saveDesign,
  getUserDesigns,
  deleteDesign,
} from "../controllers/designController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/save", protect, saveDesign);
router.get("/my-designs", protect, getUserDesigns);
router.delete("/:id", protect, deleteDesign);

export default router;
