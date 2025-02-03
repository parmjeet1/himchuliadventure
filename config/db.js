const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
          
        });
        console.log(`MongoDB connected successfully: `);//${conn.connection.host}
    } catch (error) {
        console.error("Database connection error:", error); // Log the actual error
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectDB;