const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    // try {
    //     const decode = jwt.verify(req.headers.authorization,process.env.JWT_KEY);
    //     req.user = decode;
    //     next();
    // } catch (error) {
    //     res.status(403).json({message: "token is not valid"});
    // }
    const authHeader = req.headers.authorization;
    
    if (authHeader) {  
        token = authHeader
        jwt.verify(token, process.env.JWT_SECRET, (err, user)=> {
          if(err){
            res.status(403).json({message: "token is not valid"});
          }else {
             req.user = user;
            //  console.log(user);
            next();
          }
        })
    } else {
      res.status(401).json({message: "You are not Loged in"});
    }
  }

const verifyUserWithToken = (req, res, next) => {
  
    verifyToken(req, res, ()=> {
      if(req.user.id === req.params.id || req.user.isAdmin === true) {
          next()
      } else {
          res.status(403).json({message: "you are not allowed to do thet "})
      }
    })   
}

const verifyAdminWithToken = (req, res, next) => {
  verifyToken(req, res, ()=> {
    
    if(req.user.isAdmin === true) {
        next()
    } else {
        res.status(403).json({message: "you are not allowed to do thet"});      
    }
  })   
}


module.exports = { 
    verifyUserWithToken , 
    verifyAdminWithToken, 
    verifyToken,
}