const mongoose = require("mongoose");
const CountriesModel = require("../models/CountriesModel");
const StatesModel = require("../models/StatesModel");
const DestinationsModel = require("../models/DestinationsModel");
const packageModel = require("../models/PackageModel");
const ItinarayModel = require("../models/ItinarayModel");
const InclusionModel = require("../models/InclusionModel");
const exclusionModel = require("../models/ExclusionModel");
const addTour = async (req, res) => {
    const {

        destinationName,
      
        destinationDescription,
        packageName,
        days,
        nights,
        cost,
        packageDescription,
        stateId,
        itineraries,
        packageAminitiesId,
        updatedBy,
        countryId
    } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const destination = new DestinationsModel({

            stateId,
            name: destinationName,
            description: destinationDescription,
            updatedBy
        });
        await destination.save({ session });

        const package = new packageModel({
            destinationId: destination._id,
            name: packageName,
            days,
            nights,
            cost,
            packageAminitiesId,
            description: packageDescription,
            updatedBy,
            countryId
        });
        await package.save({ session });

       

        if (Array.isArray(itineraries) && itineraries.length > 0) {
            const itinerariesToInsert = itineraries.map(itinerary => ({
                packageId: package._id, // Link to package
                title: itinerary.title,
                day: itinerary.day,
                description: itinerary.description,
                updatedBy
            }))
            await ItinarayModel.insertMany(itinerariesToInsert, { session });
        }



        if (!stateId ) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ status: "fail", message: "State and pckage not found" });
        }
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({
            status: "success",
            message: "Tour added successfully",
            packageId: package._id
        })
    } catch (error) {
        await session.abortTransaction();  // Rollback all changes
        session.endSession();
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
};
module.exports = { addTour };