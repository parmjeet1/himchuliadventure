const mongoose=require("mongoose");
const cricleSchema=mongoose.Schema({
   destinationId:{type:mongoose.Schema.Types.ObjectId,ref:"DestinationsModel"},
    image:{type:String,required:true},
    status:{type:Boolean,default:true}
},{Timestamp:true})


const cricleDestinationModel= mongoose.model("cricleDestinationModel",cricleSchema);
module.exports=cricleDestinationModel;
