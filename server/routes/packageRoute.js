const express = require("express");
const packageRouter = express.Router();
const upload = require("../middlewares/upload"); // Import multer middleware

const { addPackage, editpackage, packagesGridView, destinationWisePackage, allPackages, packageDetails, addPackageFeatureImagewithMulter, togglePackageStatus } = require("../controllers/packageController");
packageRouter.post("/admin/package/add-image", upload.single("image"), addPackageFeatureImagewithMulter);
packageRouter.post("/admin/package/add-package",addPackage)
packageRouter.post("/admin/package/edit-package",editpackage);
packageRouter.get("/all-packages/destination-wise/:destinationId",destinationWisePackage);
packageRouter.get("/package",packagesGridView);
packageRouter.get("/package/all-packages",allPackages);
packageRouter.get("/package/:limit",packageDetails);
packageRouter.post("/admin/toggle-status/update",togglePackageStatus);


module.exports = packageRouter;




