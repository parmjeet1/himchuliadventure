const InclusionModel = require("../models/InclusionModel");


const addInclusion = async (req, res) => {
  try {
    const { description, packageId} = req.body;


    const inclusion = new InclusionModel({description,packageId});
    await inclusion.save();
    return res.status(201).json({
      message: "one Inclusion  added Successfully",
      name: inclusion,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const fetchInclusion= async (req,res) =>{
   try{

    const {id}=req.params;
if(!id){ return res.status(400).json({error:"id could not foud"}) }

    const inclusion=await InclusionModel.find({packageId:id}).select("-updatedBy -createdAt -updatedAt");
    if(!inclusion){ res.status(401).json({error:"Itinary could not found!"}) }
    
    return res.status(200).json({ name:inclusion })

   }catch(error){
    return res.status(401).json({message:"internal server error",error:error.message});
   }

}



module.exports = { addInclusion,fetchInclusion};
