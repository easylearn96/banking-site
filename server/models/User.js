const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    address: String,
    contact: String,
    initialDeposit: Number,
    accountType: String,
    accountNumber: { type: String, unique: true }, // 10-digit unique account number
});

const User = mongoose.model("User", userSchema);
module.exports = User;