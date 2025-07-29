const mongoose = require("mongoose");

const healthTipSchema = new mongoose.Schema({
    text: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("HealthTip", healthTipSchema);