const packageModel = require("../models/PackageModel");
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




module.exports={packageDetails };