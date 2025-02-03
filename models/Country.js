const mongoose = require('mongoose');
const countrySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // Reference to the User model
 
}, { timestamps: true }); //Mongoose automatically manages createdAt and updatedAt

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;
