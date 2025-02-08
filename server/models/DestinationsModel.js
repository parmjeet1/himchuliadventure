const mongoose=require("mongoose");
const Destinationschema=new mongoose.Schema({
    countryId:{type:mongoose.Schema.Types.ObjectId,ref:'CountriesModel',required:true},
    stateId:{type:mongoose.Schema.Types.ObjectId,ref:'StatesModel',required:true},
    name:{type :String, required:true},
    location:{type:String, required:true},
    description:{type:String, required:true},
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }   
}, {timestamps:true} )

const DestinationsModel=mongoose.model('destinations',Destinationschema);
module.exports=DestinationsModel;
