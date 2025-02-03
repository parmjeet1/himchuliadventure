const mongoose = require('mongoose');
const stateSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    countryId:{type: mongoose.Schema.Types.ObjectId, ref:'Country'},
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // Reference to the User model
 
}, { timestamps: true }); //Mongoose automatically manages createdAt and updatedAt

const state = mongoose.model('State', stateSchema);
module.exports = state;
