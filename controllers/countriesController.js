const countriesModel = require("../models/CountriesModel");
const addCountry = async (req, res) => {
  try {
    const { name, updatedBy } = req.body;
    const dbCountry = await countriesModel.findOne({ name });

    if (dbCountry) {
      return res
        .status(400)
        .json({ message: "Country with this name already exist" });
    }
    const newCountry = new countriesModel({ name, updatedBy });
    await newCountry.save();
    return res.status(201).json({
      message: "New Country added Successfully",
      name: newCountry,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const fetchCountry= async (req,res) =>{
   try{
    console.log("contry working")
    const {id}=req.params;
if(!id){ return res.status(400).json({error:"id could not foud"}) }

    const dbCountries=await countriesModel.findOne({_id:id}).select("-updatedBy -createdAt -updatedAt");
    if(!dbCountries){ res.status(401).json({error:"Country could not found!"}) }
    console.log(dbCountries);
    return res.status(200).json({ name:dbCountries.name })

   }catch(error){
    return res.status(401).json({message:"internal server error",error:error.message});
   }

}



module.exports = { addCountry,fetchCountry };
