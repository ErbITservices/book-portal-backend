const { default: mongoose } = require("mongoose");
const Scheam = require("../models/scheamModel");

const addScheamController = async (req, res) => {
  try {
    const {
      min_book_number,
      max_book_number,
      max_book_price,
      scheam_name,
      book_price,
      total_book_price,
      scheam_status,
    } = req.body.schemedata;
    console.log(scheam_name);

    const sheamExist = await Scheam.findOne({ scheam_name: scheam_name });

    if (sheamExist) {
      return res.status(400).json({ message: "scheam exist" });
    }
    // if(sheamExist.scheam_status === "expire"){
    //     return res.status(400).json({message:"scheam is expire"});
    // }

    const sheamCreated = await Scheam.create({
      scheam_name,
      min_book_number,
      max_book_number,
      max_book_price,
      book_price,
      total_book_price,
      scheam_status,
    });
    console.log("5");

    res.status(200).json({
      success: true,
      message: "scheam add successful",
      scheam: sheamCreated,
      // token:await userCreated.generateToken(),
      // userId:userCreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(err);
  }
};

const getAllScheamController = async (req, res) => {
  try {
    const allScheam = await Scheam.find();
    res.status(200).json({
      success: true,
      message: "get allScheam successful",
      allScheam,
    });
  } catch (error) {}
};

const getOneScheamController =async(req,res)=>{
  const scheam_name = req.params.scheam_name;
  // if (!mongoose.isValidObjectId(scheam_name))
  //   return res
  //     .status(403)
  //     .json({ message: "The Scheam you provided is not a vaid id" });
  try {
    const getScheam =await Scheam.findOne({scheam_name:scheam_name})
    res.status(200).json({
      success:true,
      message: "Scheam get Succesfully",
      Scheam: getScheam
     });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "failed to  Scheam" });
  }
}

const putScheamController = async (req, res) => {
  try {
    const uodateScheam = await Scheam.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(uodateScheam);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const deleteScheamController = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res
      .status(403)
      .json({ message: "The Scheam you provided is not a vaid id" });
  try {
    await Scheam.findByIdAndDelete(id);
    res.status(200).json({ message: "Scheam deleted Succesfully" });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "failed to delete Scheam" });
  }
};
module.exports = { addScheamController, getAllScheamController,getOneScheamController,deleteScheamController,putScheamController ,};
