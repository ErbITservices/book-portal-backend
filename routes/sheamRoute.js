const express = require('express')
const router = express.Router()
// const {registerController, loginController}=require('../controllers/adminController')
const { verifyToken, verifyAdminWithToken } = require('../middlewares/authMiddleware');
const { addScheamController, getAllScheamController,getOneScheamController, putScheamController, deleteScheamController, getActiveScheamController } = require('../controllers/scheamController');


router.post('/addScheam',addScheamController)
router.get('/getScheam',getAllScheamController)
router.put('/putScheam/:id',putScheamController)
router.delete('/deleteScheam/:id',deleteScheamController)
router.get('/getOneScheam/:scheam_name',getOneScheamController)
router.get('/getActiveScheam',getActiveScheamController)



module.exports = router;





