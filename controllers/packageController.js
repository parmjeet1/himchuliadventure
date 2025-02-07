const packageModel = require("../models/PackageModel");

const addNewPackage=async (req,res)=>{
    try {
        const { name,description, destinationId} = req.body;
    
    
        const package = new packageModel({ name,description,destinationId});
         await package.save();
        return res.status(201).json({
          message: "one Package added Successfully",
          name: package,
        });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      }

}
module.exports=(addNewPackage)