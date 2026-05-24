const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: String,
    surname: String,
    givenName: String,
    middleInitial: String,
    contactNumber: String,
    address: String,
    password: String,
    role: {
        type: String,
        default: "user"
    }
});

module.exports = mongoose.model("User", UserSchema);