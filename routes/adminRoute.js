const express = require('express')
const router = express.Router()
const {registerController, loginController, getAllUserController}=require('../controllers/adminController')
const { verifyToken, verifyAdminWithToken } = require('../middlewares/authMiddleware')


router.post('/register',registerController)
router.post('/login',loginController)
router.post('/admin-login', verifyAdminWithToken,loginController)
router.get('/getAllUser',verifyAdminWithToken,getAllUserController)
// router.get('/user-auth',verifyToken,(req,res)=>{
//     res.status(200).send({
//         ok:true
//     });
// });
// router.get('/admin-auth',verifyToken,verifyAdminWithToken,(req,res)=>{
//     res.status(200).send({
//         ok:true
//     });
// });

module.exports = router;





module.exports = router;