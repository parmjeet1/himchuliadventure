const packageModel = require("../models/PackageModel");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs").promises;
const path = require("path");
const DestinationsModel = require("../models/DestinationsModel");
const CountriesModel=require("../models/CountriesModel");
const StatesModel=require("../models/StatesModel")
const User=require("../models/Users");
//const { insertFileintoFirebase } = require("../firebase/insertFile");
// imported files
const addPackage= async (req,res)=>{
  try {
    const { name,description, destinationId,nights,days,cost} = req.body;


    const package = new packageModel({ name,description,destinationId,nights,days,cost});
     await package.save();
    return res.status(201).json({
      message: "one Package added Successfully",
      name: package,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }

}
const addPackageFeatureImage =  (req, res) => {
  try {
   const { packageId } = req.body;
    const {thumbnail}=req.files;
    let fileName = thumbnail.name;
    let splittedFileName = fileName.split(".");
    let newFileName = `${splittedFileName[0]}-${uuid()}.${
      splittedFileName[splittedFileName.length - 1]
    }`;

    console.log(newFileName);
    const metaData={
        contentType:thumbnail.mimetype
                }

   
    // 
   
   // return res.status(200).json({ message: "Image Updated successfully", updatedPackage });

  } catch (error) {
    return res.status(500).json({ error: error.message || error });
  }
};




const fetchPackage=async (req,res)=>{
 
  try{
      // const {destinationId}=req.params;
    
      const package= await packageModel.find().select(" -_id -__v  -updatedAt -createdAt");
      if(!package){ return res.status(401).json({message:"no package found"}) }
      
     const destinationId=package.map(pkge=>pkge.destinationId).filter(id=>id)

      const destination=await DestinationsModel.findOne({_id:destinationId});
    
      const country=await CountriesModel.findOne({_id:destination.countryId});
const user=await User.findOne({_id:country.updatedBy})
      
      return res.status(200).json({name:package,destinatioxn:destination.name,mobie:user.mobile})


  }catch(error){return res.status(401).json({error:error.message})  }
 
}

const editpackage = async (req, res) => {
  try {
    const { id, name,days,nights,cost,countryViewStatus,description, featureStatus} = req.body;
    if (!id || !name) {
      return res.status(400).json({ error: "Fileds can not be empty" });
    }
    const updates = await packageModel.findByIdAndUpdate(
      id,
      { $set: { name,days,nights,cost,featureStatus,countryViewStatus,description,featureStatus } },
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
module.exports={addPackage,addPackageFeatureImage,fetchPackage,editpackage }