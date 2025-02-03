const Country = require("../models/Country");
const State=require("../models/State")
const addCountry= async(req,res)=>{
    try{
const {name,updatedBy}=req.body;
const dbCountry = await Country.findOne({ name });

if(dbCountry){
    return res.status(400).json({"message":"Country with this name already exist"})}
const newCountry=  new Country({name,updatedBy});
await newCountry.save();
return res.status(201).json({ 
    message: "New Country added Successfully",
    country: newCountry  // Returning actual saved country
});

    }catch(error){
        return res.status(500).json({ message: "Internal Server Error", error: error.message });

    }
}
const addState=async (req,res)=>{
    try{
        const {name,countryId,updatedBy}=req.body;
        const dbState = await State.findOne({ name });
        
        if(dbState){
            return res.status(400).json({"message":"State with this name already exist"})}
        const newState=  new State({name,countryId,updatedBy});
        await newState.save();
        return res.status(201).json({ 
            message: "New State added Successfully",
            State: newState  // Returning actual saved country
        });
        
            }catch(error){
                return res.status(500).json({ message: "Internal Server Error", error: error.message });
        
            }  
}

const addTrip=(req,res)=>{
    res.send("add trip")
}

module.exports={addCountry,addState,addTrip}