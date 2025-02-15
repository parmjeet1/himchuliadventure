const express=require("express");
const { fetchSlider } = require("../controllers/sliderController");
const sliderPublicRouter=express.Router();
sliderPublicRouter.get("/:status", fetchSlider);

module.exports=sliderPublicRouter;