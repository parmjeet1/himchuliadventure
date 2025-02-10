const packageModel=require("../models/PackageModel");
const ItinararyModel=require("../models/ItinarayModel");
const InclusionModel = require("../models/InclusionModel");
const exclusionModel = require("../models/ExclusionModel");
const DestinationsModel = require("../models/DestinationsModel");
const fetchTripDetails=async (req,res)=>{
    try{
        const {name}=req.params;
        const packageData=await packageModel.findOne({name}).select("-createdAt -updatedAt -__v");
        if(!packageData){res.status(201).json({"message":"no package found"})}
        const packageId = packageData._id;
    const itinerary =await ItinararyModel.find({packageId}).select("-createdAt -updatedAt -__v");
    const inclusion=await InclusionModel.find({packageId}).select("-createdAt -updatedAt -__v");
    const exclusion=await exclusionModel.find({packageId}).select("-createdAt -updatedAt -__v");
    const destinationId=packageData.destinationId;
    const destination=await DestinationsModel.find({_id:destinationId}).select("-createdAt -updatedAt -__v") 
    res.status(200).json({
        details: {
            destination:destination,
            package: packageData,
            itinerary: itinerary,
            inclusion:inclusion,
            exclusion:exclusion
        }
    });


    }catch(error){return res.status(401).json({error:error.message})}
}
module.exports={fetchTripDetails}