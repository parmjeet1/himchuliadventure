const express=require("express");
const { fetchTripDetails } = require("../controllers/tripDetailsController");
const tripDetailRouter=express.Router();

tripDetailRouter.get("/:name",fetchTripDetails);
module.exports=tripDetailRouter;