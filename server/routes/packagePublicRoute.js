const express=require("express");
const { fetchPackage } = require("../controllers/packageController");
const packagePublicRouter=express.Router();
packagePublicRouter.get("/",fetchPackage);
module.exports=packagePublicRouter;