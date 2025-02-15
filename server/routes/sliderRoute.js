const express=require("express");
const { addSliderImage } = require("../controllers/sliderController");
const sliderRouter=express.Router();
const upload = require("../middlewares/upload");
sliderRouter.post("/add-image",upload.single("image"),addSliderImage);
module.exports=sliderRouter;