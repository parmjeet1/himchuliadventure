const mongoose=require("mongoose");
const packageSchema=mongoose.Schema({
    destinationId:{type:mongoose.Schema.Types.ObjectId,ref:"Destinations", required: true },
    packageAminitiesId:{type:mongoose.Schema.Types.ObjectId,ref:"PackageAminties"},
    name:{type:String,required:true},
    days:{type:String,required:true},
    nights:{type:String,required:true},
    cost:{type:String,required:true},
    description:{type:String,required:true},
    imageUrl:{type:String},
    imageCaption:{type:String},

    countryViewStatus:{type:Boolean,default:false},
    FeaturedStatus:{type:Boolean,default:false}
},{timestamps:true});
const packageModel=mongoose.model("Package",packageSchema);
module.exports=packageModel;
