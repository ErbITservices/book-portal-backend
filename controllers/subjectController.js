const { default: mongoose } = require("mongoose");
const Subject = require("../models/subjectModel");


const addSubjectController = async (req, res) => {
    const {CategoryName } = req.body.categorydata;
    
    const existSubjectSubject = await Subject.findOne({
      CategoryName:CategoryName,
    });
    
    if (existSubjectSubject) {
        return res.status(400).json({ message: "SubjectSubject exist" });
    }
       const SubjectCreated = await Subject.create({
        CategoryName, 
       });
       res.status(200).json({
         success: true,
         message: "SubjectSubjectName add successful",
        Subject:SubjectCreated,
       });
}

const getSubjectController = async (req, res) => {
    const getCatgory = await Subject.find();
      res.status(200).json({
        success: true,
        message: "SubjectSubjectName get successful",
       Subject: getCatgory,
       
      });
};
const deleteSubjectController=async (req, res) => {
  const id = req.params.id;
  if(!mongoose.isValidObjectId(id)) return res.status(403).json({message: "TheSubject you provided is not a vaid id"})
    try {
      await Subject.findByIdAndDelete(id);
      res.status(200).json({message: "SubjectSubject deleted Succesfully"})
    } catch (err) {      
      res.status(500).json({message: "failed to deleteSubject"});
    }
  };

module.exports = { addSubjectController, getSubjectController,deleteSubjectController };


