const { hashPassword, comparePassword } = require("../helpers/authHelper");
const Admin = require("../models/userModel");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')




const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"erbitservices@gmail.com",
        pass:"rorvwwarciklfgyw"
    }
})

const registerController = async(req,res)=>{
    try {
        const {username,contect_name,email,phone,password} = req.body.userdata;

        const userExist = await Admin.findOne({email:email});

        if(userExist){
            return res.status(400).json({message:"email exist"});
        }
        
        const hashedPassword = await hashPassword(password);
        const userCreated = await Admin.create({
            username,
            contect_name,
            email,
            phone,
            password:hashedPassword,
        });        
        res
        .status(200).json({
            success:true,
            message :"registration successful",
            user:userCreated,
            // token:await userCreated.generateToken(),
            // userId:userCreated._id.toString(),
         });
         console.log('m');
         
    } catch (error) {
     console.error(error);
      res.status(500).json(err);
    }
}

const loginController= async(req,res)=>{
    try {
        const {email,password}=req.body.userdata;
        const userExist = await Admin.findOne({email:email});
        if(!userExist){
            return res.status(400).json({message:"invalid data"});
        }
        const Match = await comparePassword(password,userExist.password);
        if(Match){
         res
         .status(200).json({
         success:true,
         message :"login successful",
         user:{
            username:userExist.username,
            email:userExist.email,
            phone:userExist.phone,
            id:userExist._id,
            isAdmin:userExist.isAdmin,
         },
         token : await userExist.generateToken(),
        //  userId:userExist._id.toString(),
        });
         console.log("ismatch");
        }else{
         res.status(400).json({message:"invalid data"});
        }
 
     } catch (error) {
        res.status(500).json({message:"internal server error"});

     } 
    }
    const getAllUserController = async(req,res)=>{
        try {
            const allUsers = await Admin.find();
            res.status(200).json({
                success:true,
                message :"all users",
                users:allUsers
            });
        } catch (error) {
            console.error(error);
            res.status(500).json(err);
        }
    }

    const sendpasswordlink = async (req, res) => {
    
        const {email}= req.body.userdata;
        console.log(email);
        
        if(!email){
            return res.status(400).json({msg:"invalid email"});
        };
        try {
          const userfind = await Admin.findOne({ email: email });
          console.log(userfind);
          
          if (!userfind) {
            return res.status(400).json({ msg: "invalid email" });
          }
          const token = jwt.sign({ _id: userfind._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          console.log(token);
          
          const setusertoken = await Admin.findByIdAndUpdate(
            { _id: userfind._id },
            { verifytoken: token },
            { new: true }
          );
          if (setusertoken) {
            const mailOptions = {
              form: "erbitservices@gmail.com",
              to: email,
              subject: "password reset link",
              text: ` Password Rest Link :-   ${process.env.BASE}/ConfirmPassword/${setusertoken._id}/${token}`,
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return res.status(400).json({ msg: "error sending mail" });
              } else {
                res
                  .status(200)
                  .json({ msg: "password reset link sent to your email" });
              }
            });
          }
          console.log("complet email send", userfind._id, token);
        } catch (error) {
            
        }
        
    }

    const getforgotpassword = async (req, res) => {
        const {id,token}= req.params;
        try {
            const validuser= await Admin.findOne({_id:id,verifytoken:token})
            const verifyToken= jwt.verify(token,process.env.JWT_SECRET)
            if(verifyToken._id && validuser){
                res.status(200).json({msg:"password reset link is valid",validuser});
            }else{
                res.status(400).json({msg:"invalid link"});
            }
        } catch (error) {
            res.status(400).json({msg:"invalid link"});
        }
    }

    const updatepassword = async (req, res) => {
        const {id,token}= req.params;
        const {password}= req.body.userdata;
        try {
            const validuser= await Admin.findOne({_id:id,verifytoken:token})
            const verifyToken= jwt.verify(token,process.env.JWT_SECRET)
            if(verifyToken._id && validuser){
                const hashedpassword= await bcrypt.hash(password,10);
                const setpassword= await Admin.findByIdAndUpdate({_id:id},{password:hashedpassword},{new:true});
                setpassword.save();
                res.status(200).json({msg:"password updated successfully",setpassword});
                }else{
                    res.status(400).json({msg:"invalid link"});
                    }
                    } catch (error) {
                        res.status(400).json({msg:"invalid link"});
                    }
    }

module.exports ={sendpasswordlink,getforgotpassword,updatepassword,registerController , loginController,getAllUserController};
