
const cricleDestinationModel = require("../models/CricleDestinationModel");
const DestinationsModel = require("../models/DestinationsModel");
require("dotenv").config();

const addCrcileImageToDestination = async (req, res) => {
    
    try {

        if (!req.file) {
            return res.status(422).json({ error: "Image file is required" });
        }

        const { destinationId } = req.body;
        if (!destinationId) {
            return res.status(422).json({ error: "destinationId cannot be empty" });
        }

        // Correctly use the stored filename from Multer
        const imgUrl = process.env.IMAGE_PATH; // No quotes around process.env.IMAGE_PATH
        const imagePath = `${imgUrl}${req.file.filename}`;
        
        // Update package with new image path
        const addNewImage = cricleDestinationModel({ image: imagePath, destinationId });
        await addNewImage.save();
        if (!addNewImage) {
            return res.status(422).json({ message: "Image could not be updated" });
        }

        return res.status(200).json({ message: "Image Updated successfully", addNewImage });

    } catch (error) {
        return res.status(500).json({ error: error.message || error });
    }
};

const fetchcricleDestination = async (req, res) => {
    try {
        // Fetch circle destinations with status true
        const cricleDestinations = await cricleDestinationModel.find({ status: true }).select("-__v -createdAt -updatedAt");
        
        if (!cricleDestinations || cricleDestinations.length === 0) {
            return res.status(401).json({ error: "No destinations found!" });
        }

        // Extract destination IDs
        const destinationIds = cricleDestinations.map(dest => dest.destinationId);

        // Find destinations
        const destinations = await DestinationsModel.find({ _id: { $in: destinationIds } });

        // Create a map of destinationId -> destination name for quick lookup
        const destinationMap = {};
        destinations.forEach(dest => {
            destinationMap[dest._id] = dest.name;
        });

        // Map images with their corresponding destination names
        const result = cricleDestinations.map(dest => ({
            image: dest.image,
            destination: destinationMap[dest.destinationId] || "Unknown Destination"
        }));

        return res.status(200).json({ data: result });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};




module.exports ={addCrcileImageToDestination,fetchcricleDestination};