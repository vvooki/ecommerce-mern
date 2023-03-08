const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Categories', CategoriesSchema);
