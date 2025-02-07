const ItinarayModel = require("../models/ItinarayModel");
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

    const {id}=req.params;
if(!id){ return res.status(400).json({error:"id could not foud"}) }

    const itinaray=await ItinarayModel.find({packageId:id}).select("-updatedBy -createdAt -updatedAt");
    if(!itinaray){ res.status(401).json({error:"Itinary could not found!"}) }
    console.log(itinaray);
    return res.status(200).json({ package:itinaray })

   }catch(error){
    return res.status(401).json({message:"internal server error",error:error.message});
   }

}



module.exports = { addDay,fetchItinaray };
