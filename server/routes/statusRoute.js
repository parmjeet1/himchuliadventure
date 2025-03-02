const express=require("express");
const { toggleStatus } = require("../controllers/statusEnableDisableController");
const  statusRouter=express.Router();
statusRouter.post("/update",toggleStatus);
module.exports=statusRouter;