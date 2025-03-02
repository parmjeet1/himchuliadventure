

const mongoose=require("mongoose");
const InclusionExclusionSchema = new mongoose.Schema({
    packageAminitiesId: { type: mongoose.Schema.Types.ObjectId, ref: 'PackageAminties', required: true },
    inclusion: { type: String },
    exclusion: { type: String }

    
}, {timestamps:true} );
mongoose.module
const InclusionExclusionModel=mongoose.model('InclusionExclusion',InclusionExclusionSchema);
module.exports=InclusionExclusionModel;
