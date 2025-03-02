
const mongoose=require("mongoose");
const PackageAmintiesSchema = new mongoose.Schema({
    name: { type: String }
    
}, {timestamps:true} );
mongoose.module
const PackageAmintiesModel=mongoose.model('PackageAminties',PackageAmintiesSchema);
module.exports=PackageAmintiesModel;
