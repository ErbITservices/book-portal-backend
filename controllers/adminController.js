const { hashPassword, comparePassword } = require("../helpers/authHelper");
const Admin = require("../models/userModel");

const registerController = async(req,res)=>{
    try {
        const {username,contect_name,email,phone,password} = req.body;

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
        const {email,password}=req.body;
        const userExist = await Admin.findOne({email:email});
        if(!userExist){
            return res.status(200).json({message:"invalid data"});
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



module.exports ={registerController , loginController,getAllUserController};
