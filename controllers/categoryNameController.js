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


module.exports = { addCategoryNameController, getCategoryNameController };


