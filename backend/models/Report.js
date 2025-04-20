import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    designId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Design",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reportId: { type: String, required: true, unique: true },
    suggestions: { type: Object, required: true }, // Store the suggestions as an object
    score: { type: Number, default: 0 }, // Added score field with default value 0
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
