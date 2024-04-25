const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  furnishedState: {
    type: [String],
    required: true,
  },
  verifiedStatus: {
    type: Boolean,
    required: true,
  },
  facilities: {
    type: [String],
    default: [],
  },
  images: [{ type: String }], // Array of image URLs
  available: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Office = mongoose.model("Office", officeSchema);

module.exports = Office;
