const express=require("express");
const { fetchPackage } = require("../controllers/packageController");
const { packageDetails } = require("../controllers/packageWithAggrigation");
const { ourPackages } = require("../controllers/allPackagesController");
const packagePublicRouter=express.Router();
packagePublicRouter.get("/",fetchPackage);

packagePublicRouter.get("/:limitNumber",packageDetails);

packagePublicRouter.get("/asdf",ourPackages )
module.exports=packagePublicRouter;