const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();
// import completed

const adminRegistration = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (name == null || email == null || password == null || role == null) {
            return res.status(400).json({ "message": "fileds can not be empty" });
        }
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ "message": ` ${email}, this email already used  ` });
        }
        const hasPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hasPassword, role });
        await user.save();
        res.status(201).json({ "message": "user Register successfully!", "user": user });

    } catch (error) {
        return res.status(400).json({ "Internal error": error });

    }
};

const adminLogin = async (req, res) => {
    try{
        console.log("loginapi")
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ "message": "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ "message": "password does not match" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });


    return res.status(201).json({"message":"login successfully","token":token})

    }catch(error){
       return res.status(400).json({"internal error":error});
    }
}



module.exports = {
    adminLogin,
    adminRegistration
}

