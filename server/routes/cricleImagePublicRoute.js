
const express=require("express");
const upload = require("../middlewares/upload");

const {  fetchcricleDestination } = require("../controllers/cricleDestinationControllers");
const criclePublicRouter= express.Router();
criclePublicRouter.get("/cricle-image",fetchcricleDestination);
module.exports=criclePublicRouter;