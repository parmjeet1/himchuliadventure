const countries = require("../models/CountriesModel");
const CountriesModel=require("../models/CountriesModel");
const DestinationsModel = require("../models/DestinationsModel");
const packageModel = require("../models/PackageModel");
const countryWisegridView=async(req,res)=>{
   const countryIds=await CountriesModel.find({ gridViewStatus: true })
   .select("_id coverHeading coverParagraph homeFetaureImage name");
   
   if (countryIds.length === 0) {
    return res.status(201).json({ error: "There are no Countries for Cover view" });
}
   const countryIdArray=countryIds.map(c=>c._id)



   const destinationIds=await DestinationsModel.find({ 
    countryId:{$in:countryIdArray},
    
}).select("_id");
   if (destinationIds.length === 0) {
    return res.status(201).json({ error: "No destinations found for the given countries" });
}
   const destionIdArray=destinationIds.map(d=>d._id);
   
    const packages=await packageModel.find({destinationId:{$in:destionIdArray},
        countryViewStatus: { $in: [true, "true"] } })


const coverHeading=countryIds.map(c=>c.coverHeading)
const coverParagraph=countryIds.map(c=>c.coverParagraph)
const homeFetaureImage=countryIds.map(c=>c.homeFetaureImage);
const countryName=countryIds.map(c=>c.name);

return res.status(200).json({ packages, countryName,homeFetaureImage,coverHeading,coverParagraph });
    
//
}
module.exports={countryWisegridView}