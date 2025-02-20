const express=require("express");
const { addCustomerDetail } = require("../controllers/contactController");
const customerRouter=express.Router();
customerRouter.post("/add-customer",addCustomerDetail);
module.exports=customerRouter;