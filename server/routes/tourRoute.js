const express=require("express");
const { addTour } = require("../controllers/tours");
const tourRouter=express.Router();
tourRouter.post("/add-tour",addTour);

module.exports=tourRouter;