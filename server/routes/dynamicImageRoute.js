const express=require("express");
const { NewDynamicImage, fetchAllImages } = require("../controllers/dynamicImageController");
const upload = require("../middlewares/upload");
const dynamicImageRouter=express.Router();
dynamicImageRouter.post("/add-image", upload.single("image"), NewDynamicImage)

dynamicImageRouter.get("/all-images", fetchAllImages)

module.exports=dynamicImageRouter;

