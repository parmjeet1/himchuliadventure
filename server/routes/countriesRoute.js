const express = require("express");
const CountriesRouter = express.Router();

const { addCountry, fetchCountry, addCountryCoverView } = require("../controllers/countriesController");
const upload = require("../middlewares/upload");

CountriesRouter.post("/add-country",addCountry);
CountriesRouter.get("/:id",fetchCountry);
CountriesRouter.post("/edit-country-cover",upload.single("image"),addCountryCoverView);



module.exports=CountriesRouter;