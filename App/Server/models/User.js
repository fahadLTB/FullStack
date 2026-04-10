const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    phone: String
});

module.exports = mongoose.model("User", UserSchema);
