const mongoose = require('mongoose');
const countriesSchema = new mongoose.Schema({
  
    name: { type: String, required: true, unique: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // Reference to the User model
  gridViewStatus:{type:Boolean,default:false},
  
  homeFetaureImage:{type:String}, 
  coverHeading:{type:String},
  coverParagraph:{type:String}

}, { timestamps: true }); //Mongoose automatically manages createdAt and updatedAt

const countries = mongoose.model('countries', countriesSchema);
module.exports = countries;
