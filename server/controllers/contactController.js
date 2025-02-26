const customerModel = require("../models/CustomerModel");

const addCustomerDetail = async (req, res) => {
    try {
        console.log("dfsdsd");
        const { packageId, name, email, mobile, message } = req.body;

        // Create customer data object dynamically
        const customerData = { name, email, mobile, message };
        if (packageId) {
            customerData.packageId = packageId;
        }

        // Save customer
        const newCustomer = new customerModel(customerData);
        await newCustomer.save();

        return res.status(200).json({
            message: packageId 
                ? "User for destination added successfully" 
                : "User added successfully",
            newCustomer
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { addCustomerDetail };
