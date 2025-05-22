const jwt = require("jsonwebtoken");

const veryfyToken = async(req,res,next) =>{
    try {
       const token = req.headers.authorization?.splite(' ')[1];
       console.log(token,"Token");
       
        
    } catch (error) {
        res.status(201).send({
            success :false,
            massage : "Invalid Token"
        })
    }
}
module.exports ={
    veryfyToken
}