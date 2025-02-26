const { addDay, fetchItinaray, editItinirary } = require("../controllers/itinarayController");

express=require("express");
const itinarayRouter=express.Router();
itinarayRouter.post("/add-day",addDay);
itinarayRouter.get("/:name",fetchItinaray);
itinarayRouter.post("/edit-itinirary",editItinirary);

module.exports=itinarayRouter;