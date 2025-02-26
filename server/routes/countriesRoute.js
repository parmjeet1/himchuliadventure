const express = require("express");
const CountriesRouter = express.Router();

const { addCountry, fetchCountry, addCountryCoverView, editCountry } = require("../controllers/countriesController");
const upload = require("../middlewares/upload");

CountriesRouter.post("/add-country",addCountry);
CountriesRouter.get("/",fetchCountry);
CountriesRouter.post("/edit-country-cover",upload.single("image"),addCountryCoverView);
CountriesRouter.post("/edit-country", editCountry );



module.exports=CountriesRouter;