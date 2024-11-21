const Submited = require("../models/submitedModel");


 const addSubmited = async(req,res)=>{
    try {

        const savedProduct = await Submited.create({...req.body})
        console.log(savedProduct);
        
        
        res.status(200).json({
             success:true,
            message :"submited add successful",
            data:savedProduct
        });
         
                
      } catch (error) {
       console.error(error);
        res.status(500).json(err);
      }
}

 const getSubmited = async(req,res)=>{
    const data = await Submited.find();
    res.status(200).json({
        success:true,
        message :"submited get successful",
        data:data
        });
}


module.exports ={getSubmited,addSubmited}