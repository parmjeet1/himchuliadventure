const SliderModel = require("../models/SliderModel");

const addSliderImage=async (req,res)=>{
    try{
        const {caption}=req.body;
    
    if(!caption){
        return res.status(202).json({"message":"fileds can not be empty"})
    }
    const image=req.file.filename;
    const imagePath = `/uploads/${image}`;
    const newImage= await SliderModel({image:imagePath,caption});
    await newImage.save();
 return res.status(200).json({"message":"New slider Image added successfully",newImage});   
    }catch(error){return res.status(201).json({error:error})}
}

const fetchSlider = async (req, res) => {
    try {
        const { status } = req.params; // Correct destructuring

        console.log(status);

        if (!status || status !== "true") { 
            return res.status(400).json({ message: "Status cannot be blank or must be 'true'" });
        }

        // Fetch the image based on status
        const images = await SliderModel.find({ status }).select("-updatedAt -createdAt -__V");

        if (!images) {
            return res.status(404).json({ message: "No images found" });
        }

        return res.status(200).json({ images });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports={addSliderImage,fetchSlider};