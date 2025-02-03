/*
add trip category  or select from previous
add country
add


*/ 

const express=require("express");
const { addCountry,addState,addTrip } = require("../controllers/tripController");
const dashBoardRouter= express.Router();
// import file
dashBoardRouter.post("/add-country",addCountry);
dashBoardRouter.post("/add-state",addState);

dashBoardRouter.post("/add-trip",addTrip);

/*router.POST("/add-country",addCountry);
router.POST("/add-trip",addTrip);
router.POST("/add-seotags",addSeotag);
router.POST("/add-trip-description",addTripDescription);
router.POST("/add-destination-information",addDestinationInformation);// location, grade,altitude, longitude etc.
router.POST("/add-trip-itinerary ",addItinerary);//  number of days and night and description of each
router.POST("/add-inclusion-exclusion",addTripInclusionExclusion);
router.POST("/add-things-to-carry",addThingsToCarry);
router.POST("/add-terms-condition",addTermsCondition);
router.POST("/add-Policies",addPolicies);
router.POST("/customer-details",customerDetails);//fetch cusotomer details on dashboard
router.POST("/customer-recipt",newCustomerRecipt);// add new customer or choose old
router.POST("/old-customer-recipt",oldCustomerRecipt)
router.POST("/review-details",ReviewDetails); // fetch reivew and publish them .
router.POST("/publish-review",publishReview);// see and publish on website.
*/



module.exports=dashBoardRouter;






