const { addDay, fetchItinaray } = require("../controllers/itinarayController");

express=require("express");
const itinarayRouter=express.Router();
itinarayRouter.post("/add-day",addDay);
itinarayRouter.get("/:id",fetchItinaray);

module.exports=itinarayRouter;