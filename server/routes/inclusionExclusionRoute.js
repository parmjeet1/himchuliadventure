

const express = require("express");

const { addInclusionExclusion, fetchInclusionExclusion, fetchPackageAminties } = require("../controllers/inclusionExclusionController");
const inclsionExclusionRouter = express.Router();

// Import controllers

inclsionExclusionRouter.post("/add",addInclusionExclusion);

inclsionExclusionRouter.get("/fetch",fetchInclusionExclusion);

inclsionExclusionRouter.get("/packageAminties",fetchPackageAminties);


module.exports = inclsionExclusionRouter;
