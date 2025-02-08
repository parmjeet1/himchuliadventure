const mongoose=require("mongoose");
const exclusionSchema=mongoose.Schema({
    packageId:{type:mongoose.Schema.Types.ObjectId,ref:"PackageModel",required:true},
description:{type:String,required:true}
},{timestamps :true})
const exclusionModel=mongoose.model('exclusion',exclusionSchema);
module.exports=exclusionModel;