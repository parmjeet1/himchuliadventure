const express=require("express");
const { countryWisegridView } = require("../controllers/countryView");
const countryPublicRouter=express.Router();
countryPublicRouter.get("/cover-view",countryWisegridView);

module.exports=countryPublicRouter;