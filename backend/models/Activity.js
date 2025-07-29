const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);