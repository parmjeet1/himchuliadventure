const mongoose=require("mongoose");
const sliderSchema=mongoose.Schema({
   image:{type:String,required:true},
   caption:{type:String,required:true},
   status:{type:Boolean,required:true,default:true}
},{timestamps:true});
module.exports=mongoose.model("sliderModel",sliderSchema);