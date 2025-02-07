const mongoose = require('mongoose');
const StatesSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    countryId:{type: mongoose.Schema.Types.ObjectId, ref:'Country'},
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // Reference to the User model
 
}, { timestamps: true }); //Mongoose automatically manages createdAt and updatedAt

const States = mongoose.model('States', StatesSchema);
module.exports = States;
