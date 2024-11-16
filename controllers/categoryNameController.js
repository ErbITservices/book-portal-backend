const { default: mongoose } = require("mongoose");
const Category = require("../models/categoryNameModel");

const addCategoryNameController = async (req, res) => {
    const { CategoryName } = req.body.categorydata;
    console.log(CategoryName);
    const existCategory = await Category.findOne({
      CategoryName: CategoryName,
    });
    console.log(existCategory);
    
    if (existCategory) {
        return res.status(400).json({ message: "Category exist" });
    }
       const CategoryCreated = await Category.create({
        CategoryName, 
       });
       res.status(200).json({
         success: true,
         message: "CategoryName add successful",
         Category: CategoryCreated,
       
       });
}

const getCategoryNameController = async (req, res) => {
    const getCatgory = await Category.find();
      res.status(200).json({
        success: true,
        message: "CategoryName get successful",
        Category: getCatgory,
       
      });
};
const deleteCategoryController=async (req, res) => {
  const id = req.params.id;
  if(!mongoose.isValidObjectId(id)) return res.status(403).json({message: "The Category you provided is not a vaid id"})
    try {
      await Category.findByIdAndDelete(id);
      res.status(200).json({message: "Category deleted Succesfully"})
    } catch (err) {
      console.log(err);
      
      res.status(500).json({message: "failed to delete Category"});
    }
  };

module.exports = { addCategoryNameController, getCategoryNameController,deleteCategoryController };


