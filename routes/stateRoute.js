const express=require("express");
const { addState, fetchState } = require("../controllers/stateController");
const stateRouter=express.Router();

stateRouter.post("/add-state",addState);
stateRouter.get("/:stateId",fetchState);
module.exports=stateRouter;
