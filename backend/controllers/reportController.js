import Report from "../models/Report.js";
import Design from "../models/Design.js";

export const saveReport = async (req, res) => {
  const { reportId, suggestions, score } = req.body;

  if (!reportId || !suggestions) {
    return res
      .status(400)
      .json({ message: "Report ID and suggestions are required." });
  }

  try {
    const newReport = new Report({
      designId: req.params.id,
      user: req.user._id,
      reportId,
      suggestions,
      score: score || 0,
    });

    await newReport.save();

    res.status(201).json({
      message: "Report saved successfully.",
      report: newReport,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A report with this Report ID already exists.",
      });
    }

    res
      .status(500)
      .json({ message: "Error saving report.", error: error.message });
  }
};

export const getReportsForDesign = async (req, res) => {
  try {
    const reports = await Report.find({
      designId: req.params.id,
      user: req.user._id,
    });
    res.status(200).json({ count: reports.length, reports });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reports.", error: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found." });
    }

    // Ensure that the logged-in user is the one who created the report
    if (String(report.user) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this report." });
    }

    await Report.deleteOne({ _id: req.params.reportId });

    res.status(200).json({ message: "Report deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting report.", error: error.message });
  }
};
