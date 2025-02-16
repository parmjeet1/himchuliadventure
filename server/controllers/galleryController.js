
const galleryModel = require("../models/GalleryModel");
const packageModel = require("../models/PackageModel");

const addimageTogallery = async (req, res) => {
    try {


        if (!req.file) {
            return res.status(422).json({ error: "Image file is required" });
        }

        const { altTag } = req.body;
        if (!altTag) {
            return res.status(422).json({ error: "AltTag cannot be empty" });
        }

        // Correctly use the stored filename from Multer
        const imagePath = `http://13.60.227.23:5000/uploads/${req.file.filename}`;

        // Update package with new image path
        const addNewImage = galleryModel({ image: imagePath, altTag });
        await addNewImage.save();
        if (!addNewImage) {
            return res.status(422).json({ message: "Image could not be updated" });
        }

        return res.status(200).json({ message: "Image Updated successfully", addNewImage });

    } catch (error) {
        return res.status(500).json({ error: error.message || error });
    }
};

const fetchGallery= async (req,res) =>{
    try{
    
    // const {id}=req.params;
 
     const gallery=await galleryModel.find({status:true}).select("-_id -status -__v -createdAt -updatedAt");
     if(!gallery){ res.status(401).json({error:"image could not found!"}) }
     
     return res.status(200).json({ gallery })
 
    }catch(error){
     return res.status(401).json({message:"internal server error",error:error.message});
    }
 
 }

module.exports ={addimageTogallery,fetchGallery};