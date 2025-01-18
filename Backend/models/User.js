const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    password: {
        type: String,
    }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;