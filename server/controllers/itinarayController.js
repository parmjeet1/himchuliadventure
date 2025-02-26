const ItinarayModel = require("../models/ItinarayModel");
const packageModel = require("../models/PackageModel");
const addDay = async (req, res) => {
  try {
    const { day,title,description, packageId} = req.body;


    const days = new ItinarayModel({ day,title,description,packageId});
    await days.save();
    return res.status(201).json({
      message: "one Day added Successfully",
      name: days,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const fetchItinaray= async (req,res) =>{
   try{

    const {name}=req.params;
if(!name){ return res.status(400).json({error:"tilte  could not foud"}) }
const packageId=await packageModel.findOne({name}).select("_id");

    const itinaray=await ItinarayModel.find({packageId:packageId}).select("-updatedBy -createdAt -updatedAt");
    if(!itinaray){ res.status(401).json({error:"Itinary could not found!"}) }
    console.log(itinaray);
    return res.status(200).json({ package:itinaray })

   }catch(error){
    return res.status(401).json({message:"internal server error",error:error.message});
   }

}

const editItinirary = async (req, res) => {
  try {
    const { id, title,day,description} = req.body;
    if (!id || !title  || !day || !description) {
      return res.status(400).json({ error: "Fileds can not be empty" });
    }
    const updates = await ItinarayModel.findByIdAndUpdate(
    id,
      { $set: { title,day,description } },
      { new: true }
    );
    if (!updates) {
      return res.status(404).json({
        status: "fail",
        message: "entry not found",
        error: { id: "No Entry found " }
      });
    }
    if (updates) {
      return res.status(200).json({ message: " Edited successfully!", updates });
    }
  } catch (error) {
    return res.status(500).json({ error:"internal error", details:error.message });
  }
};

module.exports = { addDay,fetchItinaray,editItinirary };
