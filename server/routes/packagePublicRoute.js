const express=require("express");
const { fetchPackage } = require("../controllers/packageController");
const { packageDetails } = require("../controllers/packageWithAggrigation");
const packagePublicRouter=express.Router();
packagePublicRouter.get("/",fetchPackage);

packagePublicRouter.get("/:limitNumber",packageDetails);
module.exports=packagePublicRouter;