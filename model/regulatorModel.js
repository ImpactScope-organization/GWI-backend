const mongoose = require("mongoose");
const regulatorSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        // unique: true,
    },

    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
    },




});




module.exports = mongoose.model("auth", regulatorSchema);