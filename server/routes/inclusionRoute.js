const { addInclusion } = require("../controllers/inclusionController");

express=require("express");
const inclusionRouter=express.Router();
inclusionRouter.post("/add-inclusion",addInclusion);
module.exports=inclusionRouter;
