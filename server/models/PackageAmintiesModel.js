
const mongoose=require("mongoose");
const PackageAmintiesSchema = new mongoose.Schema({
    name: { type: String },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
    
}, {timestamps:true} );
mongoose.module
const PackageAmintiesModel=mongoose.model('PackageAminties',PackageAmintiesSchema);
module.exports=PackageAmintiesModel;
