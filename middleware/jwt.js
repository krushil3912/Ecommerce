const jwt = require('jsonwebtoken')
const USER = require('../models/user')

exports.Auth = async function (req,res,next) {
    // console.log('hello');
    try {
        const token = req.headers.authorization
        // console.log(token);
        if(!token)throw new Error(" Please Attach Token");

        let tokenVerify = jwt.verify(token,'YP') 
        // console.log(tokenVeryfy);
        if (!tokenVerify) throw new Error("Please Enter Valid Token");

        let userVerify = await USER.findById(tokenVerify.id) 
        if(!userVerify) throw new Error("User Not Found");
        
        
        next()
    } catch (error) {
        res.status(404).json({
            status:'Fail',
            message:error.message
        })
    }
}