const express=require("express");
const { fetchPackage } = require("../controllers/packageController");
const { packageDetails, allPackages } = require("../controllers/packageWithAggrigation");
const packagePublicRouter=express.Router();
packagePublicRouter.get("/",fetchPackage);

packagePublicRouter.get("/:limitNumber",packageDetails);

packagePublicRouter.get("/all-packages",allPackages)
module.exports=packagePublicRouter;