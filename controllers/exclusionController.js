
ExclusionModel=require("../models/ExclusionModel");

const addExclusion = async (req, res) => {
  try {
    const { description, packageId} = req.body;


    const exclusion = new ExclusionModel({description,packageId});
    await exclusion.save();
    return res.status(201).json({
      message: "one exclusion  added Successfully",
      name: exclusion,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const fetchExclusion= async (req,res) =>{
   try{

    const {id}=req.params;
if(!id){ return res.status(400).json({error:"id could not foud"}) }

    const exclusion=await ExclusionModel.find({destinationId:id}).select("-updatedBy -createdAt -updatedAt");
    if(!exclusion){ res.status(401).json({error:"Itinary could not found!"}) }
    
    return res.status(200).json({ name:exclusion })

   }catch(error){
    return res.status(401).json({message:"internal server error",error:error.message});
   }

}



module.exports = { addExclusion,fetchExclusion};
