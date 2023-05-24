const jwt = require('jsonwebtoken');

exports.protected = (req, res, next)=>{
    const {authorization} = req.headers;

    let token;
    if (authorization && authorization.startsWith('Bearer') ){
        token = authorization.split(' ')[1];
    }

    if (!token){
        return res.send({ 'success': false, 'msg' : 'Not authorized to access'});
    }
//DecodeToken 
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.usersId = decodeToken._id
        
    } catch (error) {
        
    }
    next()

}