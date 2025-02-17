
const cricleDestinationModel = require("../models/CricleDestinationModel");
const DestinationsModel = require("../models/DestinationsModel");
require("dotenv").config();

const addCrcileImageToDestination = async (req, res) => {
    console.log("working");
    try {

        if (!req.file) {
            return res.status(422).json({ error: "Image file is required" });
        }

        const { destinationId } = req.body;
        if (!destinationId) {
            return res.status(422).json({ error: "destinationId cannot be empty" });
        }

        // Correctly use the stored filename from Multer
        const imgUrl=process.env.IMAGE_PATH;
        const imagePath = `${imgUrl}${req.file.filename}`;
console.log(imagePath);
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
    console.log("working")    
    try {

        // Fetch circle destinations
        const cricleDestinations = await cricleDestinationModel.find({ status: true }).select("-__v -createdAt -updatedAt");
       console.log(cricleDestinations);
        if (!cricleDestinations || cricleDestinations.length === 0) {
            return res.status(401).json({ error: "No destinations found!" });
        }

        // Extract destination IDs
        const destinationIds = cricleDestinations.map(dest => dest.destinationId);

        // Find destinations
        const destinations = await DestinationsModel.find({ _id: { $in: destinationIds } });

        // Map destinations to their names
        const destinationNames = destinations.map(dest => dest.name);
console.log(destinationNames);
        return res.status(200).json({ images: cricleDestinations.map(dest => dest.image), destinations: destinationNames });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



module.exports ={addCrcileImageToDestination,fetchcricleDestination};