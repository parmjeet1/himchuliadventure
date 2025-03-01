const DestinationsModel = require("../models/DestinationsModel")

const addDestination=(req,res)=>{
    const {countryId,stateId,name,location,description}=req.body
    if(!countryId|| !stateId || !name || !location || !description){
        return res.status(401).json({message:"fileds can not be empty"})
    }
    const newDestination= new DestinationsModel({name,countryId,stateId,location,description});
if(!newDestination){ return res.status(401).json({message:"Error in databse insertion"})
}
    newDestination.save();
    return res.status(200).json({message:"new Destination added",destination:newDestination})

}
const fetchDestination= async (req,res)=>{
try{

const {nod}=req.params;

const query =DestinationsModel.find().select("-createdAt -updatedAt -__v");
if(nod){
  query.limit(Number(nod));
}
const dbDestination=await query.exec();

return res.status(200).json({dbDestination});
}catch(error){
    return res.status(201).json({message:error.message})
}
}

const editDestination = async (req, res) => {
    try {
      const { id, name,location,description } = req.body;
      if (!id || !name) {
        return res.status(400).json({ error: "Fileds can not be empty" });
      }
      const updates = await DestinationsModel.findByIdAndUpdate(
        id,
        { $set: { name,location,description } },
        { new: true }
      );
      if (!updates) {
        return res.status(404).json({
          status: "fail",
          message: "entry not found",
          error: { id: "No Entry found " }
        });
      }
      if (updates) {
        return res.status(200).json({ message: " Edited successfully!", updates });
      }
    } catch (error) {
      return res.status(500).json({ error:"internal error", details:error.message });
    }
  };


  
  const fetchDestinationStateWise= async (req,res)=>{
    try{
    
    const {stateId}=req.params;
    
    const destinations =await DestinationsModel.find({stateId}).select("-createdAt -updatedAt -__v");
    
    return res.status(200).json({destinations});
    }catch(error){
        return res.status(201).json({message:error.message})
    }
    }
module.exports={addDestination,fetchDestination,editDestination,fetchDestinationStateWise}