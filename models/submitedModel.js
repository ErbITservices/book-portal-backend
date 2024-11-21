const mongoose = require("mongoose");


const SubmitedSchema = new mongoose.Schema(
  {
    scheamName: {
      type:String,
    },
    userId: {
        type:String,
      },
    submissionDate: {
        type:Date,
        default:Date.now()
      },
  },
  { timestamps: true }
);



const Submited = mongoose.model("Submited", SubmitedSchema);

module.exports = Submited;
