const StatesModel=require("../models/StatesModel");
const addState= async (req,res)=>{
try{

 const {countryId,updatedBy,name}=req.body;
if(!countryId || !updatedBy || !name){ return res.status(401).json({error:"date can not be empty"}) }
const newState=await new StatesModel({countryId,updatedBy,name});
newState.save();
return res.status(201).json({message:"new state added successfully",state:newState.name});


   }catch(error){ return res.status(401).json({error:error.message}) }


}
const fetchState=async (req,res)=>{
    try{
        const {stateId}=req.params;
        if(!stateId){ return res.status(401).json({message:"fileds can not be empty"})}
        const dbState= await StatesModel.findOne({_id:stateId});
        if(!dbState){ return res.status(401).json({message:"no state found"}) }
        return res.status(200).json({name:dbState.name})


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