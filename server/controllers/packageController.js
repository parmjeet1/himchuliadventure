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



const packagesGridView=async(req,res)=>{
  try {
    const packages = await packageModel.aggregate([
        {
            $match: { featuredStatus: true }
        },
        {
            $lookup: {
                from: "users",
                localField: "updatedBy",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $addFields: {
                userDetails: { $arrayElemAt: ["$userDetails", 0] } // ✅ Ensure `userDetails` is always an object, even if empty
            }
        },
        {
            $sort: { updatedAt: -1 }
        },
        {
            $project: {
                _id: 1,
                packageAminitiesId: 1,
                destinationId: 1,
                name: 1,
                featuredStatus: 1,
                cost: 1,
                days: 1,
                nights: 1,
                description: 1,
                imageUrl: 1,
                userDetails: {
                    mobile: { $ifNull: ["$userDetails.mobile", "N/A"] } // ✅ Handle cases where mobile is missing
                }
            }
        }
    ]);

    return res.status(200).json({ packages });

} catch (error) {
    return res.status(500).json({ error: "Internal error!", details: error.message });
}

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


const allPackages=async(req,res)=>{
  try{

const allpackages=await packageModel.find().sort({updatedAt:-1});
return res.status(200).json({"allpackages":allpackages});
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

const packageDetails=async(req,res)=>{
  try{
      const  {limitNumber}=req.params;
      const limit=parseInt(limitNumber)||1;
  const packages= await packageModel.aggregate([
  {  $match:{ featureStatus:true  }
  },
  {
      $lookup:{
          from:"destinations",
          localField:"destinationId",
          foreignField:"_id",
           as: "destinationDetails"
      }
  },
  
  { $unwind:"$destinationDetails" },
  {
      $lookup:{
          from:"countries",
          localField:"destinationDetails.countryId",
          foreignField:"_id",
          as:"countryDetails"
      }
  },
  { $unwind:"$countryDetails" },
  {
      $lookup:{
          from:"users",
          localField:"countryDetails.updatedBy",
          foreignField:"_id",
          as:"userDetails"
      }
  },
  {
      $unwind:"$userDetails"
  }   
  ,
  {
      $project:{
       
          countryId:"$countryDetails._id",
          packageId:"$_id",
          destinationId:"$destinationDetails._id",
          _id:0,
          name:1,
          days:1,
          nights:1,
          cost:1,
          description:1,
          imageUrl:1,
          destinationName: "$destinationDetails.name",
          location: "$destinationDetails.location",
          mobile:"$userDetails.mobile"
      }
  
  },
  {$limit:limit}
  ])
  return res.json(
      packages.map(pkg => ({
         
          countryId:pkg.countryId,
          destinationId:pkg.destinationId,
          packageId: pkg.packageId,  
          name: pkg.name,
          days: pkg.days,
          nights: pkg.nights,
          cost: pkg.cost,
          description: pkg.description,
          imageUrl: pkg.imageUrl,
          destinationName: pkg.destinationName,
          location: pkg.location,
          mobile: pkg.mobile
      }))
  );
  }catch(error){
      return res.status(500).json({"name":"internal error",error})
  }
  }

 

const addPackageFeatureImagewithMulter = async (req, res) => {
  try {
   

    if (!req.file) {
      return res.status(422).json({ error: "Image file is required" });
    }

    const { packageId } = req.body;
    if (!packageId) {
      return res.status(422).json({ error: "Package ID cannot be empty" });
    }

    // Correctly use the stored filename from Multer
    const imagePath = `/uploads/${req.file.filename}`;

    // Update package with new image path
    const updatedPackage = await packageModel.findByIdAndUpdate(
      packageId,
      { imageUrl: imagePath, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(422).json({ message: "Image could not be updated" });
    }

    return res.status(200).json({ message: "Image Updated successfully", updatedPackage });

  } catch (error) {
    return res.status(500).json({ error: error.message || error });
  }
};
const togglePackageStatus = async (req, res) => {
  try {
      const { packageIdsForFeaturedStatus, packageIdsForCountryStatus } = req.body;

      if ((!Array.isArray(packageIdsForFeaturedStatus) || packageIdsForFeaturedStatus.length === 0) &&
          (!Array.isArray(packageIdsForCountryStatus) || packageIdsForCountryStatus.length === 0)) {
          return res.status(400).json({ error: "Invalid packageIds array. Provide at least one valid array." });
      }

      let updatedFeaturedCount = 0;
      let updatedCountryCount = 0;


      if (Array.isArray(packageIdsForFeaturedStatus) && packageIdsForFeaturedStatus.length > 0) {
          const updatedFeatured = await packageModel.updateMany(
              { _id: { $in: packageIdsForFeaturedStatus } },
              [
                  {
                      $set: {
                          featuredStatus: { $not: "$featuredStatus" } 
                      }
                  }
              ]
          );
          updatedFeaturedCount = updatedFeatured.modifiedCount;
      }

     
      if (Array.isArray(packageIdsForCountryStatus) && packageIdsForCountryStatus.length > 0) {
          const updatedCountry = await packageModel.updateMany(
              { _id: { $in: packageIdsForCountryStatus } },
              [
                  {
                      $set: {
                          countryViewStatus: { $not: "$countryViewStatus" } 
                      }
                  }
              ]
          );
          updatedCountryCount = updatedCountry.modifiedCount;
      }

      return res.status(200).json({
          message: "Package statuses updated successfully",
          updatedFeaturedCount,
          updatedCountryCount
      });

  } catch (error) {
      return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports={addPackage,addPackageFeatureImage,packagesGridView,editpackage,destinationWisePackage,allPackages ,packageDetails,addPackageFeatureImagewithMulter,togglePackageStatus}