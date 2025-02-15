const { Timestamp } = require("firebase-admin/firestore");
const mongoose=require("mongoose");
const gallerySchema=mongoose.Schema({
    altTag:{type:String, default:"travel image"},
    image:{type:String,required:true},
    status:{type:Boolean,default:true}
},{Timestamp:true})


const galleryModel= mongoose.model("galleryModel",gallerySchema);
module.exports=galleryModel;
