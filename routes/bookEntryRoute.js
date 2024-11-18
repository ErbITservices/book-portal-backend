const express = require('express')
const router = express.Router()
const { verifyToken, verifyAdminWithToken } = require('../middlewares/authMiddleware');
const { addBookEntryController, getBookEntryController, getAllBookEntryController, gettest, deleteBoolEntryController, putBoolEntryController } = require('../controllers/bookEntryController');

router.post("/addBook",addBookEntryController);
router.get("/getBook/:userId/:schemename", getBookEntryController);
router.get("/getBook/:schemename", getBookEntryController);
router.get("/getAllBook",getAllBookEntryController)
router.get("/gettest",gettest)
router.put("/update/:id",putBoolEntryController)
router.delete("/delete/:id",deleteBoolEntryController)

module.exports = router;