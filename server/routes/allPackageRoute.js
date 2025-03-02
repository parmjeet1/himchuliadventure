const express=require("express");
const { ourPackages, destinationWisePackage } = require("../controllers/allPackagesController");
const allPackagesRouter= express.Router();

allPackagesRouter.get("/",ourPackages);

allPackagesRouter.get("/destination-wise/:destinationId",destinationWisePackage);

module.exports=allPackagesRouter;