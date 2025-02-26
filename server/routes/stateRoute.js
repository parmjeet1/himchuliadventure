const express=require("express");
const { addState, fetchState, editState } = require("../controllers/stateController");
const stateRouter=express.Router();

stateRouter.post("/add-state",addState);
stateRouter.get("/:countryId",fetchState);
stateRouter.post("/edit-state",editState);
module.exports=stateRouter;
