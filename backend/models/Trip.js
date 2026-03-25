const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Trip", tripSchema);