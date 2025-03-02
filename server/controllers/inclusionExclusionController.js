const { default: mongoose } = require("mongoose");

const PackageAmintiesModel = require("../models/PackageAmintiesModel");
const InclusionExclusionModel = require("../models/InclusionExclusionModel");

const addInclusionExclusion=async(req,res)=>{
{
try{
    const {AmintiesName, inclusionExclusionList }=req.body;
    const session=await mongoose.startSession();
    session.startTransaction();
    const packageAminties=new PackageAmintiesModel({name:AmintiesName},);
    await packageAminties.save({session});
    if(Array.isArray(inclusionExclusionList) && inclusionExclusionList.length>0){
      const toInsert = inclusionExclusionList.map(eachList=>({
        packageAminitiesId:packageAminties._id,
            inclusion: eachList.inclusion,
            exclusion:eachList.exclusion
        }))
        await InclusionExclusionModel.insertMany(toInsert,{session})
    }

    if(!packageAminties._id){
        await session.abortTransaction();
        session.endSession();


       return res.status(404).json({"error":"packageAminties does not found"});
    }
    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({
        status: "success",
        message: "Inclusion and Exclusion has been added successfully",
        packageAmintiesId: packageAminties._id
    })

}catch(error){
    res.status(500).json({"internal error":error})
}
}
}

const fetchInclusionExclusion = async (req, res) => {
    try {
        const PackageAminities = await PackageAmintiesModel.aggregate([
            {
                $lookup: {
                    from: "inclusionexclusions", // ✅ Ensure correct collection name
                    localField: "_id",
                    foreignField: "packageAminitiesId",
                    as: "inclusionExclusionDetails"
                }
            },
            { $unwind: "$inclusionExclusionDetails" }, // ✅ Unwind to flatten array
            {
                $project: {
                    _id: 0,
                    packageAminitiesId: "$_id",
                    inclusionExclusionId: "$inclusionExclusionDetails._id",
                    inclusion: "$inclusionExclusionDetails.inclusion", // ✅ Ensure these fields exist
                    exclusion: "$inclusionExclusionDetails.exclusion"
                }
            },
            { $sort: { createdAt: -1 } } // ✅ Sort by latest
        ]);

        return res.status(200).json({ status: "success", data: PackageAminities });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};





module.exports={addInclusionExclusion,fetchInclusionExclusion}