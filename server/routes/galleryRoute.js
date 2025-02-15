const express=require("express");
const upload = require("../middlewares/upload");
const { addimageTogallery } = require("../controllers/galleryController");
const galleryRouter= express.Router();
galleryRouter.post("/add-image",upload.single("image"),addimageTogallery )
module.exports=galleryRouter;