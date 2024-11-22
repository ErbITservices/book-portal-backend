// const { verifyToken } = require("../middlewares/authMiddleware");
const BookEntry = require("../models/bookEntryModel");
const jwt = require("jsonwebtoken");
const { uploadImageToCloudinary,deleteImageFromCloudinary } = require("../utils/cloudinaryMethods");
const { default: mongoose } = require("mongoose");


const addBookEntryController = async(req,res)=>{
    try {
     
      const id =new mongoose.Types.ObjectId();      
      // const Image1 = await uploadImageToCloudinary(req.body.FrontImage, id);
      // const BackImage = await uploadImageToCloudinary(req.body.BackImage, id);
      //   const {userId,ISBN,BookName,BookNameGuj,AuthorName,AuthorNameGuj,Publisher,PublisherName,Size,Binding,Weight,Language,Subject,PubYear,Category,} = req.body; 
                
      //   const sheamCreated = await BookEntry.create({
      //     userId,
      //     ISBN,BookName,BookNameGuj,AuthorName,AuthorNameGuj,Publisher,PublisherName,
      //     Size,Binding,Weight,Language,Subject,PubYear,Category,FrontImage,
      //     BackImage
      //   });
      // const image1 = await uploadImageToCloudinary(req.body.FrontImage, id);
      // const image2 = await uploadImageToCloudinary(req.body.BackImage, id);
      // req.body.FrontImage = image1.url;      
      // req.body.BackImage = image2.url;
      // console.log(req.body.BackImage);
      
      const savedProduct = await BookEntry.create({...req.body.bookdata,_id:id})
      
      
      
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
      res.status(500).json(error);
    }
}

const getBookEntryController = async(req,res)=>{
  try {
    const newb = await BookEntry.find({userId:req.params.userId });
    
    // const bookEntry = await BookEntry.find();
    
  //  const filterbook= newb.filter((id)=>{
  //   if ( id.schemename == req.params.Category) {return id;
  //   }
  //   })

    const bookEntry = await BookEntry.find();
   const filterbook= bookEntry.filter((id)=>{
    if (
      id.userId == req.params.userId &&
      id.schemename == req.params.schemename
    ) {
      return id;
    }
    })
    console.log(req.params);
    console.log(filterbook);
    
    
    res.status(200).json({
      success:true,
      message :"book entry found",
      bookEntry:filterbook
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

const getAllBookEntryController = async(req,res)=>{
  try {
    const allBookEntry = await BookEntry.find();
    console.log(allBookEntry);
    
    res.status(200).json({
      success:true,
      message :"all book entry found",
      bookEntry:allBookEntry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

const gettest = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const startIndex = (page - 1) * limit;
  const qCategory = req.query.category;
  const qsort = req.query.sort;
  const qColor = req.query.color;
  const qSize = req.query.size;
  const qs = req.query.s;

  try {
    let query = BookEntry.find()

    const filterArr = [];
    if(qs) filterArr.push({$or: [
                          {"title": {$regex: qs, $options: "i"}},
                          {"BookEntryno": {$regex: qs, $options: "i"}},
                          {"desc": {$regex: qs, $options: "i"}},
                          {"categories": {$in: [qs]}}
                        ]})

    if (qCategory) filterArr.push({ categories: { $in: [qCategory] } });
    if (qColor) filterArr.push({ color: { $in: [qColor] } });
    if (qSize) filterArr.push({ size: { $in: [qSize] } }); 
    if (filterArr.length !== 0) {
        query = query.find({ $and: filterArr });
    }

    if(qsort === "Newest") { 
      query.sort({ createdAt: -1})
    } else if (qsort === "price-asc") {  
      query.sort({ price : 1})
    } else if (qsort === "price-desc") {
      query.sort({ price : -1})
    } else if (qsort === "toppurchased") {
      query.sort({ purchasedCount : -1})
    } else if (qsort === "topRated") {
      query.sort({ ratingsAverage : -1, ratingsQuantity: -1 })
    } else if (qsort === "topreviewed"){
      query.sort({ ratingsQuantity: -1 })
    }
    query.skip(startIndex).limit(limit)

    const BookEntrys = await query.exec()

    if(BookEntrys.length < 1) return res.status(404).json({message: "No more BookEntry Found!" });
    console.log(BookEntrys);
    
    
    res.status(200).json(BookEntrys);

    

  } catch (error) {
    res.status(500).json({message: "failed to get BookEntry" });
  }
};

const putBoolEntryController =  async (req,res) => {
  try {
    // const image1 = await uploadImageToCloudinary(req.body.FrontImage, req.body._id);
    //   const image2 = await uploadImageToCloudinary(req.body.BackImage, req.body._id);
    //   req.body.FrontImage = image1.url;      
    //   req.body.BackImage = image2.url;
      // const image = await uploadImageToCloudinary(req.body.img, req.body._id);
      // req.body.img = image.url;
      const uodateBookEntry = await BookEntry.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.bookdata,
        },
        { new: true }
      );
      res.status(200).json(uodateBookEntry)
  } catch (error) {
    console.log(error)
      res.status(400).json(error);
  }    
}

const deleteBoolEntryController=async (req, res) => {
  const id = req.params.id;
  if(!mongoose.isValidObjectId(id)) return res.status(403).json({message: "The BookEntry you provided is not a vaid id"})
    try {
      await BookEntry.findByIdAndDelete(id);
      const result = await deleteImageFromCloudinary(id)
      res.status(200).json({message: "BookEntry deleted Succesfully"})
    } catch (err) {
      console.log(err);
      
      res.status(500).json({message: "failed to delete BookEntry"});
    }
  };


  module.exports ={addBookEntryController,getBookEntryController,getAllBookEntryController,putBoolEntryController,deleteBoolEntryController,gettest};