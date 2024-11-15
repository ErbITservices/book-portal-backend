const express = require('express')
const router = express.Router()
const { verifyToken, verifyAdminWithToken } = require('../middlewares/authMiddleware');
const { addBookEntryController, getBookEntryController, getAllBookEntryController } = require('../controllers/bookEntryController');

router.post("/addBook",addBookEntryController);
router.get("/getBook/:schemename", getBookEntryController);
router.get("/getAllBook",getAllBookEntryController)

module.exports = router;
