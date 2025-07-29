const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    age: { type: Number, required: true},
    gender: {type: String, required: true},
    healthGoals: {type: String, required: true},
    terms: {type: Boolean, required: true, default: false},
    newsletter: {type: Boolean, default: false}
});

module.exports = mongoose.model("User", userSchema);