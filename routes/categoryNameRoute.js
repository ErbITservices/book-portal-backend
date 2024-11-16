const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyAdminWithToken,
} = require("../middlewares/authMiddleware");
const {
  addCategoryNameController,
  getCategoryNameController,
  deleteCategoryController,
} = require("../controllers/categoryNameController");


router.post("/addCategoryName", addCategoryNameController);
 router.get("/getCategoryName", getCategoryNameController);
 router.delete("/deleteCategoryName/:id", deleteCategoryController);


module.exports = router;
