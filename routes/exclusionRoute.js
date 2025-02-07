const { addExclusion, fetchExclusion } = require("../controllers/exclusionController");

express=require("express");
const exclusionRouter=express.Router();
exclusionRouter.post("/add-exclusion",addExclusion);
exclusionRouter.get("/:id",fetchExclusion);

module.exports=exclusionRouter;