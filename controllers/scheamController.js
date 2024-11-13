const Scheam = require("../models/scheamModel");

const addScheamController = async(req,res)=>{
    try {
        const {min_book_number,max_book_number,scheam_name,book_price,total_book_price} = req.body;
        console.log(scheam_name);
        

        const sheamExist = await Scheam.findOne({scheam_name:scheam_name});
        
        if(sheamExist){
            return res.status(400).json({message:"email exist"});
        }
        // if(sheamExist.scheam_status === "expire"){
        //     return res.status(400).json({message:"scheam is expire"});
        // }        
        
        const sheamCreated = await Scheam.create({
            scheam_name,
            min_book_number,
            max_book_number,
            book_price,
            total_book_price
        });
        console.log("5");
                
        res
        .status(200).json({
            success:true,
            message :"sheam add successful",
            scheam:sheamCreated,
            // token:await userCreated.generateToken(),
            // userId:userCreated._id.toString(),
         });         
    } catch (error) {
     console.error(error);
      res.status(500).json(err);
    }
}

const getAllScheamController = async(req,res)=>{
    try {
        const allScheam = await Scheam.find();
        res
        .status(200).json({
            success:true,
            message :"get allSheam successful",
            allScheam
         });  
    } catch (error) {
        
    }
}

module.exports ={addScheamController,getAllScheamController};