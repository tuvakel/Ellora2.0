const mongoose = require("mongoose");

const healthstatsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    steps: { type: Number, required: true },
    heartRate: { type: Number, required: true }, 
    calories: { type: Number, required: true },
    date: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model("healthstats", healthstatsSchema)