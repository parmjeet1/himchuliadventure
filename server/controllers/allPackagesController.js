const packageModel = require("../models/PackageModel");

const ourPackages=async(req,res)=>{
  try{

const allpackages=await packageModel.find();
return res.status(200).json({allpackages});
  }catch(error){

    return res.status(500).json({"internal error!":error})
  }
}

module.exports={ourPackages};