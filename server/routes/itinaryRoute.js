const { addDay, fetchItinaray } = require("../controllers/itinarayController");

express=require("express");
const itinarayRouter=express.Router();
itinarayRouter.post("/add-day",addDay);
itinarayRouter.get("/:name",fetchItinaray);

module.exports=itinarayRouter;