
/*
images and fileds needs to manage for
1. country cover image 
api add image
countryId
    gridViewStatus
    homeFetaureImage 
    coverHeading
    coverParagraph
    state cover image
2. package featured image
add image
    packageId
    imageUrl
    featureStatus
package gallery images
3. packageGalleryModel
    packageId
    image
    packageCaption

public gallery image
controllers/galleryController.js
    galleryId
    altTag
    image
slider image gallery
sliderId
image
caption


*/
const fs = require("fs");
const path = require("path");


const packageModel = require("../models/PackageModel");
const SliderModel = require("../models/SliderModel");
const countriesModel=require("../models/CountriesModel");
const galleryModel = require("../models/GalleryModel");
const NewDynamicImage = async (req, res) => {
    try {
        const { sliderCaption, image, packageId } = req.body;
        const {countryId,coverHeading,coverParagraph}=req.body;
        const {glleryaltTag}=req.body;
        let imagePath;

       if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        } else if (image) {
            imagePath = `/uploads/${image}`;
        } else {
            return res.status(400).json({ error: "Image file or image is required" });
        }

        // Handling Slider Image Upload
        if (sliderCaption) {
            const newImage = new SliderModel({ image: imagePath, caption: sliderCaption });
            await newImage.save();
            return res.status(200).json({
                message: "New slider image added successfully",
                newImage,
            });
        }

        // Handling Package Image Upload
        if (packageId) {
            const updatedPackage = await packageModel.findByIdAndUpdate(
                packageId,
                { imageUrl: imagePath },
                { new: true } // Returns the updated document
            );

            if (!updatedPackage) {
                return res.status(400).json({ error: "Package not found or update failed" });
            }

            return res.status(200).json({
                message: "Package featured image added successfully",
                updatedPackage,
            });
        }

        if(countryId){
            const updateCountry=await countriesModel.findByIdAndUpdate({_id:countryId},{homeFetaureImage:imagePath,gridViewStatus:true, coverHeading,coverParagraph,updatedAt:Date.now()},{new:true});
if(!updateCountry){return res.status(201).json({error:"Could not Update"})}
return res.status(200).json({message:"updated Successfully",updateCountry})

        }
       
        if(glleryaltTag){
            const addNewImage =new  galleryModel({ image: imagePath, altTag:glleryaltTag });
            await addNewImage.save();
            if (!addNewImage) {
                return res.status(400).json({ message: "Gallery Image could not be updated" });
            }
            return res.status(200).json({ message: "Image Updated successfully", addNewImage });
            
        }

        // If neither condition is met, return an error
        return res.status(400).json({ error: "Either sliderCaption or packageId is required" });

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

const fetchAllImages=(req,res)=>{
   
console.log("fetch images working")
const UPLOADS_DIR = path.join(__dirname, "..", "uploads"); 


    try {
        // Read all files from the uploads directory
        fs.readdir(UPLOADS_DIR, (err, files) => {
            if (err) {
                return res.status(500).json({ error: "Error reading directory" });
            }

            // Filter image files (JPG, PNG, JPEG, GIF, WebP)
            const imagePaths = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => `/uploads/${file}`); // Mapping filenames to full paths

            return res.status(200).json({ images: imagePaths });
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

module.exports={NewDynamicImage,fetchAllImages}