// const { verifyToken } = require("../middlewares/authMiddleware");
const BookEntry = require("../models/bookEntryModel");
const jwt = require("jsonwebtoken");
const { uploadImageToCloudinary } = require("../utils/cloudinaryMethods");
const { default: mongoose } = require("mongoose");


const addBookEntryController = async(req,res)=>{
    try {
     
      const id =new mongoose.Types.ObjectId()
      console.log(id);
      
      // const Image1 = await uploadImageToCloudinary(req.body.FrontImage, id);
      // const BackImage = await uploadImageToCloudinary(req.body.BackImage, id);
      //   const {userId,ISBN,BookName,BookNameGuj,AuthorName,AuthorNameGuj,Publisher,PublisherName,Size,Binding,Weight,Language,Subject,PubYear,Category,} = req.body; 
                
      //   const sheamCreated = await BookEntry.create({
      //     userId,
      //     ISBN,BookName,BookNameGuj,AuthorName,AuthorNameGuj,Publisher,PublisherName,
      //     Size,Binding,Weight,Language,Subject,PubYear,Category,FrontImage,
      //     BackImage
      //   });
      const image1 = await uploadImageToCloudinary(req.body.FrontImage, id);
      const image2 = await uploadImageToCloudinary(req.body.BackImage, id);
      req.body.FrontImage = image1.url;      
      req.body.BackImage = image2.url;
      const savedProduct = await BookEntry.create({...req.body,_id:id})
      res.status(200).json(savedProduct);
        // res
        // .status(200).json({
        //     success:true,
        //     message :"sheam add successful",
        //     scheam:sheamCreated,
            // token:await userCreated.generateToken(),
            // userId:userCreated._id.toString(),
        //  });         
    } catch (error) {
     console.error(error);
      res.status(500).json(err);
    }
}

const getBookEntryController = async(req,res)=>{
  try {
    const {userId,scheamId} =req.params
    console.log(req.params.id);
    
    const bookEntry = await BookEntry.find({userId:userId});
    res.status(200).json({
      success:true,
      message :"book entry found",
      bookEntry:bookEntry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(err);
  }
}

const getAllBookEntryController = async(req,res)=>{
  try {
    const allBookEntry = await BookEntry.find();
    res.status(200).json({
      success:true,
      message :"all book entry found",
      bookEntry:allBookEntry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(err);
  }
}


module.exports ={addBookEntryController,getBookEntryController,getAllBookEntryController};