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

if (!nod || isNaN(nod) || nod <= 0) {
    return res.status(400).json({ message: "Valid number of destinations (nod) is required" });
}
const dbDestination= await DestinationsModel.find().select("-createdAt -updatedAt -__v").limit(Number(nod));
return res.status(200).json({dbDestination});
}catch(error){
    return res.status(201).json({message:error.message})
}
}



module.exports={addDestination,fetchDestination}