const mongoose = require("mongoose");


const SubjectSchema = new mongoose.Schema(
  {
    SubjectName: {
      type:String,
      required: true,
      unique:true
    },
  },
  { timestamps: true }
);



const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
