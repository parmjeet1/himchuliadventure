

const express = require("express");

const { addInclusionExclusion, fetchInclusionExclusion } = require("../controllers/inclusionExclusionController");
const inclsionExclusionRouter = express.Router();

// Import controllers

inclsionExclusionRouter.post("/add",addInclusionExclusion);

inclsionExclusionRouter.get("/fetch",fetchInclusionExclusion);


module.exports = inclsionExclusionRouter;
