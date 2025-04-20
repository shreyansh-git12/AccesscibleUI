import express from "express";
import {
  saveReport,
  getReportsForDesign,
  deleteReport,
} from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id/report", protect, saveReport);
router.get("/:id/reports", protect, getReportsForDesign);
router.delete("/report/:reportId", protect, deleteReport);

export default router;
