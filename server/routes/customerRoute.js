const express=require("express");
const { addCustomerDetail, fetchCustomerDetails } = require("../controllers/contactController");
const customerRouter=express.Router();
customerRouter.post("/add-customer",addCustomerDetail);

customerRouter.get("/fetch",fetchCustomerDetails);

module.exports=customerRouter;