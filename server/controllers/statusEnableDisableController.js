const packageModel = require("../models/PackageModel");

const toggleStatus = async (req, res) => {
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

        // ✅ Toggle Country View Status Separately
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




module.exports={toggleStatus};
