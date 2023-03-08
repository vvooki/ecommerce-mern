const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: { values: ['Model', 'Print'] },
      message: '{VALUE} is not supported',
    },
    topic: { type: Array, required: true },
    desc: [
      {
        header: { type: String, required: true },
        detail: { type: String, required: true },
        img: { type: String },
      },
    ],
    size: {
      type: String,
      enum: { values: ['small', 'medium', 'large'] },
      message: '{VALUE} is not supported',
    },
    color: { type: String },
    price: { type: Number, required: true },
    gallery: { type: Array, required: true },
    model: { type: String, required: true },
    sold: { type: Number },
    countInStock: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
