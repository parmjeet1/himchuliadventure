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
    return res.status(201).json({
      message: "New Country added Successfully",
      name: newCountry,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const addCountryCoverView = async (req, res) => {
  if (!req.file) {
    return res.status(422).json({ error: "Image file is required" });
  }

  const { countryId, coverHeading, coverParagraph } = req.body;
  if (!countryId || !coverHeading || !coverParagraph) {
    return res.status(201).json({ error: "Fileds can not be blank " });
  }
  const imagePath = `/uploads/${req.file.filename}`;
  const updateCountry = await countriesModel.findOneAndUpdate(
    { _id: countryId },
    {
      homeFetaureImage: imagePath,
      gridViewStatus: true,
      coverHeading,
      coverParagraph,
      updatedAt: Date.now(),
    }
  );
  if (!updateCountry) {
    return res.status(201).json({ error: "Could not Update" });
  }
  return res
    .status(200)
    .json({ message: "updated Successfully", updateCountry });
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

module.exports = { addCountry, fetchCountry, addCountryCoverView, editCountry };
