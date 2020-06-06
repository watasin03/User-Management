const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req ,res, next)=>{
    try{
        const token = req.headers.authorization;
        const decode = jwt.verify(token, config.get('PRIVATE_KEY'));
        req.userData = decode;
        next();
    } catch(error){
        return res.status(401).json({
            message:'Invalid Token'
        });
    }
};
