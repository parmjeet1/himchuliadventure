const path = require("path");
const packageModel = require("../models/PackageModel");

const addPackageFeatureImageWithMulter = async (req, res) => {
  try {
   

    if (!req.file) {
      return res.status(422).json({ error: "Image file is required" });
    }

    const { packageId } = req.body;
    if (!packageId) {
      return res.status(422).json({ error: "Package ID cannot be empty" });
    }

    // Correctly use the stored filename from Multer
    const imagePath = `/uploads/${req.file.filename}`;

    // Update package with new image path
    const updatedPackage = await packageModel.findByIdAndUpdate(
      packageId,
      { imageUrl: imagePath, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(422).json({ message: "Image could not be updated" });
    }

    return res.status(200).json({ message: "Image Updated successfully", updatedPackage });

  } catch (error) {
    return res.status(500).json({ error: error.message || error });
  }
};

module.exports = { addPackageFeatureImageWithMulter };
