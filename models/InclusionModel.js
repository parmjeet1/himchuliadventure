const mongoose=require("mongoose");
const inclusionSchema=mongoose.Schema({
    packageId:{type:mongoose.Schema.Types.ObjectId,ref:"PackageModel",required:true},
description:{type:String,required:true}
},{timestamps :true})
const InclusionModel=mongoose.model('Inclusion',inclusionSchema);
module.exports=InclusionModel;