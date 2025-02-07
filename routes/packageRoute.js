const express=require("express");
const addNewPackage=require("../controllers/packageController");
const packageRouter= express.Router();
packageRouter.post("/add-package",addNewPackage);
module.exports=packageRouter;