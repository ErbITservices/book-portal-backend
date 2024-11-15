const mongoose = require("mongoose");

const scheamSchema = new mongoose.Schema(
  {
    scheam_name: {
      type: String,
      required: true,
      unique: true,
    },
    max_book_number: {
      type: Number,
      required: true,
    },
    min_book_number: {
      type: String,
      // required: true,
    },
    book_price: {
      type: String,
      required: true,
    },
    max_book_price: {
      type: String,
      required: true,
    },
    total_book_price: {
      type: Number,
      required: true,
    },
    scheam_status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Scheam = mongoose.model("Scheam", scheamSchema);

module.exports = Scheam;
