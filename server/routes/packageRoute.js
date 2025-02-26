const express = require("express");
const packageRouter = express.Router();
const upload = require("../middlewares/upload"); // Import multer middleware
const { addPackageFeatureImageWithMulter } = require("../controllers/packageWithmulter");
const { addPackage, editpackage } = require("../controllers/packageController");

packageRouter.post("/add-image", upload.single("image"), addPackageFeatureImageWithMulter);
//packageRouter.get("",)
packageRouter.post("/add-package",addPackage)
packageRouter.post("/edit-package",editpackage);
module.exports = packageRouter;




