const StatesModel=require("../models/StatesModel");
const addState= async (req,res)=>{
try{

 const {countryId,name}=req.body;
if(!countryId  || !name){ return res.status(401).json({error:"date can not be empty"}) }
const newState=await new StatesModel({countryId,name});
newState.save();
return res.status(201).json({message:"new state added successfully",state:newState.name});


   }catch(error){ return res.status(401).json({error:error.message}) }


}
const fetchState=async (req,res)=>{
    try{

        const {countryId}=req.params;
    
        if(!countryId){ return res.status(401).json({message:"fileds can not be empty"})}
        const states= await StatesModel.find({countryId});
        if(!states){ return res.status(401).json({message:"no state found"}) }
        return res.status(200).json({states})


    }catch(error){return res.status(401).json({error:error.message})  }
}

const editState = async (req, res) => {
    try {
      const { id, name } = req.body;
      if (!id || !name) {
        return res.status(400).json({ error: "Fileds can not be empty" });
      }
      const updates = await StatesModel.findByIdAndUpdate(
        id,
        { $set: { name } },
        { new: true }
      );
      if (!updates) {
        return res.status(404).json({
          status: "fail",
          message: "State not found",
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
module.exports={addState,fetchState,editState}