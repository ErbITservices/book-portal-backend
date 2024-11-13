const mongoose=require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,    
    },
    contect_name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,   
    },
    phone:{
        type:String,
        required:true,    
    },
    password:{
        type:String,
        required:true,    
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },    
    verifytoken:{
        type:String, 
    },
},
{timestamps:true}
);


adminSchema.methods.generateToken =async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRE,
        }

    );
    } catch (error) {
        console.error(error);
    }
};



const Admin = mongoose.model('Admin',adminSchema);

module.exports=Admin;







