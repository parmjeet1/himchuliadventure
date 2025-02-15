const express=require("express");
const {  fetchGallery } = require("../controllers/galleryController");
const galleryPublicRouter= express.Router();
galleryPublicRouter.get("/",fetchGallery )
module.exports=galleryPublicRouter;