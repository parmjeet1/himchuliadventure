const express = require("express");
const CountriesRouter = express.Router();

const { addCountry, fetchCountry } = require("../controllers/countriesController");

CountriesRouter.post("/add-country",addCountry);
CountriesRouter.get("/:id",fetchCountry);

module.exports=CountriesRouter;