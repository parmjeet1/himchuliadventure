const mongoose=require("mongoose");
const packageSchema=mongoose.Schema({
    destinationId:{type:mongoose.Schema.Types.ObjectId},
    name:{type:String,required:true},
    days:{type:String,required:true},
    nights:{type:String,required:true},
    cost:{type:String,required:true},
    description:{type:String,required:true},
    imageUrl:{type:String},
    imageCaption:{type:String},

    featureStatus:{type:Boolean,default:false}
},{timestamps:true});
const packageModel=mongoose.model("Package",packageSchema);
module.exports=packageModel;
