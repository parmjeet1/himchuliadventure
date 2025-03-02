const customerModel = require("../models/CustomerModel");

const addCustomerDetail = async (req, res) => {
    try {
        console.log("dfsdsd");
        const { packageId, name, email, mobile, message } = req.body;

        
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

const fetchCustomerDetails = async (req, res) => {
    try {
        const customers = await customerModel.find().sort({ createdAt: -1 }).lean();

        if (!customers || customers.length === 0) {
            return res.status(404).json({ error: "No customers found" });
        }

        return res.status(200).json({
            status: "success",
            data: customers
        });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};
module.exports = { addCustomerDetail,fetchCustomerDetails };
