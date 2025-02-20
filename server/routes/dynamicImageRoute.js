const express=require("express");
const { NewDynamicImage } = require("../controllers/dynamicImageController");
const upload = require("../middlewares/upload");
const dynamicImageRouter=express.Router();
dynamicImageRouter.post("/add-image", upload.single("image"), NewDynamicImage)
module.exports=dynamicImageRouter;

