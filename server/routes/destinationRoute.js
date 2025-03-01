const express=require("express");
const { addDestination, fetchDestination, editDestination } = require("../controllers/destinationController");
const destinationRouter=express.Router();
destinationRouter.post("/add-destination",addDestination)
destinationRouter.get("/:nod?",fetchDestination);
destinationRouter.post("/edit-destination",editDestination);
module.exports=destinationRouter;