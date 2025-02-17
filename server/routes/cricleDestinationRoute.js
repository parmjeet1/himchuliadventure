
const express=require("express");
const upload = require("../middlewares/upload");

const { addCrcileImageToDestination, fetchcricleDestination } = require("../controllers/cricleDestinationControllers");
const cricleRouter= express.Router();
cricleRouter.post("/add-cricle-image",upload.single("image"),addCrcileImageToDestination )

module.exports=cricleRouter;