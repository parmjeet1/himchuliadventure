const express = require("express");

const {adminRegistration,adminLogin}=require("../controllers/adminController");
const router = express.Router();

// Import controllers

router.post("/register",adminRegistration);
router.post("/login",adminLogin);
module.exports = router;
