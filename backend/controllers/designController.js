import Design from "../models/Design.js";

export const saveDesign = async (req, res) => {
  try {
    const { name, url } = req.body;

    if (!name || !url) {
      return res.status(400).json({ message: "Name and URL are required." });
    }

    const design = await Design.create({
      user: req.user._id,
      name,
      url,
    });

    res.status(201).json({
      message: "Design saved successfully.",
      designId: design._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving design.", error: error.message });
  }
};

export const getUserDesigns = async (req, res) => {
  try {
    const designs = await Design.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: designs.length,
      designs,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching designs.", error: error.message });
  }
};

export const deleteDesign = async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ message: "Design not found." });
    }

    if (String(design.user) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this design." });
    }

    await design.deleteOne();
    res.status(200).json({ message: "Design deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting design.", error: error.message });
  }
};
