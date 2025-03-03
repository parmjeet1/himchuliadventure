const mongoose=require("mongoose");
const ItinaraySchema=new mongoose.Schema({
    packageId:{type:mongoose.Schema.Types.ObjectId,ref:"PackageModel", required:true},
    title:{type:String, required:true},
    day:{type:String,required:true},
    description:{type:String,required:true},
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
})

const  ItinarayModel= mongoose.model('Itinaray', ItinaraySchema);
module.exports = ItinarayModel;
