const packageModel = require("../models/PackageModel");

const ourPackages=async(req,res)=>{
  try{

const allpackages=await packageModel.find().sort({updatedAt:-1});
return res.status(200).json({allpackages});
  }catch(error){

    return res.status(500).json({"internal error!":error})
  }
}


const destinationWisePackage=async(req,res)=>{
try{
  const{destinationId}= req.params;
packages=await packageModel.find({destinationId}).sort({updatedAt:-1});
if(!packages){ return res.status(404).json({"error":"no packages found in this destination"})};
return res.status(200).json({packages});

}catch(error){

  return res.status(500).json({"internal server error":error})
}
}
module.exports={ourPackages,destinationWisePackage};