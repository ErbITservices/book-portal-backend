const express = require('express')
const router = express.Router()
// const {registerController, loginController}=require('../controllers/adminController')
const { verifyToken, verifyAdminWithToken } = require('../middlewares/authMiddleware');
const { addScheamController, getAllScheamController } = require('../controllers/scheamController');


router.post('/addScheam',verifyAdminWithToken,addScheamController)
router.get('/getScheam',getAllScheamController)


module.exports = router;





