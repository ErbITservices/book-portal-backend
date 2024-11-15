const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyAdminWithToken,
} = require("../middlewares/authMiddleware");
const {
  addCategoryNameController,
  getCategoryNameController,
} = require("../controllers/categoryNameController");


router.post("/addCategoryName", addCategoryNameController);
 router.get("/getCategoryName", getCategoryNameController);


module.exports = router;
