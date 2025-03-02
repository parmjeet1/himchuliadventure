const { default: mongoose } = require("mongoose");

const PackageAmintiesModel = require("../models/PackageAmintiesModel");
const InclusionExclusionModel = require("../models/InclusionExclusionModel");

const addInclusionExclusion = async (req, res) => {
    try {
        const { AmintiesName, inclusion, exclusion } = req.body;

        if (!AmintiesName || !Array.isArray(inclusion) || !Array.isArray(exclusion)) {
            return res.status(400).json({ error: "Invalid input format. Ensure AmintiesName, inclusion, and exclusion are provided as arrays." });
        }

        if (inclusion.length !== exclusion.length) {
            return res.status(400).json({ error: "Inclusion and exclusion arrays must have the same length." });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        const packageAminities = new PackageAmintiesModel({ name: AmintiesName });
        await packageAminities.save({ session });

        const toInsert = inclusion.map((inc, index) => ({
            packageAminitiesId: packageAminities._id,
            inclusion: inc,
            exclusion: exclusion[index]
        }));

        await InclusionExclusionModel.insertMany(toInsert, { session });
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            status: "success",
            message: "Inclusion and Exclusion have been added successfully",
            packageAminitiesId: packageAminities._id
        });

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};




const fetchInclusionExclusion = async (req, res) => {
    try {
        const packageAminities = await PackageAmintiesModel.aggregate([
            {
                $lookup: {
                    from: "inclusionexclusions", // 
                    localField: "_id",
                    foreignField: "packageAminitiesId",
                    as: "inclusionExclusionDetails"
                }
            },
            {
                $project: {
                    _id: 0,
                    AmintiesName: "$name", 
                    inclusion: {
                        $map: {
                            input: "$inclusionExclusionDetails",
                            as: "details",
                            in: "$$details.inclusion"
                        }
                    },
                    exclusion: {
                        $map: {
                            input: "$inclusionExclusionDetails",
                            as: "details",
                            in: "$$details.exclusion"
                        }
                    }
                }
            }
        ]);

        if (!packageAminities || packageAminities.length === 0) {
            return res.status(404).json({ error: "No data found" });
        }

        return res.status(200).json({ status: "success", data: packageAminities });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};


const fetchPackageAminties = async (req, res) => {
    try {
        const PackageAminities = await PackageAmintiesModel.find().sort({createdAt:-1});

        return res.status(200).json({  data: PackageAminities });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};







module.exports={addInclusionExclusion,fetchInclusionExclusion,fetchPackageAminties}