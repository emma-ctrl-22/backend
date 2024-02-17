const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("You need to Login");
  }else{
    jwt.verify(accessToken,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.json("token is wrong")
        }else{
            req.username = decoded.username;
            req.phone = decoded.phone;
            next()
        }
    })
  }
}

module.exports={verifyUser};