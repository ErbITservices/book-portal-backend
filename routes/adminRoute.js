const express = require('express')
const router = express.Router()
const {registerController, loginController, getAllUserController, sendpasswordlink, updatepassword, getforgotpassword, deleteController}=require('../controllers/adminController')
const { verifyToken, verifyAdminWithToken } = require('../middlewares/authMiddleware')


router.post('/register',registerController)
router.post('/login',loginController)
router.delete('/deleteUser/:id',deleteController)
router.post('/admin-login', verifyAdminWithToken,loginController)
router.get('/getAllUser',getAllUserController)
router.post('/sendpasswordlink',sendpasswordlink)
router.get('/forgotpassword/:id/:token',getforgotpassword)
router.post('/:id/:token',updatepassword)
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