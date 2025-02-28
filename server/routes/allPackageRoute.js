const express=require("express");
const { ourPackages } = require("../controllers/allPackagesController");
const allPackagesRouter= express.Router();

allPackagesRouter.get("/",ourPackages);

module.exports=allPackagesRouter;