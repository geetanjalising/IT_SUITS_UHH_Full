const jwt = require("jsonwebtoken");
const USER = require("../User/userschema");
const secretKey = process.env.KEY

const authenticate = async (req, res, next) => {
   // console.log(req.cookies.Amazonweb);
    try {
      //  console.log("before");
        const token = req.cookies.Amazonweb;
       // console.log("tokenbeforeadfe "+token+" SERCRET KEY "+secretKey);
        const verifyToken = jwt.verify(token, secretKey);
       // console.log("fghjkl");
       //console.log("verifytoken "+verifyToken);
    //   console.log(verifyToken);
    
        const rootUser = await USER.findOne({ _id:verifyToken._id, "tokens.token":token});
       // console.log("rootuser "+rootUser);
    //   console.log(rootUser._id);
        if (!rootUser) { throw new Error("user not found") };
  
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
       
        res.status(401).send({ error: "Unothorised1: No token provide" })
        console.log(error);
    }
}

module.exports = authenticate;