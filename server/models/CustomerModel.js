const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    message: { type: String, required: true, trim: true },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "packageModel", default: null },
}, { timestamps: true });

const customerModel = mongoose.model("Customer", customerSchema);
module.exports = customerModel;
