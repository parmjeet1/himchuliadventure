const countriesModel = require("../models/CountriesModel");
const addCountry = async (req, res) => {
  try {
    const { name, updatedBy } = req.body;
    const dbCountry = await countriesModel.findOne({ name,updatedBy });

    if (dbCountry) {
      return res
        .status(400)
        .json({ message: "Country with this name already exist" });
    }
    const newCountry = new countriesModel({ name, updatedBy });
    await newCountry.save();
    return res.status(200).json({
      message: "New Country added Successfully",
      name: newCountry,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const toggleCountryGridStatus = async (req, res) => {
  try {
    const { countryId } = req.body;

    if (!countryId) {
      return res.status(400).json({ message: "countryId is required" });
    }

    const updatedCountry = await countriesModel.findOneAndUpdate(
      { _id: countryId },
      [{ $set: { gridViewStatus: { $not: "$gridViewStatus" } } }], // Toggle boolean value
      { new: true }
    );

    if (!updatedCountry) {
      return res.status(404).json({ message: "Country not found" });
    }

    return res.status(200).json({
      message: "Success",
      gridViewStatus: updatedCountry.gridViewStatus,
    });
  } catch (error) {
    console.error("Error toggling gridViewStatus:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const addCountryCoverView = async (req, res) => {
  try {
    console.log("hello")
    const { countryId, coverHeading, coverParagraph } = req.body;

    if (!countryId) {
      return res.status(400).json({ error: "Country ID is required" });
    }

    let updateFields = { updatedAt: Date.now() };

    // If only `countryId` is received, toggle `gridViewStatus`
    if (!coverHeading && !coverParagraph && !req.file) {
      updateFields.$bit = { gridViewStatus: { xor: 1 } }; // Toggle boolean
    } else {
      // Set `coverHeading` and `coverParagraph` only if provided
      if (coverHeading && coverParagraph) {
        updateFields.coverHeading = coverHeading;
        updateFields.coverParagraph = coverParagraph;
      }

      // Validate & Update Image if file exists
      if (req.file) {
        updateFields.homeFetaureImage = `/uploads/${req.file.filename}`;
      }
    }

    // Update the country document
    const updateCountry = await countriesModel.findOneAndUpdate(
      { _id: countryId },
      updateFields,
      { new: true } // Return updated document
    );

    if (!updateCountry) {
      return res.status(500).json({ error: "Could not update" });
    }

    return res.status(200).json({ message: "Updated successfully", updateCountry });

  } catch (error) {
    return res.status(500).json({ "internal Error": error.message });
  }
};


const fetchCountry = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "id could not foud" });
    }

    const dbCountries = await countriesModel
      .find({updatedBy:id})
      .select(" -createdAt -updatedAt");
    if (!dbCountries) {
      res.status(401).json({ error: "Country could not found!" });
    }

    return res.status(200).json({ country: dbCountries });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "internal server error", error: error.message });
  }
};

const editCountry = async (req, res) => {
  try {
    const { id, name, gridViewStatus } = req.body;
    if (!id || !name || typeof gridViewStatus === "undefined") {
      return res.status(400).json({ error: "Fileds can not be empty" });
    }
    const updatedCountry = await countriesModel.findByIdAndUpdate(
      id,
      { $set: { name, gridViewStatus } },
      { new: true }
    );
    if (!updatedCountry) {
      return res.status(404).json({
        status: "fail",
        message: "Country not found",
        error: { id: "No country found with this ID" }
      });
    }
    if (updatedCountry) {
      return res.status(200).json({ message: "country edited successfully!", updatedCountry });
    }
  } catch (error) {
    return res.status(500).json({ error:"internal error", details:error.message });
  }
};

const deleteCountry=(req,res)=>{}

module.exports = { addCountry, fetchCountry, addCountryCoverView, editCountry,toggleCountryGridStatus };
