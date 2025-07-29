const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    time: { type: String, required: true },
    completed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Reminder", reminderSchema);