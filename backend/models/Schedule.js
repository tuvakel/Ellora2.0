const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    time: { type: String }, // Use String if storing time like "07:00"
    activity: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Schedule", scheduleSchema);