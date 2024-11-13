const express = require('express')
const router = express.Router()
const { verifyToken, verifyAdminWithToken } = require('../middlewares/authMiddleware');
const { addBookEntryController, getBookEntryController, getAllBookEntryController } = require('../controllers/bookEntryController');

router.post("/addBook",verifyToken,addBookEntryController);
router.get("/getBook/:id",getBookEntryController)
router.get("/getAllBook",getAllBookEntryController)

module.exports = router;
