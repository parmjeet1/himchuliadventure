const mongoose = require('mongoose');
const StatesSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    countryId:{type: mongoose.Schema.Types.ObjectId, ref:'countries'}
     ,updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
}, { timestamps: true }); 

const States = mongoose.model('States', StatesSchema);
module.exports = States;
