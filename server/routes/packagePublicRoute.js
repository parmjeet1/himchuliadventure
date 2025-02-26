const express=require("express");
const { fetchPackage } = require("../controllers/packageController");
const { packageDetails } = require("../controllers/packageWithAggrigation");
const packagePublicRouter=express.Router();
packagePublicRouter.get("/",fetchPackage);

packagePublicRouter.get("/packageDetails",packageDetails);
module.exports=packagePublicRouter;