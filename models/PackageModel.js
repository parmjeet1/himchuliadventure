const mongoose=require("mongoose");
const packageSchema=mongoose.Schema({
    destinationId:{type:mongoose.Schema.Types.ObjectId},
    name:{type:String,required:true},
    description:{type:String,required:true}
},{timestamps:true});
const packageModel=mongoose.model("Package",packageSchema);
module.exports=packageModel;
