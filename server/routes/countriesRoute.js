const express = require("express");
const CountriesRouter = express.Router();

const { addCountry, fetchCountry, addCountryCoverView, editCountry, toggleCountryGridStatus } = require("../controllers/countriesController");
const upload = require("../middlewares/upload");

CountriesRouter.post("/add-country",addCountry);
CountriesRouter.get("/:id",fetchCountry);
CountriesRouter.post("/edit-country-cover",upload.single("image"),addCountryCoverView);
CountriesRouter.post("/edit-country", editCountry );

CountriesRouter.post("/toggle-status", toggleCountryGridStatus );


module.exports=CountriesRouter;