const express=require("express");
const { addDestination, fetchDestination } = require("../controllers/destinationController");
const destinationRouter=express.Router();
destinationRouter.post("/add-destination",addDestination)
destinationRouter.get("/:nod",fetchDestination);
module.exports=destinationRouter;